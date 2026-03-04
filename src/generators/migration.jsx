export function generateMigration(schema) {
  const fields = schema.fields
    .map((f) => {
      // BELONGS TO
      if (f.relation?.type === "belongsTo") {
        return `$table->foreignId('${f.name}')${
          !f.required ? "->nullable()" : ""
        }->constrained()${f.onDelete ? `->onDelete('${f.onDelete}')` : ""};`;
      }

      // SKIP belongsToMany (pivot)
      if (f.relation?.type === "belongsToMany") return "";

      // ENUM
      if (f.type === "enum") {
        const values = f.enumValues
          ? f.enumValues
              .split(",")
              .map((v) => `'${v.trim()}'`)
              .join(", ")
          : "";
        let line = `$table->enum('${f.name}', [${values}])`;
        if (!f.required) line += "->nullable()";
        if (f.unique) line += "->unique()";
        if (f.index) line += "->index()";
        if (f.default) line += `->default('${f.default}')`;
        return line + ";";
      }

      // DECIMAL
      if (f.type === "decimal") {
        let line = `$table->decimal('${f.name}', ${f.precision || 8}, ${f.scale || 2})`;
        if (!f.required) line += "->nullable()";
        if (f.unique) line += "->unique()";
        if (f.index) line += "->index()";
        if (f.default) line += `->default(${f.default})`;
        return line + ";";
      }

      // STRING WITH LENGTH
      if (f.type === "string") {
        let length = f.length || 255;
        let line = `$table->string('${f.name}', ${length})`;
        if (!f.required) line += "->nullable()";
        if (f.unique) line += "->unique()";
        if (f.index) line += "->index()";
        if (f.default) line += `->default('${f.default}')`;
        return line + ";";
      }

      // OTHER TYPES
      let line = `$table->${f.type}('${f.name}')`;
      if (!f.required) line += "->nullable()";
      if (f.unique) line += "->unique()";
      if (f.index) line += "->index()";
      if (f.default) {
        if (f.type === "boolean") line += `->default(${f.default})`;
        else line += `->default('${f.default}')`;
      }
      return line + ";";
    })
    .filter(Boolean)
    .join("\n    ");

  return `
Schema::create('${schema.table}', function (Blueprint $table) {
    $table->id();
    ${fields}
    ${schema.options.softDeletes ? "$table->softDeletes();" : ""}
    $table->timestamps();
});
`;
}
