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
    function upperCase(str) {
        return str[0].toUpperCase() + str.slice(1);
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
                _this.buffer = image.id;
                str += "\n             <li id=\"photo-li\" class=\"photo-li\" data-id=" + image.id + ">\n                <span id=\"photo-span\" class=\"photo-span\" >\n                    <strong>" + image.id + ". Photo: </strong> " + image.name + "\n                </span>\n                <i id='fa-close' class=\"fa fa-close\" style=\"font-size:24px\"></i>\n             </li>\n      ";
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
                var link = document.getElementById('url-photo')['value'];
                _this._imagesContentComponent.showImageByLink(link);
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
            return "\n        <div class=\"film-header\">Films</div>\n        <div class=\"film-data\">\n        \n        </div>\n    ";
        };
        return FilmsComponent;
    }());

    var MusicServiceClass = (function () {
        function MusicServiceClass() {
            this.storage = new StorageService('music');
        }
        MusicServiceClass.prototype.getId = function (id) {
            return this.storage.getById(id);
        };
        MusicServiceClass.prototype.get = function () {
            return this.storage.getObj();
        };
        MusicServiceClass.prototype.add = function (item) {
            var musicList = this.storage.getObj();
            musicList.push(item);
            this.storage.addArray(musicList);
        };
        MusicServiceClass.prototype.addArray = function (items) {
            var musicList = this.storage.getObj();
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var music = items_1[_i];
                musicList.push(music);
            }
            this.storage.addArray(musicList);
        };
        MusicServiceClass.prototype.removeById = function (id) {
            this.storage.removeById(id);
        };
        MusicServiceClass.prototype.clear = function () {
            this.storage.clear();
        };
        return MusicServiceClass;
    }());
    var MusicService = new MusicServiceClass();

    var MusicsContentComponent = (function () {
        function MusicsContentComponent() {
        }
        MusicsContentComponent.prototype.showMusicById = function (id) {
            document.getElementById('music')['src'] = MusicService.getId(id).link;
            this.showMusicByLink(MusicService.getId(id).link);
        };
        MusicsContentComponent.prototype.showMusicByLink = function (link) {
            var audio = document.getElementById('music-play');
            audio.innerHTML = "\n                       <audio controls autoplay loop>\n                         <source type=\"audio/mpeg\" id=\"music\" src=\"" + link + "\">\n                       </audio>\n                     ";
        };
        MusicsContentComponent.prototype.clear = function () {
            document.getElementById('music')['src'] = '';
        };
        MusicsContentComponent.prototype.template = function () {
            return "\n                  <div class=\"music-content\">\n                      <div class=\"music-block\"\n                          <div class=\"music-image\"><img src=\"images/guf.jpg\">\n                          <div class=\"music-author\">Name : Guf</div>\n                          <div class=\"music-name\">Track name : Azino777</div>\n                          <div class=\"music-play\" id=\"music-play\">\n                              <audio controls>\n                                  <source type=\"audio/mpeg\" id=\"music\" src=\"https://cs9-8v4.vkuseraudio.net/p2/9004a79e477150.mp3\">\n                              </audio>\n                          </div>\n                       </div>\n                    </div>\n                  </div> \n            ";
        };
        MusicsContentComponent = __decorate([
            Component
        ], MusicsContentComponent);
        return MusicsContentComponent;
    }());

    var MusicsListComponent = (function () {
        function MusicsListComponent() {
            var _this = this;
            this._musicsContentComponent = new MusicsContentComponent();
            this.addSpanClickHandler = function (musicUl) {
                var spanCollection = musicUl.querySelectorAll('span');
                var listArray = Array.from(spanCollection);
                listArray.forEach(function (spanElement) {
                    spanElement.addEventListener('click', function () {
                        var parent = spanElement.parentElement;
                        var id = parseInt(parent.dataset.id);
                        _this.activeId = id;
                        _this._musicsContentComponent.showMusicById(id);
                        _this.refresh();
                        _this.activateElement();
                    });
                });
            };
            this.activateElement = function () {
                console.log('activateElement', _this.activeId);
                var liCollection = document.querySelectorAll('.music-ul li');
                var listLi = Array.from(liCollection);
                var liElem = listLi.find(function (le) { return parseInt(le.getAttribute('data-id')) === _this.activeId; });
                liElem.classList.add('newSpan');
            };
            this.addIClickHandler = function (musicUl) {
                var ICollection = musicUl.querySelectorAll('i');
                var listArray = Array.from(ICollection);
                listArray.forEach(function (iElement) {
                    iElement.addEventListener('click', function () {
                        var parent = iElement.parentElement;
                        var id = parseInt(parent.dataset.id);
                        MusicService.removeById(id);
                        _this.refresh();
                        _this._musicsContentComponent.clear();
                    });
                });
            };
        }
        MusicsListComponent.prototype.onInit = function () {
            this.refresh();
        };
        MusicsListComponent.prototype.add = function (music) {
            MusicService.add(music);
            this.refresh();
            this.activeId = this.buffer;
            this.activateElement();
        };
        MusicsListComponent.prototype.refresh = function () {
            var _this = this;
            var music = MusicService.get();
            var musicUl = document.getElementById('music-ul');
            var str = '';
            music.forEach(function (music) {
                _this.buffer = music.id;
                str += "\n              <li id=\"music-li\" class=\"music-li\" data-id=" + music.id + ">\n                <span id=\"music-span\" class=\"music-span\" >\n                    <span id=\"span-strong\" class=\"span-strong\">" + music.id + ". " + upperCase(music.authorFullName) + " - </span>  " + music.name + "\n                </span>\n                <i id='fa-close' class=\"fa fa-close\" style=\"font-size:24px\"></i>\n              </li> \n             ";
            });
            musicUl.innerHTML = str;
            this.addSpanClickHandler(musicUl);
            this.addIClickHandler(musicUl);
        };
        MusicsListComponent.prototype.template = function () {
            return " \n                  <div class=\"music-list\">\n                        <ul class=\"music-ul\" id=\"music-ul\"></ul>\n                  </div>\n              ";
        };
        MusicsListComponent = __decorate([
            Component
        ], MusicsListComponent);
        return MusicsListComponent;
    }());

    var MusicsUrlComponent = (function () {
        function MusicsUrlComponent() {
            var _this = this;
            this._musicList = new MusicsListComponent();
            this._musicsContentComponent = new MusicsContentComponent();
            this.handleChange = function () {
                var link = document.getElementById('url-music')['value'];
                _this._musicsContentComponent.showMusicByLink(link);
            };
            this.handleSubmit = function (event) {
                event.preventDefault();
                var urlMusic = document.getElementById('url-music');
                var music = {
                    link: urlMusic['value'],
                    name: document.getElementById('url-name')['value'],
                    authorFullName: document.getElementById('url-author')['value'],
                    top: '',
                };
                _this._musicList.add(music);
                _this.resetForm();
            };
        }
        MusicsUrlComponent.prototype.onInit = function () {
            document.getElementById('url-music').addEventListener('change', this.handleChange);
            document.getElementById('form-music').addEventListener('submit', this.handleSubmit);
        };
        MusicsUrlComponent.prototype.resetForm = function () {
            document.getElementById('url-music')['value'] = '';
            document.getElementById('url-name')['value'] = '';
            document.getElementById('url-author')['value'] = '';
        };
        MusicsUrlComponent.prototype.template = function () {
            return " \n                      <div class=\"form-url\">\n                          <form id=\"form-music\" class=\"form\">\n                                <div class=\"col-3\">\n                                <input class=\"effect-7\" id=\"url-music\" type=\"text\" placeholder=\"Url music..\">\n                                    <span class=\"focus-border\">\n                                      <i></i>\n                                    </span>\n                                </div>\n                                <div class=\"col-3\">\n                                    <input class=\"effect-7\" id=\"url-author\"  type=\"text\" placeholder=\"Author name..\">\n                                      <span class=\"focus-border\">\n                                        <i></i>\n                                      </span>\n                                </div>\n                                <div class=\"col-3\">\n                                    <input class=\"effect-7\" id=\"url-name\"  type=\"text\" placeholder=\"Music name..\">\n                                      <span class=\"focus-border\">\n                                        <i></i>\n                                      </span>\n                                </div>\n                                <div class=\"col-3\">\n                                  <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\">\n                                    <span class=\"focus-border\">\n                                      <i></i>\n                                    </span>\n                                </div>\n                          </form>\n                      </div>";
        };
        MusicsUrlComponent = __decorate([
            Component
        ], MusicsUrlComponent);
        return MusicsUrlComponent;
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
            this.handleSubmit(null, this._musicsComponent);
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

    function formContent(content, callback) {
        var id = "form-id-" + Math.random();
        setTimeout(function () {
            var form = document.getElementById(id);
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                console.warn('evemt', event);
                callback();
            });
        }, 1);
        return "<form noValidate id=\"" + id + "\">" + content + "</form>";
    }
    var AuthComponent = (function () {
        function AuthComponent() {
            this.handler = function () {
                console.warn('HANDLER');
            };
        }
        AuthComponent.prototype.template = function () {
            var content = "\n                  <div class=\"alert error\">Invalid username or password!</div>\n                  <fieldset>\n                    <input name=\"email\" placeholder=\"Username\" type=\"email\" /><i class=\"fa fa-user\"></i>\n                  </fieldset>\n                  <fieldset>\n                    <input name=\"password\" placeholder=\"Password\" type=\"password\" /><i class=\"fa fa-lock\"></i>\n                  </fieldset>\n                    <input class=\"f-right\" name=\"Login\" type=\"submit\" value=\"Login\" />";
            return formContent(content, this.handler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbXBvbmVudC50cyIsIi4uL3NyYy9saWJyZXJpcy9icm93c2VyLXN0b3JhZ2UudHMiLCIuLi9zcmMvc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbW1vbi50cyIsIi4uL3NyYy9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL2FwcC9tYWluL2ltYWdlcy9pbWFnZXMtY29udGVudC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy1saXN0LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9pbWFnZXMvaW1hZ2VzLXVybC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vZmlsbXMvZmlsbXMuY29tcG9uZW50LnRzIiwiLi4vc3JjL3NlcnZpY2VzL211c2ljLnNlcnZpY2UudHMiLCIuLi9zcmMvYXBwL21haW4vbXVzaWNzL211c2ljcy1jb250ZW50LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9tdXNpY3MvbXVzaWNzLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljcy9tdXNpY3MtdXJsLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9tdXNpY3MvbXVzaWNzLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9tYWluQ29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9hdXRoL2F1dGguY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9hcHAuY29tcG9uZW50LnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vYXBwL3R5cGVzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQ8VEZ1bmN0aW9uIGV4dGVuZHMgRnVuY3Rpb24+KG9sZENvbnN0cnVjdG9yOiB7IG5ldygpOiBJQ29tcG9uZW50OyB9KTogYW55XHJcbntcclxuICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBvbGRDb25zdHJ1Y3RvclxyXG4gIHtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpOiBhbnlcclxuICAgICAge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG9sZENvbnN0cnVjdG9yLnByb3RvdHlwZS5vbkluaXQgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG9sZENvbnN0cnVjdG9yLnByb3RvdHlwZS5vbkluaXQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCAxKTtcclxuICAgICAgICByZXR1cm4gb2xkQ29uc3RydWN0b3IucHJvdG90eXBlLnRlbXBsYXRlLmNhbGwodGhpcyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxufSIsImV4cG9ydCBjbGFzcyBCcm93c2VyU3RvcmFnZTxUPlxyXG57XHJcbiAgcHVibGljIGtleTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZylcclxuICB7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRPYmplY3QodmFsdWU6IFQpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5rZXksIHN0cik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0T2JqZWN0KCk6IFRcclxuICB7XHJcbiAgICBjb25zdCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO1xyXG5cclxuICAgIHJldHVybiBKU09OLnBhcnNlKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJBbGwoKTogdm9pZFxyXG4gIHtcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElFbnRpdHkgfSBmcm9tICcuLi9tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgQnJvd3NlclN0b3JhZ2UgfSBmcm9tICcuLi9saWJyZXJpcy9icm93c2VyLXN0b3JhZ2UnO1xyXG5cclxuaW50ZXJmYWNlIElTdG9yYWdlTW9kZWw8VE1vZGVsPlxyXG57XHJcbiAgaW5kZXg6IG51bWJlcjtcclxuICBsaXN0OiBUTW9kZWxbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlPFQgZXh0ZW5kcyBJRW50aXR5PlxyXG57XHJcbiAgcHJpdmF0ZSByZWFkb25seSBicm93c2VyU3RvcmFnZTogQnJvd3NlclN0b3JhZ2U8SVN0b3JhZ2VNb2RlbDxUPj47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKVxyXG4gIHtcclxuICAgIHRoaXMuYnJvd3NlclN0b3JhZ2UgPSBuZXcgQnJvd3NlclN0b3JhZ2U8SVN0b3JhZ2VNb2RlbDxUPj4oa2V5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBUXHJcbiAge1xyXG4gICAgY29uc3Qgb2JqTGlzdDogVFtdID0gdGhpcy5nZXRPYmooKTtcclxuICAgIHJldHVybiBvYmpMaXN0LmZpbmQoeCA9PiB4LmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0T2JqKCk6IFRbXVxyXG4gIHtcclxuICAgIGNvbnN0IGJyb3dzZXJTdG9yYWdlRGF0YSA9IHRoaXMuYnJvd3NlclN0b3JhZ2UuZ2V0T2JqZWN0KCk7XHJcbiAgICByZXR1cm4gYnJvd3NlclN0b3JhZ2VEYXRhID8gYnJvd3NlclN0b3JhZ2VEYXRhLmxpc3QgOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogVFtdKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG5cclxuICAgIGlmIChzdG9yYWdlID09PSBudWxsKVxyXG4gICAge1xyXG4gICAgICBjb25zdCBzdG9yYWdlT2JqOiBJU3RvcmFnZU1vZGVsPFQ+ID0ge1xyXG4gICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgIGxpc3Q6IFtdLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKVxyXG4gICAgICB7XHJcbiAgICAgICAgaXRlbS5pZCA9IHN0b3JhZ2VPYmouaW5kZXg7XHJcbiAgICAgICAgc3RvcmFnZU9iai5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgc3RvcmFnZU9iai5pbmRleCsrO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYnJvd3NlclN0b3JhZ2Uuc2V0T2JqZWN0KHN0b3JhZ2VPYmopO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoaXRlbS5pZCA9PT0gKG51bGwgfHwgdW5kZWZpbmVkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpdGVtLmlkID0gc3RvcmFnZS5pbmRleDtcclxuICAgICAgICAgIHN0b3JhZ2UubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgc3RvcmFnZS5pbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLnNldE9iamVjdChzdG9yYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVCeUlkKGlkOiBudW1iZXIpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3Qgc3RvcmFnZU9iaiA9IHRoaXMuYnJvd3NlclN0b3JhZ2UuZ2V0T2JqZWN0KCk7XHJcbiAgICBjb25zdCBpbmRleCA9IHN0b3JhZ2VPYmoubGlzdC5maW5kSW5kZXgoeCA9PiAoeC5pZCA9PT0gaWQpKTtcclxuICAgIHN0b3JhZ2VPYmoubGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMuYnJvd3NlclN0b3JhZ2Uuc2V0T2JqZWN0KHN0b3JhZ2VPYmopO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvcHk8VD4ob2JqOiBUKTogVFxyXG57XHJcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbWFnZVVybElzVmFsaWQoc3RyOiBzdHJpbmcpOiBib29sZWFuXHJcbntcclxuICBjb25zdCBteVJlZ2V4ID0gLyhodHRwcz86XFwvXFwvLipcXC4oPzpwbmd8anBnfGpwZWd8Z2lmKSkvaTtcclxuICByZXR1cm4gbXlSZWdleC50ZXN0KHN0cik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtdXNpY1VybElzVmFsaWQoc3RyOiBzdHJpbmcpOiBib29sZWFuXHJcbntcclxuICBjb25zdCBteVJlZ2V4ID0gLyhodHRwcz86XFwvXFwvLipcXC4oPzptcDN8bXA0KSkvaTtcclxuICByZXR1cm4gbXlSZWdleC50ZXN0KHN0cik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cHBlckNhc2Uoc3RyOiBzdHJpbmcpXHJcbntcclxuICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0V4aXN0SHRtbEluRE9NKGVsZW1lbnQ6IEhUTUxFbGVtZW50KVxyXG57XHJcbiAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWxlbWVudCk7XHJcbn0iLCJpbXBvcnQgeyBJSW1hZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgaW1hZ2VVcmxJc1ZhbGlkIH0gZnJvbSAnLi4vbGlicmVyaXMvY29tbW9uJztcclxuXHJcbmNsYXNzIEltYWdlU2VydmljZUNsYXNzXHJcbntcclxuICBwcml2YXRlIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZVNlcnZpY2U8SUltYWdlTW9kZWw+KCdpbWFnZScpO1xyXG5cclxuICBwdWJsaWMgZ2V0SWQoaWQ6IG51bWJlcik6IElJbWFnZU1vZGVsXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQoKTogSUltYWdlTW9kZWxbXVxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKGl0ZW06IElJbWFnZU1vZGVsKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJyk7XHJcblxyXG4gICAgaWYgKGl0ZW0ubmFtZS5sZW5ndGggPiAwICYmIGltYWdlVXJsSXNWYWxpZChpdGVtLmxpbmspKVxyXG4gICAge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgI2NjYyc7XHJcblxyXG4gICAgICBjb25zdCBpbWFnZUxpc3Q6IElJbWFnZU1vZGVsW10gPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICAgIGltYWdlTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIGNyaW1zb24nO1xyXG4gICAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnMXMnO1xyXG5cclxuICAgICAgYWxlcnQoJ0ltYWdlIFVybCBJbnZhbGlkJyk7XHJcbiAgICAgIC8vIFRPRE9cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogSUltYWdlTW9kZWxbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBpbWFnZUxpc3QgPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGl0ZW1zKVxyXG4gICAge1xyXG4gICAgICBpbWFnZUxpc3QucHVzaChpbWFnZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVCeUlkKGlkOiBudW1iZXIpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBJbWFnZVNlcnZpY2UgPSBuZXcgSW1hZ2VTZXJ2aWNlQ2xhc3MoKTsiLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHVibGljIHNob3dJbWFnZUJ5SWQoaWQ6IG51bWJlcik6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpWydzcmMnXSA9IEltYWdlU2VydmljZS5nZXRJZChpZCkubGluaztcbiAgfVxuXG4gIHB1YmxpYyBzaG93SW1hZ2VCeUxpbmsobGluazogc3RyaW5nKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJylbJ3NyYyddID0gbGluaztcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKVsnc3JjJ10gPSAnaHR0cDovL3BsYWNlaG9sZC5pdC8yMDB4MjAwJztcbiAgfVxuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIHJldHVybiBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9IFwicGhvdG8tY29udGVudFwiPiAgXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1zaXplXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImltYWdlXCIgaWQ9XCJpbWFnZVwiIHNyYz1cImh0dHA6Ly9wbGFjZWhvbGQuaXQvMjAweDIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvaW1hZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBJbWFnZXNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtY29udGVudC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHJpdmF0ZSBpbWFnZXNDb250ZW50Q29tcG9uZW50ID0gbmV3IEltYWdlc0NvbnRlbnRDb21wb25lbnQoKTtcbiAgcHJpdmF0ZSBhY3RpdmVJZDogbnVtYmVyO1xuICBwcml2YXRlIGJ1ZmZlcjogbnVtYmVyO1xuXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxuICB7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkKGltYWdlOiBvYmplY3QpOiB2b2lkXG4gIHtcbiAgICBJbWFnZVNlcnZpY2UuYWRkKGltYWdlKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB0aGlzLmFjdGl2ZUlkID0gdGhpcy5idWZmZXI7XG4gICAgdGhpcy5hY3RpdmF0ZUVsZW1lbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZyZXNoKCk6IHZvaWRcbiAge1xuICAgIGNvbnN0IGltYWdlcyA9IEltYWdlU2VydmljZS5nZXQoKTtcbiAgICBjb25zdCBwaG90b3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGhvdG9zJyk7XG4gICAgbGV0IHN0ciA9ICcnO1xuXG4gICAgaW1hZ2VzLmZvckVhY2goaW1hZ2UgPT5cbiAgICB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IGltYWdlLmlkO1xuICAgICAgc3RyICs9IGBcbiAgICAgICAgICAgICA8bGkgaWQ9XCJwaG90by1saVwiIGNsYXNzPVwicGhvdG8tbGlcIiBkYXRhLWlkPSR7aW1hZ2UuaWR9PlxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwicGhvdG8tc3BhblwiIGNsYXNzPVwicGhvdG8tc3BhblwiID5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz4ke2ltYWdlLmlkfS4gUGhvdG86IDwvc3Ryb25nPiAke2ltYWdlLm5hbWV9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpIGlkPSdmYS1jbG9zZScgY2xhc3M9XCJmYSBmYS1jbG9zZVwiIHN0eWxlPVwiZm9udC1zaXplOjI0cHhcIj48L2k+XG4gICAgICAgICAgICAgPC9saT5cbiAgICAgIGA7XG4gICAgfSk7XG4gICAgcGhvdG9zLmlubmVySFRNTCA9IHN0cjtcblxuICAgIHRoaXMuYWRkU3BhbkNsaWNrSGFuZGxlcihwaG90b3MpO1xuICAgIHRoaXMuYWRkSUNsaWNrSGFuZGxlcihwaG90b3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRTcGFuQ2xpY2tIYW5kbGVyID0gKHBob3RvczogSFRNTEVsZW1lbnQpID0+XG4gIHtcbiAgICBjb25zdCBzcGFuQ29sbGVjdGlvbiA9IHBob3Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdzcGFuJyk7XG4gICAgY29uc3QgbGlzdEFycmF5ID0gQXJyYXkuZnJvbShzcGFuQ29sbGVjdGlvbik7XG5cbiAgICBsaXN0QXJyYXkuZm9yRWFjaChzcGFuRWxlbWVudCA9PlxuICAgIHtcbiAgICAgIHNwYW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gc3BhbkVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChwYXJlbnQuZGF0YXNldC5pZCk7XG4gICAgICAgIHRoaXMuYWN0aXZlSWQgPSBpZDtcbiAgICAgICAgdGhpcy5pbWFnZXNDb250ZW50Q29tcG9uZW50LnNob3dJbWFnZUJ5SWQoaWQpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUVsZW1lbnQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHB1YmxpYyBhY3RpdmF0ZUVsZW1lbnQgPSAoKSA9PlxuICB7XG4gICAgY29uc3QgbGlDb2xsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBob3RvcyBsaScpO1xuICAgIGNvbnN0IGxpc3RMaSA9IEFycmF5LmZyb20obGlDb2xsZWN0aW9uKTtcbiAgICBjb25zdCBsaUVsZW0gPSBsaXN0TGkuZmluZChsZSA9PiBwYXJzZUludChsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSkgPT09IHRoaXMuYWN0aXZlSWQpO1xuICAgIGxpRWxlbS5jbGFzc0xpc3QuYWRkKCduZXdTcGFuJyk7XG4gIH07XG5cbiAgcHVibGljIGFkZElDbGlja0hhbmRsZXIgPSAocGhvdG9zOiBIVE1MRWxlbWVudCkgPT5cbiAge1xuICAgIGNvbnN0IElDb2xsZWN0aW9uID0gcGhvdG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ2knKTtcbiAgICBjb25zdCBsaXN0QXJyYXkgPSBBcnJheS5mcm9tKElDb2xsZWN0aW9uKTtcblxuICAgIGxpc3RBcnJheS5mb3JFYWNoKGlFbGVtZW50ID0+XG4gICAge1xuICAgICAgaUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBpRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KHBhcmVudC5kYXRhc2V0LmlkKTtcbiAgICAgICAgSW1hZ2VTZXJ2aWNlLnJlbW92ZUJ5SWQoaWQpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgdGhpcy5pbWFnZXNDb250ZW50Q29tcG9uZW50LmNsZWFyKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICByZXR1cm4gYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8tbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGhvdG9zXCIgaWQ9XCJwaG90b3NcIj48L3VsPlxuICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgIFxuICAgICAgICAgICAgYDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgSW1hZ2VzQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWNvbnRlbnQuY29tcG9uZW50JztcblxuQENvbXBvbmVudFxuZXhwb3J0IGNsYXNzIEltYWdlc1VybENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHJpdmF0ZSBfcGhvdG9MaXN0ID0gbmV3IEltYWdlc0xpc3RDb21wb25lbnQoKTtcbiAgcHJpdmF0ZSBfaW1hZ2VzQ29udGVudENvbXBvbmVudCA9IG5ldyBJbWFnZXNDb250ZW50Q29tcG9uZW50KCk7XG5cbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVDaGFuZ2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWltYWdlJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5oYW5kbGVTdWJtaXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVDaGFuZ2UgPSAoKSA9PlxuICB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKVsndmFsdWUnXTtcbiAgICB0aGlzLl9pbWFnZXNDb250ZW50Q29tcG9uZW50LnNob3dJbWFnZUJ5TGluayhsaW5rKTtcbiAgfTtcblxuICBwcml2YXRlIGhhbmRsZVN1Ym1pdCA9IChldmVudDogRXZlbnQpID0+XG4gIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVybFBob3RvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpO1xuXG4gICAgY29uc3QgaW1hZ2UgPSB7XG4gICAgICBsaW5rOiB1cmxQaG90b1sndmFsdWUnXSxcbiAgICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddLFxuICAgICAgYXV0aG9yRnVsbE5hbWU6ICcnLFxuICAgICAgdG9wOiAnJyxcbiAgICB9O1xuXG4gICAgdGhpcy5fcGhvdG9MaXN0LmFkZChpbWFnZSk7XG4gICAgdGhpcy5yZXNldEZvcm0oKTtcbiAgfTtcblxuICBwdWJsaWMgcmVzZXRGb3JtKCk6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKVsndmFsdWUnXSA9ICcnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddID0gJyc7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICByZXR1cm4gYCAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXVybFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJmb3JtLWltYWdlXCIgY2xhc3M9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtcGhvdG9cIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXJsIGltYWdlLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1uYW1lXCIgIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJJbWFnZSBuYW1lLi5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJzdWJtaXRcIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTYXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxuICAgIGA7XG4gIH1cbn0iLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlc1VybENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLXVybC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VzQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy1saXN0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnRcbmV4cG9ydCBjbGFzcyBJbWFnZXNDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XG57XG4gIHByaXZhdGUgX3VybENvbXBvbmVudCA9IG5ldyBJbWFnZXNVcmxDb21wb25lbnQoKTtcbiAgcHJpdmF0ZSBfcGhvdG9Db250ZW50Q29tcG9uZW50ID0gbmV3IEltYWdlc0NvbnRlbnRDb21wb25lbnQoKTtcbiAgcHJpdmF0ZSBfcGhvdG9MaXN0ID0gbmV3IEltYWdlc0xpc3RDb21wb25lbnQoKTtcblxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl91cmxDb21wb25lbnQudGVtcGxhdGUoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGhvdG8tcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl9waG90b0NvbnRlbnRDb21wb25lbnQudGVtcGxhdGUoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGhvdG8tcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl9waG90b0xpc3QudGVtcGxhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIHJldHVybiBgIFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvLWhlYWRlclwiPlBob3RvIEdhbGxlcnk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJwaG90by1kYXRhXCIgY2xhc3M9XCJwaG90by1kYXRhXCI+IFxuICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidXJsLXJvb3RcIiBjbGFzcz1cInVybC1yb290XCI+PC9kaXY+ICAgICAgICAgIFxuICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicGhvdG8tcm9vdFwiIGNsYXNzPVwicGhvdG8tcm9vdFwiPjwvZGl2PiAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbG1zQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbG0taGVhZGVyXCI+RmlsbXM8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbS1kYXRhXCI+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJTXVzaWNNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgbXVzaWNVcmxJc1ZhbGlkIH0gZnJvbSAnLi4vbGlicmVyaXMvY29tbW9uJztcclxuXHJcbmNsYXNzIE11c2ljU2VydmljZUNsYXNzXHJcbntcclxuICBwcml2YXRlIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZVNlcnZpY2U8SU11c2ljTW9kZWw+KCdtdXNpYycpO1xyXG5cclxuICBwdWJsaWMgZ2V0SWQoaWQ6IG51bWJlcik6IElNdXNpY01vZGVsXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQoKTogSU11c2ljTW9kZWxbXVxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKGl0ZW06IElNdXNpY01vZGVsKTogdm9pZFxyXG4gIHtcclxuICAgICAgY29uc3QgbXVzaWNMaXN0OiBJTXVzaWNNb2RlbFtdID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgICBtdXNpY0xpc3QucHVzaChpdGVtKTtcclxuICAgICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KG11c2ljTGlzdCk7XHJcblxyXG4gICAgICAvL2NvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW11c2ljJyk7XHJcbiAgICAgIC8vZWxlbWVudC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIGNyaW1zb24nO1xyXG4gICAgICAvL2VsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICcxcyc7XHJcbiAgICAgIC8vYWxlcnQoJ011c2ljIFVybCBJbnZhbGlkJyk7XHJcbiAgICAgIC8vIFRPRE9cclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IElNdXNpY01vZGVsW10pOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgbXVzaWNMaXN0ID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgZm9yIChjb25zdCBtdXNpYyBvZiBpdGVtcylcclxuICAgIHtcclxuICAgICAgbXVzaWNMaXN0LnB1c2gobXVzaWMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KG11c2ljTGlzdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTXVzaWNTZXJ2aWNlID0gbmV3IE11c2ljU2VydmljZUNsYXNzKCk7IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgTXVzaWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbXVzaWMuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY3NDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIHNob3dNdXNpY0J5SWQoaWQ6IG51bWJlcik6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMnKVsnc3JjJ10gPSBNdXNpY1NlcnZpY2UuZ2V0SWQoaWQpLmxpbms7XHJcbiAgICB0aGlzLnNob3dNdXNpY0J5TGluayhNdXNpY1NlcnZpY2UuZ2V0SWQoaWQpLmxpbmspO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dNdXNpY0J5TGluayhsaW5rOiBzdHJpbmcpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtcGxheScpO1xyXG4gICAgYXVkaW8uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgIDxhdWRpbyBjb250cm9scyBhdXRvcGxheSBsb29wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSB0eXBlPVwiYXVkaW8vbXBlZ1wiIGlkPVwibXVzaWNcIiBzcmM9XCIke2xpbmt9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPC9hdWRpbz5cclxuICAgICAgICAgICAgICAgICAgICAgYDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljJylbJ3NyYyddID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1ibG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWltYWdlXCI+PGltZyBzcmM9XCJpbWFnZXMvZ3VmLmpwZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1hdXRob3JcIj5OYW1lIDogR3VmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLW5hbWVcIj5UcmFjayBuYW1lIDogQXppbm83Nzc8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtcGxheVwiIGlkPVwibXVzaWMtcGxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXVkaW8gY29udHJvbHM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHR5cGU9XCJhdWRpby9tcGVnXCIgaWQ9XCJtdXNpY1wiIHNyYz1cImh0dHBzOi8vY3M5LTh2NC52a3VzZXJhdWRpby5uZXQvcDIvOTAwNGE3OWU0NzcxNTAubXAzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXVkaW8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgYDtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTXVzaWNzQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vbXVzaWNzLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgdXBwZXJDYXNlIH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE11c2ljc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9tdXNpY3NDb250ZW50Q29tcG9uZW50ID0gbmV3IE11c2ljc0NvbnRlbnRDb21wb25lbnQoKTtcclxuICBwcml2YXRlIGFjdGl2ZUlkOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBidWZmZXI6IG51bWJlcjtcclxuXHJcbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKG11c2ljOiBvYmplY3QpOiB2b2lkXHJcbiAge1xyXG4gICAgTXVzaWNTZXJ2aWNlLmFkZChtdXNpYyk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIHRoaXMuYWN0aXZlSWQgPSB0aGlzLmJ1ZmZlcjtcclxuICAgIHRoaXMuYWN0aXZhdGVFbGVtZW50KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVmcmVzaCgpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgbXVzaWMgPSBNdXNpY1NlcnZpY2UuZ2V0KCk7XHJcbiAgICBjb25zdCBtdXNpY1VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljLXVsJyk7XHJcbiAgICBsZXQgc3RyID0gJyc7XHJcblxyXG4gICAgbXVzaWMuZm9yRWFjaChtdXNpYyA9PlxyXG4gICAge1xyXG4gICAgICB0aGlzLmJ1ZmZlciA9IG11c2ljLmlkO1xyXG4gICAgICBzdHIgKz0gYFxyXG4gICAgICAgICAgICAgIDxsaSBpZD1cIm11c2ljLWxpXCIgY2xhc3M9XCJtdXNpYy1saVwiIGRhdGEtaWQ9JHttdXNpYy5pZH0+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cIm11c2ljLXNwYW5cIiBjbGFzcz1cIm11c2ljLXNwYW5cIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJzcGFuLXN0cm9uZ1wiIGNsYXNzPVwic3Bhbi1zdHJvbmdcIj4ke211c2ljLmlkfS4gJHt1cHBlckNhc2UobXVzaWMuYXV0aG9yRnVsbE5hbWUpfSAtIDwvc3Bhbj4gICR7bXVzaWMubmFtZX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGlkPSdmYS1jbG9zZScgY2xhc3M9XCJmYSBmYS1jbG9zZVwiIHN0eWxlPVwiZm9udC1zaXplOjI0cHhcIj48L2k+XHJcbiAgICAgICAgICAgICAgPC9saT4gXHJcbiAgICAgICAgICAgICBgO1xyXG4gICAgfSk7XHJcbiAgICBtdXNpY1VsLmlubmVySFRNTCA9IHN0cjtcclxuXHJcbiAgICB0aGlzLmFkZFNwYW5DbGlja0hhbmRsZXIobXVzaWNVbCk7XHJcbiAgICB0aGlzLmFkZElDbGlja0hhbmRsZXIobXVzaWNVbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFNwYW5DbGlja0hhbmRsZXIgPSAobXVzaWNVbDogSFRNTEVsZW1lbnQpID0+XHJcbiAge1xyXG4gICAgY29uc3Qgc3BhbkNvbGxlY3Rpb24gPSBtdXNpY1VsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcclxuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oc3BhbkNvbGxlY3Rpb24pO1xyXG5cclxuICAgIGxpc3RBcnJheS5mb3JFYWNoKHNwYW5FbGVtZW50ID0+XHJcbiAgICB7XHJcbiAgICAgIHNwYW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cclxuICAgICAge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNwYW5FbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChwYXJlbnQuZGF0YXNldC5pZCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX211c2ljc0NvbnRlbnRDb21wb25lbnQuc2hvd011c2ljQnlJZChpZCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUVsZW1lbnQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgYWN0aXZhdGVFbGVtZW50ID0gKCkgPT5cclxuICB7XHJcbiAgICBjb25zb2xlLmxvZygnYWN0aXZhdGVFbGVtZW50JywgdGhpcy5hY3RpdmVJZCk7XHJcbiAgICBjb25zdCBsaUNvbGxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubXVzaWMtdWwgbGknKTtcclxuICAgIGNvbnN0IGxpc3RMaSA9IEFycmF5LmZyb20obGlDb2xsZWN0aW9uKTtcclxuICAgIGNvbnN0IGxpRWxlbSA9IGxpc3RMaS5maW5kKGxlID0+IHBhcnNlSW50KGxlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKSA9PT0gdGhpcy5hY3RpdmVJZCk7XHJcbiAgICBsaUVsZW0uY2xhc3NMaXN0LmFkZCgnbmV3U3BhbicpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBhZGRJQ2xpY2tIYW5kbGVyID0gKG11c2ljVWw6IEhUTUxFbGVtZW50KSA9PlxyXG4gIHtcclxuICAgIGNvbnN0IElDb2xsZWN0aW9uID0gbXVzaWNVbC5xdWVyeVNlbGVjdG9yQWxsKCdpJyk7XHJcbiAgICBjb25zdCBsaXN0QXJyYXkgPSBBcnJheS5mcm9tKElDb2xsZWN0aW9uKTtcclxuXHJcbiAgICBsaXN0QXJyYXkuZm9yRWFjaChpRWxlbWVudCA9PlxyXG4gICAge1xyXG4gICAgICBpRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XHJcbiAgICAgIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSBpRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocGFyZW50LmRhdGFzZXQuaWQpO1xyXG4gICAgICAgIE11c2ljU2VydmljZS5yZW1vdmVCeUlkKGlkKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB0aGlzLl9tdXNpY3NDb250ZW50Q29tcG9uZW50LmNsZWFyKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiAgICBgIFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJtdXNpYy11bFwiIGlkPVwibXVzaWMtdWxcIj48L3VsPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICBgO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY3NMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtY29udGVudC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgY2xhc3MgTXVzaWNzVXJsQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIF9tdXNpY0xpc3QgPSBuZXcgTXVzaWNzTGlzdENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX211c2ljc0NvbnRlbnRDb21wb25lbnQgPSBuZXcgTXVzaWNzQ29udGVudENvbXBvbmVudCgpO1xyXG5cclxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW11c2ljJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVDaGFuZ2UpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tbXVzaWMnKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLmhhbmRsZVN1Ym1pdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNoYW5nZSA9ICgpID0+XHJcbiAge1xyXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbXVzaWMnKVsndmFsdWUnXTtcclxuICAgIHRoaXMuX211c2ljc0NvbnRlbnRDb21wb25lbnQuc2hvd011c2ljQnlMaW5rKGxpbmspO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3VibWl0ID0gKGV2ZW50OiBFdmVudCkgPT5cclxuICB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgdXJsTXVzaWMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW11c2ljJyk7XHJcblxyXG4gICAgY29uc3QgbXVzaWMgPSB7XHJcbiAgICAgIGxpbms6IHVybE11c2ljWyd2YWx1ZSddLFxyXG4gICAgICBuYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW5hbWUnKVsndmFsdWUnXSxcclxuICAgICAgYXV0aG9yRnVsbE5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtYXV0aG9yJylbJ3ZhbHVlJ10sXHJcbiAgICAgIHRvcDogJycsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX211c2ljTGlzdC5hZGQobXVzaWMpO1xyXG4gICAgdGhpcy5yZXNldEZvcm0oKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgcmVzZXRGb3JtKCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW11c2ljJylbJ3ZhbHVlJ10gPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLWF1dGhvcicpWyd2YWx1ZSddID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGAgXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS11cmxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cImZvcm0tbXVzaWNcIiBjbGFzcz1cImZvcm1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLW11c2ljXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVybCBtdXNpYy4uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtYXV0aG9yXCIgIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJBdXRob3IgbmFtZS4uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtbmFtZVwiICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTXVzaWMgbmFtZS4uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11c2ljc1VybENvbXBvbmVudCB9IGZyb20gJy4vbXVzaWNzLXVybC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtY29udGVudC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgY2xhc3MgTXVzaWNzQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHJpdmF0ZSBfdXJsQ29tcG9uZW50ID0gbmV3IE11c2ljc1VybENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX211c2ljTGlzdCA9IG5ldyBNdXNpY3NMaXN0Q29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbXVzaWNDb250ZW50Q29tcG9uZW50ID0gbmV3IE11c2ljc0NvbnRlbnRDb21wb25lbnQoKTtcclxuXHJcbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX3VybENvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fbXVzaWNMaXN0LnRlbXBsYXRlKCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl9tdXNpY0NvbnRlbnRDb21wb25lbnQudGVtcGxhdGUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtaGVhZGVyXCI+TXVzaWM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWRhdGFcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ1cmwtcm9vdFwiIGNsYXNzPVwidXJsLXJvb3RcIj48L2Rpdj4gICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibXVzaWMtcm9vdFwiIGNsYXNzPVwibXVzaWMtcm9vdFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IHsgSW1hZ2VzQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMvaW1hZ2VzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbG1zQ29tcG9uZW50IH0gZnJvbSAnLi9maWxtcy9maWxtcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NDb21wb25lbnQgfSBmcm9tICcuL211c2ljcy9tdXNpY3MuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE1haW5Db21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9pbWFnZXNDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbXVzaWNzQ29tcG9uZW50ID0gbmV3IE11c2ljc0NvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX2ZpbG1zQ29tcG9uZW50ID0gbmV3IEZpbG1zQ29tcG9uZW50KCk7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaGFuZGxlU3VibWl0KG51bGwsIHRoaXMuX211c2ljc0NvbXBvbmVudCk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX2ltYWdlc0NvbXBvbmVudCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX211c2ljc0NvbXBvbmVudCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX2ZpbG1zQ29tcG9uZW50KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVN1Ym1pdCA9IChlOiBFdmVudCwgY29tcG9uZW50OiBJQ29tcG9uZW50KSA9PlxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51XCI+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImIxXCIgaWQ9XCJmbDFcIj48aSBjbGFzcz1cImZhIGZhLXlvdXR1YmUtcGxheVwiIHN0eWxlPVwiZm9udC1zaXplOjM2cHhcIj48L2k+UGhvdG88L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsMlwiPjxpIGNsYXNzPVwiZmEgZmEtbXVzaWNcIiBzdHlsZT1cImZvbnQtc2l6ZTozNnB4XCI+PC9pPk11c2ljPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImIxXCIgaWQ9XCJmbDNcIj48aSBjbGFzcz1cImZhIGZhLXBob3RvXCIgc3R5bGU9XCJmb250LXNpemU6MzZweDtcIj48L2k+RmlsbTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIiBpZD1cImNvbnRlbnRcIj48L2Rpdj5gO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybUNvbnRlbnQoY29udGVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBzdHJpbmdcclxue1xyXG4gIGNvbnN0IGlkID0gYGZvcm0taWQtJHtNYXRoLnJhbmRvbSgpfWA7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PlxyXG4gICAge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zb2xlLndhcm4oJ2V2ZW10JywgZXZlbnQpO1xyXG5cclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH0pO1xyXG4gIH0sIDEpO1xyXG5cclxuICByZXR1cm4gYDxmb3JtIG5vVmFsaWRhdGUgaWQ9XCIke2lkfVwiPiR7Y29udGVudH08L2Zvcm0+YDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1dGhDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIGhhbmRsZXIgPSAoKSA9PlxyXG4gIHtcclxuICAgIGNvbnNvbGUud2FybignSEFORExFUicpXHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydCBlcnJvclwiPkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmQhPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHR5cGU9XCJlbWFpbFwiIC8+PGkgY2xhc3M9XCJmYSBmYS11c2VyXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiAvPjxpIGNsYXNzPVwiZmEgZmEtbG9ja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmLXJpZ2h0XCIgbmFtZT1cIkxvZ2luXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTG9naW5cIiAvPmA7XHJcblxyXG4gICAgcmV0dXJuIGZvcm1Db250ZW50KGNvbnRlbnQsIHRoaXMuaGFuZGxlcik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1haW5Db21wb25lbnQgfSBmcm9tICcuL21haW4vbWFpbkNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF1dGhDb21wb25lbnQgfSBmcm9tICcuL2F1dGgvYXV0aC5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudFxyXG57XHJcbiAgcHJpdmF0ZSBfYXV0aENvbXBvbmVudCA9IG5ldyBBdXRoQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbWFpbkNvbXBvbmVudCA9IG5ldyBNYWluQ29tcG9uZW50KCk7XHJcblxyXG4gIHB1YmxpYyByZW5kZXIoKTogdm9pZFxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRoLXJvb3QnKS5pbm5lckhUTUwgPSB0aGlzLl9hdXRoQ29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1yb290JykuaW5uZXJIVE1MID0gdGhpcy5fbWFpbkNvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwL2FwcC5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgYXBwQ29tcG9uZW50ID0gbmV3IEFwcENvbXBvbmVudCgpO1xyXG5hcHBDb21wb25lbnQucmVuZGVyKCk7Il0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7O0lBZ0JBLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0lBQ3pDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoRixJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUUvRSxJQUFPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDaEMsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0FBRUQsSUFrQk8sU0FBUyxVQUFVLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0lBQzFELElBQUksSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pJLElBQUksSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuSSxTQUFTLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJ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
