<?php

namespace App\Http\Controllers\Auth;

use App\Custom\MessageResponce;
use App\Http\Controllers\Controller;
use App\Models\SocialAccounts;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Str;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver("google")->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $socialUser = Socialite::driver("google")->stateless()->user();
        } catch (\Throwable $th) {
            return MessageResponce::fail("Authentication Failed.");
        }

        $socialAccount = SocialAccounts::where("provider", "google")
            ->where("provider_id", $socialUser->getId())
            ->first();

        if ($socialAccount) {
            $user = $socialAccount->user;
        } else {
            $user = User::updateOrCreate(
                ['email' => $socialUser->getEmail()],
                [
                    'name'     => $socialUser->getName(),
                    'password' => Hash::make(Str::random(32)),
                ]
            );

            $user->socialAccounts()->updateOrCreate([
                "provider"    => "google",
                "provider_id" => $socialUser->getId(),
            ]);
        }

        $token = $user->createToken("user_token")->plainTextToken;

        return redirect(config('app.frontend_url') . '/auth/callback?token=' . $token);

        // return MessageResponce::returnData([
        //     'user'  => $user,
        //     'token' => $token,
        // ], 201);
    }
}
