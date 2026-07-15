<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password', 'folder_id'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    private static int $storage_limit = 2000;
    private static int $folder_limit = 5;

    public function getStorageLimit() : int {
        return $this::$storage_limit;
    }

    public function getFolderLimit() : int {
        return $this::$folder_limit;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function socialAccounts(): HasMany{
        return $this->hasMany(SocialAccounts::class);
    }

    public function folder(): BelongsTo{
        return $this->belongsTo(Folder::class);
    }

    public function hasAccsess(Folder $folder):bool{
        return $folder->owner == $this;
    }
}
/*

- getFolder(user) (With all what is inside)
- createFolder(name)
- updateFolder(id,newName)
- getFolderWithAllContent(id,newName)
- deleteFolder(id,name)

V getFile(id)
V updateFile(id,content)
V RenameFile(id,name)
V createFile(folder_id,name)
- uploadFile(folder_id,name,content) //Not Gona Be Added
V deleteFile(id)


*/
