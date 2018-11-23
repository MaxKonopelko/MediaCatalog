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
        ImageServiceClass.prototype.getId = function (id) {
            return this.storage.getById(id);
        };
        ImageServiceClass.prototype.get = function () {
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
                str += "\n             <li id=\"photo-li\" class=\"photo-li\" data-id=" + image.id + ">\n                <span id=\"photo-span\" class=\"photo-span\" >\n                    <span id=\"span-strong\" class=\"span-strong\">" + image.id + ". Photo: </span> " + image.name + "\n                </span>\n                <i id='fa-close' class=\"fa fa-close\" style=\"font-size:24px\"></i>\n             </li>\n      ";
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
            return "\n        <div class=\"film-header\">Films</div>\n        <div class=\"film-data\">\n            <div id=\"url-root\" class=\"url-root\">\n                <form>\n                    <div class=\"col-3\">\n                      <input class=\"effect-7\" id=\"url-music\" type=\"text\" placeholder=\"Url music..\" required pattern=\"https?:\\/\\/.*\\.(?:mp3|mp4)\" >\n                          <span class=\"focus-border\">\n                            <i></i>\n                          </span>\n                      </div>\n                      <div class=\"col-3\">\n                          <input class=\"effect-7\" id=\"url-author\"  type=\"text\" placeholder=\"Author name..\" required pattern=\"[A-Za-z\u0410-\u042F\u0430-\u044F\u0401\u04510-9]{1,15}\">\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                      </div>\n                      <div class=\"col-3\">\n                          <input class=\"effect-7\" id=\"url-name\"  type=\"text\" placeholder=\"Music name..\" required pattern=\"[A-Za-z\u0410-\u042F\u0430-\u044F\u0401\u04510-9]{1,15}\">\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                      </div>\n                      <div class=\"col-3\">\n                        <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\">\n                          <span class=\"focus-border\">\n                            <i></i>\n                          </span>\n                      </div>             \n                </form>\n            </div>          \n            <div id=\"photo-root\" class=\"photo-root\"></div>     \n        </div>\n    ";
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

    function upperCase(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    var MusicsContentComponent = (function () {
        function MusicsContentComponent() {
        }
        MusicsContentComponent.prototype.showMusicById = function (id) {
            var music = MusicService.getId(id);
            document.getElementById('music')['src'] = music.link;
            document.getElementById('music-author').innerHTML = "Name : " + upperCase(music.authorFullName);
            document.getElementById('music-name').innerHTML = "Track : " + upperCase(music.name);
            this.showMusicByLink(music.link);
        };
        MusicsContentComponent.prototype.showMusicByLink = function (link) {
            var audio = document.getElementById('music-play');
            audio.innerHTML = "\n                       <audio controls autoplay loop>\n                         <source type=\"audio\" id=\"music\" src=\"" + link + "\">\n                       </audio>\n                     ";
        };
        MusicsContentComponent.prototype.clear = function () {
            document.getElementById('music')['src'] = '';
        };
        MusicsContentComponent.prototype.template = function () {
            return "\n              <div class=\"music-content\">\n                  <div class=\"music-block\"\n                      <div class=\"music-image\" id=\"music-image\"><img src=\"images/guf.jpg\">\n                      <div class=\"music-author\" id=\"music-author\"></div>\n                      <div class=\"music-name\" id=\"music-name\"></div>\n                      <div class=\"music-play\" id=\"music-play\">\n                          <audio controls autoplay loop>\n                              <source type=\"audio\" id=\"music\" src=\"\">\n                          </audio>\n                      </div>\n                   </div>\n                </div>\n              </div> \n            ";
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
                        console.log('parent', parent);
                        var id = parseInt(parent.dataset.id);
                        console.log('parent.dataset.id)', id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbXBvbmVudC50cyIsIi4uL3NyYy9saWJyZXJpcy9icm93c2VyLXN0b3JhZ2UudHMiLCIuLi9zcmMvc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy1jb250ZW50LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9pbWFnZXMvaW1hZ2VzLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9jb250cm9scy9jb250cm9scy50cyIsIi4uL3NyYy9hcHAvbWFpbi9pbWFnZXMvaW1hZ2VzLXVybC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vZmlsbXMvZmlsbXMuY29tcG9uZW50LnRzIiwiLi4vc3JjL3NlcnZpY2VzL211c2ljLnNlcnZpY2UudHMiLCIuLi9zcmMvbGlicmVyaXMvY29tbW9uLnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljcy9tdXNpY3MtY29udGVudC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbXVzaWNzL211c2ljcy1saXN0LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9tdXNpY3MvbXVzaWNzLXVybC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbXVzaWNzL211c2ljcy5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbWFpbkNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvYXV0aC9hdXRoLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL2FwcC90eXBlcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50PFRGdW5jdGlvbiBleHRlbmRzIEZ1bmN0aW9uPihvbGRDb25zdHJ1Y3RvcjogeyBuZXcoKTogSUNvbXBvbmVudDsgfSk6IGFueVxyXG57XHJcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgb2xkQ29uc3RydWN0b3JcclxuICB7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKTogYW55XHJcbiAgICAgIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBvbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUub25Jbml0ID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBvbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUub25Jbml0LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG9sZENvbnN0cnVjdG9yLnByb3RvdHlwZS50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcbn0iLCJleHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2U8VD5cclxue1xyXG4gIHB1YmxpYyBrZXk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcpXHJcbiAge1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0T2JqZWN0KHZhbHVlOiBUKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMua2V5LCBzdHIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9iamVjdCgpOiBUXHJcbiAge1xyXG4gICAgY29uc3QgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KTtcclxuXHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5rZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyQWxsKCk6IHZvaWRcclxuICB7XHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJRW50aXR5IH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IEJyb3dzZXJTdG9yYWdlIH0gZnJvbSAnLi4vbGlicmVyaXMvYnJvd3Nlci1zdG9yYWdlJztcclxuXHJcbmludGVyZmFjZSBJU3RvcmFnZU1vZGVsPFRNb2RlbD5cclxue1xyXG4gIGluZGV4OiBudW1iZXI7XHJcbiAgbGlzdDogVE1vZGVsW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZTxUIGV4dGVuZHMgSUVudGl0eT5cclxue1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgYnJvd3NlclN0b3JhZ2U6IEJyb3dzZXJTdG9yYWdlPElTdG9yYWdlTW9kZWw8VD4+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZylcclxuICB7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlID0gbmV3IEJyb3dzZXJTdG9yYWdlPElTdG9yYWdlTW9kZWw8VD4+KGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QnlJZChpZDogbnVtYmVyKTogVFxyXG4gIHtcclxuICAgIGNvbnN0IG9iakxpc3Q6IFRbXSA9IHRoaXMuZ2V0T2JqKCk7XHJcbiAgICByZXR1cm4gb2JqTGlzdC5maW5kKHggPT4geC5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9iaigpOiBUW11cclxuICB7XHJcbiAgICBjb25zdCBicm93c2VyU3RvcmFnZURhdGEgPSB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG4gICAgcmV0dXJuIGJyb3dzZXJTdG9yYWdlRGF0YSA/IGJyb3dzZXJTdG9yYWdlRGF0YS5saXN0IDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IFRbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuXHJcbiAgICBpZiAoc3RvcmFnZSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgY29uc3Qgc3RvcmFnZU9iajogSVN0b3JhZ2VNb2RlbDxUPiA9IHtcclxuICAgICAgICBpbmRleDogMCxcclxuICAgICAgICBsaXN0OiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGl0ZW0uaWQgPSBzdG9yYWdlT2JqLmluZGV4O1xyXG4gICAgICAgIHN0b3JhZ2VPYmoubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHN0b3JhZ2VPYmouaW5kZXgrKztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLnNldE9iamVjdChzdG9yYWdlT2JqKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKGl0ZW0uaWQgPT09IChudWxsIHx8IHVuZGVmaW5lZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaXRlbS5pZCA9IHN0b3JhZ2UuaW5kZXg7XHJcbiAgICAgICAgICBzdG9yYWdlLmxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgIHN0b3JhZ2UuaW5kZXgrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5icm93c2VyU3RvcmFnZS5zZXRPYmplY3Qoc3RvcmFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0b3JhZ2VPYmogPSB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG4gICAgY29uc3QgaW5kZXggPSBzdG9yYWdlT2JqLmxpc3QuZmluZEluZGV4KHggPT4gKHguaWQgPT09IGlkKSk7XHJcbiAgICBzdG9yYWdlT2JqLmxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLnNldE9iamVjdChzdG9yYWdlT2JqKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5icm93c2VyU3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElJbWFnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgSW1hZ2VTZXJ2aWNlQ2xhc3Ncclxue1xyXG4gIHByaXZhdGUgc3RvcmFnZSA9IG5ldyBTdG9yYWdlU2VydmljZTxJSW1hZ2VNb2RlbD4oJ2ltYWdlJyk7XHJcblxyXG4gIHB1YmxpYyBnZXRJZChpZDogbnVtYmVyKTogSUltYWdlTW9kZWxcclxuICB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCgpOiBJSW1hZ2VNb2RlbFtdXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaXRlbTogSUltYWdlTW9kZWwpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgaW1hZ2VMaXN0OiBJSW1hZ2VNb2RlbFtdID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgaW1hZ2VMaXN0LnB1c2goaXRlbSk7XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogSUltYWdlTW9kZWxbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBpbWFnZUxpc3QgPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGl0ZW1zKVxyXG4gICAge1xyXG4gICAgICBpbWFnZUxpc3QucHVzaChpbWFnZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoaW1hZ2VMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVCeUlkKGlkOiBudW1iZXIpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBJbWFnZVNlcnZpY2UgPSBuZXcgSW1hZ2VTZXJ2aWNlQ2xhc3MoKTsiLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHVibGljIHNob3dJbWFnZUJ5SWQoaWQ6IG51bWJlcik6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpWydzcmMnXSA9IEltYWdlU2VydmljZS5nZXRJZChpZCkubGluaztcbiAgfVxuXG4gIHB1YmxpYyBzaG93SW1hZ2VCeUxpbmsobGluazogc3RyaW5nKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJylbJ3NyYyddID0gbGluaztcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKVsnc3JjJ10gPSAnaHR0cDovL3BsYWNlaG9sZC5pdC8yMDB4MjAwJztcbiAgfVxuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIHJldHVybiBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9IFwicGhvdG8tY29udGVudFwiPiAgXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1zaXplXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImltYWdlXCIgaWQ9XCJpbWFnZVwiIHNyYz1cImh0dHA6Ly9wbGFjZWhvbGQuaXQvMjAweDIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvaW1hZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBJbWFnZXNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtY29udGVudC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHJpdmF0ZSBpbWFnZXNDb250ZW50Q29tcG9uZW50ID0gbmV3IEltYWdlc0NvbnRlbnRDb21wb25lbnQoKTtcbiAgcHJpdmF0ZSBhY3RpdmVJZDogbnVtYmVyO1xuICBwcml2YXRlIGJ1ZmZlcjogbnVtYmVyO1xuXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxuICB7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkKGltYWdlOiBvYmplY3QpOiB2b2lkXG4gIHtcbiAgICBJbWFnZVNlcnZpY2UuYWRkKGltYWdlKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB0aGlzLmFjdGl2ZUlkID0gdGhpcy5idWZmZXI7XG4gICAgdGhpcy5hY3RpdmF0ZUVsZW1lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaCgpOiB2b2lkXG4gIHtcbiAgICBjb25zdCBpbWFnZXMgPSBJbWFnZVNlcnZpY2UuZ2V0KCk7XG4gICAgY29uc3QgcGhvdG9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvcycpO1xuICAgIGxldCBzdHIgPSAnJztcblxuICAgIGltYWdlcy5mb3JFYWNoKGltYWdlID0+XG4gICAge1xuICAgICAgdGhpcy5idWZmZXIgPSBpbWFnZS5pZDtcbiAgICAgIHN0ciArPSBgXG4gICAgICAgICAgICAgPGxpIGlkPVwicGhvdG8tbGlcIiBjbGFzcz1cInBob3RvLWxpXCIgZGF0YS1pZD0ke2ltYWdlLmlkfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cInBob3RvLXNwYW5cIiBjbGFzcz1cInBob3RvLXNwYW5cIiA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwic3Bhbi1zdHJvbmdcIiBjbGFzcz1cInNwYW4tc3Ryb25nXCI+JHtpbWFnZS5pZH0uIFBob3RvOiA8L3NwYW4+ICR7aW1hZ2UubmFtZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGkgaWQ9J2ZhLWNsb3NlJyBjbGFzcz1cImZhIGZhLWNsb3NlXCIgc3R5bGU9XCJmb250LXNpemU6MjRweFwiPjwvaT5cbiAgICAgICAgICAgICA8L2xpPlxuICAgICAgYDtcbiAgICB9KTtcbiAgICBwaG90b3MuaW5uZXJIVE1MID0gc3RyO1xuXG4gICAgdGhpcy5hZGRTcGFuQ2xpY2tIYW5kbGVyKHBob3Rvcyk7XG4gICAgdGhpcy5hZGRJQ2xpY2tIYW5kbGVyKHBob3Rvcyk7XG4gIH1cblxuICBwcml2YXRlIGFkZFNwYW5DbGlja0hhbmRsZXIgPSAocGhvdG9zOiBIVE1MRWxlbWVudCkgPT5cbiAge1xuICAgIGNvbnN0IHNwYW5Db2xsZWN0aW9uID0gcGhvdG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcbiAgICBjb25zdCBsaXN0QXJyYXkgPSBBcnJheS5mcm9tKHNwYW5Db2xsZWN0aW9uKTtcblxuICAgIGxpc3RBcnJheS5mb3JFYWNoKHNwYW5FbGVtZW50ID0+XG4gICAge1xuICAgICAgc3BhbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBzcGFuRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KHBhcmVudC5kYXRhc2V0LmlkKTtcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IGlkO1xuICAgICAgICB0aGlzLmltYWdlc0NvbnRlbnRDb21wb25lbnQuc2hvd0ltYWdlQnlJZChpZCk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlRWxlbWVudCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcHVibGljIGFjdGl2YXRlRWxlbWVudCA9ICgpID0+XG4gIHtcbiAgICBjb25zdCBsaUNvbGxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGhvdG9zIGxpJyk7XG4gICAgY29uc3QgbGlzdExpID0gQXJyYXkuZnJvbShsaUNvbGxlY3Rpb24pO1xuICAgIGNvbnN0IGxpRWxlbSA9IGxpc3RMaS5maW5kKGxlID0+IHBhcnNlSW50KGxlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKSA9PT0gdGhpcy5hY3RpdmVJZCk7XG4gICAgbGlFbGVtLmNsYXNzTGlzdC5hZGQoJ25ld1NwYW4nKTtcbiAgfTtcblxuICBwdWJsaWMgYWRkSUNsaWNrSGFuZGxlciA9IChwaG90b3M6IEhUTUxFbGVtZW50KSA9PlxuICB7XG4gICAgY29uc3QgSUNvbGxlY3Rpb24gPSBwaG90b3MucXVlcnlTZWxlY3RvckFsbCgnaScpO1xuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oSUNvbGxlY3Rpb24pO1xuXG4gICAgbGlzdEFycmF5LmZvckVhY2goaUVsZW1lbnQgPT5cbiAgICB7XG4gICAgICBpRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGlFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocGFyZW50LmRhdGFzZXQuaWQpO1xuICAgICAgICBJbWFnZVNlcnZpY2UucmVtb3ZlQnlJZChpZCk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB0aGlzLmltYWdlc0NvbnRlbnRDb21wb25lbnQuY2xlYXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcbiAge1xuICAgIHJldHVybiBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwaG90b3NcIiBpZD1cInBob3Rvc1wiPjwvdWw+XG4gICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgXG4gICAgICAgICAgICBgO1xuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZm9ybUNvbnRlbnQoY29udGVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBzdHJpbmdcclxue1xyXG4gIGNvbnN0IGlkID0gYGZvcm0taWQtJHtNYXRoLnJhbmRvbSgpfWA7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50OiBFdmVudCkgPT5cclxuICAgIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIGlmIChmb3JtLmNoZWNrVmFsaWRpdHkoKSlcclxuICAgICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdWQUxJRCcpO1xyXG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnd2FzLXZhbGlkYXRlZCcpO1xyXG4gICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0lOVkFMSUQnKTtcclxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgMSk7XHJcbiAgcmV0dXJuIGA8Zm9ybSBjbGFzcz1cImZvcm1cIiBub1ZhbGlkYXRlIGlkPVwiJHtpZH1cIj4ke2NvbnRlbnR9PC9mb3JtPmA7XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBJbWFnZXNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgZm9ybUNvbnRlbnQgfSBmcm9tICcuLi8uLi9jb250cm9scy9jb250cm9scyc7XG5cbkBDb21wb25lbnRcbmV4cG9ydCBjbGFzcyBJbWFnZXNVcmxDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XG57XG4gIHByaXZhdGUgX3Bob3RvTGlzdCA9IG5ldyBJbWFnZXNMaXN0Q29tcG9uZW50KCk7XG4gIHByaXZhdGUgX2ltYWdlc0NvbnRlbnRDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29udGVudENvbXBvbmVudCgpO1xuXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1waG90bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlQ2hhbmdlID0gKCkgPT5cbiAge1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJylbJ3ZhbHVlJ107XG4gICAgdGhpcy5faW1hZ2VzQ29udGVudENvbXBvbmVudC5zaG93SW1hZ2VCeUxpbmsobGluayk7XG4gIH07XG5cbiAgcHJpdmF0ZSBoYW5kbGVTdWJtaXQgPSAoZXZlbnQ6IEV2ZW50KSA9PlxuICB7XG4gICAgY29uc3QgdXJsUGhvdG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJyk7XG5cbiAgICBjb25zdCBpbWFnZSA9IHtcbiAgICAgIGxpbms6IHVybFBob3RvWyd2YWx1ZSddLFxuICAgICAgbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1uYW1lJylbJ3ZhbHVlJ10sXG4gICAgICBhdXRob3JGdWxsTmFtZTogJycsXG4gICAgICB0b3A6ICcnLFxuICAgIH07XG5cbiAgICB0aGlzLl9waG90b0xpc3QuYWRkKGltYWdlKTtcbiAgICB0aGlzLnJlc2V0Rm9ybSgpO1xuICB9O1xuXG4gIHByaXZhdGUgcmVzZXRGb3JtKCk6IHZvaWRcbiAge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKVsndmFsdWUnXSA9ICcnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddID0gJyc7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICBjb25zdCBjb250ZW50ID0gYCAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLXBob3RvXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVybCBpbWFnZS4uXCIgcmVxdWlyZWQgcGF0dGVybj1cImh0dHBzPzpcXFxcL1xcXFwvLipcXFxcLig/OnBuZ3xqcGd8anBlZ3xnaWYpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtbmFtZVwiICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiSW1hZ2UgbmFtZS4uXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiIHJlcXVpcmVkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgIFxuICAgICAgICAgICAgICAgICAgIGA7XG4gICAgcmV0dXJuIGZvcm1Db250ZW50KGNvbnRlbnQsIHRoaXMuaGFuZGxlU3VibWl0KTtcbiAgfVxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VzVXJsQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtdXJsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWxpc3QuY29tcG9uZW50JztcblxuQENvbXBvbmVudFxuZXhwb3J0IGNsYXNzIEltYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcbntcbiAgcHJpdmF0ZSBfdXJsQ29tcG9uZW50ID0gbmV3IEltYWdlc1VybENvbXBvbmVudCgpO1xuICBwcml2YXRlIF9waG90b0NvbnRlbnRDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29udGVudENvbXBvbmVudCgpO1xuICBwcml2YXRlIF9waG90b0xpc3QgPSBuZXcgSW1hZ2VzTGlzdENvbXBvbmVudCgpO1xuXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX3VybENvbXBvbmVudC50ZW1wbGF0ZSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG90by1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX3Bob3RvQ29udGVudENvbXBvbmVudC50ZW1wbGF0ZSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG90by1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX3Bob3RvTGlzdC50ZW1wbGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xuICB7XG4gICAgcmV0dXJuIGAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8taGVhZGVyXCI+UGhvdG8gR2FsbGVyeTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBpZD1cInBob3RvLWRhdGFcIiBjbGFzcz1cInBob3RvLWRhdGFcIj4gXG4gICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ1cmwtcm9vdFwiIGNsYXNzPVwidXJsLXJvb3RcIj48L2Rpdj4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwaG90by1yb290XCIgY2xhc3M9XCJwaG90by1yb290XCI+PC9kaXY+ICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cbiIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsbXNDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbS1oZWFkZXJcIj5GaWxtczwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxtLWRhdGFcIj5cclxuICAgICAgICAgICAgPGRpdiBpZD1cInVybC1yb290XCIgY2xhc3M9XCJ1cmwtcm9vdFwiPlxyXG4gICAgICAgICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLW11c2ljXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVybCBtdXNpYy4uXCIgcmVxdWlyZWQgcGF0dGVybj1cImh0dHBzPzpcXFxcL1xcXFwvLipcXFxcLig/Om1wM3xtcDQpXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLWF1dGhvclwiICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQXV0aG9yIG5hbWUuLlwiIHJlcXVpcmVkIHBhdHRlcm49XCJbQS1aYS160JAt0K/QsC3Rj9CB0ZEwLTldezEsMTV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtbmFtZVwiICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTXVzaWMgbmFtZS4uXCIgcmVxdWlyZWQgcGF0dGVybj1cIltBLVphLXrQkC3Qr9CwLdGP0IHRkTAtOV17MSwxNX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJzdWJtaXRcIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTYXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgPGRpdiBpZD1cInBob3RvLXJvb3RcIiBjbGFzcz1cInBob3RvLXJvb3RcIj48L2Rpdj4gICAgIFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSU11c2ljTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5jbGFzcyBNdXNpY1NlcnZpY2VDbGFzc1xyXG57XHJcbiAgcHJpdmF0ZSBzdG9yYWdlID0gbmV3IFN0b3JhZ2VTZXJ2aWNlPElNdXNpY01vZGVsPignbXVzaWMnKTtcclxuXHJcbiAgcHVibGljIGdldElkKGlkOiBudW1iZXIpOiBJTXVzaWNNb2RlbFxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0QnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0KCk6IElNdXNpY01vZGVsW11cclxuICB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZChpdGVtOiBJTXVzaWNNb2RlbCk6IHZvaWRcclxuICB7XHJcbiAgICAgIGNvbnN0IG11c2ljTGlzdDogSU11c2ljTW9kZWxbXSA9IHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICAgICAgbXVzaWNMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5hZGRBcnJheShtdXNpY0xpc3QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEFycmF5KGl0ZW1zOiBJTXVzaWNNb2RlbFtdKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IG11c2ljTGlzdCA9IHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICAgIGZvciAoY29uc3QgbXVzaWMgb2YgaXRlbXMpXHJcbiAgICB7XHJcbiAgICAgIG11c2ljTGlzdC5wdXNoKG11c2ljKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RvcmFnZS5hZGRBcnJheShtdXNpY0xpc3QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUJ5SWQoaWQ6IG51bWJlcik6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlQnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE11c2ljU2VydmljZSA9IG5ldyBNdXNpY1NlcnZpY2VDbGFzcygpOyIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3B5PFQ+KG9iajogVCk6IFRcclxue1xyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gaW1hZ2VVcmxJc1ZhbGlkKHN0cjogc3RyaW5nKTogYm9vbGVhblxyXG4vLyB7XHJcbi8vICAgY29uc3QgbXlSZWdleCA9IC8oaHR0cHM/OlxcL1xcLy4qXFwuKD86cG5nfGpwZ3xqcGVnfGdpZikpL2k7XHJcbi8vICAgcmV0dXJuIG15UmVnZXgudGVzdChzdHIpO1xyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gbXVzaWNVcmxJc1ZhbGlkKHN0cjogc3RyaW5nKTogYm9vbGVhblxyXG4vLyB7XHJcbi8vICAgY29uc3QgbXlSZWdleCA9IC8oaHR0cHM/OlxcL1xcLy4qXFwuKD86bXAzfG1wNCkpL2k7XHJcbi8vICAgcmV0dXJuIG15UmVnZXgudGVzdChzdHIpO1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBwZXJDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nXHJcbntcclxuICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBpc0V4aXN0SHRtbEluRE9NKGVsZW1lbnQ6IEhUTUxFbGVtZW50KVxyXG4vLyB7XHJcbi8vICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWxlbWVudCk7XHJcbi8vIH0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdXBwZXJDYXNlIH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE11c2ljc0NvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgc2hvd011c2ljQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IG11c2ljID0gTXVzaWNTZXJ2aWNlLmdldElkKGlkKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYycpWydzcmMnXSA9IG11c2ljLmxpbms7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtYXV0aG9yJykuaW5uZXJIVE1MID0gYE5hbWUgOiAke3VwcGVyQ2FzZShtdXNpYy5hdXRob3JGdWxsTmFtZSl9YDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYy1uYW1lJykuaW5uZXJIVE1MID0gYFRyYWNrIDogJHt1cHBlckNhc2UobXVzaWMubmFtZSl9YDtcclxuICAgIHRoaXMuc2hvd011c2ljQnlMaW5rKG11c2ljLmxpbmspO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dNdXNpY0J5TGluayhsaW5rOiBzdHJpbmcpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtcGxheScpO1xyXG4gICAgYXVkaW8uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgIDxhdWRpbyBjb250cm9scyBhdXRvcGxheSBsb29wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSB0eXBlPVwiYXVkaW9cIiBpZD1cIm11c2ljXCIgc3JjPVwiJHtsaW5rfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgIDwvYXVkaW8+XHJcbiAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYycpWydzcmMnXSA9ICcnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWJsb2NrXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1pbWFnZVwiIGlkPVwibXVzaWMtaW1hZ2VcIj48aW1nIHNyYz1cImltYWdlcy9ndWYuanBnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtYXV0aG9yXCIgaWQ9XCJtdXNpYy1hdXRob3JcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1uYW1lXCIgaWQ9XCJtdXNpYy1uYW1lXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtcGxheVwiIGlkPVwibXVzaWMtcGxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxhdWRpbyBjb250cm9scyBhdXRvcGxheSBsb29wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHR5cGU9XCJhdWRpb1wiIGlkPVwibXVzaWNcIiBzcmM9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F1ZGlvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgYDtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTXVzaWNzQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vbXVzaWNzLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgdXBwZXJDYXNlIH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE11c2ljc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9tdXNpY3NDb250ZW50Q29tcG9uZW50ID0gbmV3IE11c2ljc0NvbnRlbnRDb21wb25lbnQoKTtcclxuICBwcml2YXRlIGFjdGl2ZUlkOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBidWZmZXI6IG51bWJlcjtcclxuXHJcbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKG11c2ljOiBvYmplY3QpOiB2b2lkXHJcbiAge1xyXG4gICAgTXVzaWNTZXJ2aWNlLmFkZChtdXNpYyk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIHRoaXMuYWN0aXZlSWQgPSB0aGlzLmJ1ZmZlcjtcclxuICAgIHRoaXMuYWN0aXZhdGVFbGVtZW50KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2goKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IG11c2ljID0gTXVzaWNTZXJ2aWNlLmdldCgpO1xyXG4gICAgY29uc3QgbXVzaWNVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYy11bCcpO1xyXG4gICAgbGV0IHN0ciA9ICcnO1xyXG5cclxuICAgIG11c2ljLmZvckVhY2gobXVzaWMgPT5cclxuICAgIHtcclxuICAgICAgdGhpcy5idWZmZXIgPSBtdXNpYy5pZDtcclxuICAgICAgc3RyICs9IGBcclxuICAgICAgICAgICAgICA8bGkgaWQ9XCJtdXNpYy1saVwiIGNsYXNzPVwibXVzaWMtbGlcIiBkYXRhLWlkPSR7bXVzaWMuaWR9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJtdXNpYy1zcGFuXCIgY2xhc3M9XCJtdXNpYy1zcGFuXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwic3Bhbi1zdHJvbmdcIiBjbGFzcz1cInNwYW4tc3Ryb25nXCI+JHttdXNpYy5pZH0uICR7dXBwZXJDYXNlKG11c2ljLmF1dGhvckZ1bGxOYW1lKX0gLSA8L3NwYW4+ICAke211c2ljLm5hbWV9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8aSBpZD0nZmEtY2xvc2UnIGNsYXNzPVwiZmEgZmEtY2xvc2VcIiBzdHlsZT1cImZvbnQtc2l6ZToyNHB4XCI+PC9pPlxyXG4gICAgICAgICAgICAgIDwvbGk+IFxyXG4gICAgICAgICAgICAgYDtcclxuICAgIH0pO1xyXG4gICAgbXVzaWNVbC5pbm5lckhUTUwgPSBzdHI7XHJcblxyXG4gICAgdGhpcy5hZGRTcGFuQ2xpY2tIYW5kbGVyKG11c2ljVWwpO1xyXG4gICAgdGhpcy5hZGRJQ2xpY2tIYW5kbGVyKG11c2ljVWwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTcGFuQ2xpY2tIYW5kbGVyID0gKG11c2ljVWw6IEhUTUxFbGVtZW50KSA9PlxyXG4gIHtcclxuICAgIGNvbnN0IHNwYW5Db2xsZWN0aW9uID0gbXVzaWNVbC5xdWVyeVNlbGVjdG9yQWxsKCdzcGFuJyk7XHJcbiAgICBjb25zdCBsaXN0QXJyYXkgPSBBcnJheS5mcm9tKHNwYW5Db2xsZWN0aW9uKTtcclxuXHJcbiAgICBsaXN0QXJyYXkuZm9yRWFjaChzcGFuRWxlbWVudCA9PlxyXG4gICAge1xyXG4gICAgICBzcGFuRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XHJcbiAgICAgIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSBzcGFuRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXJlbnQnLCBwYXJlbnQpO1xyXG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocGFyZW50LmRhdGFzZXQuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXJlbnQuZGF0YXNldC5pZCknLCBpZCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aXZlSWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9tdXNpY3NDb250ZW50Q29tcG9uZW50LnNob3dNdXNpY0J5SWQoaWQpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVFbGVtZW50KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGFjdGl2YXRlRWxlbWVudCA9ICgpID0+XHJcbiAge1xyXG4gICAgY29uc29sZS5sb2coJ2FjdGl2YXRlRWxlbWVudCcsIHRoaXMuYWN0aXZlSWQpO1xyXG4gICAgY29uc3QgbGlDb2xsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm11c2ljLXVsIGxpJyk7XHJcbiAgICBjb25zdCBsaXN0TGkgPSBBcnJheS5mcm9tKGxpQ29sbGVjdGlvbik7XHJcbiAgICBjb25zdCBsaUVsZW0gPSBsaXN0TGkuZmluZChsZSA9PiBwYXJzZUludChsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSkgPT09IHRoaXMuYWN0aXZlSWQpO1xyXG4gICAgbGlFbGVtLmNsYXNzTGlzdC5hZGQoJ25ld1NwYW4nKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgYWRkSUNsaWNrSGFuZGxlciA9IChtdXNpY1VsOiBIVE1MRWxlbWVudCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBJQ29sbGVjdGlvbiA9IG11c2ljVWwucXVlcnlTZWxlY3RvckFsbCgnaScpO1xyXG4gICAgY29uc3QgbGlzdEFycmF5ID0gQXJyYXkuZnJvbShJQ29sbGVjdGlvbik7XHJcblxyXG4gICAgbGlzdEFycmF5LmZvckVhY2goaUVsZW1lbnQgPT5cclxuICAgIHtcclxuICAgICAgaUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gaUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KHBhcmVudC5kYXRhc2V0LmlkKTtcclxuICAgICAgICBNdXNpY1NlcnZpY2UucmVtb3ZlQnlJZChpZCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5fbXVzaWNzQ29udGVudENvbXBvbmVudC5jbGVhcigpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICByZXR1cm4gYCBcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibXVzaWMtdWxcIiBpZD1cIm11c2ljLXVsXCI+PC91bD5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgYDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgTXVzaWNzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbXVzaWNzLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVzaWNzQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vbXVzaWNzLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZm9ybUNvbnRlbnQgfSBmcm9tICcuLi8uLi9jb250cm9scy9jb250cm9scyc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY3NVcmxDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgX211c2ljTGlzdCA9IG5ldyBNdXNpY3NMaXN0Q29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbXVzaWNzQ29udGVudENvbXBvbmVudCA9IG5ldyBNdXNpY3NDb250ZW50Q29tcG9uZW50KCk7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbXVzaWMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZUNoYW5nZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNoYW5nZSA9ICgpID0+XHJcbiAge1xyXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbXVzaWMnKVsndmFsdWUnXTtcclxuICAgIHRoaXMuX211c2ljc0NvbnRlbnRDb21wb25lbnQuc2hvd011c2ljQnlMaW5rKGxpbmspO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3VibWl0ID0gKGV2ZW50OiBFdmVudCkgPT5cclxuICB7XHJcbiAgICBjb25zdCB1cmxNdXNpYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbXVzaWMnKTtcclxuXHJcbiAgICBjb25zdCBtdXNpYyA9IHtcclxuICAgICAgbGluazogdXJsTXVzaWNbJ3ZhbHVlJ10sXHJcbiAgICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddLFxyXG4gICAgICBhdXRob3JGdWxsTmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1hdXRob3InKVsndmFsdWUnXSxcclxuICAgICAgdG9wOiAnJyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fbXVzaWNMaXN0LmFkZChtdXNpYyk7XHJcbiAgICB0aGlzLnJlc2V0Rm9ybSgpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgcmVzZXRGb3JtKCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW11c2ljJylbJ3ZhbHVlJ10gPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLWF1dGhvcicpWyd2YWx1ZSddID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgY29uc3QgY29udGVudCA9IGAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1tdXNpY1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVcmwgbXVzaWMuLlwiIHJlcXVpcmVkIHBhdHRlcm49XCJodHRwcz86XFxcXC9cXFxcLy4qXFxcXC4oPzptcDN8bXA0KVwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1hdXRob3JcIiAgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkF1dGhvciBuYW1lLi5cIiByZXF1aXJlZCBwYXR0ZXJuPVwiW0EtWmEtetCQLdCv0LAt0Y/QgdGRMC05XXsxLDE1fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLW5hbWVcIiAgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk11c2ljIG5hbWUuLlwiIHJlcXVpcmVkIHBhdHRlcm49XCJbQS1aYS160JAt0K/QsC3Rj9CB0ZEwLTldezEsMTV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICByZXR1cm4gZm9ybUNvbnRlbnQoY29udGVudCwgdGhpcy5oYW5kbGVTdWJtaXQpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11c2ljc1VybENvbXBvbmVudCB9IGZyb20gJy4vbXVzaWNzLXVybC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpY3MtY29udGVudC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgY2xhc3MgTXVzaWNzQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHJpdmF0ZSBfdXJsQ29tcG9uZW50ID0gbmV3IE11c2ljc1VybENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX211c2ljTGlzdCA9IG5ldyBNdXNpY3NMaXN0Q29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbXVzaWNDb250ZW50Q29tcG9uZW50ID0gbmV3IE11c2ljc0NvbnRlbnRDb21wb25lbnQoKTtcclxuXHJcbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX3VybENvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fbXVzaWNMaXN0LnRlbXBsYXRlKCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl9tdXNpY0NvbnRlbnRDb21wb25lbnQudGVtcGxhdGUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtaGVhZGVyXCI+TXVzaWM8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWRhdGFcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ1cmwtcm9vdFwiIGNsYXNzPVwidXJsLXJvb3RcIj48L2Rpdj4gICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibXVzaWMtcm9vdFwiIGNsYXNzPVwibXVzaWMtcm9vdFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IHsgSW1hZ2VzQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMvaW1hZ2VzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbG1zQ29tcG9uZW50IH0gZnJvbSAnLi9maWxtcy9maWxtcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NDb21wb25lbnQgfSBmcm9tICcuL211c2ljcy9tdXNpY3MuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE1haW5Db21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9pbWFnZXNDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfbXVzaWNzQ29tcG9uZW50ID0gbmV3IE11c2ljc0NvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX2ZpbG1zQ29tcG9uZW50ID0gbmV3IEZpbG1zQ29tcG9uZW50KCk7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaGFuZGxlU3VibWl0KG51bGwsIHRoaXMuX211c2ljc0NvbXBvbmVudCk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX2ltYWdlc0NvbXBvbmVudCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX211c2ljc0NvbXBvbmVudCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUsIHRoaXMuX2ZpbG1zQ29tcG9uZW50KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVN1Ym1pdCA9IChlOiBFdmVudCwgY29tcG9uZW50OiBJQ29tcG9uZW50KSA9PlxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51XCI+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImIxXCIgaWQ9XCJmbDFcIj48aSBjbGFzcz1cImZhIGZhLXlvdXR1YmUtcGxheVwiIHN0eWxlPVwiZm9udC1zaXplOjM2cHhcIj48L2k+UGhvdG88L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsMlwiPjxpIGNsYXNzPVwiZmEgZmEtbXVzaWNcIiBzdHlsZT1cImZvbnQtc2l6ZTozNnB4XCI+PC9pPk11c2ljPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImIxXCIgaWQ9XCJmbDNcIj48aSBjbGFzcz1cImZhIGZhLXBob3RvXCIgc3R5bGU9XCJmb250LXNpemU6MzZweDtcIj48L2k+RmlsbTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIiBpZD1cImNvbnRlbnRcIj48L2Rpdj5gO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCB7IGZvcm1Db250ZW50IH0gZnJvbSAnLi4vY29udHJvbHMvY29udHJvbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1dGhDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIGhhbmRsZXIgPSAoKSA9PlxyXG4gIHtcclxuICAgIGNvbnNvbGUud2FybignSEFORExFUicpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gYFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWxlcnQgZXJyb3JcIj5JbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkITwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiB0eXBlPVwiZW1haWxcIiByZXF1aXJlZCAgLz48aSBjbGFzcz1cImZhIGZhLXVzZXJcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHJlcXVpcmVkIHBhdHRlcm49XCJbMC05XXs2LDE0fVwiLz48aSBjbGFzcz1cImZhIGZhLWxvY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZi1yaWdodFwiIG5hbWU9XCJMb2dpblwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkxvZ2luXCIgLz5gO1xyXG5cclxuICAgIHJldHVybiBmb3JtQ29udGVudChjb250ZW50LCB0aGlzLmhhbmRsZXIpO1xyXG5cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWFpbkNvbXBvbmVudCB9IGZyb20gJy4vbWFpbi9tYWluQ29tcG9uZW50JztcclxuaW1wb3J0IHsgQXV0aENvbXBvbmVudCB9IGZyb20gJy4vYXV0aC9hdXRoLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9hdXRoQ29tcG9uZW50ID0gbmV3IEF1dGhDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tYWluQ29tcG9uZW50ID0gbmV3IE1haW5Db21wb25lbnQoKTtcclxuXHJcbiAgcHVibGljIHJlbmRlcigpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGgtcm9vdCcpLmlubmVySFRNTCA9IHRoaXMuX2F1dGhDb21wb25lbnQudGVtcGxhdGUoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLXJvb3QnKS5pbm5lckhUTUwgPSB0aGlzLl9tYWluQ29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAvYXBwLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCBhcHBDb21wb25lbnQgPSBuZXcgQXBwQ29tcG9uZW50KCk7XHJcbmFwcENvbXBvbmVudC5yZW5kZXIoKTsiXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7SUFnQkEsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7SUFDekMsS0FBSyxFQUFFLFNB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
