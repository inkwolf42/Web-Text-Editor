<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;


#[Fillable(['provider','provider_id','user_id',])]
class SocialAccounts extends Model
{
    public function User(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
