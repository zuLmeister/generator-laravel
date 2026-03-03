import { Tabs, Button, Tooltip } from "antd";
import { useState } from "react";
import { generateModel } from "../generators/model";
import { generateService } from "../generators/service";
import { generateMigration } from "../generators/migration";
import { generateStoreRequest, generateUpdateRequest } from "./request";
import { generateResource } from "./resource";
import { generateController } from "./controller";
import { generateRoute } from "./route";

export default function CodePreview({ schema }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500); // reset after 1.5s
    });
  };

  const items = [
    {
      key: "migration",
      label: "Migration",
      children: (
        <div className="relative">
          <Tooltip title={copiedKey === "migration" ? "Copied!" : "Copy"}>
            <Button
              size="small"
              className="absolute top-2 right-2 z-10"
              onClick={() => handleCopy(generateMigration(schema), "migration")}
            >
              Copy
            </Button>
          </Tooltip>
          <pre className="bg-gray-900 text-green-400 p-4 overflow-auto mt-6 rounded-md">
            {generateMigration(schema)}
          </pre>
        </div>
      ),
    },
    {
      key: "model",
      label: "Model",
      children: (
        <div className="relative">
          <Tooltip title={copiedKey === "model" ? "Copied!" : "Copy"}>
            <Button
              size="small"
              className="absolute top-2 right-2 z-10"
              onClick={() => handleCopy(generateModel(schema), "model")}
            >
              Copy
            </Button>
          </Tooltip>
          <pre className="bg-gray-900 text-green-400 p-4 overflow-auto mt-6 rounded-md">
            {generateModel(schema)}
          </pre>
        </div>
      ),
    },
    {
      key: "service",
      label: "Service",
      children: (
        <div className="relative">
          <Tooltip title={copiedKey === "service" ? "Copied!" : "Copy"}>
            <Button
              size="small"
              className="absolute top-2 right-2 z-10"
              onClick={() => handleCopy(generateService(schema), "service")}
            >
              Copy
            </Button>
          </Tooltip>
          <pre className="bg-gray-900 text-green-400 p-4 overflow-auto mt-6 rounded-md">
            {generateService(schema)}
          </pre>
        </div>
      ),
    },
    {
      key: "storeRequest",
      label: "Store Request",
      children: (
        <div className="relative">
          <Tooltip title={copiedKey === "storeRequest" ? "Copied!" : "Copy"}>
            <Button
              size="small"
              className="absolute top-2 right-2 z-10"
              onClick={() =>
                handleCopy(generateStoreRequest(schema), "storeRequest")
              }
            >
              Copy
            </Button>
          </Tooltip>
          <pre className="bg-gray-900 text-green-400 p-4 overflow-auto mt-6 rounded-md">
            {generateStoreRequest(schema)}
          </pre>
        </div>
      ),
    },
    {
      key: "updateRequest",
      label: "Update Request",
      children: (
        <div className="relative">
          <Tooltip title={copiedKey === "updateRequest" ? "Copied!" : "Copy"}>
            <Button
              size="small"
              className="absolute top-2 right-2 z-10"
              onClick={() =>
                handleCopy(generateUpdateRequest(schema), "updateRequest")
              }
            >
              Copy
            </Button>
          </Tooltip>
          <pre className="bg-gray-900 text-green-400 p-4 overflow-auto mt-6 rounded-md">
            {generateUpdateRequest(schema)}
          </pre>
        </div>
      ),
    },
    {
      key: "resource",
      label: "Resource",
      children: (
        <div className="relative">
          <Tooltip title={copiedKey === "resource" ? "Copied!" : "Copy"}>
            <Button
              size="small"
              className="absolute top-2 right-2 z-10"
              onClick={() => handleCopy(generateResource(schema), "resource")}
            >
              Copy
            </Button>
          </Tooltip>
          <pre className="bg-gray-900 text-green-400 p-4 overflow-auto mt-6 rounded-md">
            {generateResource(schema)}
          </pre>
        </div>
      ),
    },
    {
      key: "controller",
      label: "Controller",
      children: (
        <div className="relative">
          <Tooltip title={copiedKey === "controller" ? "Copied!" : "Copy"}>
            <Button
              size="small"
              className="absolute top-2 right-2 z-10"
              onClick={() =>
                handleCopy(generateController(schema), "controller")
              }
            >
              Copy
            </Button>
          </Tooltip>
          <pre className="bg-gray-900 text-green-400 p-4 overflow-auto mt-6 rounded-md">
            {generateController(schema)}
          </pre>
        </div>
      ),
    },
    {
      key: "route",
      label: "Route",
      children: (
        <div className="relative">
          <Tooltip title={copiedKey === "route" ? "Copied!" : "Copy"}>
            <Button
              size="small"
              className="absolute top-2 right-2 z-10"
              onClick={() => handleCopy(generateRoute(schema), "route")}
            >
              Copy
            </Button>
          </Tooltip>
          <pre className="bg-gray-900 text-green-400 p-4 overflow-auto mt-6 rounded-md">
            {generateRoute(schema)}
          </pre>
        </div>
      ),
    },
  ];

  return <Tabs items={items} />;
}
