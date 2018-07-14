"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var _1 = require("@angular/router/");
var shell_component_1 = require("./shell/shell.component");
var top_bar_component_1 = require("./shell/top-bar/top-bar.component");
var main_content_component_1 = require("./shell/main-content/main-content.component");
var routes = [
    {
        path: '',
        loadChildren: './../home/home.module#HomeModule'
    },
    {
        path: 'about',
        loadChildren: './../about/about.module#AboutModule'
    }
];
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            _1.RouterModule.forRoot(routes),
        ],
        declarations: [shell_component_1.ShellComponent, top_bar_component_1.TopBarComponent, main_content_component_1.MainContentComponent],
        exports: [shell_component_1.ShellComponent]
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map