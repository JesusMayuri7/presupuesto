<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CapController extends Controller
{
    public function index($anio){
        $data = DB::select('CALL sp_cap(?)', array($anio));
        return response()->json([
            "status" => 1,
            "message" => 'Cap',
            "data" =>$data
        ]);
    }
}