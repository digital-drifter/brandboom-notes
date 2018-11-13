<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->as('api.')->group(function () {
    Route::apiResources([
        'notes' => 'NoteController'
    ]);
});
