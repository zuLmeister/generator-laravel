import { Tabs } from "antd";
import { generateModel } from "../generators/model";
import { generateService } from "../generators/service";
import { generateMigration } from "../generators/migration";
import { generateStoreRequest, generateUpdateRequest } from "./request";
import { generateResource } from "./resource";
import { generateController } from "./controller";

export default function CodePreview({ schema }) {
  const items = [
    {
      key: "migration",
      label: "Migration",
      children: (
        <pre className="bg-gray-900 text-green-400 p-4 overflow-auto">
          {generateMigration(schema)}
        </pre>
      ),
    },
    {
      key: "model",
      label: "Model",
      children: (
        <pre className="bg-gray-900 text-green-400 p-4 overflow-auto">
          {generateModel(schema)}
        </pre>
      ),
    },
    {
      key: "service",
      label: "Service",
      children: (
        <pre className="bg-gray-900 text-green-400 p-4 overflow-auto">
          {generateService(schema)}
        </pre>
      ),
    },
    {
      key: "storeRequest",
      label: "Store Request",
      children: (
        <pre className="bg-gray-900 text-green-400 p-4 overflow-auto">
          {generateStoreRequest(schema)}
        </pre>
      ),
    },
    {
      key: "updateRequest",
      label: "Update Request",
      children: (
        <pre className="bg-gray-900 text-green-400 p-4 overflow-auto">
          {generateUpdateRequest(schema)}
        </pre>
      ),
    },
    {
      key: "resource",
      label: "Resource",
      children: (
        <pre className="bg-gray-900 text-green-400 p-4 overflow-auto">
          {generateResource(schema)}
        </pre>
      ),
    },
    {
      key: "controller",
      label: "Controller",
      children: (
        <pre className="bg-gray-900 text-green-400 p-4 overflow-auto">
          {generateController(schema)}
        </pre>
      ),
    },
  ];

  return <Tabs items={items} />;
}
