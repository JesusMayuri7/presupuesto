webpackJsonp([1],{

/***/ "../../../../../src/app/subsidio/subsidio.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/subsidio/subsidio.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [value]=\"msgs\"></p-growl>\n<div class=\"ui-g\">\n <div [ngClass]=\"{'ui-g-8':selectedCar1,'ui-g-12':!selectedCar1}\">    \n<p-dataTable [value]=\"trabajador\" sortField=\"nombres\" [style]=\"{'font-size': '0.7em'}\" [loading]=\"loading\" loadingIcon=\"fa-spinner\"\n[totalRecords]=\"totalRecords\" (onLazyLoad)=\"loadCarsLazy($event)\" [lazy]=\"true\" \n[(selection)]=\"selectedCar1\" (onRowSelect)=\"onRowSelect($event)\" tableStyleClass=\"prime-table\" \nselectionMode=\"single\" [rows]=\"per_page\" [paginator]=\"true\" [globalFilter]=\"gb\" #dt>\n    <p-header>Personal - Cas</p-header>\n    <p-column field=\"fuente\" header=\"F\" sortable=\"true\" [style]=\"{'width':'4%'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    <p-column field=\"nueva_meta\" header=\"Meta\" sortable=\"true\" [style]=\"{'width':'7%'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    <p-column field=\"nombres\" header=\"Nombres\" sortable=\"true\" [style]=\"{'width':'30%'}\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    <p-column field=\"cargo\" header=\"Cargo\" sortable=\"true\" [filter]=\"true\" filterMatchMode=\"equals\">\n        <ng-template pTemplate=\"filter\" let-col>\n            <p-dropdown [options]=\"brands\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n        </ng-template>\n    </p-column>\n    <p-column field=\"des_establecimiento\" header=\"Establecimiento\" sortable=\"true\" [filter]=\"true\" filterMatchMode=\"in\">\n        <ng-template pTemplate=\"filter\" let-col>\n            <p-multiSelect [options]=\"colors\" defaultLabel=\"All Colors\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-multiSelect>\n        </ng-template>\n    </p-column>  \n    <p-column field=\"sueldo\" [style]=\"{'width':'10%','text-align':'right'}\" header=\"Sueldo\" [filter]=\"true\" >\n        <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n      <span>{{ data[col.field] | number : '1.2-2'}}</span>\n   </ng-template>\n   </p-column>\n\n</p-dataTable></div>\n\n   <div *ngIf='selectedCar1' class=\"ui-g-4\">\n  \n   <p-panel header=\"Datos\">\n       <div class=\"ui-g\">\n  <div class=\"ui-g-12 ui-g-nopad\">  \n       <div class=\"ui-g-12\"><span style=\"color:blue\">Nombres:</span> {{selectedCar1 ? selectedCar1.nombres:''}}</div>\n       <div class=\"ui-g-12\"><span style=\"color:blue\">Cargo:</span> {{selectedCar1 ? selectedCar1.cargo:''}}</div>\n       <div class=\"ui-g-12\"><span style=\"color:blue\">Establecimiento:</span> {{selectedCar1 ? selectedCar1.des_establecimiento:''}}</div>\n       <div class=\"ui-g-12\"><span style=\"color:blue\">Sueldo:</span> {{selectedCar1 ? selectedCar1.sueldo:''}}</div>\n   </div>\n       </div>\n   </p-panel>\n   <p-panel header=\"Subsidio\">\n    <div class=\"ui-g\">\n       <!--<div class=\"ui-g-12\"><span style=\"color:blue\">Mes:</span> \n       <p-dropdown [options]=\"meses\" [(ngModel)]=\"fecha\" (onChange)=\"fnUltimoDia(selectedMes)\"></p-dropdown> <span style=\"color:blue\">Dias del mes: </span>{{ultimoDia}}</div>-->\n        <div class=\"ui-g-12\"><span style=\"color:blue\">Inicio:</span>\n        <p-calendar [(ngModel)]=\"mesInicio\" readonlyInput=\"true\" (onSelect)=\"fnUltimoDia(mesInicio,mesFin)\" [showIcon]=\"true\" [locale]=\"es\" dateFormat=\"dd/mm/yy\"></p-calendar> \n        <span style=\"color:blue\">Fin:</span>\n        <p-calendar [(ngModel)]=\"mesFin\" readonlyInput=\"true\" (onSelect)=\"fnUltimoDia(mesInicio,mesFin)\" [showIcon]=\"true\" [locale]=\"es\" dateFormat=\"dd/mm/yy\"></p-calendar> \n        </div>\n        <div class=\"ui-g-12\"><span style=\"color:blue\">UIT:</span><input id=\"disabled-input\" type=\"text\" [(ngModel)]=\"uit\" size=\"10\" pInputText [disabled]=\"disabled\" /></div>\n        <div class=\"ui-g-12\"><span style=\"color:blue\">Dias Subsidiados:</span><p-spinner size=\"10\" [(ngModel)]=\"diasSubsidiados\" [min]=\"0\" [max]=\"360\"></p-spinner></div>       \n   </div>\n   </p-panel>\n   <p-panel header=\"Calculo\">\n       <div class=\"ui-g\">   \n            <div class=\"ui-g-12\"><span style=\"color:blue\">Sueldo Plh:</span> {{sueldoPlh | number : '1.2-2'}}</div>            \n            <div class=\"ui-g-12\"><span style=\"color:blue\">Sueldo x Dia (Plh):</span> {{sueldoxDia | number : '1.2-2'}}</div>\n            <div class=\"ui-g-12\"><span style=\"color:blue\">Dias laborados:</span> {{diasLaborados}}</div>            \n           <div class=\"ui-g-12\"><button type=\"button\" pButton style=\"float:center\" label=\"Calcular\" (click)=\"fnCalcular()\"></button></div>\n           <div class=\"ui-g-12\"><button type=\"button\" pButton style=\"float:center\" label=\"Subsidio\" (click)=\"fnCalcularPdt(selectedCar1)\"></button></div>       \n        <!--<div class=\"ui-g-12\"><span style=\"color:blue\">{{sueldoPlh?'Conclusion':''}}</span> {{conclusion}}</div>-->\n       </div>\n    </p-panel>\n   </div>\n</div>\n<p-dialog header=\"{{nombres}}\" [(visible)]=\"displayDialog\" [modal]=\"true\" width=\"450\" (onAfterHide)=\"onDialogHide()\">\n    <p-dataTable [value]=\"pdt\" [style]=\"{'font-size': '0.7em'}\" [loading]=\"loading\" loadingIcon=\"fa-spinner\"        \n    selectionMode=\"single\">\n    <p-column field=\"anio\" [style]=\"{'width':'10%','text-align':'right'}\" header=\"Año\"></p-column>\n    <p-column field=\"mes\" [style]=\"{'width':'10%','text-align':'right'}\" header=\"Mes\"></p-column>\n    <p-column field=\"ingreso\" [style]=\"{'width':'15%','text-align':'right'}\" header=\"Remuneracion\">\n        <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n      <span>{{ data[col.field] | number : '1.2-2'}}</span>\n   </ng-template>\n   </p-column>\n    <p-column field=\"maximo\" [style]=\"{'width':'15%','text-align':'right'}\" header=\"Maximo\" footer=\"true\">\n        <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n      <span>{{ data[col.field] | number : '1.2-2'}}</span>      \n   </ng-template>\n    <ng-template let-col let-data=\"rowData\" pTemplate=\"footer\">\n    <span style=\"text-align:center;font-weight:bold;\">{{totalesMaximo | number : '1.2-2'}} </span>\n    </ng-template>\n   </p-column>\n</p-dataTable>\n<p-footer>\n    Subsidio x Mes: {{ pdt? redondear(totalesMaximo/pdt.length): 0 | number : '1.2-2'}} <br>\n    Subsidio x Dia: {{ pdt? redondear(totalesMaximo/(pdt.length*30)): 0 | number : '1.2-2'}} <br>\n    Dias Subsidiados: {{ pdt? diasSubsidiados: 0 | number : '1.2-2'}} <br>\n    <hr>\n    Devolucion Essalud : {{ pdt? redondear((totalesMaximo/pdt.length)/30) *diasSubsidiados: 0 | number : '1.2-2'}} <br>    \n    Calculo Plh : {{ pdt? redondear(sueldoPlh):0 | number : '1.2-2'}} <br>\n    <hr>    \n    Reintegro: {{ pdt? redondear(selectedCar1? selectedCar1.sueldo-((redondear((totalesMaximo/pdt.length)/30) *diasSubsidiados)+sueldoPlh):0):0 | number : '1.2-2'}} <br>\n    <hr>\n    Sueldo Actual => : {{ pdt? (selectedCar1? selectedCar1.sueldo:0):0 | number : '1.2-2'}} <br>    \n</p-footer>\n</p-dialog>\n"

/***/ }),

/***/ "../../../../../src/app/subsidio/subsidio.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_car_service__ = __webpack_require__("../../../../../src/app/service/car.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubsidioComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SubsidioComponent = (function () {
    function SubsidioComponent(carService) {
        this.carService = carService;
        this._MS_PER_DAY = 1000 * 60 * 60 * 24;
        this.defaultImage = '/assets/icons/blank.png';
        this.diasSubsidiados = 0;
        this.ultimoDia = 0;
        this.uit = 4050;
        this.reintegro = 0;
        this.page = 0;
        this.orden = 'asc';
        this.maximo = 0;
        this.sueldoPlh = 0;
        this.displayDialog = false;
        this.subsidioxDia;
        this.mesInicio = new Date();
        this.mesFin = new Date();
    }
    SubsidioComponent.prototype.dateDiffInDays = function (a, b) {
        // Discard the time and time-zone information.
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
    };
    // TODO: falta enviar el parametro post, dni, y fecha
    SubsidioComponent.prototype.fnCalcularPdt = function (tra) {
        var _this = this;
        this.nombres = tra.nombres;
        var day = this.mesInicio.getDate();
        var month = this.mesInicio.getMonth(); // add 1 because months are indexed from 0
        var year = this.mesInicio.getFullYear();
        var post = { "dni": tra.dni, fecha: year + '-' + month + '-' + day };
        this.displayDialog = false;
        this.carService.postPdt(post)
            .subscribe(function (pdt) {
            console.log(pdt);
            _this.pdt = pdt.data;
            _this.calcularFooterTotal(pdt.data);
            _this.displayDialog = true;
        });
    };
    SubsidioComponent.prototype.calcularFooterTotal = function (tra) {
        this.totalesMaximo = 0; // Esta declaracion es importante       
        for (var _i = 0, tra_1 = tra; _i < tra_1.length; _i++) {
            var item = tra_1[_i];
            this.totalesMaximo += parseFloat(item.maximo);
        }
        this.totalesMaximo = parseFloat(this.redondear(this.totalesMaximo));
    };
    SubsidioComponent.prototype.cargaFoto = function (dni) {
        //return this.contando+=1;
        this.image = "http://programacion.minsa/api/trabajador/" + dni;
    };
    SubsidioComponent.prototype.loadCarsLazy = function (event) {
        var _this = this;
        if (this.datos) {
            this.loading = true;
            this.page = Math.trunc(event.first / event.rows) + 1;
            if (event.sortOrder == -1) {
                this.orden = 'asc';
            }
            this.carService.getCarsLarge(this.page, event.sortField, this.orden).then(function (cars) {
                _this.datos = cars;
                _this.trabajador = _this.datos.data;
                _this.totalRecords = _this.datos.total;
                _this.per_page = _this.datos.per_page;
                _this.loading = false;
            });
        }
    };
    SubsidioComponent.prototype.onRowSelect = function (event) {
        console.log(event.data.dni);
        this.image = "http://programacion.minsa/api/trabajador/" + event.data.dni;
        //this.cargaFoto(event.data.dni);           
        //   this.msgs = [];
        //   this.msgs.push({severity: 'info', summary: 'Car Selected', detail: event.data.nombres + ' - ' + event.data.sueldo});
    };
    SubsidioComponent.prototype.onRowUnselect = function (event) {
        //    this.msgs = [];
        //    this.msgs.push({severity: 'info', summary: 'Car Unselected', detail: event.data.vin + ' - ' + event.data.brand});
    };
    SubsidioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fnIniciarCalendario();
        this.loading = true;
        this.carService.getCarsLarge(this.page, 'nombres', this.orden).then(function (cars) {
            _this.datos = cars;
            _this.trabajador = _this.datos.data;
            _this.totalRecords = _this.datos.total;
            _this.per_page = _this.datos.per_page;
            _this.fnUltimoDia(_this.mesInicio, _this.mesFin);
            // this.inicio=this.datos.from;
            console.log(_this.datos);
            _this.loading = false;
        });
        //console.log(this.trabajador);
        this.meses = [];
        this.meses.push({ label: 'Seleccione mes', value: null });
        this.meses.push({ label: 'Enero', value: { id: 1, name: 'Enero' } });
        this.meses.push({ label: 'Febrero', value: { id: 2, name: 'Febrero' } });
        this.meses.push({ label: 'Marzo', value: { id: 3, name: 'Marzo' } });
        this.meses.push({ label: 'Abril', value: { id: 4, name: 'Abril' } });
        this.meses.push({ label: 'Mayo', value: { id: 5, name: 'Mayo' } });
        this.meses.push({ label: 'Junio', value: { id: 6, name: 'Junio' } });
        this.meses.push({ label: 'Julio', value: { id: 7, name: 'Julio' } });
        this.meses.push({ label: 'Agosto', value: { id: 8, name: 'Agosto' } });
        this.meses.push({ label: 'Setiembre', value: { id: 9, name: 'Setiembre' } });
        this.meses.push({ label: 'Octubre', value: { id: 10, name: 'Octubre' } });
        this.meses.push({ label: 'Noviembre', value: { id: 11, name: 'Noviembre' } });
        this.meses.push({ label: 'Diciembre', value: { id: 12, name: 'Diciembre' } });
        this.brands = [];
        this.brands.push({ label: 'All Brands', value: null });
        this.brands.push({ label: 'Audi', value: 'Audi' });
        this.brands.push({ label: 'BMW', value: 'BMW' });
        this.brands.push({ label: 'Fiat', value: 'Fiat' });
        this.brands.push({ label: 'Honda', value: 'Honda' });
        this.brands.push({ label: 'Jaguar', value: 'Jaguar' });
        this.brands.push({ label: 'Mercedes', value: 'Mercedes' });
        this.brands.push({ label: 'Renault', value: 'Renault' });
        this.brands.push({ label: 'VW', value: 'VW' });
        this.brands.push({ label: 'Volvo', value: 'Volvo' });
        this.colors = [];
        this.colors.push({ label: 'White', value: 'White' });
        this.colors.push({ label: 'Green', value: 'Green' });
        this.colors.push({ label: 'Silver', value: 'Silver' });
        this.colors.push({ label: 'Black', value: 'Black' });
        this.colors.push({ label: 'Red', value: 'Red' });
        this.colors.push({ label: 'Maroon', value: 'Maroon' });
        this.colors.push({ label: 'Brown', value: 'Brown' });
        this.colors.push({ label: 'Orange', value: 'Orange' });
        this.colors.push({ label: 'Blue', value: 'Blue' });
    };
    SubsidioComponent.prototype.fnUltimoDia = function (inicio, fin) {
        console.log('entro');
        this.diasSubsidiados = this.dateDiffInDays(inicio, fin) + 1;
        this.ultimoDia = this.daysInMonth(inicio.getMonth() + 1, 2017);
    };
    SubsidioComponent.prototype.daysInMonth = function (iMonth, iYear) {
        return new Date(iYear, iMonth, 0).getDate();
    };
    SubsidioComponent.prototype.redondear = function (numero) {
        return numero.toFixed(1);
    };
    SubsidioComponent.prototype.fnCalcular = function () {
        // if (this.selectedCar1.sueldo>(this.uit*0.3))
        {
            // this.fnUltimoDia();
            this.diasLaborados = ((this.ultimoDia - this.diasSubsidiados));
            console.log('diasLaborados=' + this.diasLaborados);
            this.maximo = this.selectedCar1.sueldo > (this.uit * 0.30) ? (this.uit * 0.30) : this.selectedCar1.sueldo;
            this.pagaSalud = (this.maximo / (this.ultimoDia > 29 ? 30 : this.ultimoDia)) * this.diasSubsidiados;
            console.log('pagaSalud=' + this.pagaSalud.toFixed(2));
            this.sueldoxDia = this.selectedCar1.sueldo / this.ultimoDia;
            console.log('sueldoxDia=' + this.sueldoxDia);
            this.sueldoPlh = this.diasLaborados * this.sueldoxDia;
            console.log('sueldoPlh=' + parseFloat(this.sueldoPlh.toFixed(2)));
            //this.reintegro= ((parseFloat(this.sueldoPlh.toFixed(2))+parseFloat(this.pagaSalud.toFixed(2)))<this.selectedCar1.sueldo)? (this.selectedCar1.sueldo-(parseFloat(this.sueldoPlh.toFixed(2))+parseFloat(this.pagaSalud.toFixed(2)))):0  ;
            this.reintegro = this.selectedCar1.sueldo > this.maximo ? (this.selectedCar1.sueldo - (parseFloat(this.sueldoPlh.toFixed(2)) + parseFloat(this.pagaSalud.toFixed(2)))) : 0;
            this.reintegro = parseFloat(this.reintegro.toFixed(2));
            console.log(this.reintegro.toFixed(2));
            this.conclusion = (this.selectedCar1.sueldo > (this.uit * 0.30)) ? 'SI aplica reintegro en PLH' : 'NO se aplica ningun reintegro en el PLH';
        }
        // else(console.log('no'))
    };
    SubsidioComponent.prototype.fnIniciarCalendario = function () {
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: 'Hoy',
            clear: 'Borrar'
        };
    };
    return SubsidioComponent;
}());
SubsidioComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'zd-subsidio',
        template: __webpack_require__("../../../../../src/app/subsidio/subsidio.component.html"),
        styles: [__webpack_require__("../../../../../src/app/subsidio/subsidio.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_car_service__["a" /* CarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__service_car_service__["a" /* CarService */]) === "function" && _a || Object])
], SubsidioComponent);

var _a;
//# sourceMappingURL=subsidio.component.js.map

/***/ }),

/***/ "../../../../../src/app/subsidio/subsidio.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_service_module__ = __webpack_require__("../../../../../src/app/service/service.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__ = __webpack_require__("../../../../ng-lazyload-image/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__subsidio_component__ = __webpack_require__("../../../../../src/app/subsidio/subsidio.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubsidioModule", function() { return SubsidioModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_7__subsidio_component__["a" /* SubsidioComponent */]
    }
];
var SubsidioModule = (function () {
    function SubsidioModule() {
    }
    return SubsidioModule;
}());
SubsidioModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["InputTextModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["MultiSelectModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DialogModule"], __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["SliderModule"],
            __WEBPACK_IMPORTED_MODULE_4__service_service_module__["a" /* ServiceModule */],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["SpinnerModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_5_ng_lazyload_image__["LazyLoadImageModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["CalendarModule"],
            //   InterfaceModule,
            __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forChild(routes)
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_7__subsidio_component__["a" /* SubsidioComponent */]]
    })
], SubsidioModule);

//# sourceMappingURL=subsidio.module.js.map

/***/ })

});
//# sourceMappingURL=1.chunk.js.map