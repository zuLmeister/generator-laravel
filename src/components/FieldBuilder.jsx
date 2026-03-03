import { Button, Input, Select, Checkbox } from "antd";

export default function FieldBuilder({ fields, setFields }) {
  const addField = () => {
    setFields([
      ...fields,
      {
        name: "",
        type: "string",
        required: false,
        unique: false,
        index: false,
        relationType: null,
        relationModel: "",
        onDelete: "cascade",
      },
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];

    // Auto change type if belongsTo
    if (key === "relationType" && value === "belongsTo") {
      updated[index].type = "foreignId";
    }

    updated[index][key] = value;
    setFields(updated);
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
          {/* BASIC FIELD */}
          <div className="grid grid-cols-4 gap-4">
            <Input
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => updateField(index, "name", e.target.value)}
            />

            <Select
              value={field.type}
              onChange={(value) => updateField(index, "type", value)}
              options={[
                { value: "string" },
                { value: "text" },
                { value: "integer" },
                { value: "boolean" },
                { value: "password" },
                { value: "foreignId" },
              ]}
            />

            <Select
              value={field.required}
              onChange={(value) => updateField(index, "required", value)}
              options={[
                { value: true, label: "Required" },
                { value: false, label: "Optional" },
              ]}
            />

            <Select
              placeholder="Relation"
              value={field.relationType}
              onChange={(value) => updateField(index, "relationType", value)}
              options={[
                { value: null, label: "None" },
                { value: "belongsTo" },
                { value: "hasMany" },
                { value: "belongsToMany" },
              ]}
            />
          </div>

          {/* RELATION CONFIG */}
          {field.relationType && (
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Related Model (e.g. User)"
                value={field.relationModel}
                onChange={(e) =>
                  updateField(index, "relationModel", e.target.value)
                }
              />

              {field.relationType === "belongsTo" && (
                <Select
                  value={field.onDelete}
                  onChange={(value) => updateField(index, "onDelete", value)}
                  options={[
                    { value: "cascade", label: "Cascade" },
                    { value: "restrict", label: "Restrict" },
                    { value: "set null", label: "Set Null" },
                  ]}
                />
              )}
            </div>
          )}

          {/* OPTIONS */}
          <div className="flex gap-6">
            <Checkbox
              checked={field.unique}
              onChange={(e) => updateField(index, "unique", e.target.checked)}
            >
              Unique
            </Checkbox>

            <Checkbox
              checked={field.index}
              onChange={(e) => updateField(index, "index", e.target.checked)}
            >
              Index
            </Checkbox>
          </div>

          {/* DELETE */}
          <Button
            danger
            onClick={() => setFields(fields.filter((_, i) => i !== index))}
          >
            Delete Field
          </Button>
        </div>
      ))}

      <Button type="dashed" onClick={addField} block>
        + Add Field
      </Button>
    </div>
  );
}
