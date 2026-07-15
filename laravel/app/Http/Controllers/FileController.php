<?php

namespace App\Http\Controllers;

use App\Custom\MessageResponce;
use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;

class FileController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,Folder $folder)
    {
        if($folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);

        $size = 255;

        if ($request->user()->consumed_size + $size > $request->user()->getStorageLimit()) {
            return MessageResponce::fail('Storage limit exceeded.', 422);
        }


        $data = $request->validate([
            "name"=>"required|string|max:255",
            "extension"=>"required|string|max:20",
        ]);

        $file = $folder->files()->create([...$data,"size"=>255]);

        $request->user()->increment("consumed_size",255);

        return response()->json($file,201);
    }

    public function upload(Request $request,Folder $folder)
    {

        if($folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);

        $data = $request->validate([
            "name"=>"required|string|max:255",
            "extension"=>"required|string|max:20",
            "content"=>"required|string",
        ]);

        $size = strlen($data["content"]) + 255;

        if ($request->user()->consumed_size + $size > $request->user()->getStorageLimit()) {
            return MessageResponce::fail('Storage limit exceeded.', 422);
        }

        $file = $folder->files()->create($data);



        $request->user()->increment("consumed_size",$size);


        $file->update([
            "size"=>$size
        ]);

        return response()->json($file,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,File $file)
    {
        if($file->folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);

        return response()->json($file);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {

        if($file->folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);

        $data = $request->validate([
            "name"=>"sometimes|string|max:255",
            "extension"=>"sometimes|string|max:20",
            "content"=>"sometimes|string",
        ]);

        $diff_size = 0;
        $new_size = 0;

        if (array_key_exists('content', $data)) {
            $old_size = $file->size;
            $new_size = strlen($data['content'])+255;
            $diff_size = $new_size - $old_size;

            if ($request->user()->consumed_size + $diff_size > $request->user()->getStorageLimit()) {
                return MessageResponce::fail('Storage limit exceeded.', 422);
            }
        }

        // only reaches here if the quota check passed (or there was no content change)
        $file->update($data);

        if (array_key_exists('content', $data)) {
            $request->user()->increment('consumed_size', $diff_size);
            $file->update(['size' => $new_size]);
        }

        return response()->json($file, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,File $file)
    {
        if($file->folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);



        $request->user()->decrement("consumed_size",$file->size);

        $file->delete();



        return response()->noContent();
    }
}
