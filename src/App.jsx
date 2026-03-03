import { useState } from "react";
import GeneratorForm from "./components/GeneratorForm";
import CodePreview from "./generators/CodePreview";

export default function App() {
  const [schema, setSchema] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <GeneratorForm onGenerate={setSchema} />
        {schema && <CodePreview schema={schema} />}
      </div>
    </div>
  );
}
