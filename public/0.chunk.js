webpackJsonp([0],{

/***/ "../../../../ng-lazyload-image/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lazyload_image_directive_1 = __webpack_require__("../../../../ng-lazyload-image/src/lazyload-image.directive.js");
exports.LazyLoadImageDirective = lazyload_image_directive_1.LazyLoadImageDirective;
var lazyload_image_module_1 = __webpack_require__("../../../../ng-lazyload-image/src/lazyload-image.module.js");
exports.LazyLoadImageModule = lazyload_image_module_1.LazyLoadImageModule;
exports.default = lazyload_image_module_1.LazyLoadImageModule;


/***/ }),

/***/ "../../../../ng-lazyload-image/src/lazyload-image.directive.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("../../../../rxjs/add/operator/let.js");
__webpack_require__("../../../../rxjs/add/operator/switchMap.js");
__webpack_require__("../../../../rxjs/add/operator/debounceTime.js");
var ReplaySubject_1 = __webpack_require__("../../../../rxjs/ReplaySubject.js");
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var scroll_listener_1 = __webpack_require__("../../../../ng-lazyload-image/src/scroll-listener.js");
var lazyload_image_1 = __webpack_require__("../../../../ng-lazyload-image/src/lazyload-image.js");
var target = typeof window !== 'undefined' ? window : undefined;
var LazyLoadImageDirective = (function () {
    function LazyLoadImageDirective(el, ngZone) {
        this.scrollTarget = target;
        this.onLoad = new core_1.EventEmitter();
        this.elementRef = el;
        this.ngZone = ngZone;
        this.propertyChanges$ = new ReplaySubject_1.ReplaySubject();
    }
    LazyLoadImageDirective.prototype.ngOnChanges = function () {
        this.propertyChanges$.next({
            lazyImage: this.lazyImage,
            defaultImage: this.defaultImage,
            errorImage: this.errorImage,
            scrollTarget: this.scrollTarget,
            scrollObservable: this.scrollObservable,
            offset: this.offset,
        });
    };
    LazyLoadImageDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (typeof window === 'undefined') {
            return null;
        }
        this.ngZone.runOutsideAngular(function () {
            var scrollObservable;
            if (_this.scrollObservable) {
                scrollObservable = _this.scrollObservable.startWith('');
            }
            else {
                scrollObservable = scroll_listener_1.getScrollListener(_this.scrollTarget);
            }
            _this.scrollSubscription = _this.propertyChanges$
                .debounceTime(10)
                .switchMap(function (props) { return scrollObservable.let(lazyload_image_1.lazyLoadImage(_this.elementRef.nativeElement, props.lazyImage, props.defaultImage, props.errorImage, props.offset)); })
                .subscribe(function (success) { return _this.onLoad.emit(success); });
        });
    };
    LazyLoadImageDirective.prototype.ngOnDestroy = function () {
        [this.scrollSubscription]
            .filter(function (subscription) { return subscription && !subscription.isUnsubscribed; })
            .forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    __decorate([
        core_1.Input('lazyLoad'),
        __metadata("design:type", Object)
    ], LazyLoadImageDirective.prototype, "lazyImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LazyLoadImageDirective.prototype, "defaultImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LazyLoadImageDirective.prototype, "errorImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LazyLoadImageDirective.prototype, "scrollObservable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LazyLoadImageDirective.prototype, "offset", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LazyLoadImageDirective.prototype, "onLoad", void 0);
    LazyLoadImageDirective = __decorate([
        core_1.Directive({
            selector: '[lazyLoad]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.NgZone])
    ], LazyLoadImageDirective);
    return LazyLoadImageDirective;
}());
exports.LazyLoadImageDirective = LazyLoadImageDirective;


/***/ }),

/***/ "../../../../ng-lazyload-image/src/lazyload-image.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("../../../../rxjs/add/operator/filter.js");
__webpack_require__("../../../../rxjs/add/operator/do.js");
__webpack_require__("../../../../rxjs/add/operator/take.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
__webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
__webpack_require__("../../../../rxjs/add/operator/catch.js");
__webpack_require__("../../../../rxjs/add/observable/of.js");
var Observable_1 = __webpack_require__("../../../../rxjs/Observable.js");
function isVisible(element, threshold, _window) {
    if (threshold === void 0) { threshold = 0; }
    if (_window === void 0) { _window = window; }
    var _a = element.getBoundingClientRect(), top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right;
    var height = _window.innerHeight;
    var width = _window.innerWidth;
    var elementLargerThenViewport = top <= threshold && bottom >= (height - threshold) && left <= threshold && right >= (width - threshold);
    var topInsideViewport = top <= (height - threshold) && top >= threshold;
    var bottomInsideViewport = bottom >= threshold && bottom <= (height - threshold);
    var rightsideInViewport = right >= threshold && right <= (width - threshold);
    var leftsideInViewport = left <= (width - threshold) && left >= threshold;
    return (elementLargerThenViewport ||
        ((topInsideViewport || bottomInsideViewport) &&
            (rightsideInViewport || leftsideInViewport)));
}
exports.isVisible = isVisible;
function loadImage(imagePath) {
    return Observable_1.Observable
        .create(function (observer) {
        var img = new Image();
        img.src = imagePath;
        img.onload = function () {
            observer.next(imagePath);
            observer.complete();
        };
        img.onerror = function (err) {
            observer.error(null);
        };
    });
}
function setImage(element, imagePath) {
    var isImgNode = element.nodeName.toLowerCase() === 'img';
    if (isImgNode) {
        element.src = imagePath;
    }
    else {
        element.style.backgroundImage = "url('" + imagePath + "')";
    }
    return element;
}
function setLoadedStyle(element) {
    var styles = element.className
        .split(' ')
        .filter(function (s) { return !!s; })
        .filter(function (s) { return s !== 'ng-lazyloading'; });
    styles.push('ng-lazyloaded');
    element.className = styles.join(' ');
    return element;
}
function lazyLoadImage(image, imagePath, defaultImagePath, errorImgPath, offset) {
    if (defaultImagePath) {
        setImage(image, defaultImagePath);
    }
    return function (scrollObservable) {
        return scrollObservable
            .filter(function () { return isVisible(image, offset); })
            .take(1)
            .mergeMap(function () { return loadImage(imagePath); })
            .do(function () { return setImage(image, imagePath); })
            .map(function () { return true; })
            .catch(function () {
            if (errorImgPath) {
                setImage(image, errorImgPath);
            }
            image.className += ' ng-failed-lazyloaded';
            return Observable_1.Observable.of(false);
        })
            .do(function () { return setLoadedStyle(image); });
    };
}
exports.lazyLoadImage = lazyLoadImage;


/***/ }),

/***/ "../../../../ng-lazyload-image/src/lazyload-image.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var lazyload_image_directive_1 = __webpack_require__("../../../../ng-lazyload-image/src/lazyload-image.directive.js");
var LazyLoadImageModule = (function () {
    function LazyLoadImageModule() {
    }
    LazyLoadImageModule = __decorate([
        core_1.NgModule({
            declarations: [lazyload_image_directive_1.LazyLoadImageDirective],
            exports: [lazyload_image_directive_1.LazyLoadImageDirective]
        })
    ], LazyLoadImageModule);
    return LazyLoadImageModule;
}());
exports.LazyLoadImageModule = LazyLoadImageModule;


/***/ }),

/***/ "../../../../ng-lazyload-image/src/scroll-listener.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("../../../../rxjs/add/operator/startWith.js");
__webpack_require__("../../../../rxjs/add/operator/sampleTime.js");
__webpack_require__("../../../../rxjs/add/operator/share.js");
__webpack_require__("../../../../rxjs/add/observable/empty.js");
var Observable_1 = __webpack_require__("../../../../rxjs/Observable.js");
var scrollListeners = new WeakMap();
function sampleObservable(obs, scheduler) {
    return obs
        .sampleTime(100, scheduler)
        .share()
        .startWith('');
}
exports.sampleObservable = sampleObservable;
exports.getScrollListener = function (scrollTarget) {
    if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
        if (typeof window !== 'undefined') {
            console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
        }
        return Observable_1.Observable.empty();
    }
    if (scrollListeners.has(scrollTarget)) {
        return scrollListeners.get(scrollTarget);
    }
    var srollEvent = Observable_1.Observable.create(function (observer) {
        var eventName = 'scroll';
        var handler = function (event) { return observer.next(event); };
        var options = { passive: true, capture: false };
        scrollTarget.addEventListener(eventName, handler, options);
        return function () { return scrollTarget.removeEventListener(eventName, handler, options); };
    });
    var listener = sampleObservable(srollEvent);
    scrollListeners.set(scrollTarget, listener);
    return listener;
};


/***/ })

});
//# sourceMappingURL=0.chunk.js.map