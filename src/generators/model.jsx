import { toPascalCase, toCamelCase } from "../utils/naming";

export function generateModel(schema) {
  const modelName = toPascalCase(schema.model);

  // ===== FILLABLE =====
  const fillable = schema.fields
    .filter(
      (f) =>
        f.type !== "password" &&
        f.relation?.type !== "belongsToMany" &&
        !["id", "deleted_at", "created_at", "updated_at"].includes(f.name),
    )
    .map((f) => `'${f.name}'`)
    .join(",\n        ");

  // ===== HIDDEN =====
  const hidden = schema.fields
    .filter((f) => f.type === "password")
    .map((f) => `'${f.name}'`)
    .join(",\n        ");

  // ===== CASTS =====
  const casts = schema.fields
    .filter((f) =>
      [
        "integer",
        "boolean",
        "array",
        "json",
        "datetime",
        "decimal",
        "float",
        "double",
      ].includes(f.type),
    )
    .map((f) => {
      let castType = f.type;
      if (castType === "json") castType = "array";
      if (
        castType === "decimal" ||
        castType === "float" ||
        castType === "double"
      )
        castType = "decimal";
      if (castType === "datetime") castType = "datetime";
      return `'${f.name}' => '${castType}'`;
    })
    .join(",\n        ");

  // ===== RELATIONS =====
  const relations = schema.fields
    .filter((f) => f.relation)
    .map((f) => {
      const relatedModel = toPascalCase(f.relation.model);
      switch (f.relation.type) {
        case "belongsTo": {
          const relationName = f.name.replace("_id", "");
          return `    public function ${relationName}() {\n        return $this->belongsTo(${relatedModel}::class);\n    }`;
        }
        case "hasMany": {
          const relationName = toCamelCase(f.relation.model) + "s";
          return `    public function ${relationName}() {\n        return $this->hasMany(${relatedModel}::class);\n    }`;
        }
        case "belongsToMany": {
          const relationName = toCamelCase(f.relation.model) + "s";
          const pivot = f.relation.pivot ? `, '${f.relation.pivot}'` : "";
          const timestamps = f.relation.timestamps ? "->withTimestamps()" : "";
          return `    public function ${relationName}() {\n        return $this->belongsToMany(${relatedModel}::class${pivot})${timestamps};\n    }`;
        }
        default:
          return "";
      }
    })
    .join("\n\n");

  // ===== SCOPES for boolean fields =====
  const scopes = schema.fields
    .filter((f) => f.type === "boolean")
    .map((f) => {
      const scopeName = toPascalCase(f.name);
      const camelName = toCamelCase(f.name);
      return `    public function scope${scopeName}($query) {\n        return $query->where('${f.name}', true);\n    }`;
    })
    .join("\n\n");

  // ===== BASE CLASS =====
  const baseClass = schema.options.authModel
    ? "Illuminate\\Foundation\\Auth\\User as Authenticatable"
    : "Illuminate\\Database\\Eloquent\\Model";

  // ===== SOFT DELETES =====
  const softDeletes = schema.options.softDeletes
    ? `use Illuminate\\Database\\Eloquent\\SoftDeletes;`
    : "";

  const softTrait = schema.options.softDeletes ? "use SoftDeletes;" : "";

  return `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
${softDeletes ? softDeletes : ""}
use ${baseClass};

class ${modelName} extends ${schema.options.authModel ? "Authenticatable" : "Model"}
{
    use HasFactory;
    ${softTrait}

    protected $fillable = [
        ${fillable}
    ];
${hidden ? `\n    protected $hidden = [\n        ${hidden}\n    ];` : ""}

${casts ? `\n    protected $casts = [\n        ${casts}\n    ];` : ""}

${relations}

${scopes}
}
`;
}
