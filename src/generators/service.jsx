import { toPascalCase, toCamelCase } from "../utils/naming";

export function generateService(schema) {
  const modelName = toPascalCase(schema.model);
  const modelVariable = toCamelCase(schema.model);

  const hasPassword = schema.fields.some((f) => f.type === "password");

  // ===== EAGER RELATIONS =====
  const eagerRelations = schema.fields
    .filter((f) => f.relation)
    .map((f) => {
      if (f.relation.type === "belongsTo") {
        return `'${f.name.replace("_id", "")}'`;
      }
      if (f.relation.type === "hasMany") {
        return `'${toCamelCase(f.relation.model)}s'`;
      }
      if (f.relation.type === "belongsToMany") {
        return `'${toCamelCase(f.relation.model)}s'`;
      }
      return null;
    })
    .filter(Boolean)
    .join(", ");

  // ===== MANY TO MANY =====
  const manyToManyFields = schema.fields.filter(
    (f) => f.relation?.type === "belongsToMany",
  );

  const manyToManySyncStore = manyToManyFields
    .map((f) => {
      const relationName = toCamelCase(f.relation.model) + "s";
      return `
            if (isset($data['${relationName}'])) {
                $${modelVariable}->${relationName}()->sync($data['${relationName}']);
            }`;
    })
    .join("\n");

  const manyToManySyncUpdate = manyToManySyncStore;

  const removePivotData = manyToManyFields
    .map((f) => {
      const relationName = toCamelCase(f.relation.model) + "s";
      return `unset($data['${relationName}']);`;
    })
    .join("\n            ");

  return `<?php

namespace App\\Services;

use App\\Models\\${modelName};
use Illuminate\\Support\\Facades\\DB;
${hasPassword ? "use Illuminate\\Support\\Facades\\Hash;" : ""}

class ${modelName}Service
{
    public function getAll(int $perPage = 10)
    {
        return ${modelName}::with([${eagerRelations}])->paginate($perPage);
    }

    public function store(array $data): ${modelName}
    {
        return DB::transaction(function () use ($data) {

            ${
              hasPassword
                ? `
            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }`
                : ""
            }

            ${removePivotData}

            $${modelVariable} = ${modelName}::create($data);

            ${manyToManySyncStore}

            return $${modelVariable}->load([${eagerRelations}]);
        });
    }

    public function update(${modelName} $${modelVariable}, array $data): ${modelName}
    {
        return DB::transaction(function () use ($${modelVariable}, $data) {

            ${
              hasPassword
                ? `
            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }`
                : ""
            }

            ${removePivotData}

            $${modelVariable}->update($data);

            ${manyToManySyncUpdate}

            return $${modelVariable}->load([${eagerRelations}]);
        });
    }

    public function delete(${modelName} $${modelVariable}): void
    {
        DB::transaction(function () use ($${modelVariable}) {
            $${modelVariable}->delete();
        });
    }
}
`;
}
