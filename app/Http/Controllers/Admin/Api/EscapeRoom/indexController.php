<?php

namespace App\Http\Controllers\Admin\Api\EscapeRoom;

use App\Http\Controllers\Controller;
use App\Models\EscapeRooms;
use App\Models\timeSlots;
use Illuminate\Http\Request;
use App\Helper\fileUpload;
use App\Models\User;

class indexController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = EscapeRooms::all();
        // $timeSlot = timeSlots
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $all = request()->all();
        $timeSloties = (isset($all['timeSlot'])) ? json_decode($all['timeSlot'], true) : [];
        unset($all['timeSlot']);
        $create = EscapeRooms::create($all);
        if($create) {
            foreach($timeSloties as $timeSlot) {
                timeSlots::create([
                    'escapeRoomId' => $create->id,
                    'startTime' => $timeSlot['startTime'],
                    'endTime' => $timeSlot['endTime']
                ]);
            }
            return response()->json([
                'success' => true
            ]);
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Dont escape room add.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = request()->user();
        $control = User::where('role',1)->where('id',$user->id)->count();
        if($control == 0) {return response()->json(['success' => false, 'message' => 'Please login']);}
        $escapeRooms = EscapeRooms::where('id',$id)->with('timeSlot')->first();
        return response()->json([
            'success'=>true,
            'escapeRoom' => $escapeRooms
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = request()->user();
        $all = request()->all();
       
        $control = User::where('role',1)->where('id',$user->id)->count();
        if($control == 0) {return response()->json(['success' => false, 'message' => 'Please login']);}


        $timeSloties = (isset($all['timeSlot'])) ? json_decode($all['timeSlot'], true) : [];
        unset($all['timeSlot']);
        
        timeSlots::where('escapeRoomId', $id)->delete();
        foreach($timeSloties as $timeSlot) {
            timeSlots::create([
                'escapeRoomId' => $id,
                'startTime' => $timeSlot['startTime'],
                'endTime' => $timeSlot['endTime']
            ]);
        }
            
        unset($all['_method']);
        if($all['description'] == 'undefined') {
            $oldDescription = EscapeRooms::where('id', $id)->get('description');
            $all['description'] = $oldDescription;
        }
        $create = EscapeRooms::where('id', $id)->update($all);
        if($create) {
            return response()->json([
                'success' => true
            ]);
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Dont escape room edit.'
            ]);
        }

       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = request()->user();
        $control = User::where('role',1)->where('id',$user->id)->count();
        if($control == 0) {return response()->json(['success' => false, 'message' => 'Please login']);}
        timeSlots::where('escapeRoomId', $id)->delete();
        EscapeRooms::where('id' , $id)->delete();
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}
