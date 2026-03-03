import { toPascalCase, toCamelCase } from "../utils/naming";

export function generateController(schema) {
  const modelName = toPascalCase(schema.model);
  const modelVar = toCamelCase(schema.model);

  return `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Services\\${modelName}Service;
use App\\Http\\Requests\\Store${modelName}Request;
use App\\Http\\Requests\\Update${modelName}Request;
use App\\Http\\Resources\\${modelName}Resource;
use Illuminate\\Http\\JsonResponse;

class ${modelName}Controller extends Controller
{
    protected ${modelName}Service $service;

    public function __construct(${modelName}Service $service)
    {
        $this->service = $service;
    }

    public function index(): JsonResponse
    {
        $data = $this->service->getAll();

        return response()->json([
            'success' => true,
            'message' => '${modelName} list retrieved successfully.',
            'data' => ${modelName}Resource::collection($data),
        ]);
    }

    public function store(Store${modelName}Request $request): JsonResponse
    {
        $data = $this->service->store($request->validated());

        return response()->json([
            'success' => true,
            'message' => '${modelName} created successfully.',
            'data' => new ${modelName}Resource($data),
        ], 201);
    }

    public function show(${modelName} $${modelVar}): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => '${modelName} retrieved successfully.',
            'data' => new ${modelName}Resource($${modelVar}),
        ]);
    }

    public function update(Update${modelName}Request $request, ${modelName} $${modelVar}): JsonResponse
    {
        $data = $this->service->update($${modelVar}, $request->validated());

        return response()->json([
            'success' => true,
            'message' => '${modelName} updated successfully.',
            'data' => new ${modelName}Resource($data),
        ]);
    }

    public function destroy(${modelName} $${modelVar}): JsonResponse
    {
        $this->service->delete($${modelVar});

        return response()->json([
            'success' => true,
            'message' => '${modelName} deleted successfully.',
            'data' => null,
        ]);
    }
}
`;
}
