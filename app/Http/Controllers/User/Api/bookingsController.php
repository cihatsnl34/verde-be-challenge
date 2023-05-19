<?php

namespace App\Http\Controllers\User\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookings;
use App\Models\EscapeRooms;
use App\Models\timeSlots;
use App\Models\User;
use Illuminate\Http\Request;

class bookingsController extends Controller
{
    public function bookings(Request $request)
    {
        $user = request()->user();
        $control = Bookings::where('userId', $user->id)->count();
        if ($control != 0) {
            return response()->json(['success' => false, 'message' => 'You have an existing reservation.']);
        }
        $all = request()->all();
        $timeSlot = timeSlots::where('id', $all['timeSlots'])->first();
        $escapeRoom = EscapeRooms::where('id', $timeSlot['escapeRoomId'])->first();
        if ($escapeRoom['price'] > $user['wallet']) {
            return response()->json([
                'success' => false,
                'message' => 'You dont have enough money.'
            ]);
        }
        $birthday = $user['birthday'];

        $currentDate = date('Y-m-d');
        $amountPaid = $escapeRoom['price'];
        if (date('m-d', strtotime($birthday)) === date('m-d', strtotime($currentDate))) {
            $discount = true;
            $amountPaid = $escapeRoom['price'] - ($escapeRoom['price'] * 0.1);
            $update = User::where('id', $user->id)->update(['wallet' => $user['wallet'] - $amountPaid]);
        } else {
            $discount = false;
            $update = User::where('id', $user->id)->update(['wallet' => $user['wallet'] - $escapeRoom['price']]);
        }
        $bookings = new Bookings([
            'userId' => $user->id,
            'timeSlotId' => $all['timeSlots'],
            'escapeRoomId' => $escapeRoom['id'],
            'discount' => $discount,
            'amountPaid' => $amountPaid
        ]);
        $bookings = $bookings->save();
        if (!$bookings) {
            return response()->json([
                'success' => false,
                'message' => 'Dont Reservation'
            ]);
        }
        $update = timeSlots::where('id', $timeSlot['id'])->update(['isIdle' => 0]);
        return response()->json([
            'success' => true
        ]);
    }

    public function getBookings()
    {
        try {
            $user = request()->user();
            $bookings = Bookings::where('userId', $user->id)->first();
            $escapeRoom = EscapeRooms::where('id', $bookings['escapeRoomId'])->first();
            $timeSlot = timeSlots::where('id', $bookings['timeSlotId'])->first();
            $data[0]['id'] = $bookings['id'];
            $data[0]['escapeRoomName'] = $escapeRoom['name'];
            $data[0]['startTime'] = $timeSlot['startTime'];
            $data[0]['endTime'] = $timeSlot['endTime'];
            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Dont have a bookings']);
        }
    }

    public function deleteBookings($id)
    {
        try {
            $user = request()->user();
            $control = User::where('role', 1)->where('id', $user->id)->count();
            if ($control == 0) {
                return response()->json(['success' => false, 'message' => 'Please login']);
            }
            $bookings = Bookings::where('userId', $user->id)->first();
            timeSlots::where('id', $bookings['timeSlotId'])->update(['isIdle' => 1]);
            Bookings::where('id', $id)->delete();
            return response()->json(['success' => true, 'message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Not Deleted']);
        }
    }
}
