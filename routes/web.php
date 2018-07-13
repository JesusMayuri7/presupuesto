<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
namespace App;
use Illuminate\Support\Facades\DB;
use App\Http\Models\Trabajador;
use App\Http\Models\Matriz;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Response;

$app->get('/', function () use ($app) {
	return view('index');
});

$app->get('/api/cas/analisis','CasController@remuneraciones'); 
$app->post('/api/cas/pdt_cas','CasController@pdt_cas'); 
$app->get('/api/todo','TodoController@index'); 
$app->post('/api/todo','TodoController@save'); 
$app->delete('/api/todo/{id}','TodoController@delete'); 

$app->get('/api/trabajador[/{dni}]', function ($dni=null) use ($app) {
	if (is_null($dni)){
		return Trabajador::select('idtrabajador','nombres')->has('matriz')->with('matriz')->get();
	}	
	else{
		$imageStr =Trabajador::where('dni',$dni)->get(); // Or wherever you get your string from
		$image = base64_decode(str_replace('data:image/png;base64,', '', $imageStr[0]['foto']));
		return response($image, 200)
                  ->header('Content-Type', 'image/jpeg');


//		return Trabajador::where('dni',$dni)->get();
	}
});

$app->get('/api/matriz', function () use ($app) {
	Excel::create('Laravel Excel', function($excel) {
        $excel->sheet('Excel sheet', function($sheet) {

            $sheet->setOrientation('landscape');
			// Append multiple rows
			$sheet->rows(array(
				array('test5', 'test6'),
				array('test7', 'test8')
));

        });
    })->export('xlsx');
	//return Matriz::all();
});

$app->get('/api/alta_vigente[/{campo}/{orden}]', function ($campo=null,$orden=null) use ($app) {
	if ($campo==null || $orden==null){
		return DB::table('alta_vigente')->orderBy('nombres','asc')->get();
	}
	else{
		return DB::table('alta_vigente')->orderBy($campo,$orden)->paginate(32);
	}
	 //return DB::table('alta_vigente')->orderBy($campo,$orden)->paginate(50);	
	
});

$app->get('{slug:.*}',function() use ($app) {
	return view('index');
    //return view('index');
});
