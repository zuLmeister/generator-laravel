import { Button, Input, Select } from "antd";

export default function FieldBuilder({ fields, setFields }) {
  const addField = () => {
    setFields([
      ...fields,
      { name: "", type: "string", required: false, unique: false },
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="grid grid-cols-4 gap-4">
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

          <Button
            danger
            onClick={() => setFields(fields.filter((_, i) => i !== index))}
          >
            Delete
          </Button>
        </div>
      ))}

      <Button onClick={addField}>Add Field</Button>
    </div>
  );
}
