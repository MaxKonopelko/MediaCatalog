(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
    'use strict';

    var BrowserStorage = (function () {
        function BrowserStorage(key) {
            this.key = key;
        }
        BrowserStorage.prototype.setObject = function (value) {
            var str = JSON.stringify(value);
            localStorage.setItem(this.key, str);
        };
        BrowserStorage.prototype.getObject = function () {
            var item = localStorage.getItem(this.key);
            return JSON.parse(item);
        };
        BrowserStorage.prototype.clear = function () {
            localStorage.removeItem(this.key);
        };
        BrowserStorage.prototype.clearAll = function () {
            localStorage.clear();
        };
        return BrowserStorage;
    }());

    var StorageService = (function () {
        function StorageService(key) {
            this.browserStorage = new BrowserStorage(key);
        }
        StorageService.prototype.addArray = function (items) {
            var storage = this.browserStorage.getObject();
            if (storage === null) {
                var storageObj = {
                    index: 0,
                    list: [],
                };
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    item.id = storageObj.index;
                    storageObj.list.push(item);
                    storageObj.index++;
                }
                this.browserStorage.setObject(storageObj);
                console.log(storageObj);
            }
            else {
                for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                    var item = items_2[_a];
                    if (item.id === (undefined)) {
                        item.id = storage.index;
                        storage.list.push(item);
                        storage.index++;
                    }
                }
                this.browserStorage.setObject(storage);
                console.log(storage);
            }
        };
        StorageService.prototype.getObj = function () {
            var browserStorageData = this.browserStorage.getObject();
            return browserStorageData ? browserStorageData.list : [];
        };
        StorageService.prototype.clear = function () {
            this.browserStorage.clear();
        };
        return StorageService;
    }());

    var ImageServiceClass = (function () {
        function ImageServiceClass() {
            this.storage = new StorageService('image');
        }
        ImageServiceClass.prototype.add = function (item) {
            var imageList = this.storage.getObj();
            imageList.push(item);
            this.storage.addArray(imageList);
        };
        ImageServiceClass.prototype.addArray = function (items) {
            var imageList = this.storage.getObj();
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var image = items_1[_i];
                imageList.push(image);
            }
            this.storage.addArray(imageList);
        };
        ImageServiceClass.prototype.clear = function () {
            this.storage.clear();
        };
        return ImageServiceClass;
    }());
    var ImageService = new ImageServiceClass();

    var ImagesComponent = (function () {
        function ImagesComponent() {
        }
        ImagesComponent.prototype.init = function () {
            return " \n            <div class=\"photo-header\">Photo</div>\n            <div class=\"photo-data\">\n                <div class=\"url-photo\">\n                    <div>\n                        <form id=\"form-image\">\n                              <!--<label for=\"fname\">URL IMAGE </label>-->\n                              <input type=\"text\" id=\"url-photo\" value=\"\" placeholder=\"Url image..\">\n                              <input type=\"submit\" id=\"submit\" \">\n                        </form>\n                    </div>\n\n               </div>             \n                <div class=\"photo-content\">\n                     <div class=\"photo-list\">\n                           <ol class=\"photos\" id=\"photos\">\n                                                           \n                           </ol>                                                \n                     </div>\n                     <div class=\"photo\">\n                        <div class=\"photo-size\">                                       \n                            <img class=\"image\" id=\"image\" src=\"http://placehold.it/350x350\">\n                        </div>\n                     </div>\n                </div>\n            </div>\n    ";
        };
        return ImagesComponent;
    }());

    var MusicsComponent = (function () {
        function MusicsComponent() {
        }
        MusicsComponent.prototype.init = function () {
            return "\n            <div class=\"music-header\">Name track</div>\n            <div class=\"music-data\">\n                <div class=\"music-list\">\n                    <div class=\"track-list\">1</div>\n                    <div class=\"track-list\">2</div>\n                    <div class=\"track-list\">3</div>\n                    <div class=\"track-list\">4</div>\n                    <div class=\"track-list\">5</div>\n                    <div class=\"track-list\">6</div>\n                    <div class=\"track-list\">7</div>\n                </div>\n                <div class=\"music-content\">\n                    <div class=\"music-image\">\n                        <img src=\"images/guf.jpg\">\n                    </div>\n                    <div class=\"music-author\">Name : Guf</div>\n                    <div class=\"music-name\">Track name : Azino777</div>\n                    <div class=\"music-play\">\n                        <audio controls>\n                            <source type=\"audio/mpeg\" src=\"images/142.mp3\">\n                        </audio>\n                    </div>\n\n                </div>\n            </div>\n    ";
        };
        return MusicsComponent;
    }());

    var FilmsComponent = (function () {
        function FilmsComponent() {
        }
        FilmsComponent.prototype.init = function () {
            return "\n        <div class=\"film-header\">Films</div>\n        <div class=\"film-data\"></div>\n    ";
        };
        return FilmsComponent;
    }());

    var AppComponent = (function () {
        function AppComponent() {
            this.booksComponent = new ImagesComponent();
            this.musicsComponent = new MusicsComponent();
            this.filmsComponent = new FilmsComponent();
            this.components = [this.booksComponent, this.musicsComponent, this.filmsComponent];
        }
        AppComponent.prototype.init = function (index) {
            document.getElementById('content').innerHTML = this.components[index].init();
        };
        return AppComponent;
    }());
    var component = new AppComponent();
    var buttons = document.getElementsByClassName('b1');
    var _loop_1 = function (i) {
        buttons[i].addEventListener('click', function () {
            component.init(i);
        });
    };
    for (var i = 0; i < buttons.length; i++) {
        _loop_1(i);
    }

    var component$1 = new AppComponent();
    component$1.init(0);
    ImageService.clear();

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbGlicmVyaXMvYnJvd3Nlci1zdG9yYWdlLnRzIiwiLi4vc3JjL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZS50cyIsIi4uL3NyYy9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL2FwcC92aWV3cy9pbWFnZXMvaW1hZ2VzLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvdmlld3MvbXVzaWNzL211c2ljcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL3ZpZXdzL2ZpbG1zL2ZpbG1zLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2U8VD5cclxue1xyXG4gIHB1YmxpYyBrZXk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcpXHJcbiAge1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0T2JqZWN0KHZhbHVlOiBUKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMua2V5LCBzdHIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9iamVjdCgpOiBUXHJcbiAge1xyXG4gICAgY29uc3QgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KTtcclxuXHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5rZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyQWxsKCk6IHZvaWRcclxuICB7XHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJRW50aXR5IH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IEJyb3dzZXJTdG9yYWdlIH0gZnJvbSAnLi4vbGlicmVyaXMvYnJvd3Nlci1zdG9yYWdlJztcclxuXHJcbmludGVyZmFjZSBJU3RvcmFnZU1vZGVsPFRNb2RlbD5cclxue1xyXG4gIGluZGV4OiBudW1iZXI7XHJcbiAgbGlzdDogVE1vZGVsW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZTxUIGV4dGVuZHMgSUVudGl0eT5cclxue1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYnJvd3NlclN0b3JhZ2U6IEJyb3dzZXJTdG9yYWdlPElTdG9yYWdlTW9kZWw8VD4+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZylcclxuICB7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlID0gbmV3IEJyb3dzZXJTdG9yYWdlPElTdG9yYWdlTW9kZWw8VD4+KGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IFRbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuXHJcbiAgICBpZiAoc3RvcmFnZSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgY29uc3Qgc3RvcmFnZU9iajogSVN0b3JhZ2VNb2RlbDxUPiA9IHtcclxuICAgICAgICBpbmRleDogMCxcclxuICAgICAgICBsaXN0OiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGl0ZW0uaWQgPSBzdG9yYWdlT2JqLmluZGV4O1xyXG4gICAgICAgIHN0b3JhZ2VPYmoubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHN0b3JhZ2VPYmouaW5kZXgrKztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLnNldE9iamVjdChzdG9yYWdlT2JqKTtcclxuICAgICAgY29uc29sZS5sb2coc3RvcmFnZU9iaik7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGlmIChpdGVtLmlkID09PSAobnVsbCB8fCB1bmRlZmluZWQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGl0ZW0uaWQgPSBzdG9yYWdlLmluZGV4O1xyXG4gICAgICAgICAgc3RvcmFnZS5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICBzdG9yYWdlLmluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYnJvd3NlclN0b3JhZ2Uuc2V0T2JqZWN0KHN0b3JhZ2UpO1xyXG4gICAgICBjb25zb2xlLmxvZyhzdG9yYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPYmooKTogVFtdXHJcbiAge1xyXG4gICAgY29uc3QgYnJvd3NlclN0b3JhZ2VEYXRhID0gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuICAgIHJldHVybiBicm93c2VyU3RvcmFnZURhdGEgPyAgYnJvd3NlclN0b3JhZ2VEYXRhLmxpc3QgOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5icm93c2VyU3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElJbWFnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgSW1hZ2VTZXJ2aWNlQ2xhc3Ncclxue1xyXG4gIHByaXZhdGUgc3RvcmFnZSA9IG5ldyBTdG9yYWdlU2VydmljZTxJSW1hZ2VNb2RlbD4oJ2ltYWdlJyk7XHJcblxyXG4gIHB1YmxpYyBhZGQoaXRlbTogSUltYWdlTW9kZWwpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgaW1hZ2VMaXN0OiBJSW1hZ2VNb2RlbFtdID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgaW1hZ2VMaXN0LnB1c2goaXRlbSk7XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogSUltYWdlTW9kZWxbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBpbWFnZUxpc3QgPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGl0ZW1zKVxyXG4gICAge1xyXG4gICAgICBpbWFnZUxpc3QucHVzaChpbWFnZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgSW1hZ2VTZXJ2aWNlID0gbmV3IEltYWdlU2VydmljZUNsYXNzKCk7IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbWFnZXNDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgaW5pdCgpOiBzdHJpbmdcclxuICB7XHJcbiAgICByZXR1cm4gYCBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvLWhlYWRlclwiPlBob3RvPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1kYXRhXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXJsLXBob3RvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJmb3JtLWltYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08bGFiZWwgZm9yPVwiZm5hbWVcIj5VUkwgSU1BR0UgPC9sYWJlbD4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ1cmwtcGhvdG9cIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiVXJsIGltYWdlLi5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInN1Ym1pdFwiIFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8tY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8tbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3M9XCJwaG90b3NcIiBpZD1cInBob3Rvc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L29sPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1zaXplXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaW1hZ2VcIiBpZD1cImltYWdlXCIgc3JjPVwiaHR0cDovL3BsYWNlaG9sZC5pdC8zNTB4MzUwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIE11c2ljc0NvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIGluaXQoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWhlYWRlclwiPk5hbWUgdHJhY2s8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWRhdGFcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWxpc3RcIj4xPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWxpc3RcIj4yPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWxpc3RcIj4zPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWxpc3RcIj40PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWxpc3RcIj41PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWxpc3RcIj42PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWxpc3RcIj43PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWltYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1hZ2VzL2d1Zi5qcGdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtYXV0aG9yXCI+TmFtZSA6IEd1ZjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1uYW1lXCI+VHJhY2sgbmFtZSA6IEF6aW5vNzc3PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLXBsYXlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGF1ZGlvIGNvbnRyb2xzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSB0eXBlPVwiYXVkaW8vbXBlZ1wiIHNyYz1cImltYWdlcy8xNDIubXAzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYXVkaW8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgRmlsbXNDb21wb25lbnRcclxue1xyXG4gIHB1YmxpYyBpbml0KCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbG0taGVhZGVyXCI+RmlsbXM8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbS1kYXRhXCI+PC9kaXY+XHJcbiAgICBgO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbWFnZXNDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdzL2ltYWdlcy9pbWFnZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVzaWNzQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3cy9tdXNpY3MvbXVzaWNzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbG1zQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3cy9maWxtcy9maWxtcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHJpdmF0ZSBib29rc0NvbXBvbmVudCA9IG5ldyBJbWFnZXNDb21wb25lbnQoKTtcclxuICBwcml2YXRlIG11c2ljc0NvbXBvbmVudCA9IG5ldyBNdXNpY3NDb21wb25lbnQoKTtcclxuICBwcml2YXRlIGZpbG1zQ29tcG9uZW50ID0gbmV3IEZpbG1zQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnRzID0gW3RoaXMuYm9va3NDb21wb25lbnQsIHRoaXMubXVzaWNzQ29tcG9uZW50LCB0aGlzLmZpbG1zQ29tcG9uZW50XTtcclxuXHJcbiAgcHVibGljIGluaXQoaW5kZXg6IG51bWJlcik6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpLmlubmVySFRNTCA9IHRoaXMuY29tcG9uZW50c1tpbmRleF0uaW5pdCgpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY29tcG9uZW50ID0gbmV3IEFwcENvbXBvbmVudCgpO1xyXG5jb25zdCBidXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYjEnKTtcclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7IGkrKylcclxue1xyXG4gIGJ1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxyXG4gIHtcclxuICAgIGNvbXBvbmVudC5pbml0KGkpO1xyXG4gIH0pO1xyXG59IiwiaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAvYXBwLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCBjb21wb25lbnQgPSBuZXcgQXBwQ29tcG9uZW50KCk7XHJcbmNvbXBvbmVudC5pbml0KDApO1xyXG5cclxuLy8gY29uc3QgbXVzOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAnZnNmZmZmJ1xyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBtdXNzOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAnZ2dnZ2cnLFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBtdXNzczogSU11c2ljTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJ2FhYWFhJyxcclxuLy8gfTtcclxuLy9cclxuLy8gY29uc3QgbXVzc3NzOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAna2tra2tra2tra2snLFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBtdXNzc3NzOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAnbW1tbW1tbW1tbW0nLFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBhZGFkOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAnZXdlZWVlZWVlZScsXHJcbi8vIH07XHJcblxyXG4vL011c2ljU2VydmljZS5jbGVhcigpO1xyXG5JbWFnZVNlcnZpY2UuY2xlYXIoKTtcclxuXHJcbi8vIGNvbnN0IHg6IElNdXNpY01vZGVsW10gPSBbXHJcbi8vICAge25hbWU6ICdhc2QnfSxcclxuLy8gICB7bmFtZTogJ2ZmZid9LFxyXG4vLyAgIHtuYW1lOiAnZ2dnZyd9LFxyXG4vLyAgIHtuYW1lOiAnYXNkJ30sXHJcbi8vIF07XHJcbi8vXHJcbi8vIGNvbnN0IHk6IElNdXNpY01vZGVsW10gPSBbXHJcbi8vICAge25hbWU6ICdzc3MnfSxcclxuLy8gICB7bmFtZTogJ2RkZGQnfSxcclxuLy8gICB7bmFtZTogJ2ZmZmYnfSxcclxuLy8gICB7bmFtZTogJ2hoaGhoJ30sXHJcbi8vIF07XHJcbi8vXHJcbi8vIGNvbnN0IHo6IElNdXNpY01vZGVsID0ge1xyXG4vLyAgIG5hbWU6ICd6enp6enp6enp6eidcclxuLy8gfTtcclxuXHJcbi8vXHJcbi8vIGNvbnN0IHU6IElJbWFnZU1vZGVsW10gPSBbXHJcbi8vICAge25hbWU6ICc3Nzc3J30sXHJcbi8vICAge25hbWU6ICc4ODg4J30sXHJcbi8vICAge25hbWU6ICc5OTk5OSd9LFxyXG4vLyAgIHtuYW1lOiAnMzMzMzMnfSxcclxuLy8gXTtcclxuLy9cclxuLy8gY29uc3QgaTogSUltYWdlTW9kZWxbXSA9IFtcclxuLy8gICB7bmFtZTogJzk5OTk5OSd9LFxyXG4vLyAgIHtuYW1lOiAnMDAwMDAwJ30sXHJcbi8vICAge25hbWU6ICcwMDAwOTk5J30sXHJcbi8vICAge25hbWU6ICczMzMwODkwODAwMDMzJ30sXHJcbi8vIF07XHJcblxyXG4vL1xyXG4vLyBjb25zdCBpbWFnZTI6IElJbWFnZU1vZGVsID0ge1xyXG4vLyAgIG5hbWU6ICcyMjIyMjIyMjIyMjIyMicsXHJcbi8vIH07XHJcblxyXG4vLyBNdXNpY1NlcnZpY2UuYWRkQXJyYXkoeSk7XHJcbi8vIE11c2ljU2VydmljZS5hZGQoeik7XHJcbi8vIEltYWdlU2VydmljZS5hZGRBcnJheShpKTtcclxuXHJcbi8vSW1hZ2VTZXJ2aWNlLmFkZEFycmF5KHUpO1xyXG4vLyBNdXNpY1NlcnZpY2UuY2xlYXIoKTtcclxuXHJcbi8vXHJcblxyXG4vLyBjb25zdCB1cmxQaG90byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKTtcclxuLy8gY29uc3QgcGhvdG9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvcycpO1xyXG4vLyBsZXQgeCA9IDA7XHJcbi8vXHJcbi8vIHVybFBob3RvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpOiB2b2lkXHJcbi8vIHtcclxuLy8gICAvL0FkZCBVcmwgaW4gYm94IFwicGhvdG8tc2l6ZVwiXHJcbi8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJylbJ3NyYyddID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpWyd2YWx1ZSddO1xyXG4vL1xyXG4vLyB9KTtcclxuLy9cclxuLy8gY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0taW1hZ2UnKTtcclxuLy8gc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ3MnLCBmdW5jdGlvbiAoKTogdm9pZFxyXG4vLyB7XHJcbi8vICAgLy9DcmVhdGUgPGxpPiBhbmQgYWRkIGluIFwicGhvdG9zXCJcclxuLy8gICBjb25zdCBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbi8vICAgbmV3TGkuY2xhc3NOYW1lID0gJ3Bob3RvLWxpJztcclxuLy8gICBuZXdMaS5pbm5lckhUTUwgPSAnPHN0cm9uZz5Eb3dubG9hZCE8L3N0cm9uZz4g0KTQvtGC0L4gJyArICgrK3gpO1xyXG4vLyAgIGNvbnNvbGUubG9nKG5ld0xpKTtcclxuLy8gICBwaG90b3MuYXBwZW5kQ2hpbGQobmV3TGkpO1xyXG4vL1xyXG4vLyAgIGNvbnN0IHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJylbJ3ZhbHVlJ11cclxuLy8gICBjb25zdCB4ID0ge1xyXG4vLyAgICAgbGluayA6ICcnLFxyXG4vLyAgICAgbmFtZTogJycsXHJcbi8vICAgICBhdXRob3JGdWxsTmFtZTogJycsXHJcbi8vICAgICB0b3A6ICcnLFxyXG4vLyAgIH07XHJcbi8vICAgeC5saW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpWyd2YWx1ZSddO1xyXG4vLyAgIEltYWdlU2VydmljZS5hZGQoeCk7XHJcbi8vIH0pO1xyXG5cclxuLy9cclxuXHJcbi8vIGNvbnN0IHA6IElNdXNpY01vZGVsID0ge1xyXG4vLyAgIG5hbWU6ICc3ODg3J1xyXG4vLyB9O1xyXG5cclxuLy8gTXVzaWNTZXJ2aWNlLmFkZEFycmF5KHgpO1xyXG4vLyBJbWFnZVNlcnZpY2UuYWRkQXJyYXkodSk7XHJcblxyXG4vLyBJbWFnZVNlcnZpY2UuYWRkKHApO1xyXG4vLyBNdXNpY1NlcnZpY2UuYWRkQXJyYXkoeSk7XHJcbi8vIEltYWdlU2VydmljZS5hZGRBcnJheShpKTtcclxuXHJcbi8vXHJcbi8vIGNvbnN0IHogPSBbbXVzLCBtdXNzLCBtdXNzc107XHJcbi8vIGNvbnN0IGcgPSBbbXVzc3NzLCBtdXNzc3NzXTtcclxuLy8gTXVzaWNTZXJ2aWNlLmFkZEFycmF5KHopO1xyXG4vLyBNdXNpY1NlcnZpY2UuYWRkKGFkYWQpO1xyXG4vLyBNdXNpY1NlcnZpY2UuYWRkQXJyYXkoZyk7XHJcblxyXG4vLyBjb25zdCBpbWFnZTI6IElJbWFnZU1vZGVsID0ge1xyXG4vLyAgIG5hbWU6ICcyMjIyMjIyMjIyMjIyMicsXHJcbi8vIH07XHJcbi8vXHJcbi8vIGNvbnN0IGltYWdlMzogSUltYWdlTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJzMzMzMzMzMzMzMzMzMzMzMzJyxcclxuLy8gfTtcclxuXHJcbi8vIGNvbnN0IHpheiA9IFtpbWFnZTMsIGltYWdlMl07XHJcblxyXG4vLyBJbWFnZVNlcnZpY2UuYWRkQXJyYXkoemF6KTtcclxuXHJcbi8vIGNvbnN0IGltYWdlMzogSUZpbG1zTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3JyxcclxuLy8gfTtcclxuXHJcbi8vRmlsbVNlcnZpY2UuYWRkKGltYWdlMyk7XHJcblxyXG4vL011c2ljU2VydmljZS5hZGQobXVzKTtcclxuLy9NdXNpY1NlcnZpY2UuYWRkKG11c3MpO1xyXG5cclxuLy9jb25zdCB0ID0gTXVzaWNTZXJ2aWNlLmdldEFsbCgpO1xyXG4vL2NvbnNvbGUubG9nKCdmZmZmJywgdCk7XHJcblxyXG4vLy8vLy8gICAgICAvLy8vLy8gICAgICAvLy8vLy8gICAgICAvLy8vLy9cclxuXHJcbi8vIGludGVyZmFjZSBJTW9kZWxUZXN0XHJcbi8vIHtcclxuLy8gICBpZDogbnVtYmVyO1xyXG4vLyB9XHJcbi8vXHJcbi8vIGludGVyZmFjZSBJVGVzdFJlc3VsdFxyXG4vLyB7XHJcbi8vICAgaWQ6IG51bWJlcjtcclxuLy8gICBtZWdhSWQ6IHN0cmluZztcclxuLy8gfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vIGNsYXNzIEFcclxuLy8ge1xyXG4vLyAgIHB1YmxpYyB0ZXN0KG1vZGVsOiBJTW9kZWxUZXN0KTogdm9pZFxyXG4vLyAgIHtcclxuLy8gICAgIGNvbnN0IHAgPSBuZXcgUHJvc2xvaWthKCk7XHJcbi8vICAgICBwLnByb3MobW9kZWwpO1xyXG4vLyAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBjbGFzcyBQcm9zbG9pa2FcclxuLy8ge1xyXG4vLyAgIHB1YmxpYyBwcm9zKHByb3M6IElNb2RlbFRlc3QpOiB2b2lkXHJcbi8vICAge1xyXG4vLyAgICAgY29uc3QgYiA9IG5ldyBCKCk7XHJcbi8vICAgICBjb25zdCBjOiBJVGVzdFJlc3VsdCA9IHtcclxuLy8gICAgICAgaWQ6IHByb3MuaWQsXHJcbi8vICAgICAgIG1lZ2FJZDogJ2FzZGFzZCcgKyBwcm9zLmlkLFxyXG4vLyAgICAgfTtcclxuLy9cclxuLy8gICAgIGIudGVzdChjKTtcclxuLy8gICB9XHJcbi8vIH1cclxuLy9cclxuLy8gY2xhc3MgQlxyXG4vLyB7XHJcbi8vICAgcHVibGljIHRlc3QobW9kZWw6IElUZXN0UmVzdWx0KVxyXG4vLyAgIHtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnLCBtb2RlbCk7XHJcbi8vICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGNvbnN0IHg6IElNb2RlbFRlc3QgPSB7XHJcbi8vICAgaWQ6IDc3LFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBhID0g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
