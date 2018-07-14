<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Models;

class Trabajador extends Model {
    protected $table = 'trabajador';
    protected $fillable = [
        'nombres',
        'email'
    ];
    protected $visible = [
        'dni',
        'nombres',
        'email',
        'foto'
    ];
    protected $hidden = [ 'password' ];
    
    public function matriz(){
		return $this->hasMany('App\Http\Models\Matriz','idtrabajador','idtrabajador');
	}
}