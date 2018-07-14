<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\ModelNotFoundException as ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TodoController extends Controller
{
   public function index(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
    header("Content-Type: application/json");
       return \App\Http\Models\Todo::get();
       
   }

   public function save(Request $request){

     $new = new  \App\Http\Models\Todo;
     $new->nivel = $request->input('nivel.name');
     $new->titulo = $request->input('titulo');
     $new->texto = $request->input('texto');
     $new->fecha = $request->input('fecha');
     $new->tipo = $request->input('tipo.name');
     $new->save();

     return response()->json([
        "label" => 1,
        "data" =>$new
    ]);
    }

    public function delete(Request $request,$id){
        try {
        $todo = \App\Http\Models\Todo::findOrFail($id);
        if($todo->delete()) {
            return response()->json([
            "status" => 1,
            "data" =>$todo
            ]);
        }        
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "status" => 0,
                "data" =>$e
                ]);
        }
    }
 
}