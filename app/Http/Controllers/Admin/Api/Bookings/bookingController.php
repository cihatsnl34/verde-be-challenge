<?php

namespace App\Http\Controllers\Admin\Api\Bookings;

use App\Http\Controllers\Controller;
use App\Models\Bookings;
use App\Models\EscapeRooms;
use App\Models\timeSlots;
use Illuminate\Http\Request;

class bookingController extends Controller
{
    public function show()
    {
        try {
            $bookings = Bookings::all();
            foreach ($bookings as $key => $value) {
                
                $escapeRoom = EscapeRooms::where('id', $value['escapeRoomId'])->first();
                $timeSlot = timeSlots::where('id', $value['timeSlotId'])->first();
                $data[$key]['id'] = $value['id'];
                $data[$key]['escapeRoomName'] = $escapeRoom['name'];
                $data[$key]['startTime'] = $timeSlot['startTime'];
                $data[$key]['endTime'] = $timeSlot['endTime'];
            }
            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Dont have a bookings']);
        }
    }
    public function destroy($id)
    {
        try {
            $bookings = Bookings::where('id', $id)->first();
            timeSlots::where('id', $bookings['timeSlotId'])->update(['isIdle' => 1]);
            Bookings::where('id', $id)->delete();
            return response()->json(['success' => true, 'message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Not Deleted']);
        }
    }
}
