import { toPascalCase, toCamelCase } from "../utils/naming";

function buildValidationRules(schema, isUpdate = false) {
  const modelVar = toCamelCase(schema.model);

  return schema.fields
    .map((field) => {
      // ===== MANY TO MANY =====
      if (field.relation?.type === "belongsToMany") {
        const relationName = toCamelCase(field.relation.model) + "s";
        const relatedTable = field.relation.model.toLowerCase() + "s";

        return `
            '${relationName}' => ['${isUpdate ? "sometimes" : "required"}', 'array'],
            '${relationName}.*' => ['integer', 'exists:${relatedTable},id'],`;
      }

      const rules = [];

      // REQUIRED / SOMETIMES
      if (!isUpdate && field.required) {
        rules.push("required");
      }

      if (isUpdate) {
        rules.push("sometimes");
      }

      // TYPE RULES
      switch (field.type) {
        case "string":
          rules.push("string", "max:255");
          break;
        case "text":
          rules.push("string");
          break;
        case "integer":
          rules.push("integer");
          break;
        case "boolean":
          rules.push("boolean");
          break;
        case "password":
          rules.push("string", "min:6");
          break;
        case "foreignId":
          rules.push("integer");
          break;
      }

      // ===== BELONGS TO EXISTS =====
      if (field.relation?.type === "belongsTo") {
        const relatedTable = field.relation.model.toLowerCase() + "s";
        rules.push(`exists:${relatedTable},id`);
      }

      // ===== UNIQUE =====
      if (field.unique) {
        if (isUpdate) {
          rules.push(
            `Rule::unique('${schema.table}', '${field.name}')->ignore($this->route('${modelVar}')->id)`,
          );
        } else {
          rules.push(`unique:${schema.table},${field.name}`);
        }
      }

      return `'${field.name}' => [${rules.join(", ")}],`;
    })
    .join("\n            ");
}

export function generateStoreRequest(schema) {
  const modelName = toPascalCase(schema.model);

  const needsRuleImport = schema.fields.some((f) => f.unique);

  return `<?php

namespace App\\Http\\Requests\\${modelName};

use Illuminate\\Foundation\\Http\\FormRequest;
${needsRuleImport ? "use Illuminate\\Validation\\Rule;" : ""}

class Store${modelName}Request extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            ${buildValidationRules(schema, false)}
        ];
    }
}
`;
}

export function generateUpdateRequest(schema) {
  const modelName = toPascalCase(schema.model);

  const needsRuleImport = schema.fields.some((f) => f.unique);

  return `<?php

namespace App\\Http\\Requests\\${modelName};

use Illuminate\\Foundation\\Http\\FormRequest;
${needsRuleImport ? "use Illuminate\\Validation\\Rule;" : ""}

class Update${modelName}Request extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            ${buildValidationRules(schema, true)}
        ];
    }
}
`;
}
