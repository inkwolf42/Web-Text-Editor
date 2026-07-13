<?php

namespace App\Http\Controllers\Auth;

use App\Custom\MessageResponce;
use App\Http\Controllers\Controller;
use App\Models\SocialAccounts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    /**
     * Log in with email and password.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return MessageResponce::fail($validator->errors()->first());
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return MessageResponce::fail('Invalid credentials.', 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return MessageResponce::returnData([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    /**
     * Register a new user with email and password.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return MessageResponce::fail($validator->errors()->first());
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return MessageResponce::returnData([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    // To check if the client is logged in
    public function me(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return MessageResponce::fail('Unauthenticated.', 401);
        }

        return MessageResponce::returnData([
            'user' => $user,
        ]);
    }
}
