<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookings extends Model
{
    use HasFactory;
    protected $guarded  = [];

    public function User()
    {
        return $this->HasMany(User::class, 'userId', 'id');
    }
}
