export function generateMigration(schema) {
  const fields = schema.fields
    .map((f) => {
      // BELONGS TO
      if (f.relation?.type === "belongsTo") {
        return `$table->foreignId('${f.name}')
                ${!f.required ? "->nullable()" : ""}
                ->constrained()
                ${f.onDelete ? `->onDelete('${f.onDelete}')` : ""};`;
      }

      // SKIP belongsToMany (handled by pivot)
      if (f.relation?.type === "belongsToMany") {
        return "";
      }

      let line = `$table->${f.type}('${f.name}')`;

      if (!f.required) line += "->nullable()";
      if (f.unique) line += "->unique()";
      if (f.index) line += "->index()";

      return line + ";";
    })
    .filter(Boolean)
    .join("\n            ");

  return `
Schema::create('${schema.table}', function (Blueprint $table) {
    $table->id();
    ${fields}
    ${schema.options.softDeletes ? "$table->softDeletes();" : ""}
    $table->timestamps();
});
`;
}
