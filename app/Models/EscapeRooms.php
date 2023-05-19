<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscapeRooms extends Model
{
    use HasFactory;
    protected $guarded  = [];
    
    public function timeSlot()
    {
        return $this->HasMany(timeSlots::class, 'escapeRoomId', 'id');
    }
}
