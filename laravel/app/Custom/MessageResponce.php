<?php

namespace App\Custom;

class MessageResponce
{
    public static function returnData($msg,int $code = 200){
        return response()->json([
            'success' => true,
            'data'  => $msg,
        ], $code);
    }

    public static function success(String $msg,int $code = 200){
        return response()->json([
            'success' => true,
            'message'  => $msg,
        ], $code);
    }

    public static function fail(String $msg,int $code = 422){
        return response()->json([
            'success' => false,
            'message'  => $msg,
        ], $code);
    }
}
