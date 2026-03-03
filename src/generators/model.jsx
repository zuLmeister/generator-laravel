import { toPascalCase } from "../utils/naming";

export function generateModel(schema) {
  const modelName = toPascalCase(schema.model);

  const fillable = schema.fields
    .filter((f) => f.type !== "password")
    .map((f) => `'${f.name}'`)
    .join(",\n        ");

  const hidden = schema.fields
    .filter((f) => f.type === "password")
    .map((f) => `'${f.name}'`)
    .join(",\n        ");

  return `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\SoftDeletes;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;

class ${modelName} extends Authenticatable
{
    use HasFactory;
    ${schema.options.softDeletes ? "use SoftDeletes;" : ""}

    protected $fillable = [
        ${fillable}
    ];

    ${
      hidden
        ? `
    protected $hidden = [
        ${hidden}
    ];
    `
        : ""
    }
}
`;
}
