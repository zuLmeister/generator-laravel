import { toPascalCase, toCamelCase } from "../utils/naming";

function buildValidationRules(schema, isUpdate = false) {
  const modelVar = toCamelCase(schema.model);

  return schema.fields
    .map((field) => {
      const rules = [];

      if (!isUpdate && field.required) {
        rules.push("required");
      }

      if (isUpdate) {
        rules.push("sometimes");
      }

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
      }

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

  return `<?php

namespace App\\Http\\Requests\\${modelName};

use Illuminate\\Foundation\\Http\\FormRequest;

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
