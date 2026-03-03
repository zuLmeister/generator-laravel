export function generateMigration(schema) {
  const fields = schema.fields
    .map((f) => {
      let line = `$table->${f.type}('${f.name}')`;

      if (!f.required) line += "->nullable()";
      if (f.unique) line += "->unique()";

      return line + ";";
    })
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
