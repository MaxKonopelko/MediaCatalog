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

    var ImageServiceClass = (function () {
        function ImageServiceClass() {
            this.storage = new StorageService('image');
        }
        ImageServiceClass.prototype.getById = function (id) {
            return this.storage.getById(id);
        };
        ImageServiceClass.prototype.getList = function () {
            return this.storage.getObj();
        };
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
            document.getElementById('image')['src'] = ImageService.getById(id).link;
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
            var images = ImageService.getList();
            var photos = document.getElementById('photos');
            var str = '';
            images.forEach(function (image) {
                _this.buffer = image.id;
                str += "\n             <li id=\"photo-li\" class=\"photo-li\" data-id=" + image.id + ">\n                <span id=\"photo-span\" class=\"photo-span\" >\n                    " + image.id + ". Photo: " + image.name + "\n                </span>\n                <i id='fa-close' class=\"fa fa-close\" style=\"font-size:24px\"></i>\n             </li>\n      ";
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

    function formContent(content, callback) {
        var id = "form-id-" + Math.random();
        setTimeout(function () {
            var form = document.getElementById(id);
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (form.checkValidity()) {
                    console.log('VALID');
                    form.classList.remove('was-validated');
                    callback();
                }
                else {
                    console.log('INVALID');
                    form.classList.add('was-validated');
                }
            });
        }, 1);
        return "<form class=\"form\" noValidate id=\"" + id + "\">" + content + "</form>";
    }

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
        };
        ImagesUrlComponent.prototype.resetForm = function () {
            document.getElementById('url-photo')['value'] = '';
            document.getElementById('url-name')['value'] = '';
        };
        ImagesUrlComponent.prototype.template = function () {
            var content = "                   \n                      <div class=\"col-3\">\n                      <input class=\"effect-7\" id=\"url-photo\" type=\"text\" placeholder=\"Url image..\" required pattern=\"https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif)\">\n                          <span class=\"focus-border\">\n                            <i></i>\n                          </span>\n                      </div>\n                      <div class=\"col-3\">\n                          <input class=\"effect-7\" id=\"url-name\"  type=\"text\" placeholder=\"Image name..\" required>\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                      </div>\n                      <div class=\"col-3\">\n                        <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\" required>\n                          <span class=\"focus-border\">\n                            <i></i>\n                          </span>\n                      </div>      \n                   ";
            return formContent(content, this.handleSubmit);
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
            return "\n            <div class=\"film-header\">Films</div>\n            <div class=\"film-data\">\n                <div id=\"url-root\" class=\"url-root\">\n                    <form>\n                        <div class=\"col-3\">\n                          <input class=\"effect-7\" id=\"url-music\" type=\"text\" placeholder=\"Url films..\" required pattern=\"https?:\\/\\/.*\\.(?:mp3|mp4)\" >\n                              <span class=\"focus-border\">\n                                <i></i>\n                              </span>\n                          </div>\n                          <div class=\"col-3\">\n                              <input class=\"effect-7\" id=\"url-name\"  type=\"text\" placeholder=\"Music name..\" required pattern=\"[A-Za-z\u0410-\u042F\u0430-\u044F\u0401\u04510-9]{1,15}\">\n                                <span class=\"focus-border\">\n                                  <i></i>\n                                </span>\n                          </div>\n                          <div class=\"col-3\">\n                            <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\">\n                              <span class=\"focus-border\">\n                                <i></i>\n                              </span>\n                          </div>             \n                    </form>\n                </div>          \n                <div id=\"films-root\" class=\"films-root\"></div>     \n            </div>\n           ";
        };
        return FilmsComponent;
    }());

    var MusicServiceClass = (function () {
        function MusicServiceClass() {
            this.storage = new StorageService('music');
        }
        MusicServiceClass.prototype.getById = function (id) {
            return this.storage.getById(id);
        };
        MusicServiceClass.prototype.getList = function () {
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

    function upperCase(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    var MusicsContentComponent = (function () {
        function MusicsContentComponent() {
        }
        MusicsContentComponent.prototype.showMusicById = function (id) {
            var music = MusicService.getById(id);
            document.getElementById('music-author').innerHTML = "Name : " + upperCase(music.authorFullName);
            document.getElementById('music-name').innerHTML = "Track : " + upperCase(music.name);
            this.showMusicByLink(music.link);
        };
        MusicsContentComponent.prototype.showMusicByLink = function (link) {
            var audio = document.getElementById('music-play');
            audio.innerHTML = "\n                       <audio controls autoplay loop>\n                         <source type=\"audio/mpeg\" id=\"music\" src=\"" + link + "\">\n                       </audio>\n                      ";
        };
        MusicsContentComponent.prototype.clear = function () {
            document.getElementById('music')['src'] = '';
        };
        MusicsContentComponent.prototype.template = function () {
            var musicList = MusicService.getList();
            return "\n              <div class=\"music-content\">\n                  <div class=\"music-block\"\n                      <div class=\"music-image\" id=\"music-image\"><img src=\"images/guf.jpg\">\n                      <div class=\"music-author\" id=\"music-author\">Name: " + upperCase(musicList[0].authorFullName) + "</div>\n                      <div class=\"music-name\" id=\"music-name\">Track : " + upperCase(musicList[0].name) + "</div>\n                      <div class=\"music-play\" id=\"music-play\">\n                          <audio controls>\n                              <source type=\"audio/mpeg\" id=\"music\" src=\"" + musicList[0].link + "\">\n                          </audio>\n                      </div>\n                   </div>\n                </div>\n              </div> \n            ";
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
            var music = MusicService.getList();
            var musicUl = document.getElementById('music-ul');
            var str = '';
            music.forEach(function (music) {
                _this.buffer = music.id;
                str += "\n              <li id=\"music-li\" class=\"music-li\" data-id=" + music.id + ">\n                <span id=\"music-span\" class=\"music-span\" >\n                   " + music.id + ". " + upperCase(music.authorFullName) + " - " + music.name + "\n                </span>\n                <i id='fa-close' class=\"fa fa-close\" style=\"font-size:24px\"></i>\n              </li> \n             ";
            });
            musicUl.innerHTML = str;
            this.addSpanClickHandler(musicUl);
            this.addIClickHandler(musicUl);
        };
        MusicsListComponent.prototype.template = function () {
            return " \n            <div class=\"music-list\">\n                  <ul class=\"music-ul\" id=\"music-ul\"></ul>\n            </div>\n           ";
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
        };
        MusicsUrlComponent.prototype.resetForm = function () {
            document.getElementById('url-music')['value'] = '';
            document.getElementById('url-name')['value'] = '';
            document.getElementById('url-author')['value'] = '';
        };
        MusicsUrlComponent.prototype.template = function () {
            var content = "                        \n                      <div class=\"col-3\">\n                      <input class=\"effect-7\" id=\"url-music\" type=\"text\" placeholder=\"Url music..\" required pattern=\"https?:\\/\\/.*\\.(?:mp3|mp4)\" >\n                          <span class=\"focus-border\">\n                            <i></i>\n                          </span>\n                      </div>\n                      <div class=\"col-3\">\n                          <input class=\"effect-7\" id=\"url-author\"  type=\"text\" placeholder=\"Author name..\" required pattern=\"[A-Za-z\u0410-\u042F\u0430-\u044F\u0401\u04510-9]{1,15}\">\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                      </div>\n                      <div class=\"col-3\">\n                          <input class=\"effect-7\" id=\"url-name\"  type=\"text\" placeholder=\"Music name..\" required pattern=\"[A-Za-z\u0410-\u042F\u0430-\u044F\u0401\u04510-9]{1,15}\">\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                      </div>\n                      <div class=\"col-3\">\n                        <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\">\n                          <span class=\"focus-border\">\n                            <i></i>\n                          </span>\n                      </div>                \n                   ";
            return formContent(content, this.handleSubmit);
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

    var AuthComponent = (function () {
        function AuthComponent() {
            this.handler = function () {
                console.warn('HANDLER');
            };
        }
        AuthComponent.prototype.template = function () {
            var content = "\n                  <div class=\"alert error\">Invalid username or password!</div>\n                  <fieldset>\n                    <input name=\"email\" placeholder=\"Username\" type=\"email\" required  /><i class=\"fa fa-user\"></i>\n                  </fieldset>\n                  <fieldset>\n                    <input name=\"password\" placeholder=\"Password\" type=\"password\" required pattern=\"[0-9]{6,14}\"/><i class=\"fa fa-lock\"></i>\n                  </fieldset>\n                    <input class=\"f-right\" name=\"Login\" type=\"submit\" value=\"Login\" />";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbXBvbmVudC50cyIsIi4uL3NyYy9saWJyZXJpcy9icm93c2VyLXN0b3JhZ2UudHMiLCIuLi9zcmMvc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy1jb250ZW50LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9pbWFnZXMvaW1hZ2VzLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9jb250cm9scy9jb250cm9scy50cyIsIi4uL3NyYy9hcHAvbWFpbi9pbWFnZXMvaW1hZ2VzLXVybC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vZmlsbXMvZmlsbXMuY29tcG9uZW50LnRzIiwiLi4vc3JjL3NlcnZpY2VzL211c2ljLnNlcnZpY2UudHMiLCIuLi9zcmMvbGlicmVyaXMvY29tbW9uLnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljcy9tdXNpY3MtY29udGVudC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbXVzaWNzL211c2ljcy1saXN0LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9tdXNpY3MvbXVzaWNzLXVybC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbXVzaWNzL211c2ljcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbWFpbkNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvYXV0aC9hdXRoLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL2FwcC90eXBlcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50PFRGdW5jdGlvbiBleHRlbmRzIEZ1bmN0aW9uPihvbGRDb25zdHJ1Y3RvcjogeyBuZXcoKTogSUNvbXBvbmVudDsgfSk6IGFueVxyXG57XHJcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgb2xkQ29uc3RydWN0b3JcclxuICB7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKTogYW55XHJcbiAgICAgIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUub25Jbml0ID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBvbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUub25Jbml0LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG9sZENvbnN0cnVjdG9yLnByb3RvdHlwZS50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcbn0iLCJleHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2U8VD5cclxue1xyXG4gIHB1YmxpYyBrZXk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcpXHJcbiAge1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0T2JqZWN0KHZhbHVlOiBUKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMua2V5LCBzdHIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9iamVjdCgpOiBUXHJcbiAge1xyXG4gICAgY29uc3QgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KTtcclxuXHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5rZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyQWxsKCk6IHZvaWRcclxuICB7XHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJRW50aXR5IH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IEJyb3dzZXJTdG9yYWdlIH0gZnJvbSAnLi4vbGlicmVyaXMvYnJvd3Nlci1zdG9yYWdlJztcclxuXHJcbmludGVyZmFjZSBJU3RvcmFnZU1vZGVsPFRNb2RlbD5cclxue1xyXG4gIGluZGV4OiBudW1iZXI7XHJcbiAgbGlzdDogVE1vZGVsW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZTxUIGV4dGVuZHMgSUVudGl0eT5cclxue1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYnJvd3NlclN0b3JhZ2U6IEJyb3dzZXJTdG9yYWdlPElTdG9yYWdlTW9kZWw8VD4+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZylcclxuICB7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlID0gbmV3IEJyb3dzZXJTdG9yYWdlPElTdG9yYWdlTW9kZWw8VD4+KGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QnlJZChpZDogbnVtYmVyKTogVFxyXG4gIHtcclxuICAgIGNvbnN0IG9iakxpc3Q6IFRbXSA9IHRoaXMuZ2V0T2JqKCk7XHJcbiAgICByZXR1cm4gb2JqTGlzdC5maW5kKHggPT4geC5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9iaigpOiBUW11cclxuICB7XHJcbiAgICBjb25zdCBicm93c2VyU3RvcmFnZURhdGEgPSB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG4gICAgcmV0dXJuIGJyb3dzZXJTdG9yYWdlRGF0YSA/IGJyb3dzZXJTdG9yYWdlRGF0YS5saXN0IDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IFRbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuXHJcbiAgICBpZiAoc3RvcmFnZSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgY29uc3Qgc3RvcmFnZU9iajogSVN0b3JhZ2VNb2RlbDxUPiA9IHtcclxuICAgICAgICBpbmRleDogMCxcclxuICAgICAgICBsaXN0OiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGl0ZW0uaWQgPSBzdG9yYWdlT2JqLmluZGV4O1xyXG4gICAgICAgIHN0b3JhZ2VPYmoubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHN0b3JhZ2VPYmouaW5kZXgrKztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLnNldE9iamVjdChzdG9yYWdlT2JqKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKGl0ZW0uaWQgPT09IChudWxsIHx8IHVuZGVmaW5lZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaXRlbS5pZCA9IHN0b3JhZ2UuaW5kZXg7XHJcbiAgICAgICAgICBzdG9yYWdlLmxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgIHN0b3JhZ2UuaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5icm93c2VyU3RvcmFnZS5zZXRPYmplY3Qoc3RvcmFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0b3JhZ2VPYmogPSB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG4gICAgY29uc3QgaW5kZXggPSBzdG9yYWdlT2JqLmxpc3QuZmluZEluZGV4KHggPT4gKHguaWQgPT09IGlkKSk7XHJcbiAgICBzdG9yYWdlT2JqLmxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLnNldE9iamVjdChzdG9yYWdlT2JqKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5icm93c2VyU3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElJbWFnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgSW1hZ2VTZXJ2aWNlQ2xhc3Ncclxue1xyXG4gIHByaXZhdGUgc3RvcmFnZSA9IG5ldyBTdG9yYWdlU2VydmljZTxJSW1hZ2VNb2RlbD4oJ2ltYWdlJyk7XHJcblxyXG4gIHB1YmxpYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBJSW1hZ2VNb2RlbFxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0QnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGlzdCgpOiBJSW1hZ2VNb2RlbFtdXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaXRlbTogSUltYWdlTW9kZWwpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgaW1hZ2VMaXN0OiBJSW1hZ2VNb2RlbFtdID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgaW1hZ2VMaXN0LnB1c2goaXRlbSk7XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogSUltYWdlTW9kZWxbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBpbWFnZUxpc3QgPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGl0ZW1zKVxyXG4gICAge1xyXG4gICAgICBpbWFnZUxpc3QucHVzaChpbWFnZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVCeUlkKGlkOiBudW1iZXIpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBJbWFnZVNlcnZpY2UgPSBuZXcgSW1hZ2VTZXJ2aWNlQ2xhc3MoKTsiLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHVibGljIHNob3dJbWFnZUJ5SWQoaWQ6IG51bWJlcik6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpWydzcmMnXSA9IEltYWdlU2VydmljZS5nZXRCeUlkKGlkKS5saW5rO1xuICB9XG5cbiAgcHVibGljIHNob3dJbWFnZUJ5TGluayhsaW5rOiBzdHJpbmcpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKVsnc3JjJ10gPSBsaW5rO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpWydzcmMnXSA9ICdodHRwOi8vcGxhY2Vob2xkLml0LzIwMHgyMDAnO1xuICB9XG5cbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xuICB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0gXCJwaG90by1jb250ZW50XCI+ICBcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvLXNpemVcIj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaW1hZ2VcIiBpZD1cImltYWdlXCIgc3JjPVwiaHR0cDovL3BsYWNlaG9sZC5pdC8yMDB4MjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEltYWdlc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy1jb250ZW50LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnRcbmV4cG9ydCBjbGFzcyBJbWFnZXNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxue1xuICBwcml2YXRlIGltYWdlc0NvbnRlbnRDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29udGVudENvbXBvbmVudCgpO1xuICBwcml2YXRlIGFjdGl2ZUlkOiBudW1iZXI7XG4gIHByaXZhdGUgYnVmZmVyOiBudW1iZXI7XG5cbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGQoaW1hZ2U6IG9iamVjdCk6IHZvaWRcbiAge1xuICAgIEltYWdlU2VydmljZS5hZGQoaW1hZ2UpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSB0aGlzLmJ1ZmZlcjtcbiAgICB0aGlzLmFjdGl2YXRlRWxlbWVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoKCk6IHZvaWRcbiAge1xuICAgIGNvbnN0IGltYWdlcyA9IEltYWdlU2VydmljZS5nZXRMaXN0KCk7XG4gICAgY29uc3QgcGhvdG9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvcycpO1xuICAgIGxldCBzdHIgPSAnJztcblxuICAgIGltYWdlcy5mb3JFYWNoKGltYWdlID0+XG4gICAge1xuICAgICAgdGhpcy5idWZmZXIgPSBpbWFnZS5pZDtcbiAgICAgIHN0ciArPSBgXG4gICAgICAgICAgICAgPGxpIGlkPVwicGhvdG8tbGlcIiBjbGFzcz1cInBob3RvLWxpXCIgZGF0YS1pZD0ke2ltYWdlLmlkfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cInBob3RvLXNwYW5cIiBjbGFzcz1cInBob3RvLXNwYW5cIiA+XG4gICAgICAgICAgICAgICAgICAgICR7aW1hZ2UuaWR9LiBQaG90bzogJHtpbWFnZS5uYW1lfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aSBpZD0nZmEtY2xvc2UnIGNsYXNzPVwiZmEgZmEtY2xvc2VcIiBzdHlsZT1cImZvbnQtc2l6ZToyNHB4XCI+PC9pPlxuICAgICAgICAgICAgIDwvbGk+XG4gICAgICBgO1xuICAgIH0pO1xuICAgIHBob3Rvcy5pbm5lckhUTUwgPSBzdHI7XG5cbiAgICB0aGlzLmFkZFNwYW5DbGlja0hhbmRsZXIocGhvdG9zKTtcbiAgICB0aGlzLmFkZElDbGlja0hhbmRsZXIocGhvdG9zKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkU3BhbkNsaWNrSGFuZGxlciA9IChwaG90b3M6IEhUTUxFbGVtZW50KSA9PlxuICB7XG4gICAgY29uc3Qgc3BhbkNvbGxlY3Rpb24gPSBwaG90b3MucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oc3BhbkNvbGxlY3Rpb24pO1xuXG4gICAgbGlzdEFycmF5LmZvckVhY2goc3BhbkVsZW1lbnQgPT5cbiAgICB7XG4gICAgICBzcGFuRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNwYW5FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocGFyZW50LmRhdGFzZXQuaWQpO1xuICAgICAgICB0aGlzLmFjdGl2ZUlkID0gaWQ7XG4gICAgICAgIHRoaXMuaW1hZ2VzQ29udGVudENvbXBvbmVudC5zaG93SW1hZ2VCeUlkKGlkKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVFbGVtZW50KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBwdWJsaWMgYWN0aXZhdGVFbGVtZW50ID0gKCkgPT5cbiAge1xuICAgIGNvbnN0IGxpQ29sbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waG90b3MgbGknKTtcbiAgICBjb25zdCBsaXN0TGkgPSBBcnJheS5mcm9tKGxpQ29sbGVjdGlvbik7XG4gICAgY29uc3QgbGlFbGVtID0gbGlzdExpLmZpbmQobGUgPT4gcGFyc2VJbnQobGUuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpID09PSB0aGlzLmFjdGl2ZUlkKTtcbiAgICBsaUVsZW0uY2xhc3NMaXN0LmFkZCgnbmV3U3BhbicpO1xuICB9O1xuXG4gIHB1YmxpYyBhZGRJQ2xpY2tIYW5kbGVyID0gKHBob3RvczogSFRNTEVsZW1lbnQpID0+XG4gIHtcbiAgICBjb25zdCBJQ29sbGVjdGlvbiA9IHBob3Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdpJyk7XG4gICAgY29uc3QgbGlzdEFycmF5ID0gQXJyYXkuZnJvbShJQ29sbGVjdGlvbik7XG5cbiAgICBsaXN0QXJyYXkuZm9yRWFjaChpRWxlbWVudCA9PlxuICAgIHtcbiAgICAgIGlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gaUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChwYXJlbnQuZGF0YXNldC5pZCk7XG4gICAgICAgIEltYWdlU2VydmljZS5yZW1vdmVCeUlkKGlkKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIHRoaXMuaW1hZ2VzQ29udGVudENvbXBvbmVudC5jbGVhcigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xuICB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvLWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInBob3Rvc1wiIGlkPVwicGhvdG9zXCI+PC91bD5cbiAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICBcbiAgICAgICAgICAgIGA7XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBmb3JtQ29udGVudChjb250ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHN0cmluZ1xyXG57XHJcbiAgY29uc3QgaWQgPSBgZm9ybS1pZC0ke01hdGgucmFuZG9tKCl9YDtcclxuXHJcbiAgc2V0VGltZW91dCgoKSA9PlxyXG4gIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PlxyXG4gICAge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpKVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1ZBTElEJyk7XHJcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCd3YXMtdmFsaWRhdGVkJyk7XHJcbiAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnSU5WQUxJRCcpO1xyXG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnd2FzLXZhbGlkYXRlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCAxKTtcclxuICByZXR1cm4gYDxmb3JtIGNsYXNzPVwiZm9ybVwiIG5vVmFsaWRhdGUgaWQ9XCIke2lkfVwiPiR7Y29udGVudH08L2Zvcm0+YDtcclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IEltYWdlc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBmb3JtQ29udGVudCB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL2NvbnRyb2xzJztcblxuQENvbXBvbmVudFxuZXhwb3J0IGNsYXNzIEltYWdlc1VybENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHJpdmF0ZSBfcGhvdG9MaXN0ID0gbmV3IEltYWdlc0xpc3RDb21wb25lbnQoKTtcbiAgcHJpdmF0ZSBfaW1hZ2VzQ29udGVudENvbXBvbmVudCA9IG5ldyBJbWFnZXNDb250ZW50Q29tcG9uZW50KCk7XG5cbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVDaGFuZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVDaGFuZ2UgPSAoKSA9PlxuICB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKVsndmFsdWUnXTtcbiAgICB0aGlzLl9pbWFnZXNDb250ZW50Q29tcG9uZW50LnNob3dJbWFnZUJ5TGluayhsaW5rKTtcbiAgfTtcblxuICBwcml2YXRlIGhhbmRsZVN1Ym1pdCA9IChldmVudDogRXZlbnQpID0+XG4gIHtcbiAgICBjb25zdCB1cmxQaG90byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKTtcblxuICAgIGNvbnN0IGltYWdlID0ge1xuICAgICAgbGluazogdXJsUGhvdG9bJ3ZhbHVlJ10sXG4gICAgICBuYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW5hbWUnKVsndmFsdWUnXSxcbiAgICAgIGF1dGhvckZ1bGxOYW1lOiAnJyxcbiAgICAgIHRvcDogJycsXG4gICAgfTtcblxuICAgIHRoaXMuX3Bob3RvTGlzdC5hZGQoaW1hZ2UpO1xuICAgIHRoaXMucmVzZXRGb3JtKCk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZXNldEZvcm0oKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpWyd2YWx1ZSddID0gJyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1uYW1lJylbJ3ZhbHVlJ10gPSAnJztcbiAgfVxuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtcGhvdG9cIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXJsIGltYWdlLi5cIiByZXF1aXJlZCBwYXR0ZXJuPVwiaHR0cHM/OlxcXFwvXFxcXC8uKlxcXFwuKD86cG5nfGpwZ3xqcGVnfGdpZilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1uYW1lXCIgIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJJbWFnZSBuYW1lLi5cIiByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJzdWJtaXRcIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTYXZlXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgXG4gICAgICAgICAgICAgICAgICAgYDtcbiAgICByZXR1cm4gZm9ybUNvbnRlbnQoY29udGVudCwgdGhpcy5oYW5kbGVTdWJtaXQpO1xuICB9XG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNVcmxDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy11cmwuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtbGlzdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxue1xuICBwcml2YXRlIF91cmxDb21wb25lbnQgPSBuZXcgSW1hZ2VzVXJsQ29tcG9uZW50KCk7XG4gIHByaXZhdGUgX3Bob3RvQ29udGVudENvbXBvbmVudCA9IG5ldyBJbWFnZXNDb250ZW50Q29tcG9uZW50KCk7XG4gIHByaXZhdGUgX3Bob3RvTGlzdCA9IG5ldyBJbWFnZXNMaXN0Q29tcG9uZW50KCk7XG5cbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fdXJsQ29tcG9uZW50LnRlbXBsYXRlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fcGhvdG9Db250ZW50Q29tcG9uZW50LnRlbXBsYXRlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fcGhvdG9MaXN0LnRlbXBsYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICByZXR1cm4gYCBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1oZWFkZXJcIj5QaG90byBHYWxsZXJ5PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPVwicGhvdG8tZGF0YVwiIGNsYXNzPVwicGhvdG8tZGF0YVwiPiBcbiAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInVybC1yb290XCIgY2xhc3M9XCJ1cmwtcm9vdFwiPjwvZGl2PiAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInBob3RvLXJvb3RcIiBjbGFzcz1cInBob3RvLXJvb3RcIj48L2Rpdj4gICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxtc0NvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbS1oZWFkZXJcIj5GaWxtczwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbS1kYXRhXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidXJsLXJvb3RcIiBjbGFzcz1cInVybC1yb290XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtbXVzaWNcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXJsIGZpbG1zLi5cIiByZXF1aXJlZCBwYXR0ZXJuPVwiaHR0cHM/OlxcXFwvXFxcXC8uKlxcXFwuKD86bXAzfG1wNClcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtbmFtZVwiICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTXVzaWMgbmFtZS4uXCIgcmVxdWlyZWQgcGF0dGVybj1cIltBLVphLXrQkC3Qr9CwLdGP0IHRkTAtOV17MSwxNX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJzdWJtaXRcIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTYXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJmaWxtcy1yb290XCIgY2xhc3M9XCJmaWxtcy1yb290XCI+PC9kaXY+ICAgICBcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgYDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSU11c2ljTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5jbGFzcyBNdXNpY1NlcnZpY2VDbGFzc1xyXG57XHJcbiAgcHJpdmF0ZSBzdG9yYWdlID0gbmV3IFN0b3JhZ2VTZXJ2aWNlPElNdXNpY01vZGVsPignbXVzaWMnKTtcclxuXHJcbiAgcHVibGljIGdldEJ5SWQoaWQ6IG51bWJlcik6IElNdXNpY01vZGVsXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMaXN0KCk6IElNdXNpY01vZGVsW11cclxuICB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZChpdGVtOiBJTXVzaWNNb2RlbCk6IHZvaWRcclxuICB7XHJcbiAgICAgIGNvbnN0IG11c2ljTGlzdDogSU11c2ljTW9kZWxbXSA9IHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICAgICAgbXVzaWNMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5hZGRBcnJheShtdXNpY0xpc3QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEFycmF5KGl0ZW1zOiBJTXVzaWNNb2RlbFtdKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IG11c2ljTGlzdCA9IHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICAgIGZvciAoY29uc3QgbXVzaWMgb2YgaXRlbXMpXHJcbiAgICB7XHJcbiAgICAgIG11c2ljTGlzdC5wdXNoKG11c2ljKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RvcmFnZS5hZGRBcnJheShtdXNpY0xpc3QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUJ5SWQoaWQ6IG51bWJlcik6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlQnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE11c2ljU2VydmljZSA9IG5ldyBNdXNpY1NlcnZpY2VDbGFzcygpOyIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3B5PFQ+KG9iajogVCk6IFRcclxue1xyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gaW1hZ2VVcmxJc1ZhbGlkKHN0cjogc3RyaW5nKTogYm9vbGVhblxyXG4vLyB7XHJcbi8vICAgY29uc3QgbXlSZWdleCA9IC8oaHR0cHM/OlxcL1xcLy4qXFwuKD86cG5nfGpwZ3xqcGVnfGdpZikpL2k7XHJcbi8vICAgcmV0dXJuIG15UmVnZXgudGVzdChzdHIpO1xyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gbXVzaWNVcmxJc1ZhbGlkKHN0cjogc3RyaW5nKTogYm9vbGVhblxyXG4vLyB7XHJcbi8vICAgY29uc3QgbXlSZWdleCA9IC8oaHR0cHM/OlxcL1xcLy4qXFwuKD86bXAzfG1wNCkpL2k7XHJcbi8vICAgcmV0dXJuIG15UmVnZXgudGVzdChzdHIpO1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBwZXJDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nXHJcbntcclxuICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBpc0V4aXN0SHRtbEluRE9NKGVsZW1lbnQ6IEhUTUxFbGVtZW50KVxyXG4vLyB7XHJcbi8vICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWxlbWVudCk7XHJcbi8vIH0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdXBwZXJDYXNlIH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE11c2ljc0NvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgc2hvd011c2ljQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IG11c2ljID0gTXVzaWNTZXJ2aWNlLmdldEJ5SWQoaWQpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljLWF1dGhvcicpLmlubmVySFRNTCA9IGBOYW1lIDogJHt1cHBlckNhc2UobXVzaWMuYXV0aG9yRnVsbE5hbWUpfWA7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtbmFtZScpLmlubmVySFRNTCA9IGBUcmFjayA6ICR7dXBwZXJDYXNlKG11c2ljLm5hbWUpfWA7XHJcbiAgICB0aGlzLnNob3dNdXNpY0J5TGluayhtdXNpYy5saW5rKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93TXVzaWNCeUxpbmsobGluazogc3RyaW5nKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljLXBsYXknKTtcclxuICAgIGF1ZGlvLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICA8YXVkaW8gY29udHJvbHMgYXV0b3BsYXkgbG9vcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2UgdHlwZT1cImF1ZGlvL21wZWdcIiBpZD1cIm11c2ljXCIgc3JjPVwiJHtsaW5rfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgIDwvYXVkaW8+XHJcbiAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMnKVsnc3JjJ10gPSAnJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICBjb25zdCBtdXNpY0xpc3QgPSBNdXNpY1NlcnZpY2UuZ2V0TGlzdCgpO1xyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWJsb2NrXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1pbWFnZVwiIGlkPVwibXVzaWMtaW1hZ2VcIj48aW1nIHNyYz1cImltYWdlcy9ndWYuanBnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtYXV0aG9yXCIgaWQ9XCJtdXNpYy1hdXRob3JcIj5OYW1lOiAke3VwcGVyQ2FzZShtdXNpY0xpc3RbMF0uYXV0aG9yRnVsbE5hbWUpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLW5hbWVcIiBpZD1cIm11c2ljLW5hbWVcIj5UcmFjayA6ICR7dXBwZXJDYXNlKG11c2ljTGlzdFswXS5uYW1lKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1wbGF5XCIgaWQ9XCJtdXNpYy1wbGF5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGF1ZGlvIGNvbnRyb2xzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHR5cGU9XCJhdWRpby9tcGVnXCIgaWQ9XCJtdXNpY1wiIHNyYz1cIiR7bXVzaWNMaXN0WzBdLmxpbmt9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hdWRpbz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgIGA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgTXVzaWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbXVzaWMuc2VydmljZSc7XHJcbmltcG9ydCB7IE11c2ljc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL211c2ljcy1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHVwcGVyQ2FzZSB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbW1vbic7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY3NMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHJpdmF0ZSBfbXVzaWNzQ29udGVudENvbXBvbmVudCA9IG5ldyBNdXNpY3NDb250ZW50Q29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBhY3RpdmVJZDogbnVtYmVyO1xyXG4gIHByaXZhdGUgYnVmZmVyOiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZChtdXNpYzogb2JqZWN0KTogdm9pZFxyXG4gIHtcclxuICAgIE11c2ljU2VydmljZS5hZGQobXVzaWMpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUlkID0gdGhpcy5idWZmZXI7XHJcbiAgICB0aGlzLmFjdGl2YXRlRWxlbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoKCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBtdXNpYyA9IE11c2ljU2VydmljZS5nZXRMaXN0KCk7XHJcbiAgICBjb25zdCBtdXNpY1VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljLXVsJyk7XHJcbiAgICBsZXQgc3RyID0gJyc7XHJcblxyXG4gICAgbXVzaWMuZm9yRWFjaChtdXNpYyA9PlxyXG4gICAge1xyXG4gICAgICB0aGlzLmJ1ZmZlciA9IG11c2ljLmlkO1xyXG4gICAgICBzdHIgKz0gYFxyXG4gICAgICAgICAgICAgIDxsaSBpZD1cIm11c2ljLWxpXCIgY2xhc3M9XCJtdXNpYy1saVwiIGRhdGEtaWQ9JHttdXNpYy5pZH0+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cIm11c2ljLXNwYW5cIiBjbGFzcz1cIm11c2ljLXNwYW5cIiA+XHJcbiAgICAgICAgICAgICAgICAgICAke211c2ljLmlkfS4gJHt1cHBlckNhc2UobXVzaWMuYXV0aG9yRnVsbE5hbWUpfSAtICR7bXVzaWMubmFtZX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGlkPSdmYS1jbG9zZScgY2xhc3M9XCJmYSBmYS1jbG9zZVwiIHN0eWxlPVwiZm9udC1zaXplOjI0cHhcIj48L2k+XHJcbiAgICAgICAgICAgICAgPC9saT4gXHJcbiAgICAgICAgICAgICBgO1xyXG4gICAgfSk7XHJcbiAgICBtdXNpY1VsLmlubmVySFRNTCA9IHN0cjtcclxuXHJcbiAgICB0aGlzLmFkZFNwYW5DbGlja0hhbmRsZXIobXVzaWNVbCk7XHJcbiAgICB0aGlzLmFkZElDbGlja0hhbmRsZXIobXVzaWNVbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFNwYW5DbGlja0hhbmRsZXIgPSAobXVzaWNVbDogSFRNTEVsZW1lbnQpID0+XHJcbiAge1xyXG4gICAgY29uc3Qgc3BhbkNvbGxlY3Rpb24gPSBtdXNpY1VsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcclxuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oc3BhbkNvbGxlY3Rpb24pO1xyXG5cclxuICAgIGxpc3RBcnJheS5mb3JFYWNoKHNwYW5FbGVtZW50ID0+XHJcbiAgICB7XHJcbiAgICAgIHNwYW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cclxuICAgICAge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNwYW5FbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChwYXJlbnQuZGF0YXNldC5pZCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX211c2ljc0NvbnRlbnRDb21wb25lbnQuc2hvd011c2ljQnlJZChpZCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUVsZW1lbnQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgYWN0aXZhdGVFbGVtZW50ID0gKCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBsaUNvbGxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubXVzaWMtdWwgbGknKTtcclxuICAgIGNvbnN0IGxpc3RMaSA9IEFycmF5LmZyb20obGlDb2xsZWN0aW9uKTtcclxuICAgIGNvbnN0IGxpRWxlbSA9IGxpc3RMaS5maW5kKGxlID0+IHBhcnNlSW50KGxlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKSA9PT0gdGhpcy5hY3RpdmVJZCk7XHJcbiAgICBsaUVsZW0uY2xhc3NMaXN0LmFkZCgnbmV3U3BhbicpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBhZGRJQ2xpY2tIYW5kbGVyID0gKG11c2ljVWw6IEhUTUxFbGVtZW50KSA9PlxyXG4gIHtcclxuICAgIGNvbnN0IElDb2xsZWN0aW9uID0gbXVzaWNVbC5xdWVyeVNlbGVjdG9yQWxsKCdpJyk7XHJcbiAgICBjb25zdCBsaXN0QXJyYXkgPSBBcnJheS5mcm9tKElDb2xsZWN0aW9uKTtcclxuXHJcbiAgICBsaXN0QXJyYXkuZm9yRWFjaChpRWxlbWVudCA9PlxyXG4gICAge1xyXG4gICAgICBpRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XHJcbiAgICAgIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSBpRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocGFyZW50LmRhdGFzZXQuaWQpO1xyXG4gICAgICAgIE11c2ljU2VydmljZS5yZW1vdmVCeUlkKGlkKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB0aGlzLl9tdXNpY3NDb250ZW50Q29tcG9uZW50LmNsZWFyKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJtdXNpYy11bFwiIGlkPVwibXVzaWMtdWxcIj48L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICBgO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY3NMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBmb3JtQ29udGVudCB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL2NvbnRyb2xzJztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE11c2ljc1VybENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHB1YmxpYyBfbXVzaWNMaXN0ID0gbmV3IE11c2ljc0xpc3RDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tdXNpY3NDb250ZW50Q29tcG9uZW50ID0gbmV3IE11c2ljc0NvbnRlbnRDb21wb25lbnQoKTtcclxuXHJcbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1tdXNpYycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ2hhbmdlID0gKCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1tdXNpYycpWyd2YWx1ZSddO1xyXG4gICAgdGhpcy5fbXVzaWNzQ29udGVudENvbXBvbmVudC5zaG93TXVzaWNCeUxpbmsobGluayk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVTdWJtaXQgPSAoZXZlbnQ6IEV2ZW50KSA9PlxyXG4gIHtcclxuICAgIGNvbnN0IHVybE11c2ljID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1tdXNpYycpO1xyXG5cclxuICAgIGNvbnN0IG11c2ljID0ge1xyXG4gICAgICBsaW5rOiB1cmxNdXNpY1sndmFsdWUnXSxcclxuICAgICAgbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1uYW1lJylbJ3ZhbHVlJ10sXHJcbiAgICAgIGF1dGhvckZ1bGxOYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLWF1dGhvcicpWyd2YWx1ZSddLFxyXG4gICAgICB0b3A6ICcnLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9tdXNpY0xpc3QuYWRkKG11c2ljKTtcclxuICAgIHRoaXMucmVzZXRGb3JtKCk7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSByZXNldEZvcm0oKTogdm9pZFxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbXVzaWMnKVsndmFsdWUnXSA9ICcnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1uYW1lJylbJ3ZhbHVlJ10gPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtYXV0aG9yJylbJ3ZhbHVlJ10gPSAnJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gYCAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLW11c2ljXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVybCBtdXNpYy4uXCIgcmVxdWlyZWQgcGF0dGVybj1cImh0dHBzPzpcXFxcL1xcXFwvLipcXFxcLig/Om1wM3xtcDQpXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLWF1dGhvclwiICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQXV0aG9yIG5hbWUuLlwiIHJlcXVpcmVkIHBhdHRlcm49XCJbQS1aYS160JAt0K/QsC3Rj9CB0ZEwLTldezEsMTV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtbmFtZVwiICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTXVzaWMgbmFtZS4uXCIgcmVxdWlyZWQgcGF0dGVybj1cIltBLVphLXrQkC3Qr9CwLdGP0IHRkTAtOV17MSwxNX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJzdWJtaXRcIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTYXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIHJldHVybiBmb3JtQ29udGVudChjb250ZW50LCB0aGlzLmhhbmRsZVN1Ym1pdCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVzaWNzVXJsQ29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtdXJsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11c2ljc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL211c2ljcy1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11c2ljc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL211c2ljcy1jb250ZW50LmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY3NDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF91cmxDb21wb25lbnQgPSBuZXcgTXVzaWNzVXJsQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbXVzaWNMaXN0ID0gbmV3IE11c2ljc0xpc3RDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tdXNpY0NvbnRlbnRDb21wb25lbnQgPSBuZXcgTXVzaWNzQ29udGVudENvbXBvbmVudCgpO1xyXG5cclxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fdXJsQ29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl9tdXNpY0xpc3QudGVtcGxhdGUoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYy1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX211c2ljQ29udGVudENvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1oZWFkZXJcIj5NdXNpYzwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtZGF0YVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInVybC1yb290XCIgY2xhc3M9XCJ1cmwtcm9vdFwiPjwvZGl2PiAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtdXNpYy1yb290XCIgY2xhc3M9XCJtdXNpYy1yb290XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBJbWFnZXNDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy9pbWFnZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsbXNDb21wb25lbnQgfSBmcm9tICcuL2ZpbG1zL2ZpbG1zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11c2ljc0NvbXBvbmVudCB9IGZyb20gJy4vbXVzaWNzL211c2ljcy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgY2xhc3MgTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgX2ltYWdlc0NvbXBvbmVudCA9IG5ldyBJbWFnZXNDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tdXNpY3NDb21wb25lbnQgPSBuZXcgTXVzaWNzQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfZmlsbXNDb21wb25lbnQgPSBuZXcgRmlsbXNDb21wb25lbnQoKTtcclxuXHJcbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQobnVsbCwgdGhpcy5fbXVzaWNzQ29tcG9uZW50KTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmwxJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSwgdGhpcy5faW1hZ2VzQ29tcG9uZW50KSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmwyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSwgdGhpcy5fbXVzaWNzQ29tcG9uZW50KSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmwzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSwgdGhpcy5fZmlsbXNDb21wb25lbnQpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3VibWl0ID0gKGU6IEV2ZW50LCBjb21wb25lbnQ6IElDb21wb25lbnQpID0+XHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKS5pbm5lckhUTUwgPSBjb21wb25lbnQudGVtcGxhdGUoKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVcIj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsMVwiPjxpIGNsYXNzPVwiZmEgZmEteW91dHViZS1wbGF5XCIgc3R5bGU9XCJmb250LXNpemU6MzZweFwiPjwvaT5QaG90bzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiMVwiIGlkPVwiZmwyXCI+PGkgY2xhc3M9XCJmYSBmYS1tdXNpY1wiIHN0eWxlPVwiZm9udC1zaXplOjM2cHhcIj48L2k+TXVzaWM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsM1wiPjxpIGNsYXNzPVwiZmEgZmEtcGhvdG9cIiBzdHlsZT1cImZvbnQtc2l6ZTozNnB4O1wiPjwvaT5GaWxtPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIGlkPVwiY29udGVudFwiPjwvZGl2PmA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IHsgZm9ybUNvbnRlbnQgfSBmcm9tICcuLi9jb250cm9scy9jb250cm9scyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXV0aENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgaGFuZGxlciA9ICgpID0+XHJcbiAge1xyXG4gICAgY29uc29sZS53YXJuKCdIQU5ETEVSJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydCBlcnJvclwiPkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmQhPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHR5cGU9XCJlbWFpbFwiIHJlcXVpcmVkICAvPjxpIGNsYXNzPVwiZmEgZmEtdXNlclwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgcmVxdWlyZWQgcGF0dGVybj1cIlswLTldezYsMTR9XCIvPjxpIGNsYXNzPVwiZmEgZmEtbG9ja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmLXJpZ2h0XCIgbmFtZT1cIkxvZ2luXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTG9naW5cIiAvPmA7XHJcblxyXG4gICAgcmV0dXJuIGZvcm1Db250ZW50KGNvbnRlbnQsIHRoaXMuaGFuZGxlcik7XHJcblxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNYWluQ29tcG9uZW50IH0gZnJvbSAnLi9tYWluL21haW5Db21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2F1dGguY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgX2F1dGhDb21wb25lbnQgPSBuZXcgQXV0aENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX21haW5Db21wb25lbnQgPSBuZXcgTWFpbkNvbXBvbmVudCgpO1xyXG5cclxuICBwdWJsaWMgcmVuZGVyKCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aC1yb290JykuaW5uZXJIVE1MID0gdGhpcy5fYXV0aENvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tcm9vdCcpLmlubmVySFRNTCA9IHRoaXMuX21haW5Db21wb25lbnQudGVtcGxhdGUoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC9hcHAuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IGFwcENvbXBvbmVudCA9IG5ldyBBcHBDb21wb25lbnQoKTtcclxuYXBwQ29tcG9uZW50LnJlbmRlcigpOyJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7OztJQWdCQSxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztJQUN6QyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEYsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFL0UsSUFBTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztBQUVELElBa0JPLFNBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUMxRCxJQUFJLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqSSxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkksU0FBUyxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEosSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJ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
