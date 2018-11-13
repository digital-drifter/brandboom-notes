<?php

use Illuminate\Support\Facades\Route;

Route::as('api.')->group(function () {
    Route::apiResources([
        'notes' => 'NoteController'
    ]);
});
