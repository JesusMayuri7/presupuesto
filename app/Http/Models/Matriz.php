<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Matriz extends Model {
    protected $table = 'activos_plh_matriz';
    protected $fillable = [
        'id',
        'idtrabajador',
        'presupuesto',
        'nrocap',
        'nropap',
        'estado'
    ];
    protected $hidden = [ 'password' ];
    
 
}