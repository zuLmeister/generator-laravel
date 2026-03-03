import { useState } from "react";
import { Input, Button, Checkbox } from "antd";
import FieldBuilder from "./FieldBuilder";

export default function GeneratorForm({ onGenerate }) {
  const [model, setModel] = useState("");
  const [fields, setFields] = useState([]);
  const [softDeletes, setSoftDeletes] = useState(true);

  const handleGenerate = () => {
    if (!model.trim()) {
      alert("Model name is required!");
      return;
    }

    // Transform fields to include relation object for generator
    const transformedFields = fields.map((f) => {
      if (!f.relationType) return f;

      return {
        ...f,
        relation: {
          type: f.relationType,
          model: f.relationModel,
          onDelete: f.onDelete,
        },
      };
    });

    onGenerate({
      model,
      table: model.toLowerCase() + "s",
      fields: transformedFields,
      options: { softDeletes },
    });
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder="Model Name (e.g. User)"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />

      <FieldBuilder fields={fields} setFields={setFields} />

      <Checkbox
        checked={softDeletes}
        onChange={(e) => setSoftDeletes(e.target.checked)}
      >
        Soft Deletes
      </Checkbox>

      <Button type="primary" onClick={handleGenerate}>
        Generate
      </Button>
    </div>
  );
}
