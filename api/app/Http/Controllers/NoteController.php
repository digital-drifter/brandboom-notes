<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(['notes' => Note::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        abort_unless($note = Note::create($request->only(['title', 'content', 'color'])), 400);

        return response()->json(compact('note'));
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param Note $note
     * @return JsonResponse
     */
    public function show(Request $request, Note $note): JsonResponse
    {
        return response()->json(compact('note'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request $request
     * @param Note $note
     * @return JsonResponse
     */
    public function update(Request $request, Note $note): JsonResponse
    {
        tap($note, function (Note $note) use ($request) {
            $note->update($request->only(['title', 'content', 'color']));
        })->refresh();

        return response()->json(compact('note'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param Note $note
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request, Note $note): JsonResponse
    {
        $note->delete();

        return response()->json([], 204);
    }
}
