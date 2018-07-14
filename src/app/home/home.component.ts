import { Component, OnInit } from '@angular/core';
import {CarService} from '../service/car.service';
import {SelectItem} from 'primeng/primeng';
import {Message} from '../interface';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'zd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msgs: Message[] = [];
  datos:any[];
  cities;tipos: SelectItem[];
  displayDialog: boolean;
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';
  public events: any[] = [];

  constructor(private carService: CarService,private fb: FormBuilder) {
    this.displayDialog=false;

    this.cities = [];
    this.cities.push({label:'Alto', value:{id:1, name: 'ALTA', color: 'red'}});
    this.cities.push({label:'Medio', value:{id:2, name: 'MEDIA', color: 'yellow'}});
    this.cities.push({label:'Bajo', value:{id:3, name: 'BAJA', colo: 'green'}});

    this.tipos = [];
    this.tipos.push({label:'PLANILLA', value:{ name: 'PLANILLA', color: 'red'}});
    this.tipos.push({label:'DATO', value:{ name: 'DATO', color: 'yellow'}});
    this.tipos.push({label:'TRAMITE', value:{ name: 'TRAMITE', colo: 'green'}});

    this.rForm = fb.group({
      'nivel' : [{id:1, name: 'ALTA', color: 'red'},[]],
      'titulo' : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],      
      'texto' : [null],
      'fecha' : [null],
      'tipo' : [{ name: 'DATO', color: 'red'},[]]
    });
    
    /*
    this.subcribeToFormChanges();
     
    (<FormControl>this.rForm.controls['nivel'])
    .setValue({id:1, name: 'ALTA', color: 'red'}, { onlySelf: true });
   }

   subcribeToFormChanges() {
    const myFormStatusChanges$ = this.rForm.statusChanges;
    const myFormValueChanges$ = this.rForm.valueChanges;
    
    myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
    myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    */
  }

  newTodo(){
    this.displayDialog = true;
  }

  ngOnInit() {
       this.carService.getTodo().subscribe (cars =>{ this.datos= cars;
        }) 
  }

  postTodo(post):void {
      this.carService.postTodo(post).subscribe (cars =>{ this.datos.push(cars.data); console.log(cars);
        this.displayDialog = false;
       },error => console.log(error)) 
  }

  deleteTodo(id):void {
    this.carService.deleteTodo(id).subscribe (
      dato =>{  
      if (dato.status==1) {
      this.datos.splice(this.datos.findIndex(d => d.idtodo == id), 1);
      this.msgs = [{severity:'success', summary:'Eliminacion', detail:'Se eliminó exitosamente'}];
        }
      },error =>{ this.msgs = [{severity:'error', summary:'Eliminacion', detail:'Se eliminó exitosamente'}]});
    }
}
