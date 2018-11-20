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
            var storageObj = this.browserStorage.getObject();
            var index = storageObj.list.findIndex(function (x) { return (x.id === id); });
            storageObj.list.splice(index, 1);
            this.clear();
            this.browserStorage.setObject(storageObj);
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
            var element = document.getElementById('url-photo');
            if (item.name.length > 0 && imageUrlIsValid(item.link)) {
                element.style.border = '1px solid #ccc';
                var imageList = this.storage.getObj();
                imageList.push(item);
                this.storage.addArray(imageList);
            }
            else {
                element.style.border = '2px solid crimson';
                element.style.transition = '1s';
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
            return "\n              <div class= \"photo-content\">  \n                     <div class=\"photo\">\n                        <div class=\"photo-size\">                                       \n                            <img class=\"image\" id=\"image\" src=\"http://placehold.it/200x200\">\n                        </div>\n                     </div>\n              </div>\n    ";
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
            this.addSpanClickHandler = function (photos) {
                var spanCollection = photos.querySelectorAll('span');
                var listArray = Array.from(spanCollection);
                listArray.forEach(function (spanElement) {
                    spanElement.addEventListener('click', function () {
                        var parent = spanElement.parentElement;
                        var id = parseInt(parent.dataset.id);
                        _this.activeId = id;
                        _this.imagesContentComponent.showImageById(id);
                        _this.refresh();
                        _this.activateElement();
                    });
                });
            };
            this.activateElement = function () {
                console.log('activateElement', _this.activeId);
                var liCollection = document.querySelectorAll('.photos li');
                var listLi = Array.from(liCollection);
                var liElem = listLi.find(function (le) { return parseInt(le.getAttribute('data-id')) === _this.activeId; });
                liElem.classList.add('newSpan');
            };
            this.addIClickHandler = function (photos) {
                var ICollection = photos.querySelectorAll('i');
                var listArray = Array.from(ICollection);
                listArray.forEach(function (iElement) {
                    iElement.addEventListener('click', function () {
                        var parent = iElement.parentElement;
                        var id = parseInt(parent.dataset.id);
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
        ImagesListComponent.prototype.add = function (image) {
            ImageService.add(image);
            this.refresh();
            this.activeId = this.buffer;
            this.activateElement();
        };
        ImagesListComponent.prototype.refresh = function () {
            var _this = this;
            var images = ImageService.get();
            var photos = document.getElementById('photos');
            var str = '';
            images.forEach(function (image) {
                console.log('this.activeId', _this.activeId);
                _this.buffer = image.id;
                str += "\n             <li id=\"photo-li\" class=\"photo-li\" data-id=" + image.id + ">\n                <span id=\"photo-span\" class=\"photo-span\" ><strong>" + image.id + ". Photo: </strong> " + image.name + "\n                </span>\n                <i id='fa-close' class=\"fa fa-close\" style=\"font-size:24px\"></i>\n             </li>\n      ";
            });
            photos.innerHTML = str;
            this.addSpanClickHandler(photos);
            this.addIClickHandler(photos);
        };
        ImagesListComponent.prototype.template = function () {
            return "\n              <div class=\"photo-list\">\n                     <ul class=\"photos\" id=\"photos\"></ul>\n               </div>       \n            ";
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
                _this._photoList.add(image);
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
            return "        \n                    <div class=\"form-url\">\n                        <form id=\"form-image\" class=\"form\">\n                              <div class=\"col-3\">\n                              <input class=\"effect-7\" id=\"url-photo\" type=\"text\" placeholder=\"Url image..\">\n                                  <span class=\"focus-border\">\n                                    <i></i>\n                                  </span>\n                              </div>\n                              <div class=\"col-3\">\n                                  <input class=\"effect-7\" id=\"url-name\"  type=\"text\" placeholder=\"Image name..\">\n                                    <span class=\"focus-border\">\n                                      <i></i>\n                                    </span>\n                              </div>\n                              <div class=\"col-3\">\n                                <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\">\n                                  <span class=\"focus-border\">\n                                    <i></i>\n                                  </span>\n                              </div>\n                        </form>\n                    </div>          \n    ";
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
            return " \n            <div class=\"photo-header\">Photo Gallery</div>\n            <div id=\"photo-data\" class=\"photo-data\"> \n                 <div id=\"url-root\" class=\"url-root\"></div>          \n                 <div id=\"photo-root\" class=\"photo-root\"></div>     \n            </div>\n    ";
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

    var MusicsUrlComponent = (function () {
        function MusicsUrlComponent() {
        }
        MusicsUrlComponent.prototype.template = function () {
            return " \n                      <div class=\"form-url\">\n                          <form id=\"form-image\" class=\"form\">\n                                <div class=\"col-3\">\n                                <input class=\"effect-7\" id=\"url-photo\" type=\"text\" placeholder=\"Url music..\">\n                                    <span class=\"focus-border\">\n                                      <i></i>\n                                    </span>\n                                </div>\n                                <div class=\"col-3\">\n                                    <input class=\"effect-7\" id=\"url-name\"  type=\"text\" placeholder=\"Music name..\">\n                                      <span class=\"focus-border\">\n                                        <i></i>\n                                      </span>\n                                </div>\n                                <div class=\"col-3\">\n                                    <input class=\"effect-7\" id=\"url-author\"  type=\"text\" placeholder=\"Author name..\">\n                                      <span class=\"focus-border\">\n                                        <i></i>\n                                      </span>\n                                </div>\n                                <div class=\"col-3\">\n                                  <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\">\n                                    <span class=\"focus-border\">\n                                      <i></i>\n                                    </span>\n                                </div>\n                          </form>\n                      </div>";
        };
        MusicsUrlComponent = __decorate([
            Component
        ], MusicsUrlComponent);
        return MusicsUrlComponent;
    }());

    var MusicsListComponent = (function () {
        function MusicsListComponent() {
        }
        MusicsListComponent.prototype.template = function () {
            return " \n                  <div class=\"music-list\">\n                        <ul class=\"music-ul\" id=\"music-ul\">\n                              <li id=\"music-li\" class=\"music-li\" data-id=>1</li>\n                              <li id=\"music-li\" class=\"music-li\" data-id=>2</li>  \n                         </ul>\n                  </div>\n              ";
        };
        MusicsListComponent = __decorate([
            Component
        ], MusicsListComponent);
        return MusicsListComponent;
    }());

    var MusicsContentComponent = (function () {
        function MusicsContentComponent() {
        }
        MusicsContentComponent.prototype.template = function () {
            return "\n                  <div class=\"music-content\">\n                      <div class=\"music-block\"\n                          <div class=\"music-image\"><img src=\"images/guf.jpg\">\n                          <div class=\"music-author\">Name : Guf</div>\n                          <div class=\"music-name\">Track name : Azino777</div>\n                          <div class=\"music-play\">\n                              <audio controls>\n                                  <source type=\"audio/mpeg\" src=\"https://cs9-8v4.vkuseraudio.net/p2/9004a79e477150.mp3\">\n                              </audio>\n                          </div>\n                       </div>\n                    </div>\n                  </div> ";
        };
        MusicsContentComponent = __decorate([
            Component
        ], MusicsContentComponent);
        return MusicsContentComponent;
    }());

    var MusicsComponent = (function () {
        function MusicsComponent() {
            this._urlComponent = new MusicsUrlComponent();
            this._musicList = new MusicsListComponent();
            this._musicContentComponent = new MusicsContentComponent();
        }
        MusicsComponent.prototype.onInit = function () {
            document.getElementById('url-root').innerHTML += this._urlComponent.template();
            document.getElementById('music-root').innerHTML += this._musicList.template();
            document.getElementById('music-root').innerHTML += this._musicContentComponent.template();
        };
        MusicsComponent.prototype.template = function () {
            return "\n            <div class=\"music-header\">Music</div>\n            <div class=\"music-data\">\n                <div id=\"url-root\" class=\"url-root\"></div>    \n                <div id=\"music-root\" class=\"music-root\"></div>\n            </div>\n    ";
        };
        MusicsComponent = __decorate([
            Component
        ], MusicsComponent);
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
            return "\n            <div class=\"menu\">\n                 <div class=\"b1\" id=\"fl1\"><i class=\"fa fa-youtube-play\" style=\"font-size:36px\"></i>Photo</div>\n                 <div class=\"b1\" id=\"fl2\"><i class=\"fa fa-music\" style=\"font-size:36px\"></i>Music</div>\n                 <div class=\"b1\" id=\"fl3\"><i class=\"fa fa-photo\" style=\"font-size:36px;\"></i>Film</div>\n            </div>\n            <div class=\"content\" id=\"content\"></div>";
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
            return "    \n                <!-- Login form -->\n                <form id=\"login\">\n                  <div class=\"alert error\">Invalid username or password!</div>\n                  <fieldset>\n                    <input name=\"email\" placeholder=\"Username\" type=\"email\" /><i class=\"fa fa-user\"></i>\n                  </fieldset>\n                  <fieldset>\n                    <input name=\"password\" placeholder=\"Password\" type=\"password\" /><i class=\"fa fa-lock\"></i>\n                  </fieldset>\n                    <fieldset class=\"f-left\">\n                        <input checked=\"checked\" class=\"rememberMeCheck\" name=\"RememberMe\" id=\"RememberMe\" type=\"checkbox\" value=\"1\" />\n                        <label for=\"RememberMe\">Remember me</label>\n                    </fieldset>\n                    <input class=\"f-right\" name=\"Login\" type=\"submit\" value=\"Login\" />\n                </form>\n            ";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbXBvbmVudC50cyIsIi4uL3NyYy9saWJyZXJpcy9icm93c2VyLXN0b3JhZ2UudHMiLCIuLi9zcmMvc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbW1vbi50cyIsIi4uL3NyYy9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL2FwcC9tYWluL2ltYWdlcy9pbWFnZXMtY29udGVudC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy1saXN0LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9pbWFnZXMvaW1hZ2VzLXVybC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vZmlsbXMvZmlsbXMuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljcy9tdXNpY3MtdXJsLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9tdXNpY3MvbXVzaWNzLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljcy9tdXNpY3MtY29udGVudC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbXVzaWNzL211c2ljcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbWFpbkNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvYXV0aC9hdXRoLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL2FwcC90eXBlcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50PFRGdW5jdGlvbiBleHRlbmRzIEZ1bmN0aW9uPihvbGRDb25zdHJ1Y3RvcjogeyBuZXcoKTogSUNvbXBvbmVudDsgfSk6IGFueVxyXG57XHJcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgb2xkQ29uc3RydWN0b3JcclxuICB7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKTogYW55XHJcbiAgICAgIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUub25Jbml0ID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBvbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUub25Jbml0LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG9sZENvbnN0cnVjdG9yLnByb3RvdHlwZS50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcbn0iLCJleHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2U8VD5cclxue1xyXG4gIHB1YmxpYyBrZXk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcpXHJcbiAge1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0T2JqZWN0KHZhbHVlOiBUKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMua2V5LCBzdHIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9iamVjdCgpOiBUXHJcbiAge1xyXG4gICAgY29uc3QgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KTtcclxuXHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5rZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyQWxsKCk6IHZvaWRcclxuICB7XHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJRW50aXR5IH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IEJyb3dzZXJTdG9yYWdlIH0gZnJvbSAnLi4vbGlicmVyaXMvYnJvd3Nlci1zdG9yYWdlJztcclxuXHJcbmludGVyZmFjZSBJU3RvcmFnZU1vZGVsPFRNb2RlbD5cclxue1xyXG4gIGluZGV4OiBudW1iZXI7XHJcbiAgbGlzdDogVE1vZGVsW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZTxUIGV4dGVuZHMgSUVudGl0eT5cclxue1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYnJvd3NlclN0b3JhZ2U6IEJyb3dzZXJTdG9yYWdlPElTdG9yYWdlTW9kZWw8VD4+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZylcclxuICB7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlID0gbmV3IEJyb3dzZXJTdG9yYWdlPElTdG9yYWdlTW9kZWw8VD4+KGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QnlJZChpZDogbnVtYmVyKTogVFxyXG4gIHtcclxuICAgIGNvbnN0IG9iakxpc3Q6IFRbXSA9IHRoaXMuZ2V0T2JqKCk7XHJcbiAgICByZXR1cm4gb2JqTGlzdC5maW5kKHggPT4geC5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9iaigpOiBUW11cclxuICB7XHJcbiAgICBjb25zdCBicm93c2VyU3RvcmFnZURhdGEgPSB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG4gICAgcmV0dXJuIGJyb3dzZXJTdG9yYWdlRGF0YSA/IGJyb3dzZXJTdG9yYWdlRGF0YS5saXN0IDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IFRbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuXHJcbiAgICBpZiAoc3RvcmFnZSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgY29uc3Qgc3RvcmFnZU9iajogSVN0b3JhZ2VNb2RlbDxUPiA9IHtcclxuICAgICAgICBpbmRleDogMCxcclxuICAgICAgICBsaXN0OiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGl0ZW0uaWQgPSBzdG9yYWdlT2JqLmluZGV4O1xyXG4gICAgICAgIHN0b3JhZ2VPYmoubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHN0b3JhZ2VPYmouaW5kZXgrKztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLnNldE9iamVjdChzdG9yYWdlT2JqKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKGl0ZW0uaWQgPT09IChudWxsIHx8IHVuZGVmaW5lZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaXRlbS5pZCA9IHN0b3JhZ2UuaW5kZXg7XHJcbiAgICAgICAgICBzdG9yYWdlLmxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgIHN0b3JhZ2UuaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5icm93c2VyU3RvcmFnZS5zZXRPYmplY3Qoc3RvcmFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0b3JhZ2VPYmogPSB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG4gICAgY29uc3QgaW5kZXggPSBzdG9yYWdlT2JqLmxpc3QuZmluZEluZGV4KHggPT4gKHguaWQgPT09IGlkKSk7XHJcbiAgICBzdG9yYWdlT2JqLmxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLnNldE9iamVjdChzdG9yYWdlT2JqKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5icm93c2VyU3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3B5PFQ+KG9iajogVCk6IFRcclxue1xyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VVcmxJc1ZhbGlkKHN0cjogc3RyaW5nKTogYm9vbGVhblxyXG57XHJcbiAgY29uc3QgbXlSZWdleCA9IC8oaHR0cHM/OlxcL1xcLy4qXFwuKD86cG5nfGpwZ3xqcGVnfGdpZikpL2k7XHJcbiAgcmV0dXJuIG15UmVnZXgudGVzdChzdHIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFeGlzdEh0bWxJbkRPTShlbGVtZW50OiBIVE1MRWxlbWVudClcclxue1xyXG4gIHJldHVybiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsZW1lbnQpO1xyXG59IiwiaW1wb3J0IHsgSUltYWdlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IGltYWdlVXJsSXNWYWxpZCB9IGZyb20gJy4uL2xpYnJlcmlzL2NvbW1vbic7XHJcblxyXG5jbGFzcyBJbWFnZVNlcnZpY2VDbGFzc1xyXG57XHJcbiAgcHJpdmF0ZSBzdG9yYWdlID0gbmV3IFN0b3JhZ2VTZXJ2aWNlPElJbWFnZU1vZGVsPignaW1hZ2UnKTtcclxuXHJcbiAgcHVibGljIGdldElkKGlkOiBudW1iZXIpOiBJSW1hZ2VNb2RlbFxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0QnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0KCk6IElJbWFnZU1vZGVsW11cclxuICB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZChpdGVtOiBJSW1hZ2VNb2RlbCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpO1xyXG5cclxuICAgIGlmIChpdGVtLm5hbWUubGVuZ3RoID4gMCAmJiBpbWFnZVVybElzVmFsaWQoaXRlbS5saW5rKSlcclxuICAgIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICNjY2MnO1xyXG5cclxuICAgICAgY29uc3QgaW1hZ2VMaXN0OiBJSW1hZ2VNb2RlbFtdID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgICBpbWFnZUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGltYWdlTGlzdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCBjcmltc29uJztcclxuICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJzFzJztcclxuXHJcbiAgICAgIGFsZXJ0KCdJbWFnZSBVcmwgSW52YWxpZCcpO1xyXG4gICAgICAvLyBUT0RPXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IElJbWFnZU1vZGVsW10pOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgaW1hZ2VMaXN0ID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgZm9yIChjb25zdCBpbWFnZSBvZiBpdGVtcylcclxuICAgIHtcclxuICAgICAgaW1hZ2VMaXN0LnB1c2goaW1hZ2UpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGltYWdlTGlzdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgSW1hZ2VTZXJ2aWNlID0gbmV3IEltYWdlU2VydmljZUNsYXNzKCk7IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudFxuZXhwb3J0IGNsYXNzIEltYWdlc0NvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XG57XG4gIHB1YmxpYyBzaG93SW1hZ2VCeUlkKGlkOiBudW1iZXIpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKVsnc3JjJ10gPSBJbWFnZVNlcnZpY2UuZ2V0SWQoaWQpLmxpbms7XG4gIH1cblxuICBwdWJsaWMgc2hvd0ltYWdlQnlMaW5rKGxpbms6IHN0cmluZyk6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpWydzcmMnXSA9IGxpbms7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJylbJ3NyYyddID0gJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvMjAweDIwMCc7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICByZXR1cm4gYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSBcInBob3RvLWNvbnRlbnRcIj4gIFxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8tc2l6ZVwiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJpbWFnZVwiIGlkPVwiaW1hZ2VcIiBzcmM9XCJodHRwOi8vcGxhY2Vob2xkLml0LzIwMHgyMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn0iLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW1hZ2VzQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWNvbnRlbnQuY29tcG9uZW50JztcblxuQENvbXBvbmVudFxuZXhwb3J0IGNsYXNzIEltYWdlc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XG57XG4gIHByaXZhdGUgaW1hZ2VzQ29udGVudENvbXBvbmVudCA9IG5ldyBJbWFnZXNDb250ZW50Q29tcG9uZW50KCk7XG4gIHByaXZhdGUgYWN0aXZlSWQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBidWZmZXI6IG51bWJlcjtcblxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcbiAge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcHVibGljIGFkZChpbWFnZTogb2JqZWN0KTogdm9pZFxuICB7XG4gICAgSW1hZ2VTZXJ2aWNlLmFkZChpbWFnZSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgdGhpcy5hY3RpdmVJZCA9IHRoaXMuYnVmZmVyO1xuICAgIHRoaXMuYWN0aXZhdGVFbGVtZW50KCk7XG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaCgpOiB2b2lkXG4gIHtcbiAgICBjb25zdCBpbWFnZXMgPSBJbWFnZVNlcnZpY2UuZ2V0KCk7XG4gICAgY29uc3QgcGhvdG9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvcycpO1xuICAgIGxldCBzdHIgPSAnJztcblxuICAgIGltYWdlcy5mb3JFYWNoKGltYWdlID0+XG4gICAge1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMuYWN0aXZlSWQnLCB0aGlzLmFjdGl2ZUlkKTtcbiAgICAgIHRoaXMuYnVmZmVyID0gaW1hZ2UuaWQ7XG4gICAgICBzdHIgKz0gYFxuICAgICAgICAgICAgIDxsaSBpZD1cInBob3RvLWxpXCIgY2xhc3M9XCJwaG90by1saVwiIGRhdGEtaWQ9JHtpbWFnZS5pZH0+XG4gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJwaG90by1zcGFuXCIgY2xhc3M9XCJwaG90by1zcGFuXCIgPjxzdHJvbmc+JHtpbWFnZS5pZH0uIFBob3RvOiA8L3N0cm9uZz4gJHtpbWFnZS5uYW1lfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aSBpZD0nZmEtY2xvc2UnIGNsYXNzPVwiZmEgZmEtY2xvc2VcIiBzdHlsZT1cImZvbnQtc2l6ZToyNHB4XCI+PC9pPlxuICAgICAgICAgICAgIDwvbGk+XG4gICAgICBgO1xuICAgIH0pO1xuICAgIHBob3Rvcy5pbm5lckhUTUwgPSBzdHI7XG5cbiAgICB0aGlzLmFkZFNwYW5DbGlja0hhbmRsZXIocGhvdG9zKTtcbiAgICB0aGlzLmFkZElDbGlja0hhbmRsZXIocGhvdG9zKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkU3BhbkNsaWNrSGFuZGxlciA9IChwaG90b3M6IEhUTUxFbGVtZW50KSA9PlxuICB7XG4gICAgY29uc3Qgc3BhbkNvbGxlY3Rpb24gPSBwaG90b3MucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oc3BhbkNvbGxlY3Rpb24pO1xuXG4gICAgbGlzdEFycmF5LmZvckVhY2goc3BhbkVsZW1lbnQgPT5cbiAgICB7XG4gICAgICBzcGFuRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNwYW5FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocGFyZW50LmRhdGFzZXQuaWQpO1xuICAgICAgICB0aGlzLmFjdGl2ZUlkID0gaWQ7XG4gICAgICAgIHRoaXMuaW1hZ2VzQ29udGVudENvbXBvbmVudC5zaG93SW1hZ2VCeUlkKGlkKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVFbGVtZW50KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBwdWJsaWMgYWN0aXZhdGVFbGVtZW50ID0gKCkgPT5cbiAge1xuICAgIGNvbnNvbGUubG9nKCdhY3RpdmF0ZUVsZW1lbnQnLCB0aGlzLmFjdGl2ZUlkKTtcbiAgICBjb25zdCBsaUNvbGxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGhvdG9zIGxpJyk7XG4gICAgY29uc3QgbGlzdExpID0gQXJyYXkuZnJvbShsaUNvbGxlY3Rpb24pO1xuICAgIGNvbnN0IGxpRWxlbSA9IGxpc3RMaS5maW5kKGxlID0+IHBhcnNlSW50KGxlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKSA9PT0gdGhpcy5hY3RpdmVJZCk7XG4gICAgbGlFbGVtLmNsYXNzTGlzdC5hZGQoJ25ld1NwYW4nKTtcbiAgfTtcblxuICBwdWJsaWMgYWRkSUNsaWNrSGFuZGxlciA9IChwaG90b3M6IEhUTUxFbGVtZW50KSA9PlxuICB7XG4gICAgY29uc3QgSUNvbGxlY3Rpb24gPSBwaG90b3MucXVlcnlTZWxlY3RvckFsbCgnaScpO1xuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oSUNvbGxlY3Rpb24pO1xuXG4gICAgbGlzdEFycmF5LmZvckVhY2goaUVsZW1lbnQgPT5cbiAgICB7XG4gICAgICBpRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGlFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocGFyZW50LmRhdGFzZXQuaWQpO1xuICAgICAgICBJbWFnZVNlcnZpY2UucmVtb3ZlQnlJZChpZCk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB0aGlzLmltYWdlc0NvbnRlbnRDb21wb25lbnQuY2xlYXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIHJldHVybiBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwaG90b3NcIiBpZD1cInBob3Rvc1wiPjwvdWw+XG4gICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgXG4gICAgICAgICAgICBgO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBJbWFnZXNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtY29udGVudC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzVXJsQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxue1xuICBwcml2YXRlIF9waG90b0xpc3QgPSBuZXcgSW1hZ2VzTGlzdENvbXBvbmVudCgpO1xuICBwcml2YXRlIF9pbWFnZXNDb250ZW50Q29tcG9uZW50ID0gbmV3IEltYWdlc0NvbnRlbnRDb21wb25lbnQoKTtcblxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZUNoYW5nZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0taW1hZ2UnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLmhhbmRsZVN1Ym1pdCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2hhbmdlID0gKCkgPT5cbiAge1xuICAgIGNvbnN0IHZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpWyd2YWx1ZSddO1xuICAgIHRoaXMuX2ltYWdlc0NvbnRlbnRDb21wb25lbnQuc2hvd0ltYWdlQnlMaW5rKHZhbHVlKTtcbiAgfTtcblxuICBwdWJsaWMgaGFuZGxlU3VibWl0ID0gKGV2ZW50OiBFdmVudCkgPT5cbiAge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdXJsUGhvdG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJyk7XG5cbiAgICBjb25zdCBpbWFnZSA9IHtcbiAgICAgIGxpbms6IHVybFBob3RvWyd2YWx1ZSddLFxuICAgICAgbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1uYW1lJylbJ3ZhbHVlJ10sXG4gICAgICBhdXRob3JGdWxsTmFtZTogJycsXG4gICAgICB0b3A6ICcnLFxuICAgIH07XG5cbiAgICB0aGlzLl9waG90b0xpc3QuYWRkKGltYWdlKTtcbiAgICB0aGlzLnJlc2V0Rm9ybSgpO1xuICB9O1xuXG4gIHB1YmxpYyByZXNldEZvcm0oKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpWyd2YWx1ZSddID0gJyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1uYW1lJylbJ3ZhbHVlJ10gPSAnJztcbiAgfVxuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIHJldHVybiBgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tdXJsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cImZvcm0taW1hZ2VcIiBjbGFzcz1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1waG90b1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVcmwgaW1hZ2UuLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLW5hbWVcIiAgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkltYWdlIG5hbWUuLlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInN1Ym1pdFwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlNhdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXG4gICAgYDtcbiAgfVxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VzVXJsQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtdXJsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWxpc3QuY29tcG9uZW50JztcblxuQENvbXBvbmVudFxuZXhwb3J0IGNsYXNzIEltYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHJpdmF0ZSBfdXJsQ29tcG9uZW50ID0gbmV3IEltYWdlc1VybENvbXBvbmVudCgpO1xuICBwcml2YXRlIF9waG90b0NvbnRlbnRDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29udGVudENvbXBvbmVudCgpO1xuICBwcml2YXRlIF9waG90b0xpc3QgPSBuZXcgSW1hZ2VzTGlzdENvbXBvbmVudCgpO1xuXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX3VybENvbXBvbmVudC50ZW1wbGF0ZSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG90by1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX3Bob3RvQ29udGVudENvbXBvbmVudC50ZW1wbGF0ZSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG90by1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX3Bob3RvTGlzdC50ZW1wbGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xuICB7XG4gICAgcmV0dXJuIGAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8taGVhZGVyXCI+UGhvdG8gR2FsbGVyeTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBpZD1cInBob3RvLWRhdGFcIiBjbGFzcz1cInBob3RvLWRhdGFcIj4gXG4gICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ1cmwtcm9vdFwiIGNsYXNzPVwidXJsLXJvb3RcIj48L2Rpdj4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwaG90by1yb290XCIgY2xhc3M9XCJwaG90by1yb290XCI+PC9kaXY+ICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cbiIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsbXNDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbS1oZWFkZXJcIj5GaWxtczwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxtLWRhdGFcIj48L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY3NVcmxDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGAgXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS11cmxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cImZvcm0taW1hZ2VcIiBjbGFzcz1cImZvcm1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLXBob3RvXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVybCBtdXNpYy4uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtbmFtZVwiICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTXVzaWMgbmFtZS4uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtYXV0aG9yXCIgIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJBdXRob3IgbmFtZS4uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY3NMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgICAgcmV0dXJuIGAgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cIm11c2ljLXVsXCIgaWQ9XCJtdXNpYy11bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgaWQ9XCJtdXNpYy1saVwiIGNsYXNzPVwibXVzaWMtbGlcIiBkYXRhLWlkPT4xPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGlkPVwibXVzaWMtbGlcIiBjbGFzcz1cIm11c2ljLWxpXCIgZGF0YS1pZD0+MjwvbGk+ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY3NDb250ZW50Q29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1ibG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWltYWdlXCI+PGltZyBzcmM9XCJpbWFnZXMvZ3VmLmpwZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1hdXRob3JcIj5OYW1lIDogR3VmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLW5hbWVcIj5UcmFjayBuYW1lIDogQXppbm83Nzc8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtcGxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXVkaW8gY29udHJvbHM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHR5cGU9XCJhdWRpby9tcGVnXCIgc3JjPVwiaHR0cHM6Ly9jczktOHY0LnZrdXNlcmF1ZGlvLm5ldC9wMi85MDA0YTc5ZTQ3NzE1MC5tcDNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdWRpbz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+IGA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVzaWNzVXJsQ29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtdXJsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11c2ljc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL211c2ljcy1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11c2ljc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL211c2ljcy1jb250ZW50LmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY3NDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF91cmxDb21wb25lbnQgPSBuZXcgTXVzaWNzVXJsQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbXVzaWNMaXN0ID0gbmV3IE11c2ljc0xpc3RDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tdXNpY0NvbnRlbnRDb21wb25lbnQgPSBuZXcgTXVzaWNzQ29udGVudENvbXBvbmVudCgpO1xyXG5cclxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fdXJsQ29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl9tdXNpY0xpc3QudGVtcGxhdGUoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYy1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX211c2ljQ29udGVudENvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1oZWFkZXJcIj5NdXNpYzwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtZGF0YVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInVybC1yb290XCIgY2xhc3M9XCJ1cmwtcm9vdFwiPjwvZGl2PiAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtdXNpYy1yb290XCIgY2xhc3M9XCJtdXNpYy1yb290XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBJbWFnZXNDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy9pbWFnZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsbXNDb21wb25lbnQgfSBmcm9tICcuL2ZpbG1zL2ZpbG1zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11c2ljc0NvbXBvbmVudCB9IGZyb20gJy4vbXVzaWNzL211c2ljcy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgY2xhc3MgTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgX2ltYWdlc0NvbXBvbmVudCA9IG5ldyBJbWFnZXNDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tdXNpY3NDb21wb25lbnQgPSBuZXcgTXVzaWNzQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfZmlsbXNDb21wb25lbnQgPSBuZXcgRmlsbXNDb21wb25lbnQoKTtcclxuXHJcbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQobnVsbCwgdGhpcy5faW1hZ2VzQ29tcG9uZW50KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmwxJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSwgdGhpcy5faW1hZ2VzQ29tcG9uZW50KSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmwyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSwgdGhpcy5fbXVzaWNzQ29tcG9uZW50KSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmwzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSwgdGhpcy5fZmlsbXNDb21wb25lbnQpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3VibWl0ID0gKGU6IEV2ZW50LCBjb21wb25lbnQ6IElDb21wb25lbnQpID0+XHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKS5pbm5lckhUTUwgPSBjb21wb25lbnQudGVtcGxhdGUoKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVcIj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsMVwiPjxpIGNsYXNzPVwiZmEgZmEteW91dHViZS1wbGF5XCIgc3R5bGU9XCJmb250LXNpemU6MzZweFwiPjwvaT5QaG90bzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiMVwiIGlkPVwiZmwyXCI+PGkgY2xhc3M9XCJmYSBmYS1tdXNpY1wiIHN0eWxlPVwiZm9udC1zaXplOjM2cHhcIj48L2k+TXVzaWM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsM1wiPjxpIGNsYXNzPVwiZmEgZmEtcGhvdG9cIiBzdHlsZT1cImZvbnQtc2l6ZTozNnB4O1wiPjwvaT5GaWxtPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIGlkPVwiY29udGVudFwiPjwvZGl2PmA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRoQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgICAgIFxyXG4gICAgICAgICAgICAgICAgPCEtLSBMb2dpbiBmb3JtIC0tPlxyXG4gICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJsb2dpblwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWxlcnQgZXJyb3JcIj5JbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkITwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiB0eXBlPVwiZW1haWxcIiAvPjxpIGNsYXNzPVwiZmEgZmEtdXNlclwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgLz48aSBjbGFzcz1cImZhIGZhLWxvY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVwiZi1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjaGVja2VkPVwiY2hlY2tlZFwiIGNsYXNzPVwicmVtZW1iZXJNZUNoZWNrXCIgbmFtZT1cIlJlbWVtYmVyTWVcIiBpZD1cIlJlbWVtYmVyTWVcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIjFcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiUmVtZW1iZXJNZVwiPlJlbWVtYmVyIG1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImYtcmlnaHRcIiBuYW1lPVwiTG9naW5cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJMb2dpblwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTWFpbkNvbXBvbmVudCB9IGZyb20gJy4vbWFpbi9tYWluQ29tcG9uZW50JztcclxuaW1wb3J0IHsgQXV0aENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC9hdXRoLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9hdXRoQ29tcG9uZW50ID0gbmV3IEF1dGhDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tYWluQ29tcG9uZW50ID0gbmV3IE1haW5Db21wb25lbnQoKTtcclxuXHJcbiAgcHVibGljIHJlbmRlcigpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGgtcm9vdCcpLmlubmVySFRNTCA9IHRoaXMuX2F1dGhDb21wb25lbnQudGVtcGxhdGUoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLXJvb3QnKS5pbm5lckhUTUwgPSB0aGlzLl9tYWluQ29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAvYXBwLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCBhcHBDb21wb25lbnQgPSBuZXcgQXBwQ29tcG9uZW50KCk7XHJcbmFwcENvbXBvbmVudC5yZW5kZXIoKTsiXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7SUFnQkEsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7SUFDekMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hGLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRS9FLElBQU8sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7QUFFRCxJQWtCTyxTQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7SUFDMUQsSUFBSSxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FB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
