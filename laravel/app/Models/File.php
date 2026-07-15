<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(["name","extension","content","size","folder_id"])]
class File extends Model
{
    public function folder():BelongsTo{
        return $this->belongsTo(Folder::class);
    }
}
