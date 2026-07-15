<?php

namespace App\Http\Controllers;

use App\Custom\MessageResponce;
use App\Http\Resources\FolderResource;
use App\Models\Folder;
use Illuminate\Http\Request;

class FolderController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,Folder $folder)
    {
        if($folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);
        if ($request->user()->number_of_folders > $request->user()->getFolderLimit())
            return MessageResponce::fail('Storage limit exceeded.', 422);


        $data = $request->validate([
            "name"=>"required|string|max:255"
        ]);

        $new_folder = $folder->folders()->create([...$data,'owner_id'=>$request->user()->id]);

        $request->user()->increment("number_of_folders");


        return response()->json(new FolderResource($new_folder),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,Folder $folder)
    {
        if($folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);

        return response()->json(new FolderResource($folder));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Folder $folder)
    {
        if($folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);

        $data = $request->validate([
            "name"=>"required|string|max:255"
        ]);

        $folder->update($data);

        return response()->json(new FolderResource($folder));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,Folder $folder)
    {
        if($folder->owner_id!=$request->user()->id)
            return MessageResponce::fail('Unauthenticated.', 401);

        if($folder->id==$request->user()->folder_id)
            return MessageResponce::fail("You Can't Delete the Main Folder!", 403);

        $folder_name = $folder->name;
        $folder->delete();
        $request->user()->decrement("number_of_folders");
        return MessageResponce::success("The Folder \"".$folder_name."\" Has Been Deleted!", 204);
    }
}
