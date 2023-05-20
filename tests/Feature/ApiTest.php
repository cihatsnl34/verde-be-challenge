<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_the_application_returns_a_successful_response()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function testRegister()
    {
        $data = [
            'name' => 'Test test',
            'email' => 'test@test.com',
            'password' => 'test',
            'birthday' => '23.03.2000'
        ];

        $response = $this->post('/register', $data);

        $response->assertStatus(201); 
        $response->assertJson(['success' => true]);
    }
    public function testLogin()
    {
        $user = User::factory()->create([
            'email' => 'cihatsenell@gmail.com',
            'password' => bcrypt('123')
        ]);
    
        $credentials = [
            'email' => 'cihatsenell@gmail.com',
            'password' => '123'
        ];
    
        $response = $this->post('/login', $credentials);

        $response->assertStatus(201); 
        $response->assertJson(['success' => true]);
    }
    public function testEscapeRooms()
    {
        $user = User::factory()->create([
            'email' => 'cihatsenell@gmail.com',
            'password' => bcrypt('123')
        ]);
    
        $credentials = [
            'email' => 'cihatsenell@gmail.com',
            'password' => '123'
        ];
    
        $response = $this->post('/login', $credentials);
        $response->assertStatus(302);
        $this->assertAuthenticatedAs($user);

        $apiResponse = $this->actingAs($user)->get('/api/escape-rooms');
        $apiResponse->assertStatus(200);

        $singleERApiResponse = $this->actingAs($user)->get('/api/escape-rooms/7');
        $singleERApiResponse->assertStatus(200);
        
        $timeSlot = $this->actingAs($user)->get('/escape-rooms/7/time-slots');
        $timeSlot->assertStatus(200);

        $data = [
            'userId' => '99',
            'timeSlotId' => '99',
            'escapeRoomId' => '99',
            'discount' => '99',
            'amountPaid' => '99'
        ];
    
        $headers = [
            'Authorization' => 'Bearer <token>',
            'Content-Type' => 'application/json',
        ];
    
        $postBookings = $this->withHeaders($headers)->post('/api/bookings', $data);
        $postBookings->assertStatus(200);

        $getBookings = $this->actingAs($user)->get('/api/bookings');
        $getBookings->assertStatus(200);

        $deleteBookings = $this->actingAs($user)->get('/api/bookings/7');
        $deleteBookings->assertStatus(200);
    }
}
  