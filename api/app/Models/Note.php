<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
        'color'
    ];

    public static function boot()
    {
        parent::boot();

        static::saving(function (Note $note) {
            $note->setAttribute('content', data_get($note, 'content', ''));
        });
    }
}
