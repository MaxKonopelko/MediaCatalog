(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
    'use strict';

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function Component(oldConstructor) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super.call(this) || this;
                _this.template = function () {
                    var _this = this;
                    setTimeout(function () {
                        if (typeof oldConstructor.prototype.onInit === 'function') {
                            oldConstructor.prototype.onInit.call(_this);
                        }
                    }, 1);
                    return oldConstructor.prototype.template.call(this);
                };
                return _this;
            }
            return class_1;
        }(oldConstructor));
    }

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
        StorageService.prototype.getById = function (id) {
            var objList = this.getObj();
            return objList.find(function (x) { return x.id === id; });
        };
        StorageService.prototype.getObj = function () {
            var browserStorageData = this.browserStorage.getObject();
            return browserStorageData ? browserStorageData.list : [];
        };
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
            }
        };
        StorageService.prototype.removeById = function (id) {
            var objList = this.getObj();
            var index = objList.findIndex(function (x) { return (x.id === id); });
            objList.splice(index, 1);
            this.browserStorage.clear();
            this.addArray(objList);
        };
        StorageService.prototype.clear = function () {
            this.browserStorage.clear();
        };
        return StorageService;
    }());

    function imageUrlIsValid(str) {
        var myRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
        return myRegex.test(str);
    }

    var ImageServiceClass = (function () {
        function ImageServiceClass() {
            this.storage = new StorageService('image');
        }
        ImageServiceClass.prototype.getId = function (id) {
            return this.storage.getById(id);
        };
        ImageServiceClass.prototype.get = function () {
            return this.storage.getObj();
        };
        ImageServiceClass.prototype.add = function (item) {
            if (item.name.length > 0 && imageUrlIsValid(item.link)) {
                var imageList = this.storage.getObj();
                imageList.push(item);
                this.storage.addArray(imageList);
            }
            else {
                alert('Image Url Invalid');
            }
        };
        ImageServiceClass.prototype.addArray = function (items) {
            var imageList = this.storage.getObj();
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var image = items_1[_i];
                imageList.push(image);
            }
            this.storage.addArray(imageList);
        };
        ImageServiceClass.prototype.removeById = function (id) {
            this.storage.removeById(id);
        };
        ImageServiceClass.prototype.clear = function () {
            this.storage.clear();
        };
        return ImageServiceClass;
    }());
    var ImageService = new ImageServiceClass();

    var ImagesContentComponent = (function () {
        function ImagesContentComponent() {
        }
        ImagesContentComponent.prototype.showImageById = function (id) {
            document.getElementById('image')['src'] = ImageService.getId(id).link;
        };
        ImagesContentComponent.prototype.showImageByLink = function (link) {
            document.getElementById('image')['src'] = link;
        };
        ImagesContentComponent.prototype.clear = function () {
            document.getElementById('image')['src'] = 'http://placehold.it/200x200';
        };
        ImagesContentComponent.prototype.template = function () {
            return "\n              <div class=\"photo-root\">  \n                     <div class=\"photo\">\n                        <div class=\"photo-size\">                                       \n                            <img class=\"image\" id=\"image\" src=\"http://placehold.it/200x200\">\n                        </div>\n                     </div>\n              </div>\n    ";
        };
        ImagesContentComponent = __decorate([
            Component
        ], ImagesContentComponent);
        return ImagesContentComponent;
    }());

    var ImagesListComponent = (function () {
        function ImagesListComponent() {
            var _this = this;
            this.imagesContentComponent = new ImagesContentComponent();
            this.addLiClickHandler = function (photos) {
                var liCollection = photos.querySelectorAll('span');
                var listArray = Array.from(liCollection);
                listArray.forEach(function (spanElement) {
                    spanElement.addEventListener('click', function () {
                        var id = parseInt(spanElement.dataset.id);
                        _this.imagesContentComponent.showImageById(id);
                        _this.refresh();
                    });
                });
            };
            this.addIClickHandler = function (photos) {
                var ICollection = photos.querySelectorAll('i');
                var listArray = Array.from(ICollection);
                listArray.forEach(function (iElement) {
                    iElement.addEventListener('click', function () {
                        var id = parseInt(iElement.dataset.id);
                        ImageService.removeById(id);
                        _this.refresh();
                        _this.imagesContentComponent.clear();
                    });
                });
            };
        }
        ImagesListComponent.prototype.onInit = function () {
            this.refresh();
        };
        ImagesListComponent.prototype.refresh = function () {
            var images = ImageService.get();
            var photos = document.getElementById('photos');
            var str = '';
            images.forEach(function (image) {
                str += "\n             <li id=\"photo-li\" class=\"photo-li\" data-id=" + image.id + ">\n                <span id=\"photo-span\" data-id=" + image.id + " class=\"photo-span\" ><strong>Photo:  </strong> " + image.name + "\n                </span>\n                <i id='fa-close' class=\"fa fa-close\" data-id=" + image.id + " style=\"font-size:24px\"></i>\n             </li>\n      ";
            });
            photos.innerHTML = str;
            this.addLiClickHandler(photos);
            this.addIClickHandler(photos);
        };
        ImagesListComponent.prototype.template = function () {
            return "\n              <div class=\"photo-list\">\n                     <ol class=\"photos\" id=\"photos\"></ol>\n               </div>       \n            ";
        };
        ImagesListComponent = __decorate([
            Component
        ], ImagesListComponent);
        return ImagesListComponent;
    }());

    var ImagesUrlComponent = (function () {
        function ImagesUrlComponent() {
            var _this = this;
            this._photoList = new ImagesListComponent();
            this._imagesContentComponent = new ImagesContentComponent();
            this.handleChange = function () {
                var value = document.getElementById('url-photo')['value'];
                _this._imagesContentComponent.showImageByLink(value);
            };
            this.handleSubmit = function (event) {
                event.preventDefault();
                var urlPhoto = document.getElementById('url-photo');
                var image = {
                    link: urlPhoto['value'],
                    name: document.getElementById('url-name')['value'],
                    authorFullName: '',
                    top: '',
                };
                ImageService.add(image);
                _this._photoList.refresh();
                _this.resetForm();
            };
        }
        ImagesUrlComponent.prototype.onInit = function () {
            document.getElementById('url-photo').addEventListener('change', this.handleChange);
            document.getElementById('form-image').addEventListener('submit', this.handleSubmit);
        };
        ImagesUrlComponent.prototype.resetForm = function () {
            document.getElementById('url-photo')['value'] = '';
            document.getElementById('url-name')['value'] = '';
        };
        ImagesUrlComponent.prototype.template = function () {
            return "\n               <div>  \n                    <div>\n                        <form id=\"form-image\">\n                              <!--<label for=\"fname\">URL IMAGE </label>-->\n                              <input type=\"text\" id=\"url-photo\" placeholder=\"Url image..\">\n                              <input type=\"text\" id=\"url-name\" value=\"\" placeholder=\"Image name..\">                    \n                              <input type=\"submit\" id=\"submit\" value=\"Save\">\n                        </form>\n                    </div>\n               </div>    \n    ";
        };
        ImagesUrlComponent = __decorate([
            Component
        ], ImagesUrlComponent);
        return ImagesUrlComponent;
    }());

    var ImagesComponent = (function () {
        function ImagesComponent() {
            this._urlComponent = new ImagesUrlComponent();
            this._photoContentComponent = new ImagesContentComponent();
            this._photoList = new ImagesListComponent();
        }
        ImagesComponent.prototype.onInit = function () {
            document.getElementById('url-root').innerHTML += this._urlComponent.template();
            document.getElementById('photo-root').innerHTML += this._photoContentComponent.template();
            document.getElementById('photo-root').innerHTML += this._photoList.template();
        };
        ImagesComponent.prototype.template = function () {
            return " \n            <div class=\"photo-header\">Photo</div>\n            <div id=\"photo-data\" class=\"photo-data\"> \n                 <div id=\"url-root\" class=\"url-root\"></div>          \n                 <div id=\"photo-root\" class=\"photo-root\"></div>     \n            </div>\n    ";
        };
        ImagesComponent = __decorate([
            Component
        ], ImagesComponent);
        return ImagesComponent;
    }());

    var FilmsComponent = (function () {
        function FilmsComponent() {
        }
        FilmsComponent.prototype.template = function () {
            return "\n        <div class=\"film-header\">Films</div>\n        <div class=\"film-data\"></div>\n    ";
        };
        return FilmsComponent;
    }());

    var MusicsComponent = (function () {
        function MusicsComponent() {
        }
        MusicsComponent.prototype.template = function () {
            return "\n            <div class=\"music-header\">Name track</div>\n            <div class=\"music-data\">\n                <div class=\"music-list\">\n                    <div class=\"track-list\">1</div>\n                    <div class=\"track-list\">2</div>\n                    <div class=\"track-list\">3</div>\n                    <div class=\"track-list\">4</div>\n                    <div class=\"track-list\">5</div>\n                    <div class=\"track-list\">6</div>\n                    <div class=\"track-list\">7</div>\n                </div>\n                <div class=\"music-content\">\n                    <div class=\"music-image\">\n                        <img src=\"images/guf.jpg\">\n                    </div>\n                    <div class=\"music-author\">Name : Guf</div>\n                    <div class=\"music-name\">Track name : Azino777</div>\n                    <div class=\"music-play\">\n                        <audio controls>\n                            <source type=\"audio/mpeg\" src=\"images/142.mp3\">\n                        </audio>\n                    </div>\n\n                </div>\n            </div>\n    ";
        };
        return MusicsComponent;
    }());

    var MainComponent = (function () {
        function MainComponent() {
            this._imagesComponent = new ImagesComponent();
            this._musicsComponent = new MusicsComponent();
            this._filmsComponent = new FilmsComponent();
            this.handleSubmit = function (e, component) {
                document.getElementById('content').innerHTML = component.template();
            };
        }
        MainComponent.prototype.onInit = function () {
            var _this = this;
            this.handleSubmit(null, this._imagesComponent);
            document.getElementById('fl1').addEventListener('click', function (e) { return _this.handleSubmit(e, _this._imagesComponent); });
            document.getElementById('fl2').addEventListener('click', function (e) { return _this.handleSubmit(e, _this._musicsComponent); });
            document.getElementById('fl3').addEventListener('click', function (e) { return _this.handleSubmit(e, _this._filmsComponent); });
        };
        MainComponent.prototype.template = function () {
            return "\n            <div class=\"menu\">\n                 <div class=\"b1\" id=\"fl1\"><i class=\"fa fa-youtube-play\" style=\"font-size:36px\"></i>\u0424\u043E\u0442\u043E</div>\n                 <div class=\"b1\" id=\"fl2\"><i class=\"fa fa-music\" style=\"font-size:36px\"></i>\u041C\u0443\u0437\u044B\u043A\u0430</div>\n                 <div class=\"b1\" id=\"fl3\"><i class=\"fa fa-photo\" style=\"font-size:36px;\"></i>\u0424\u0438\u043B\u044C\u043C\u044B</div>\n            </div>\n            <div class=\"content\" id=\"content\"></div>";
        };
        MainComponent = __decorate([
            Component
        ], MainComponent);
        return MainComponent;
    }());

    var AuthComponent = (function () {
        function AuthComponent() {
        }
        AuthComponent.prototype.template = function () {
            return "\n                <form method=\"post\" action=\"\">\n                <input type=\"text\" name=\"login\" value=\"\" placeholder=\"\u041B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 Email\"><br>\n                <input type=\"password\" name=\"password\" value=\"\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C\"><br>\n                <input type=\"submit\" name=\"commit\" value=\"\u0412\u043E\u0439\u0442\u0438\">\n                </form>\n            ";
        };
        return AuthComponent;
    }());

    var AppComponent = (function () {
        function AppComponent() {
            this._authComponent = new AuthComponent();
            this._mainComponent = new MainComponent();
        }
        AppComponent.prototype.render = function () {
            document.getElementById('auth-root').innerHTML = this._authComponent.template();
            document.getElementById('main-root').innerHTML = this._mainComponent.template();
        };
        return AppComponent;
    }());

    var appComponent = new AppComponent();
    appComponent.render();

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbXBvbmVudC50cyIsIi4uL3NyYy9saWJyZXJpcy9icm93c2VyLXN0b3JhZ2UudHMiLCIuLi9zcmMvc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbW1vbi50cyIsIi4uL3NyYy9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL2FwcC9tYWluL2ltYWdlcy9pbWFnZXMtY29udGVudC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy1saXN0LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9pbWFnZXMvaW1hZ2VzLXVybC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vZmlsbXMvZmlsbXMuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljcy9tdXNpY3MuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL21haW5Db21wb25lbnQudHMiLCIuLi9zcmMvYXBwL2F1dGgvYXV0aC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL2FwcC5jb21wb25lbnQudHMiLCIuLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi9hcHAvdHlwZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudDxURnVuY3Rpb24gZXh0ZW5kcyBGdW5jdGlvbj4ob2xkQ29uc3RydWN0b3I6IHsgbmV3KCk6IElDb21wb25lbnQ7IH0pOiBhbnlcclxue1xyXG4gIHJldHVybiBjbGFzcyBleHRlbmRzIG9sZENvbnN0cnVjdG9yXHJcbiAge1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCk6IGFueVxyXG4gICAgICB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb2xkQ29uc3RydWN0b3IucHJvdG90eXBlLm9uSW5pdCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgb2xkQ29uc3RydWN0b3IucHJvdG90eXBlLm9uSW5pdC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgICAgIHJldHVybiBvbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUudGVtcGxhdGUuY2FsbCh0aGlzKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG59IiwiZXhwb3J0IGNsYXNzIEJyb3dzZXJTdG9yYWdlPFQ+XHJcbntcclxuICBwdWJsaWMga2V5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKVxyXG4gIHtcclxuICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE9iamVjdCh2YWx1ZTogVCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBzdHIgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgc3RyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPYmplY3QoKTogVFxyXG4gIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSk7XHJcblxyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMua2V5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhckFsbCgpOiB2b2lkXHJcbiAge1xyXG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUVudGl0eSB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBCcm93c2VyU3RvcmFnZSB9IGZyb20gJy4uL2xpYnJlcmlzL2Jyb3dzZXItc3RvcmFnZSc7XHJcblxyXG5pbnRlcmZhY2UgSVN0b3JhZ2VNb2RlbDxUTW9kZWw+XHJcbntcclxuICBpbmRleDogbnVtYmVyO1xyXG4gIGxpc3Q6IFRNb2RlbFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcmFnZVNlcnZpY2U8VCBleHRlbmRzIElFbnRpdHk+XHJcbntcclxuICBwcml2YXRlIHJlYWRvbmx5IGJyb3dzZXJTdG9yYWdlOiBCcm93c2VyU3RvcmFnZTxJU3RvcmFnZU1vZGVsPFQ+PjtcclxuXHJcbiAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcpXHJcbiAge1xyXG4gICAgdGhpcy5icm93c2VyU3RvcmFnZSA9IG5ldyBCcm93c2VyU3RvcmFnZTxJU3RvcmFnZU1vZGVsPFQ+PihrZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEJ5SWQoaWQ6IG51bWJlcik6IFRcclxuICB7XHJcbiAgICBjb25zdCBvYmpMaXN0OiBUW10gPSB0aGlzLmdldE9iaigpO1xyXG4gICAgcmV0dXJuIG9iakxpc3QuZmluZCh4ID0+IHguaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPYmooKTogVFtdXHJcbiAge1xyXG4gICAgY29uc3QgYnJvd3NlclN0b3JhZ2VEYXRhID0gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuICAgIHJldHVybiBicm93c2VyU3RvcmFnZURhdGEgPyBicm93c2VyU3RvcmFnZURhdGEubGlzdCA6IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEFycmF5KGl0ZW1zOiBUW10pOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuYnJvd3NlclN0b3JhZ2UuZ2V0T2JqZWN0KCk7XHJcblxyXG4gICAgaWYgKHN0b3JhZ2UgPT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2VPYmo6IElTdG9yYWdlTW9kZWw8VD4gPSB7XHJcbiAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgbGlzdDogW10sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpXHJcbiAgICAgIHtcclxuICAgICAgICBpdGVtLmlkID0gc3RvcmFnZU9iai5pbmRleDtcclxuICAgICAgICBzdG9yYWdlT2JqLmxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICBzdG9yYWdlT2JqLmluZGV4Kys7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5icm93c2VyU3RvcmFnZS5zZXRPYmplY3Qoc3RvcmFnZU9iaik7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGlmIChpdGVtLmlkID09PSAobnVsbCB8fCB1bmRlZmluZWQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGl0ZW0uaWQgPSBzdG9yYWdlLmluZGV4O1xyXG4gICAgICAgICAgc3RvcmFnZS5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICBzdG9yYWdlLmluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYnJvd3NlclN0b3JhZ2Uuc2V0T2JqZWN0KHN0b3JhZ2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUJ5SWQoaWQ6IG51bWJlcik6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBvYmpMaXN0ID0gdGhpcy5nZXRPYmooKTtcclxuICAgIGNvbnN0IGluZGV4ID0gb2JqTGlzdC5maW5kSW5kZXgoeCA9PiAoeC5pZCA9PT0gaWQpKTtcclxuICAgIG9iakxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMuYnJvd3NlclN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIHRoaXMuYWRkQXJyYXkob2JqTGlzdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuYnJvd3NlclN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29weTxUPihvYmo6IFQpOiBUXHJcbntcclxuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlVXJsSXNWYWxpZChzdHI6IHN0cmluZyk6IGJvb2xlYW5cclxue1xyXG4gIGNvbnN0IG15UmVnZXggPSAvKGh0dHBzPzpcXC9cXC8uKlxcLig/OnBuZ3xqcGd8anBlZ3xnaWYpKS9pO1xyXG4gIHJldHVybiBteVJlZ2V4LnRlc3Qoc3RyKTtcclxufSIsImltcG9ydCB7IElJbWFnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBpbWFnZVVybElzVmFsaWQgfSBmcm9tICcuLi9saWJyZXJpcy9jb21tb24nO1xyXG5cclxuY2xhc3MgSW1hZ2VTZXJ2aWNlQ2xhc3Ncclxue1xyXG4gIHByaXZhdGUgc3RvcmFnZSA9IG5ldyBTdG9yYWdlU2VydmljZTxJSW1hZ2VNb2RlbD4oJ2ltYWdlJyk7XHJcblxyXG4gIHB1YmxpYyBnZXRJZChpZDogbnVtYmVyKTogSUltYWdlTW9kZWxcclxuICB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCgpOiBJSW1hZ2VNb2RlbFtdXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaXRlbTogSUltYWdlTW9kZWwpOiB2b2lkXHJcbiAge1xyXG4gICAgaWYgKGl0ZW0ubmFtZS5sZW5ndGggPiAwICYmIGltYWdlVXJsSXNWYWxpZChpdGVtLmxpbmspKVxyXG4gICAge1xyXG4gICAgICBjb25zdCBpbWFnZUxpc3Q6IElJbWFnZU1vZGVsW10gPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICAgIGltYWdlTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgYWxlcnQoJ0ltYWdlIFVybCBJbnZhbGlkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IElJbWFnZU1vZGVsW10pOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgaW1hZ2VMaXN0ID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgZm9yIChjb25zdCBpbWFnZSBvZiBpdGVtcylcclxuICAgIHtcclxuICAgICAgaW1hZ2VMaXN0LnB1c2goaW1hZ2UpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGltYWdlTGlzdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgSW1hZ2VTZXJ2aWNlID0gbmV3IEltYWdlU2VydmljZUNsYXNzKCk7IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudFxuZXhwb3J0IGNsYXNzIEltYWdlc0NvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XG57XG4gIHB1YmxpYyBzaG93SW1hZ2VCeUlkKGlkOiBudW1iZXIpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKVsnc3JjJ10gPSBJbWFnZVNlcnZpY2UuZ2V0SWQoaWQpLmxpbms7XG4gIH1cblxuICBwdWJsaWMgc2hvd0ltYWdlQnlMaW5rKGxpbms6IHN0cmluZyk6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpWydzcmMnXSA9IGxpbms7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJylbJ3NyYyddID0gJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvMjAweDIwMCc7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICByZXR1cm4gYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8tcm9vdFwiPiAgXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1zaXplXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImltYWdlXCIgaWQ9XCJpbWFnZVwiIHNyYz1cImh0dHA6Ly9wbGFjZWhvbGQuaXQvMjAweDIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvaW1hZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBJbWFnZXNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtY29udGVudC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHJpdmF0ZSBpbWFnZXNDb250ZW50Q29tcG9uZW50ID0gbmV3IEltYWdlc0NvbnRlbnRDb21wb25lbnQoKTtcblxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcbiAge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2goKTogdm9pZFxuICB7XG4gICAgY29uc3QgaW1hZ2VzID0gSW1hZ2VTZXJ2aWNlLmdldCgpO1xuICAgIGNvbnN0IHBob3RvcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG90b3MnKTtcbiAgICBsZXQgc3RyID0gJyc7XG5cbiAgICBpbWFnZXMuZm9yRWFjaChpbWFnZSA9PlxuICAgIHtcbiAgICAgIHN0ciArPSBgXG4gICAgICAgICAgICAgPGxpIGlkPVwicGhvdG8tbGlcIiBjbGFzcz1cInBob3RvLWxpXCIgZGF0YS1pZD0ke2ltYWdlLmlkfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cInBob3RvLXNwYW5cIiBkYXRhLWlkPSR7aW1hZ2UuaWR9IGNsYXNzPVwicGhvdG8tc3BhblwiID48c3Ryb25nPlBob3RvOiAgPC9zdHJvbmc+ICR7aW1hZ2UubmFtZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGkgaWQ9J2ZhLWNsb3NlJyBjbGFzcz1cImZhIGZhLWNsb3NlXCIgZGF0YS1pZD0ke2ltYWdlLmlkfSBzdHlsZT1cImZvbnQtc2l6ZToyNHB4XCI+PC9pPlxuICAgICAgICAgICAgIDwvbGk+XG4gICAgICBgO1xuICAgIH0pO1xuICAgIHBob3Rvcy5pbm5lckhUTUwgPSBzdHI7XG5cbiAgICB0aGlzLmFkZExpQ2xpY2tIYW5kbGVyKHBob3Rvcyk7XG4gICAgdGhpcy5hZGRJQ2xpY2tIYW5kbGVyKHBob3Rvcyk7XG4gIH1cblxuICBwcml2YXRlIGFkZExpQ2xpY2tIYW5kbGVyID0gKHBob3RvczogSFRNTEVsZW1lbnQpID0+XG4gIHtcbiAgICBjb25zdCBsaUNvbGxlY3Rpb24gPSBwaG90b3MucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20obGlDb2xsZWN0aW9uKTtcblxuICAgIGxpc3RBcnJheS5mb3JFYWNoKHNwYW5FbGVtZW50ID0+XG4gICAge1xuICAgICAgc3BhbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAge1xuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KHNwYW5FbGVtZW50LmRhdGFzZXQuaWQpO1xuICAgICAgICB0aGlzLmltYWdlc0NvbnRlbnRDb21wb25lbnQuc2hvd0ltYWdlQnlJZChpZCk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcHVibGljIGFkZElDbGlja0hhbmRsZXIgPSAocGhvdG9zOiBIVE1MRWxlbWVudCkgPT5cbiAge1xuICAgIGNvbnN0IElDb2xsZWN0aW9uID0gcGhvdG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ2knKTtcbiAgICBjb25zdCBsaXN0QXJyYXkgPSBBcnJheS5mcm9tKElDb2xsZWN0aW9uKTtcblxuICAgIGxpc3RBcnJheS5mb3JFYWNoKGlFbGVtZW50ID0+XG4gICAge1xuICAgICAgaUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAge1xuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KGlFbGVtZW50LmRhdGFzZXQuaWQpO1xuICAgICAgICBJbWFnZVNlcnZpY2UucmVtb3ZlQnlJZChpZCk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB0aGlzLmltYWdlc0NvbnRlbnRDb21wb25lbnQuY2xlYXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIHJldHVybiBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3M9XCJwaG90b3NcIiBpZD1cInBob3Rvc1wiPjwvb2w+XG4gICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgXG4gICAgICAgICAgICBgO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEltYWdlc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy1jb250ZW50LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnRcbmV4cG9ydCBjbGFzcyBJbWFnZXNVcmxDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XG57XG4gIHByaXZhdGUgX3Bob3RvTGlzdCA9IG5ldyBJbWFnZXNMaXN0Q29tcG9uZW50KCk7XG4gIHByaXZhdGUgX2ltYWdlc0NvbnRlbnRDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29udGVudENvbXBvbmVudCgpO1xuXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS1pbWFnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuaGFuZGxlU3VibWl0KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDaGFuZ2UgPSAoKSA9PlxuICB7XG4gICAgY29uc3QgdmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJylbJ3ZhbHVlJ107XG4gICAgdGhpcy5faW1hZ2VzQ29udGVudENvbXBvbmVudC5zaG93SW1hZ2VCeUxpbmsodmFsdWUpO1xuICB9O1xuXG4gIHB1YmxpYyBoYW5kbGVTdWJtaXQgPSAoZXZlbnQ6IEV2ZW50KSA9PlxuICB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB1cmxQaG90byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKTtcblxuICAgIGNvbnN0IGltYWdlID0ge1xuICAgICAgbGluazogdXJsUGhvdG9bJ3ZhbHVlJ10sXG4gICAgICBuYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW5hbWUnKVsndmFsdWUnXSxcbiAgICAgIGF1dGhvckZ1bGxOYW1lOiAnJyxcbiAgICAgIHRvcDogJycsXG4gICAgfTtcblxuICAgIEltYWdlU2VydmljZS5hZGQoaW1hZ2UpO1xuICAgIHRoaXMuX3Bob3RvTGlzdC5yZWZyZXNoKCk7XG5cbiAgICB0aGlzLnJlc2V0Rm9ybSgpO1xuICB9O1xuXG4gIHB1YmxpYyByZXNldEZvcm0oKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpWyd2YWx1ZSddID0gJyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1uYW1lJylbJ3ZhbHVlJ10gPSAnJztcbiAgfVxuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIHJldHVybiBgXG4gICAgICAgICAgICAgICA8ZGl2PiAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cImZvcm0taW1hZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08bGFiZWwgZm9yPVwiZm5hbWVcIj5VUkwgSU1BR0UgPC9sYWJlbD4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidXJsLXBob3RvXCIgcGxhY2Vob2xkZXI9XCJVcmwgaW1hZ2UuLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ1cmwtbmFtZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJJbWFnZSBuYW1lLi5cIj4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgIDwvZGl2PiAgICBcbiAgICBgO1xuICB9XG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNVcmxDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy11cmwuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtbGlzdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxue1xuICBwcml2YXRlIF91cmxDb21wb25lbnQgPSBuZXcgSW1hZ2VzVXJsQ29tcG9uZW50KCk7XG4gIHByaXZhdGUgX3Bob3RvQ29udGVudENvbXBvbmVudCA9IG5ldyBJbWFnZXNDb250ZW50Q29tcG9uZW50KCk7XG4gIHByaXZhdGUgX3Bob3RvTGlzdCA9IG5ldyBJbWFnZXNMaXN0Q29tcG9uZW50KCk7XG5cbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fdXJsQ29tcG9uZW50LnRlbXBsYXRlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fcGhvdG9Db250ZW50Q29tcG9uZW50LnRlbXBsYXRlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fcGhvdG9MaXN0LnRlbXBsYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICByZXR1cm4gYCBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1oZWFkZXJcIj5QaG90bzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBpZD1cInBob3RvLWRhdGFcIiBjbGFzcz1cInBob3RvLWRhdGFcIj4gXG4gICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ1cmwtcm9vdFwiIGNsYXNzPVwidXJsLXJvb3RcIj48L2Rpdj4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwaG90by1yb290XCIgY2xhc3M9XCJwaG90by1yb290XCI+PC9kaXY+ICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cbiIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsbXNDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbS1oZWFkZXJcIj5GaWxtczwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxtLWRhdGFcIj48L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTXVzaWNzQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1oZWFkZXJcIj5OYW1lIHRyYWNrPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1kYXRhXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1saXN0XCI+MTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1saXN0XCI+MjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1saXN0XCI+MzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1saXN0XCI+NDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1saXN0XCI+NTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1saXN0XCI+NjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1saXN0XCI+NzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1pbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImltYWdlcy9ndWYuanBnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWF1dGhvclwiPk5hbWUgOiBHdWY8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtbmFtZVwiPlRyYWNrIG5hbWUgOiBBemlubzc3NzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1wbGF5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhdWRpbyBjb250cm9scz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2UgdHlwZT1cImF1ZGlvL21wZWdcIiBzcmM9XCJpbWFnZXMvMTQyLm1wM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2F1ZGlvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IHsgSW1hZ2VzQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMvaW1hZ2VzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbG1zQ29tcG9uZW50IH0gZnJvbSAnLi9maWxtcy9maWxtcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NDb21wb25lbnQgfSBmcm9tICcuL211c2ljcy9tdXNpY3MuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE1haW5Db21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9pbWFnZXNDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbXVzaWNzQ29tcG9uZW50ID0gbmV3IE11c2ljc0NvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX2ZpbG1zQ29tcG9uZW50ID0gbmV3IEZpbG1zQ29tcG9uZW50KCk7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaGFuZGxlU3VibWl0KG51bGwsIHRoaXMuX2ltYWdlc0NvbXBvbmVudCk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX2ltYWdlc0NvbXBvbmVudCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX211c2ljc0NvbXBvbmVudCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX2ZpbG1zQ29tcG9uZW50KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVN1Ym1pdCA9IChlOiBFdmVudCwgY29tcG9uZW50OiBJQ29tcG9uZW50KSA9PlxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51XCI+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImIxXCIgaWQ9XCJmbDFcIj48aSBjbGFzcz1cImZhIGZhLXlvdXR1YmUtcGxheVwiIHN0eWxlPVwiZm9udC1zaXplOjM2cHhcIj48L2k+0KTQvtGC0L48L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsMlwiPjxpIGNsYXNzPVwiZmEgZmEtbXVzaWNcIiBzdHlsZT1cImZvbnQtc2l6ZTozNnB4XCI+PC9pPtCc0YPQt9GL0LrQsDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiMVwiIGlkPVwiZmwzXCI+PGkgY2xhc3M9XCJmYSBmYS1waG90b1wiIHN0eWxlPVwiZm9udC1zaXplOjM2cHg7XCI+PC9pPtCk0LjQu9GM0LzRizwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIiBpZD1cImNvbnRlbnRcIj48L2Rpdj5gO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXV0aENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgPGZvcm0gbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cIlwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxvZ2luXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cItCb0L7Qs9C40L0g0LjQu9C4IEVtYWlsXCI+PGJyPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCLQn9Cw0YDQvtC70YxcIj48YnI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJjb21taXRcIiB2YWx1ZT1cItCS0L7QudGC0LhcIj5cclxuICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgYDtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBNYWluQ29tcG9uZW50IH0gZnJvbSAnLi9tYWluL21haW5Db21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2F1dGguY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgX2F1dGhDb21wb25lbnQgPSBuZXcgQXV0aENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX21haW5Db21wb25lbnQgPSBuZXcgTWFpbkNvbXBvbmVudCgpO1xyXG5cclxuICBwdWJsaWMgcmVuZGVyKCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aC1yb290JykuaW5uZXJIVE1MID0gdGhpcy5fYXV0aENvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tcm9vdCcpLmlubmVySFRNTCA9IHRoaXMuX21haW5Db21wb25lbnQudGVtcGxhdGUoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC9hcHAuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IGFwcENvbXBvbmVudCA9IG5ldyBBcHBDb21wb25lbnQoKTtcclxuYXBwQ29tcG9uZW50LnJlbmRlcigpO1xyXG5cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7O0lBZ0JBLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0lBQ3pDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoRixJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUUvRSxJQUFPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDaEMsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0FBRUQsSUFrQk8sU0FBUyxVQUFVLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0lBQzFELElBQUksSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pJLElBQUksSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuSSxTQUFTLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENB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
