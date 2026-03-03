import { useState } from "react";
import { Input, Button, Select, Checkbox } from "antd";
import FieldBuilder from "./FieldBuilder";

export default function GeneratorForm({ onGenerate }) {
  const [model, setModel] = useState("");
  const [fields, setFields] = useState([]);
  const [softDeletes, setSoftDeletes] = useState(true);

  const handleGenerate = () => {
    onGenerate({
      model,
      table: model.toLowerCase() + "s",
      fields,
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
