<?php

namespace App\Http\Controllers\User\Api;

use App\Http\Controllers\Controller;
use App\Models\EscapeRooms;
use App\Models\timeSlots;
use Illuminate\Http\Request;

class indexController extends Controller
{
    public function escapeRooms()
    {
        $data = EscapeRooms::all();
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function singleEscapeRoom($id)
    {

        $data = EscapeRooms::where('id',$id)->get();
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function escapeRoomTimeSlots($id)
    {
        $escapeRoom = EscapeRooms::where('id',$id)->get();
        $timeSlots = timeSlots::where('escapeRoomId',$id)->where('isIdle',1)->get();
        return response()->json([
            'success' => true,
            'timeSlots' =>$timeSlots
        ]);
    }
}
