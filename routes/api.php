<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'prefix' => 'auth'
],function(){
    Route::post('login',[\App\Http\Controllers\AuthController::class,'login']);
    Route::post('register',[\App\Http\Controllers\AuthController::class,'register']);
});

Route::group([
    'middleware' => ['auth:api']
],function(){
    Route::post('/logout', [\App\Http\Controllers\AuthController::class,'logout']);
    Route::post('/authenticate', [\App\Http\Controllers\AuthController::class,'authenticate']);
    Route::resource('escapeRoom',\App\Http\Controllers\Admin\Api\EscapeRoom\indexController::class);
    Route::resource('users',\App\Http\Controllers\Admin\Api\User\indexController::class);
    Route::get('/allBooking', [\App\Http\Controllers\Admin\Api\Bookings\bookingController::class,'show']);
    Route::delete('/allBooking/{id}', [\App\Http\Controllers\Admin\Api\Bookings\bookingController::class,'destroy']);

    Route::get('/escape-rooms',[\App\Http\Controllers\User\Api\indexController::class,'escapeRooms']);
    Route::get('/escape-rooms/{id}',[\App\Http\Controllers\User\Api\indexController::class,'singleEscapeRoom']);
    Route::get('/escape-rooms/{id}/time-slots',[\App\Http\Controllers\User\Api\indexController::class,'escapeRoomTimeSlots']);

    Route::post('/bookings',[\App\Http\Controllers\User\Api\bookingsController::class,'bookings']);
    Route::get('/bookings',[\App\Http\Controllers\User\Api\bookingsController::class,'getBookings']);
    Route::delete('/bookings/{id}',[\App\Http\Controllers\User\Api\bookingsController::class,'deleteBookings']);



});