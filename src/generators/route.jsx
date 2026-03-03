import { toCamelCase } from "../utils/naming";

export function generateRoute(schema) {
  const tableName = schema.table;
  const param = toCamelCase(schema.model); // misal: user → {user}

  return `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\${schema.model}Controller;

Route::prefix('${tableName}')->group(function () {
    // Get all
    Route::get('/', [${schema.model}Controller::class, 'index'])->name('${tableName}.index');

    // Store
    Route::post('/', [${schema.model}Controller::class, 'store'])->name('${tableName}.store');

    // Show single
    Route::get('/{${param}}', [${schema.model}Controller::class, 'show'])->name('${tableName}.show');

    // Update
    Route::match(['put', 'patch'], '/{${param}}', [${schema.model}Controller::class, 'update'])->name('${tableName}.update');

    // Delete
    Route::delete('/{${param}}', [${schema.model}Controller::class, 'destroy'])->name('${tableName}.destroy');
});
`;
}
