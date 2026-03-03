import { toPascalCase, toCamelCase } from "../utils/naming";

export function generateService(schema) {
  const modelName = toPascalCase(schema.model);
  const modelVariable = toCamelCase(schema.model);

  const hasPassword = schema.fields.some((f) => f.type === "password");

  return `<?php

namespace App\\Services;

use App\\Models\\${modelName};
use Illuminate\\Support\\Facades\\DB;
${hasPassword ? "use Illuminate\\Support\\Facades\\Hash;" : ""}

class ${modelName}Service
{
    public function getPaginated(int $perPage = 10)
    {
        return ${modelName}::query()->paginate($perPage);
    }

    public function store(array $data): ${modelName}
    {
        return DB::transaction(function () use ($data) {
            ${
              hasPassword
                ? `
            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }
            `
                : ""
            }

            return ${modelName}::create($data);
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
            }
            `
                : ""
            }

            $${modelVariable}->update($data);

            return $${modelVariable}->fresh();
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
