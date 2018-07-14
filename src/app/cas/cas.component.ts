import { Component, OnInit } from '@angular/core';
import {CarService} from '../service/car.service';
import {Trabajador,Message,SelectItem,MenuItem,LazyLoadEvent,FilterMetadata} from '../interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'zd-cas',
  templateUrl: './cas.component.html',
  styleUrls: ['./cas.component.css']
})
export class CasComponent implements OnInit {    
    datos:any[];
    trabajador: any[];
    
         totalesPim : number;
         totalesCer : number;
         totalesEje : number;
         totalesPro : number;
         totalesTot : number;
         totalesSal : number;
         totalesEne : number;
         totalesFeb : number;
         totalesMar : number;
         totalesAbr : number;
         totalesMay : number;
         totalesJun : number;
         totalesJul : number;
         totalesAgo : number;
         totalesSet : number;
         totalesOct : number;
         totalesNov : number;
         totalesDic : number; 
    totalDic;totalNov:number = 0;       
    totalOct:number = 0; 
    totalSet:number = 0; 
    totalAgo:number = 0; 
    totalJul:number = 0; 
    totalJun:number = 0; 
    totalMay:number = 0; 
    totalAbr:number = 0; 
    totalMar:number = 0; 
    totalFeb:number = 0; 
    totalEne:number = 0; 
    totalPim:number = 0; 
    totalCer:number = 0; 
    totalEje:number = 0; 
    totalPro:number = 0; 
    totalTot:number = 0; 
    totalSal:number = 0; 
    private _placeholderBase64 = `data:image/png;base64,`;
    private _placeHolderSafe: SafeUrl;
    contando:number=0;
    loading: boolean;

    constructor(private carService: CarService,private sanitizer: DomSanitizer) {}
    image='/assets/icons/blank.png';
    defaultImage = '/assets/icons/blank.png';
 
    offset = 10;

    cargaFoto(dni){
        //return this.contando+=1;
        if(typeof dni !== 'undefined'){
            console.log('entro '+dni);
        return "http://programacion.minsa/api/trabajador/"+dni; }
        else{
            return '/assets/icons/blank.png';
        }        
    }

    ngOnInit() {      
         this.loading = true; 
         this.carService.getCarsSmall().then(cars =>{ 
             
            this.datos=cars;
            this.trabajador=this.datos;  
            this.calcularFooterTotal(this.trabajador);
            this.loading = false;
           // this.inicio=this.datos.from;
       //     console.log(this.trabajador[0].meta);
        }) 
    }

    showTrabajador(){
        console.log('trabajador');
    }

    calcularFooterTotal(tra){
         this.totalesPim=0; // Esta declaracion es importante
         this.totalesSal=0;
         if (tra) {
         for(let item of tra) {              
         this.totalesPim +=parseFloat(item.PIM);
         //this.totalesCer +=item.Certificado;
         //this.totalesEje +=item.Ejecutado;
         //this.totalesPro +=item.Proyeccion;
         //this.totalesTot +=item.totales;
         this.totalesSal +=parseFloat(item.SALDO);
         /*this.totalesEne +=item.enero;
         this.totalesFeb +=item.febrero;
         this.totalesMar +=item.Marzo;
         this.totalesAbr +=item.Abril;
         this.totalesMay +=item.Mayo;
         this.totalesJun +=item.Junio;
         this.totalesJul +=item.Julio;
         this.totalesAgo +=item.Agosto;
         this.totalesSet +=item.Setiembre;
         this.totalesOct +=item.Octubre;
         this.totalesNov +=item.Noviembre;
         this.totalesDic +=item.Diciembre; */
         }
           console.log(this.totalesSal);
         }
    }

    calculateGroupTotal(campo1,campo2: string) {    
        this.totalDic=0; 
        this.totalNov=0;            
        this.totalOct=0; 
        this.totalSet = 0; 
        this.totalAgo = 0; 
        this.totalJul = 0; 
        this.totalJun = 0; 
        this.totalMay = 0; 
        this.totalAbr = 0; 
        this.totalMar = 0; 
        this.totalFeb = 0; 
        this.totalEne = 0; 
        this.totalPim = 0;
        this.totalCer = 0;
        this.totalEje = 0;
        this.totalPro = 0;
        this.totalTot = 0;
        this.totalSal = 0;
        if(this.trabajador) {                
            for(let item of this.trabajador) {                                
                if(item.programa_pptal === campo1 && item.fuente === campo2) {                                       
                    this.totalDic += item.Diciembre;
                    this.totalNov += item.Noviembre;
                    this.totalOct += item.Octubre;
                    this.totalSet += item.Setiembre;
                    this.totalAgo += item.Agosto;
                    this.totalJul += item.Julio;
                    this.totalJun += item.Junio;
                    this.totalMay += item.Mayo;
                    this.totalAbr += item.Abril;
                    this.totalMar += item.Marzo;
                    this.totalFeb += item.febrero;
                    this.totalEne += item.enero;
                    this.totalPim += parseFloat(item.Pim);
                    this.totalCer += parseFloat(item.Certificado);
                    this.totalPro += parseFloat(item.Proyeccion);
                    this.totalTot += parseFloat(item.Totales);
                    this.totalSal += parseFloat(item.SaldoFinal);   
                    this.totalEje += parseFloat(item.Ejecutado);                 
                }
            }
          //  console.log(this.totalPim);
        }
        //return totalDic;
    }
}
