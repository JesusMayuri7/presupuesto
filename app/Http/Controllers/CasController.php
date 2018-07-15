<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Http\Models\CasAnalisis;
use Illuminate\Http\Request;

class CasController extends Controller
{
   public function remuneraciones(){
       return CasAnalisis::with('casanalisisdetalle')->get();
   }
    //

    public function pdt_cas(Request $request){
        $data = DB::select('CALL pdt_cas(?,?)', array($request->input('dni'),$request->input('fecha')));
        return response()->json([
            "status" => $request,
            "data" =>$data
        ]);
    }
}