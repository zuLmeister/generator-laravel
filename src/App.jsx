import { useState } from "react";
import GeneratorForm from "./components/GeneratorForm";
import CodePreview from "./generators/CodePreview";
import Title from "antd/es/skeleton/Title";

export default function App() {
  const [schema, setSchema] = useState(null);

  return (
    <div className="h-screen w-screen bg-white flex">
      <div className="w-full md:w-1/3 p-6 overflow-y-auto border-r border-gray-200">
        <h1 className="text-xl font-bold mb-4 text-gray-800">
          Zul Laravel Pattern Generator
        </h1>
        <GeneratorForm onGenerate={setSchema} />
      </div>

      <div className="w-full md:w-2/3 p-6 overflow-y-auto bg-gray-50">
        <h1 className="text-xl font-bold mb-4 text-gray-600">Code Preview</h1>
        {schema ? (
          <CodePreview schema={schema} />
        ) : (
          <p className="text-gray-500">
            Your generated code will appear here...
          </p>
        )}
      </div>
    </div>
  );
}
