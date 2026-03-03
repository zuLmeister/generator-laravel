export function generateController(schema) {
  const model = schema.model;
  const variable = model.charAt(0).toLowerCase() + model.slice(1);

  return `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Services\\${model}Service;
use App\\Http\\Requests\\Store${model}Request;
use App\\Http\\Requests\\Update${model}Request;
use App\\Http\\Resources\\${model}Resource;
use Illuminate\\Http\\JsonResponse;

class ${model}Controller extends Controller
{
    protected ${model}Service $service;

    public function __construct(${model}Service $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $data = $this->service->getAll();

        return response()->json([
            'success' => true,
            'message' => '${model} list retrieved successfully.',
            'data' => ${model}Resource::collection($data),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Store${model}Request $request): JsonResponse
    {
        $data = $this->service->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => '${model} created successfully.',
            'data' => new ${model}Resource($data),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $data = $this->service->findById($id);

        return response()->json([
            'success' => true,
            'message' => '${model} retrieved successfully.',
            'data' => new ${model}Resource($data),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Update${model}Request $request, int $id): JsonResponse
    {
        $data = $this->service->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => '${model} updated successfully.',
            'data' => new ${model}Resource($data),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'success' => true,
            'message' => '${model} deleted successfully.',
            'data' => null,
        ]);
    }
}
`;
}
