<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(["name","owner_id"])]
class Folder extends Model
{
    public function files():HasMany{
        return $this->hasMany(File::class);
    }
    public function folders():HasMany{
        return $this->hasMany(Folder::class);
    }
}
