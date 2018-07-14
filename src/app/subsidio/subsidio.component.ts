import { Component, OnInit } from '@angular/core';
import {CarService} from '../service/car.service';
import {Trabajador,Message,SelectItem,MenuItem,LazyLoadEvent,FilterMetadata} from '../interface';

@Component({
  selector: 'zd-subsidio',
  templateUrl: './subsidio.component.html',
  styleUrls: ['./subsidio.component.css']
})
export class SubsidioComponent implements OnInit {
    msgs: Message[];
    datos:any;
    pdt:any[];
    trabajador: Trabajador[];
    brands: SelectItem[];
    colors: SelectItem[];
    yearFilter: number;
    selectedCar1: Trabajador;
    nombres:string;
    diasSubsidiados:number;
    meses: SelectItem[];
    selectedMes: string;
    ultimoDia: number;
    uit: number;
    reintegro:number;
    //lazy loading
    current_page:number;
    inicio:number;
    last_page:number;
    next_page_url:string;
    per_page:number;
    to:number;
    totalRecords:number;
    page:number;
    orden:string;
    diasLaborados:number;
    pagaSalud:number;
    sueldoxDia:number;
    sueldoPlh:number;
    loading: boolean;
    maximo:number;
    conclusion:string;
    image:string;
    defaultImage:string;
    displayDialog:Boolean;
    fecha:Date;
    mesInicio:Date;
    mesFin:Date;
    es: any;
    totalesMaximo:number;
    subsidioxDia:number;
    _MS_PER_DAY = 1000 * 60 * 60 * 24;
   
    constructor(private carService: CarService) {
       this.defaultImage = '/assets/icons/blank.png';
       this.diasSubsidiados=0; 
       this.ultimoDia=0;
       this.uit=4050;
       this.reintegro=0;
       this.page=0;
       this.orden='asc';
       this.maximo=0;
       this.sueldoPlh=0;
       this.displayDialog=false;
       this.subsidioxDia;
       this.mesInicio=new Date();
       this.mesFin=new Date();
    }

    dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
      }

   // TODO: falta enviar el parametro post, dni, y fecha
    fnCalcularPdt(tra:Trabajador) {
        this.nombres=tra.nombres;
        let day = this.mesInicio.getDate();
        let month = this.mesInicio.getMonth(); // add 1 because months are indexed from 0
        let year = this.mesInicio.getFullYear();
        
        let post = {"dni":tra.dni,fecha:year+'-'+month+'-'+day};
        this.displayDialog=false;
        this.carService.postPdt(post)
            .subscribe(pdt=>{
            console.log(pdt);
            this.pdt = pdt.data; 
            this.calcularFooterTotal(pdt.data);
       
            this.displayDialog=true;
        });   
    }

    calcularFooterTotal(tra){
        this.totalesMaximo=0; // Esta declaracion es importante       
            for(let item of tra) {              
            this.totalesMaximo +=parseFloat(item.maximo);
            }
            this.totalesMaximo = parseFloat(this.redondear(this.totalesMaximo));
        }

   cargaFoto(dni){
        //return this.contando+=1;
        this.image="http://programacion.minsa/api/trabajador/"+dni; 
    }
    
     loadCarsLazy(event: LazyLoadEvent) {          
            if(this.datos) {
             this.loading = true;
            this.page=Math.trunc(event.first/event.rows)+1;
            if (event.sortOrder==-1) {
               this.orden='asc';
            }
            this.carService.getCarsLarge(this.page,event.sortField,this.orden).then(cars =>{ 
            this.datos=cars;
            this.trabajador=this.datos.data;  
            this.totalRecords=this.datos.total;
            this.per_page=this.datos.per_page; 
            this.loading = false;
            });
            }
        }

    onRowSelect(event) {
           console.log(event.data.dni);
           this.image="http://programacion.minsa/api/trabajador/"+event.data.dni; 
           //this.cargaFoto(event.data.dni);           
     //   this.msgs = [];
     //   this.msgs.push({severity: 'info', summary: 'Car Selected', detail: event.data.nombres + ' - ' + event.data.sueldo});
    }

    onRowUnselect(event) {
    //    this.msgs = [];
    //    this.msgs.push({severity: 'info', summary: 'Car Unselected', detail: event.data.vin + ' - ' + event.data.brand});
    }

    ngOnInit() {
        this.fnIniciarCalendario();
        this.loading = true;
        this.carService.getCarsLarge(this.page,'nombres',this.orden).then(cars =>{ 
            this.datos=cars;
            this.trabajador=this.datos.data;  
            this.totalRecords=this.datos.total;            
            this.per_page=this.datos.per_page;
            this.fnUltimoDia(this.mesInicio,this.mesFin);
           // this.inicio=this.datos.from;
            console.log(this.datos);
            this.loading = false;
        }        
        );
        //console.log(this.trabajador);
        this.meses = [];
        this.meses.push({label:'Seleccione mes', value:null});
        this.meses.push({label:'Enero', value:{id:1, name: 'Enero'}});
        this.meses.push({label:'Febrero', value:{id:2, name: 'Febrero'}});
        this.meses.push({label:'Marzo', value:{id:3, name: 'Marzo'}});
        this.meses.push({label:'Abril', value:{id:4, name: 'Abril'}});
        this.meses.push({label:'Mayo', value:{id:5, name: 'Mayo'}});
        this.meses.push({label:'Junio', value:{id:6, name: 'Junio'}});
        this.meses.push({label:'Julio', value:{id:7, name: 'Julio'}});
        this.meses.push({label:'Agosto', value:{id:8, name: 'Agosto'}});
        this.meses.push({label:'Setiembre', value:{id:9, name: 'Setiembre'}});
        this.meses.push({label:'Octubre', value:{id:10, name: 'Octubre'}});
        this.meses.push({label:'Noviembre', value:{id:11, name: 'Noviembre'}});
        this.meses.push({label:'Diciembre', value:{id:12, name: 'Diciembre'}});



        this.brands = [];
        this.brands.push({label: 'All Brands', value: null});
        this.brands.push({label: 'Audi', value: 'Audi'});
        this.brands.push({label: 'BMW', value: 'BMW'});
        this.brands.push({label: 'Fiat', value: 'Fiat'});
        this.brands.push({label: 'Honda', value: 'Honda'});
        this.brands.push({label: 'Jaguar', value: 'Jaguar'});
        this.brands.push({label: 'Mercedes', value: 'Mercedes'});
        this.brands.push({label: 'Renault', value: 'Renault'});
        this.brands.push({label: 'VW', value: 'VW'});
        this.brands.push({label: 'Volvo', value: 'Volvo'});
        
        this.colors = [];
        this.colors.push({label: 'White', value: 'White'});
        this.colors.push({label: 'Green', value: 'Green'});
        this.colors.push({label: 'Silver', value: 'Silver'});
        this.colors.push({label: 'Black', value: 'Black'});
        this.colors.push({label: 'Red', value: 'Red'});
        this.colors.push({label: 'Maroon', value: 'Maroon'});
        this.colors.push({label: 'Brown', value: 'Brown'});
        this.colors.push({label: 'Orange', value: 'Orange'});
        this.colors.push({label: 'Blue', value: 'Blue'});
    }

    fnUltimoDia(inicio,fin) {
        console.log('entro');
        this.diasSubsidiados=this.dateDiffInDays(inicio,fin)+1;
        this.ultimoDia=this.daysInMonth(inicio.getMonth()+1,2017);
    }

    daysInMonth(iMonth, iYear){
    return new Date(iYear, iMonth, 0).getDate();
    }

    redondear(numero:number){
        return numero.toFixed(1);
    }

    fnCalcular(){
      // if (this.selectedCar1.sueldo>(this.uit*0.3))
        {      
          // this.fnUltimoDia();
           this.diasLaborados=((this.ultimoDia-this.diasSubsidiados));
          console.log('diasLaborados='+this.diasLaborados);
           this.maximo=this.selectedCar1.sueldo>(this.uit*0.30)?(this.uit*0.30):this.selectedCar1.sueldo;
           this.pagaSalud=(this.maximo/(this.ultimoDia>29?30:this.ultimoDia))*this.diasSubsidiados; 
          console.log('pagaSalud='+this.pagaSalud.toFixed(2));         
           this.sueldoxDia=this.selectedCar1.sueldo/this.ultimoDia;
          console.log('sueldoxDia='+this.sueldoxDia);          
           this.sueldoPlh=this.diasLaborados*this.sueldoxDia;          
          console.log('sueldoPlh='+parseFloat(this.sueldoPlh.toFixed(2)));
          //this.reintegro= ((parseFloat(this.sueldoPlh.toFixed(2))+parseFloat(this.pagaSalud.toFixed(2)))<this.selectedCar1.sueldo)? (this.selectedCar1.sueldo-(parseFloat(this.sueldoPlh.toFixed(2))+parseFloat(this.pagaSalud.toFixed(2)))):0  ;
          this.reintegro= this.selectedCar1.sueldo>this.maximo ? (this.selectedCar1.sueldo-(parseFloat(this.sueldoPlh.toFixed(2))+parseFloat(this.pagaSalud.toFixed(2)))):0  ;
          this.reintegro=parseFloat(this.reintegro.toFixed(2));
          console.log(this.reintegro.toFixed(2));
          this.conclusion=(this.selectedCar1.sueldo>(this.uit*0.30))?'SI aplica reintegro en PLH': 'NO se aplica ningun reintegro en el PLH';
        }
       // else(console.log('no'))
    }

    fnIniciarCalendario(){
        this.es = {
        	firstDayOfWeek: 1,
        	dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        	dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        	dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        	monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
         }
    }
}