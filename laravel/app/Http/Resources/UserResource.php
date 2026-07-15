<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "consumed_size"=>$this->consumed_size,
            "created_at"=>$this->created_at,
            "email"=>$this->email,
            "email_verified_at"=>$this->email_verified_at,
            "folder_id"=>$this->folder_id,
            "id"=>$this->id,
            "name"=>$this->name,
            "number_of_folders"=>$this->number_of_folders,
            "updated_at"=>$this->updated_at,
            "storage_limit"=>$this->getStorageLimit(),
            "folder_limit"=>$this->getFolderLimit(),
        ];
    }
}










