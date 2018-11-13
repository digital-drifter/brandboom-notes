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

//    /**
//     * @return array
//     */
//    public function getColorAttribute(): array
//    {
//        return json_decode($this->getAttribute('color'), true);
//    }
}
