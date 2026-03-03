import { toPascalCase } from "../utils/naming";

export function generateResource(schema) {
  const modelName = toPascalCase(schema.model);

  const excluded = schema.resource?.exclude || ["password"];
  const includeTimestamps = schema.resource?.includeTimestamps ?? true;

  const fields = schema.fields
    .filter((f) => !excluded.includes(f.name))
    .map((f) => `'${f.name}' => $this->${f.name},`)
    .join("\n            ");

  return `<?php

namespace App\\Http\\Resources;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\Resources\\Json\\JsonResource;

class ${modelName}Resource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            ${fields}
            ${
              includeTimestamps
                ? `
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            `
                : ""
            }
        ];
    }
}
`;
}
