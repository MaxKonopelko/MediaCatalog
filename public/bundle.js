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
    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
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

    function upperCase(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    var Patterns;
    (function (Patterns) {
        Patterns["ImageUrl"] = "https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif)";
        Patterns["MusicUrl"] = "https?:\\/\\/.*\\.(?:mp3)";
        Patterns["FilmUrl"] = "https?:\\/\\/.*\\.(?:mp4)";
        Patterns["Name"] = "[A-Za-z\u0410-\u042F\u0430-\u044F\u0401\u04510-9 ]{1,15}";
    })(Patterns || (Patterns = {}));
    var urlDefaultImage = 'http://placehold.it/200x200';

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
            document.getElementById('image')['src'] = urlDefaultImage;
        };
        ImagesContentComponent.prototype.template = function () {
            return "\n              <div class= \"photo-content\">  \n                     <div class=\"photo\">\n                        <div class=\"photo-size\">                                       \n                            <img class=\"image\" id=\"image\" src=\"" + urlDefaultImage + "\">\n                        </div>\n                     </div>\n              </div>\n    ";
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
                    var arr = formParse(form);
                    callback(arr);
                }
                else {
                    console.log('INVALID');
                    form.classList.add('was-validated');
                }
            });
        }, 1);
        return "<form class=\"form\" noValidate id=\"" + id + "\">" + content + "</form>";
    }
    function formParse(form) {
        var inputCollection = form.querySelectorAll('input');
        var inputList = Array.from(inputCollection);
        var obj = {};
        for (var _i = 0, inputList_1 = inputList; _i < inputList_1.length; _i++) {
            var input = inputList_1[_i];
            if (input.getAttribute('type') !== 'submit') {
                obj[input.getAttribute('name')] = input.value;
            }
        }
        return obj;
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
            this.handleSubmit = function (formValues) {
                var image = {
                    link: formValues['url'],
                    name: formValues['name'],
                    authorFullName: '',
                };
                console.log('image', image);
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
            var content = " <div class=\"flex\">                    \n                        <div class=\"col-3\">\n                        <input class=\"effect-7\" id=\"url-photo\" type=\"text\" name=\"url\" value=\"\" placeholder=\"Url image..\" required pattern=\"" + Patterns.ImageUrl + "\">\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                        </div>\n                      </div>\n                      <div class=\"flex\">  \n                        <div class=\"col-3\">\n                            <input class=\"effect-7\" id=\"url-name\"  type=\"text\" name=\"name\" value=\"\" placeholder=\"Image name..\" required pattern=\"" + Patterns.Name + "\">\n                              <span class=\"focus-border\">\n                                <i></i>\n                              </span>\n                        </div>\n                        <div class=\"col-3\">\n                          <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\" required>\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                        </div>      \n                      </div>\n                   ";
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

    var FilmServiceClass = (function () {
        function FilmServiceClass() {
            this.storage = new StorageService('film');
        }
        FilmServiceClass.prototype.getById = function (id) {
            return this.storage.getById(id);
        };
        FilmServiceClass.prototype.getList = function () {
            return this.storage.getObj();
        };
        FilmServiceClass.prototype.add = function (item) {
            var filmList = this.storage.getObj();
            filmList.push(item);
            this.storage.addArray(filmList);
        };
        FilmServiceClass.prototype.addArray = function (items) {
            var filmList = this.storage.getObj();
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var image = items_1[_i];
                filmList.push(image);
            }
            this.storage.addArray(filmList);
        };
        FilmServiceClass.prototype.removeById = function (id) {
            this.storage.removeById(id);
        };
        FilmServiceClass.prototype.clear = function () {
            this.storage.clear();
        };
        return FilmServiceClass;
    }());
    var FilmService = new FilmServiceClass();

    var FilmsContentComponent = (function () {
        function FilmsContentComponent() {
        }
        FilmsContentComponent.prototype.showFilmById = function (id) {
            var video = FilmService.getById(id);
            document.getElementById('films-name').innerHTML = "Track : " + upperCase(video.name);
            this.showFilmByLink(video.link);
        };
        FilmsContentComponent.prototype.showFilmByLink = function (link) {
            var video = document.getElementById('films-video');
            console.log('video', video);
            video.innerHTML = "\n                        <video controls autoplay>\n                           <source id=\"film\" src=\"" + link + "\">\n                         </video>\n                      ";
        };
        FilmsContentComponent.prototype.clear = function () {
            document.getElementById('film')['src'] = '';
        };
        FilmsContentComponent.prototype.template = function () {
            var filmList = FilmService.getList();
            return "\n                <div class=\"films-content\">\n                   <div class=\"films-play\" id=\"films-play\">\n                      <div class=\"films-name\" id=\"films-name\">Track : " + upperCase(filmList[0].name) + "</div>\n                      <div class=\"films-video\" id=\"films-video\">\n                        <video controls>\n                             <source id=\"film\" src=\"" + filmList[0].link + "\">\n                        </video>\n                      </div>\n                   </div>\n                </div> \n            ";
        };
        FilmsContentComponent = __decorate([
            Component
        ], FilmsContentComponent);
        return FilmsContentComponent;
    }());

    var FilmsListComponent = (function () {
        function FilmsListComponent() {
            var _this = this;
            this._filmsContentComponent = new FilmsContentComponent();
            this.addSpanClickHandler = function (films) {
                var spanCollection = films.querySelectorAll('span');
                var listArray = Array.from(spanCollection);
                listArray.forEach(function (spanElement) {
                    spanElement.addEventListener('click', function () {
                        var parent = spanElement.parentElement;
                        var id = parseInt(parent.dataset.id);
                        _this.activeId = id;
                        _this._filmsContentComponent.showFilmById(id);
                        _this.refresh();
                        _this.activateElement();
                    });
                });
            };
            this.activateElement = function () {
                var liCollection = document.querySelectorAll('.films-ul li');
                var listLi = Array.from(liCollection);
                var liElem = listLi.find(function (le) { return parseInt(le.getAttribute('data-id')) === _this.activeId; });
                liElem.classList.add('newSpan');
            };
            this.addIClickHandler = function (filmsUl) {
                var ICollection = filmsUl.querySelectorAll('i');
                var listArray = Array.from(ICollection);
                listArray.forEach(function (iElement) {
                    iElement.addEventListener('click', function () {
                        var parent = iElement.parentElement;
                        var id = parseInt(parent.dataset.id);
                        FilmService.removeById(id);
                        _this.refresh();
                        _this._filmsContentComponent.clear();
                    });
                });
            };
        }
        FilmsListComponent.prototype.onInit = function () {
            this.refresh();
        };
        FilmsListComponent.prototype.add = function (film) {
            FilmService.add(film);
            this.refresh();
            this.activeId = this.buffer;
            this.activateElement();
        };
        FilmsListComponent.prototype.refresh = function () {
            var _this = this;
            var films = FilmService.getList();
            var filmsUl = document.getElementById('films-ul');
            var str = '';
            films.forEach(function (film) {
                _this.buffer = film.id;
                str += "\n             <li id=\"film-li\" class=\"film-li\" data-id=" + film.id + ">\n                <span id=\"film-span\" class=\"film-span\" >\n                    " + film.id + ". Name: " + film.name + "\n                </span>\n                <i id='fa-close' class=\"fa fa-close\" style=\"font-size:24px\"></i>\n             </li>\n             ";
            });
            filmsUl.innerHTML = str;
            this.addSpanClickHandler(filmsUl);
            this.addIClickHandler(filmsUl);
        };
        FilmsListComponent.prototype.template = function () {
            return "\n             <div class=\"films-list\">\n                 <ul class=\"films-ul\" id=\"films-ul\"></ul>\n              </div>\n            ";
        };
        FilmsListComponent = __decorate([
            Component
        ], FilmsListComponent);
        return FilmsListComponent;
    }());

    var FilmsUrlComponent = (function () {
        function FilmsUrlComponent() {
            var _this = this;
            this._filmList = new FilmsListComponent();
            this._filmContentComponent = new FilmsContentComponent();
            this.handleChange = function () {
                var link = document.getElementById('url-films')['value'];
                _this._filmContentComponent.showFilmByLink(link);
            };
            this.handleSubmit = function (formValues) {
                var video = {
                    link: formValues['url'],
                    name: formValues['name'],
                };
                _this._filmList.add(video);
                _this.resetForm();
            };
        }
        FilmsUrlComponent.prototype.onInit = function () {
            document.getElementById('url-films').addEventListener('change', this.handleChange);
        };
        FilmsUrlComponent.prototype.resetForm = function () {
            document.getElementById('url-films')['value'] = '';
            document.getElementById('url-name')['value'] = '';
        };
        FilmsUrlComponent.prototype.template = function () {
            var content = " <form>\n                         <div class=\"flex\">  \n                            <div class=\"col-3\">\n                              <input class=\"effect-7\" id=\"url-films\" type=\"text\" name=\"url\" placeholder=\"Url films..\" required pattern=\"" + Patterns.FilmUrl + "\" >\n                                  <span class=\"focus-border\">\n                                    <i></i>\n                                  </span>\n                            </div>\n                         </div>\n                         <div class=\"flex\">  \n                              <div class=\"col-3\">\n                                  <input class=\"effect-7\" id=\"url-name\"  type=\"text\" name=\"name\" placeholder=\"Films name..\" required pattern=\"" + Patterns.Name + "\">\n                                    <span class=\"focus-border\">\n                                      <i></i>\n                                    </span>\n                              </div>\n                              <div class=\"col-3\">\n                                <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\">\n                                  <span class=\"focus-border\">\n                                    <i></i>\n                                  </span>\n                              </div>    \n                         </div>         \n                      </form>\n                   ";
            return formContent(content, this.handleSubmit);
        };
        FilmsUrlComponent = __decorate([
            Component
        ], FilmsUrlComponent);
        return FilmsUrlComponent;
    }());

    var FilmsComponent = (function () {
        function FilmsComponent() {
            this._urlComponent = new FilmsUrlComponent();
            this._filmsContentComponent = new FilmsContentComponent();
            this._filmsListComponent = new FilmsListComponent();
        }
        FilmsComponent.prototype.onInit = function () {
            document.getElementById('url-root').innerHTML += this._urlComponent.template();
            document.getElementById('films-root').innerHTML += this._filmsContentComponent.template();
            document.getElementById('films-root').innerHTML += this._filmsListComponent.template();
        };
        FilmsComponent.prototype.template = function () {
            return "\n            <div class=\"film-header\">Films</div>\n            <div class=\"film-data\">\n                <div id=\"url-root\" class=\"url-root\"></div>          \n                <div id=\"films-root\" class=\"films-root\"></div>     \n            </div>\n           ";
        };
        FilmsComponent = __decorate([
            Component
        ], FilmsComponent);
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

    var MusicContentComponent = (function () {
        function MusicContentComponent() {
        }
        MusicContentComponent.prototype.showMusicById = function (id) {
            var music = MusicService.getById(id);
            document.getElementById('music-author').innerHTML = "Name : " + upperCase(music.authorFullName);
            document.getElementById('music-name').innerHTML = "Track : " + upperCase(music.name);
            document.getElementById('music-cover')['src'] = music.linkImage;
            console.log('music.linkImage', music.linkImage);
            this.showMusicByLink(music.link);
        };
        MusicContentComponent.prototype.showMusicByLink = function (link) {
            var audio = document.getElementById('music-play');
            audio.innerHTML = "\n                       <audio controls autoplay loop>\n                         <source type=\"audio/mpeg\" id=\"music\" src=\"" + link + "\">\n                       </audio>\n                      ";
        };
        MusicContentComponent.prototype.clear = function () {
            document.getElementById('music')['src'] = '';
        };
        MusicContentComponent.prototype.template = function () {
            var musicList = MusicService.getList();
            return "\n              <div class=\"music-content\">\n                      <div class=\"music-block\">\n                          <div class=\"music-parametr\" id=\"music-parametr\">\n                              <div class=\"music-image\" id=\"music-image\">\n                                  <img class=\"music-cover\" id=\"music-cover\" alt=\"Not image\" src=\"\">\n                              </div>\n                              <div class=\"music-author\" id=\"music-author\">Name: </div>\n                              <div class=\"music-name\" id=\"music-name\">Track : </div>\n                              <div class=\"music-play\" id=\"music-play\">\n                                  <audio controls>\n                                      <source type=\"audio/mpeg\" id=\"music\" src=\"\">\n                                  </audio>\n                              </div>\n                          </div>\n                    </div> \n              </div>\n            ";
        };
        MusicContentComponent = __decorate([
            Component
        ], MusicContentComponent);
        return MusicContentComponent;
    }());

    var MusicListComponent = (function () {
        function MusicListComponent() {
            var _this = this;
            this._musicsContentComponent = new MusicContentComponent();
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
        MusicListComponent.prototype.onInit = function () {
            this.refresh();
        };
        MusicListComponent.prototype.add = function (music) {
            MusicService.add(music);
            this.refresh();
            this.activeId = this.buffer;
            this.activateElement();
        };
        MusicListComponent.prototype.refresh = function () {
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
        MusicListComponent.prototype.template = function () {
            return " \n            <div class=\"music-list\">\n                  <ul class=\"music-ul\" id=\"music-ul\"></ul>\n            </div>\n           ";
        };
        MusicListComponent = __decorate([
            Component
        ], MusicListComponent);
        return MusicListComponent;
    }());

    var MusicUrlComponent = (function () {
        function MusicUrlComponent() {
            var _this = this;
            this._musicList = new MusicListComponent();
            this._musicContentComponent = new MusicContentComponent();
            this.handleChange = function () {
                var linkMusic = document.getElementById('url-music')['value'];
                _this._musicContentComponent.showMusicByLink(linkMusic);
            };
            this.handleSubmit = function (event) {
                var music = {
                    link: document.getElementById('url-music')['value'],
                    linkImage: document.getElementById('url-music-image')['value'],
                    name: document.getElementById('url-name')['value'],
                    authorFullName: document.getElementById('url-author')['value'],
                };
                _this._musicList.add(music);
                _this.resetForm();
            };
        }
        MusicUrlComponent.prototype.onInit = function () {
            document.getElementById('url-music').addEventListener('change', this.handleChange);
        };
        MusicUrlComponent.prototype.resetForm = function () {
            document.getElementById('url-music')['value'] = '';
            document.getElementById('url-music-image')['value'] = '';
            document.getElementById('url-name')['value'] = '';
            document.getElementById('url-author')['value'] = '';
        };
        MusicUrlComponent.prototype.template = function () {
            var content = " <div class=\"flex\">                         \n                        <div class=\"col-3\">\n                            <input class=\"effect-7\" id=\"url-music\" type=\"text\" placeholder=\"Url music..\" required pattern=\"" + Patterns.MusicUrl + "\" >\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                        </div>\n                      </div>\n                      <div class=\"flex\">  \n                        <div class=\"col-3\">\n                            <input class=\"effect-7\" id=\"url-music-image\" type=\"text\" placeholder=\"Url music..\" required pattern=\"" + Patterns.ImageUrl + "\" >\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                        </div>\n                      </div>\n                      <div class=\"flex\">  \n                        <div class=\"col-3\">\n                            <input class=\"effect-7\" id=\"url-author\"  type=\"text\" placeholder=\"Author name..\" required pattern=\"" + Patterns.Name + "\">\n                              <span class=\"focus-border\">\n                                <i></i>\n                              </span>\n                        </div>\n                        <div class=\"col-3\">\n                            <input class=\"effect-7\" id=\"url-name\"  type=\"text\" placeholder=\"Music name..\" required pattern=\"" + Patterns.Name + "\">\n                              <span class=\"focus-border\">\n                                <i></i>\n                              </span>\n                        </div>\n                        <div class=\"col-3\">\n                          <input class=\"effect-7\" id=\"submit\" type=\"submit\" value=\"Save\">\n                            <span class=\"focus-border\">\n                              <i></i>\n                            </span>\n                        </div>          \n                      </div>      \n                   ";
            return formContent(content, this.handleSubmit);
        };
        MusicUrlComponent = __decorate([
            Component
        ], MusicUrlComponent);
        return MusicUrlComponent;
    }());

    var MusicComponent = (function () {
        function MusicComponent() {
            this._urlComponent = new MusicUrlComponent();
            this._musicList = new MusicListComponent();
            this._musicContentComponent = new MusicContentComponent();
        }
        MusicComponent.prototype.onInit = function () {
            document.getElementById('url-root').innerHTML += this._urlComponent.template();
            document.getElementById('music-root').innerHTML += this._musicList.template();
            document.getElementById('music-root').innerHTML += this._musicContentComponent.template();
        };
        MusicComponent.prototype.template = function () {
            return "\n            <div class=\"music-header\">Music</div>\n            <div class=\"music-data\">\n                <div id=\"url-root\" class=\"url-root\"></div>    \n                <div id=\"music-root\" class=\"music-root\"></div>\n            </div>\n    ";
        };
        MusicComponent = __decorate([
            Component
        ], MusicComponent);
        return MusicComponent;
    }());

    var Growl = (function () {
        function Growl() {
        }
        Growl.notice = function (message, settings) {
            if (settings === void 0) { settings = {}; }
            settings.style = 'notice';
            settings.title = 'Notice';
            this.addGrowls(message, settings);
        };
        Growl.warning = function (message, settings) {
            if (settings === void 0) { settings = {}; }
            settings.style = 'warning';
            settings.title = 'Warning';
            this.addGrowls(message, settings);
        };
        Growl.error = function (message, settings) {
            if (settings === void 0) { settings = {}; }
            settings.style = 'error';
            settings.title = 'Error';
            this.addGrowls(message, settings);
        };
        Growl.addGrowls = function (message, settings) {
            if (settings === void 0) { settings = {}; }
            var growl = __assign({}, this.growlDefault, settings);
            this.show(growl, message);
        };
        Growl.show = function (growl, message) {
            var id = "growl-id-" + Math.random();
            var growlHtml = "<div id=\"" + id + "\" class=\"growl " + growl.style + " " + growl.size + "\" style=\"opacity: 0\">\n                          <div class=\"growl-close\" id=\"growl-close\">\u00D7</div>\n                          <div class=\"growl-title\">" + growl.title + "</div>\n                          <div class=\"growl-message\">" + message + "</div>\n                       </div>\n                      ";
            var growls = document.getElementById('growl-id');
            setTimeout(function () {
                document.getElementById(id).style.opacity = '1';
            }, 1);
            growls.insertAdjacentHTML('afterbegin', growlHtml);
            document.getElementById('growl-close').addEventListener('click', remove);
            var show = document.getElementById(id);
            show.addEventListener('mouseover', stop);
            start();
            var timeout;
            function start() {
                timeout = setTimeout(remove, Growl.growlDefault.duration);
            }
            function stop() {
                clearTimeout(timeout);
                show.addEventListener('mouseout', start);
            }
            function remove() {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).style.opacity = '0';
                }
                setTimeout(function () {
                    if (document.getElementById(id) !== null) {
                        document.getElementById(id).remove();
                    }
                }, 1000);
            }
        };
        Growl.init = function () {
            var div = "<div id=\"growl-id\" class=\"growls-" + this.growlDefault.location + "\"></div>";
            document.body.insertAdjacentHTML('afterbegin', div);
        };
        Growl.growlDefault = {
            duration: 3200,
            location: 'tr',
            style: 'error',
            size: 'small',
        };
        return Growl;
    }());

    var MainComponent = (function () {
        function MainComponent() {
            this._imagesComponent = new ImagesComponent();
            this._musicsComponent = new MusicComponent();
            this._filmsComponent = new FilmsComponent();
            this.handleSubmit = function (component) {
                document.getElementById('content').innerHTML = component.template();
            };
        }
        MainComponent.prototype.onInit = function () {
            var _this = this;
            this.handleSubmit(this._musicsComponent);
            document.getElementById('fl1').addEventListener('click', function (e) { return _this.handleSubmit(_this._imagesComponent); });
            document.getElementById('fl2').addEventListener('click', function (e) { return _this.handleSubmit(_this._musicsComponent); });
            document.getElementById('fl3').addEventListener('click', function (e) { return _this.handleSubmit(_this._filmsComponent); });
            Growl.notice('1');
            Growl.warning('2');
            Growl.error('3');
            Growl.notice('4');
        };
        MainComponent.prototype.template = function () {
            return "\n            <div id=\"buttonGrowl\">Button</div>\n            <div class=\"menu\">\n                 <div class=\"b1\" id=\"fl1\"><i class=\"fa fa-youtube-play\" style=\"font-size:36px\"></i>Photo</div>\n                 <div class=\"b1\" id=\"fl2\"><i class=\"fa fa-music\" style=\"font-size:36px\"></i>Music</div>\n                 <div class=\"b1\" id=\"fl3\"><i class=\"fa fa-photo\" style=\"font-size:36px;\"></i>Film</div>\n            </div>\n            <div class=\"content\" id=\"content\"></div>";
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

    Growl.init();
    var appComponent = new AppComponent();
    appComponent.render();

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwiLi4vc3JjL2xpYnJlcmlzL2NvbXBvbmVudC50cyIsIi4uL3NyYy9saWJyZXJpcy9icm93c2VyLXN0b3JhZ2UudHMiLCIuLi9zcmMvc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UudHMiLCIuLi9zcmMvbGlicmVyaXMvY29tbW9uLnRzIiwiLi4vc3JjL2FwcC9tYWluL2ltYWdlcy9pbWFnZXMtY29udGVudC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy1saXN0LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvY29udHJvbHMvY29udHJvbHMudHMiLCIuLi9zcmMvYXBwL21haW4vaW1hZ2VzL2ltYWdlcy11cmwuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL2ltYWdlcy9pbWFnZXMuY29tcG9uZW50LnRzIiwiLi4vc3JjL3NlcnZpY2VzL2ZpbG0uc2VydmljZS50cyIsIi4uL3NyYy9hcHAvbWFpbi9maWxtcy9maWxtcy1jb250ZW50LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9maWxtcy9maWxtcy1saXN0LmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvbWFpbi9maWxtcy9maWxtcy11cmwuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL2ZpbG1zL2ZpbG1zLmNvbXBvbmVudC50cyIsIi4uL3NyYy9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlLnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljL211c2ljLWNvbnRlbnQuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljL211c2ljLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9tYWluL211c2ljL211c2ljLXVybC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL21haW4vbXVzaWMvbXVzaWMuY29tcG9uZW50LnRzIiwiLi4vc3JjL2xpYnJlcmlzL2dyb3dsLnRzIiwiLi4vc3JjL2FwcC9tYWluL21haW5Db21wb25lbnQudHMiLCIuLi9zcmMvYXBwL2F1dGgvYXV0aC5jb21wb25lbnQudHMiLCIuLi9zcmMvYXBwL2FwcC5jb21wb25lbnQudHMiLCIuLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi9hcHAvdHlwZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudDxURnVuY3Rpb24gZXh0ZW5kcyBGdW5jdGlvbj4ob2xkQ29uc3RydWN0b3I6IHsgbmV3KCk6IElDb21wb25lbnQ7IH0pOiBhbnlcclxue1xyXG4gIHJldHVybiBjbGFzcyBleHRlbmRzIG9sZENvbnN0cnVjdG9yXHJcbiAge1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCk6IGFueVxyXG4gICAgICB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygb2xkQ29uc3RydWN0b3IucHJvdG90eXBlLm9uSW5pdCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgb2xkQ29uc3RydWN0b3IucHJvdG90eXBlLm9uSW5pdC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgICAgIHJldHVybiBvbGRDb25zdHJ1Y3Rvci5wcm90b3R5cGUudGVtcGxhdGUuY2FsbCh0aGlzKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG59IiwiZXhwb3J0IGNsYXNzIEJyb3dzZXJTdG9yYWdlPFQ+XHJcbntcclxuICBwdWJsaWMga2V5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKVxyXG4gIHtcclxuICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE9iamVjdCh2YWx1ZTogVCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBzdHIgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgc3RyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPYmplY3QoKTogVFxyXG4gIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSk7XHJcblxyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMua2V5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhckFsbCgpOiB2b2lkXHJcbiAge1xyXG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUVudGl0eSB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBCcm93c2VyU3RvcmFnZSB9IGZyb20gJy4uL2xpYnJlcmlzL2Jyb3dzZXItc3RvcmFnZSc7XHJcblxyXG5pbnRlcmZhY2UgSVN0b3JhZ2VNb2RlbDxUTW9kZWw+XHJcbntcclxuICBpbmRleDogbnVtYmVyO1xyXG4gIGxpc3Q6IFRNb2RlbFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcmFnZVNlcnZpY2U8VCBleHRlbmRzIElFbnRpdHk+XHJcbntcclxuICBwcml2YXRlIHJlYWRvbmx5IGJyb3dzZXJTdG9yYWdlOiBCcm93c2VyU3RvcmFnZTxJU3RvcmFnZU1vZGVsPFQ+PjtcclxuXHJcbiAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcpXHJcbiAge1xyXG4gICAgdGhpcy5icm93c2VyU3RvcmFnZSA9IG5ldyBCcm93c2VyU3RvcmFnZTxJU3RvcmFnZU1vZGVsPFQ+PihrZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEJ5SWQoaWQ6IG51bWJlcik6IFRcclxuICB7XHJcbiAgICBjb25zdCBvYmpMaXN0OiBUW10gPSB0aGlzLmdldE9iaigpO1xyXG4gICAgcmV0dXJuIG9iakxpc3QuZmluZCh4ID0+IHguaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPYmooKTogVFtdXHJcbiAge1xyXG4gICAgY29uc3QgYnJvd3NlclN0b3JhZ2VEYXRhID0gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuICAgIHJldHVybiBicm93c2VyU3RvcmFnZURhdGEgPyBicm93c2VyU3RvcmFnZURhdGEubGlzdCA6IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEFycmF5KGl0ZW1zOiBUW10pOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuYnJvd3NlclN0b3JhZ2UuZ2V0T2JqZWN0KCk7XHJcblxyXG4gICAgaWYgKHN0b3JhZ2UgPT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2VPYmo6IElTdG9yYWdlTW9kZWw8VD4gPSB7XHJcbiAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgbGlzdDogW10sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpXHJcbiAgICAgIHtcclxuICAgICAgICBpdGVtLmlkID0gc3RvcmFnZU9iai5pbmRleDtcclxuICAgICAgICBzdG9yYWdlT2JqLmxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICBzdG9yYWdlT2JqLmluZGV4Kys7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5icm93c2VyU3RvcmFnZS5zZXRPYmplY3Qoc3RvcmFnZU9iaik7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGlmIChpdGVtLmlkID09PSAobnVsbCB8fCB1bmRlZmluZWQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGl0ZW0uaWQgPSBzdG9yYWdlLmluZGV4O1xyXG4gICAgICAgICAgc3RvcmFnZS5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICBzdG9yYWdlLmluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYnJvd3NlclN0b3JhZ2Uuc2V0T2JqZWN0KHN0b3JhZ2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUJ5SWQoaWQ6IG51bWJlcik6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBzdG9yYWdlT2JqID0gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuICAgIGNvbnN0IGluZGV4ID0gc3RvcmFnZU9iai5saXN0LmZpbmRJbmRleCh4ID0+ICh4LmlkID09PSBpZCkpO1xyXG4gICAgc3RvcmFnZU9iai5saXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgdGhpcy5icm93c2VyU3RvcmFnZS5zZXRPYmplY3Qoc3RvcmFnZU9iaik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuYnJvd3NlclN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJSW1hZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbmNsYXNzIEltYWdlU2VydmljZUNsYXNzXHJcbntcclxuICBwcml2YXRlIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZVNlcnZpY2U8SUltYWdlTW9kZWw+KCdpbWFnZScpO1xyXG5cclxuICBwdWJsaWMgZ2V0QnlJZChpZDogbnVtYmVyKTogSUltYWdlTW9kZWxcclxuICB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExpc3QoKTogSUltYWdlTW9kZWxbXVxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKGl0ZW06IElJbWFnZU1vZGVsKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGltYWdlTGlzdDogSUltYWdlTW9kZWxbXSA9IHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICAgIGltYWdlTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGltYWdlTGlzdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IElJbWFnZU1vZGVsW10pOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgaW1hZ2VMaXN0ID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgZm9yIChjb25zdCBpbWFnZSBvZiBpdGVtcylcclxuICAgIHtcclxuICAgICAgaW1hZ2VMaXN0LnB1c2goaW1hZ2UpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGltYWdlTGlzdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVCeUlkKGlkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgSW1hZ2VTZXJ2aWNlID0gbmV3IEltYWdlU2VydmljZUNsYXNzKCk7IiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvcHk8VD4ob2JqOiBUKTogVFxyXG57XHJcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cHBlckNhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmdcclxue1xyXG5cclxuICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0V4aXN0SHRtbEluRE9NKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhblxyXG57XHJcbiAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFBhdHRlcm5zXHJcbntcclxuICBJbWFnZVVybCA9ICdodHRwcz86XFxcXC9cXFxcLy4qXFxcXC4oPzpwbmd8anBnfGpwZWd8Z2lmKScsXHJcbiAgTXVzaWNVcmwgPSAnaHR0cHM/OlxcXFwvXFxcXC8uKlxcXFwuKD86bXAzKScsXHJcbiAgRmlsbVVybCA9ICdodHRwcz86XFxcXC9cXFxcLy4qXFxcXC4oPzptcDQpJyxcclxuICBOYW1lID0gJ1tBLVphLXrQkC3Qr9CwLdGP0IHRkTAtOSBdezEsMTV9JyxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1cmxEZWZhdWx0SW1hZ2UgPSAnaHR0cDovL3BsYWNlaG9sZC5pdC8yMDB4MjAwJzsiLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgdXJsRGVmYXVsdEltYWdlIH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tbW9uJztcblxuQENvbXBvbmVudFxuZXhwb3J0IGNsYXNzIEltYWdlc0NvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XG57XG4gIHB1YmxpYyBzaG93SW1hZ2VCeUlkKGlkOiBudW1iZXIpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKVsnc3JjJ10gPSBJbWFnZVNlcnZpY2UuZ2V0QnlJZChpZCkubGluaztcbiAgfVxuXG4gIHB1YmxpYyBzaG93SW1hZ2VCeUxpbmsobGluazogc3RyaW5nKTogdm9pZFxuICB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJylbJ3NyYyddID0gbGluaztcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKVsnc3JjJ10gPSB1cmxEZWZhdWx0SW1hZ2U7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICByZXR1cm4gYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSBcInBob3RvLWNvbnRlbnRcIj4gIFxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8tc2l6ZVwiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJpbWFnZVwiIGlkPVwiaW1hZ2VcIiBzcmM9XCIke3VybERlZmF1bHRJbWFnZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn0iLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW1hZ2VzQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSUltYWdlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvbW9kZWxzJztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIEltYWdlc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIGltYWdlc0NvbnRlbnRDb21wb25lbnQgPSBuZXcgSW1hZ2VzQ29udGVudENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgYWN0aXZlSWQ6IG51bWJlcjtcclxuICBwcml2YXRlIGJ1ZmZlcjogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcclxue1xyXG4gIHRoaXMucmVmcmVzaCgpO1xyXG59XHJcblxyXG4gIHB1YmxpYyBhZGQoaW1hZ2U6IElJbWFnZU1vZGVsKTogdm9pZFxyXG4gIHtcclxuICAgIEltYWdlU2VydmljZS5hZGQoaW1hZ2UpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUlkID0gdGhpcy5idWZmZXI7XHJcbiAgICB0aGlzLmFjdGl2YXRlRWxlbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoKCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBJbWFnZVNlcnZpY2UuZ2V0TGlzdCgpO1xyXG4gICAgY29uc3QgcGhvdG9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvcycpO1xyXG4gICAgbGV0IHN0ciA9ICcnO1xyXG5cclxuICAgIGltYWdlcy5mb3JFYWNoKGltYWdlID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuYnVmZmVyID0gaW1hZ2UuaWQ7XHJcbiAgICAgIHN0ciArPSBgXHJcbiAgICAgICAgICAgICA8bGkgaWQ9XCJwaG90by1saVwiIGNsYXNzPVwicGhvdG8tbGlcIiBkYXRhLWlkPSR7aW1hZ2UuaWR9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJwaG90by1zcGFuXCIgY2xhc3M9XCJwaG90by1zcGFuXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICR7aW1hZ2UuaWR9LiBQaG90bzogJHtpbWFnZS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGkgaWQ9J2ZhLWNsb3NlJyBjbGFzcz1cImZhIGZhLWNsb3NlXCIgc3R5bGU9XCJmb250LXNpemU6MjRweFwiPjwvaT5cclxuICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgIGA7XHJcbiAgICB9KTtcclxuICAgIHBob3Rvcy5pbm5lckhUTUwgPSBzdHI7XHJcblxyXG4gICAgdGhpcy5hZGRTcGFuQ2xpY2tIYW5kbGVyKHBob3Rvcyk7XHJcbiAgICB0aGlzLmFkZElDbGlja0hhbmRsZXIocGhvdG9zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkU3BhbkNsaWNrSGFuZGxlciA9IChwaG90b3M6IEhUTUxFbGVtZW50KSA9PlxyXG4gIHtcclxuICAgIGNvbnN0IHNwYW5Db2xsZWN0aW9uID0gcGhvdG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcclxuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oc3BhbkNvbGxlY3Rpb24pO1xyXG5cclxuICAgIGxpc3RBcnJheS5mb3JFYWNoKHNwYW5FbGVtZW50ID0+XHJcbiAgICB7XHJcbiAgICAgIHNwYW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cclxuICAgICAge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNwYW5FbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChwYXJlbnQuZGF0YXNldC5pZCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzQ29udGVudENvbXBvbmVudC5zaG93SW1hZ2VCeUlkKGlkKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlRWxlbWVudCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBhY3RpdmF0ZUVsZW1lbnQgPSAoKSA9PlxyXG4gIHtcclxuICAgIGNvbnN0IGxpQ29sbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waG90b3MgbGknKTtcclxuICAgIGNvbnN0IGxpc3RMaSA9IEFycmF5LmZyb20obGlDb2xsZWN0aW9uKTtcclxuICAgIGNvbnN0IGxpRWxlbSA9IGxpc3RMaS5maW5kKGxlID0+IHBhcnNlSW50KGxlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKSA9PT0gdGhpcy5hY3RpdmVJZCk7XHJcbiAgICBsaUVsZW0uY2xhc3NMaXN0LmFkZCgnbmV3U3BhbicpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBhZGRJQ2xpY2tIYW5kbGVyID0gKHBob3RvczogSFRNTEVsZW1lbnQpID0+XHJcbiAge1xyXG4gICAgY29uc3QgSUNvbGxlY3Rpb24gPSBwaG90b3MucXVlcnlTZWxlY3RvckFsbCgnaScpO1xyXG4gICAgY29uc3QgbGlzdEFycmF5ID0gQXJyYXkuZnJvbShJQ29sbGVjdGlvbik7XHJcblxyXG4gICAgbGlzdEFycmF5LmZvckVhY2goaUVsZW1lbnQgPT5cclxuICAgIHtcclxuICAgICAgaUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gaUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KHBhcmVudC5kYXRhc2V0LmlkKTtcclxuICAgICAgICBJbWFnZVNlcnZpY2UucmVtb3ZlQnlJZChpZCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXNDb250ZW50Q29tcG9uZW50LmNsZWFyKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGhvdG9zXCIgaWQ9XCJwaG90b3NcIj48L3VsPlxyXG4gICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBmb3JtQ29udGVudChjb250ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHN0cmluZ1xyXG57XHJcbiAgY29uc3QgaWQ6IHN0cmluZyA9IGBmb3JtLWlkLSR7TWF0aC5yYW5kb20oKX1gO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+XHJcbiAge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PlxyXG4gICAge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpKVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1ZBTElEJyk7XHJcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCd3YXMtdmFsaWRhdGVkJyk7XHJcbiAgICAgICAgY29uc3QgYXJyID0gZm9ybVBhcnNlKGZvcm0pO1xyXG4gICAgICAgIGNhbGxiYWNrKGFycik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0lOVkFMSUQnKTtcclxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgMSk7XHJcbiAgcmV0dXJuIGA8Zm9ybSBjbGFzcz1cImZvcm1cIiBub1ZhbGlkYXRlIGlkPVwiJHtpZH1cIj4ke2NvbnRlbnR9PC9mb3JtPmA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtUGFyc2UoZm9ybTogSFRNTEZvcm1FbGVtZW50ICYgSFRNTEVsZW1lbnQpOiBvYmplY3Rcclxue1xyXG4gIGNvbnN0IGlucHV0Q29sbGVjdGlvbiA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKGlucHV0Q29sbGVjdGlvbik7XHJcbiAgY29uc3Qgb2JqID0ge307XHJcblxyXG4gIGZvciAoY29uc3QgaW5wdXQgb2YgaW5wdXRMaXN0KVxyXG4gIHtcclxuICAgIGlmIChpbnB1dC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSAhPT0gJ3N1Ym1pdCcpXHJcbiAgICB7XHJcbiAgICAgIG9ialtpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKV0gPSBpbnB1dC52YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgSW1hZ2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgSW1hZ2VzQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZm9ybUNvbnRlbnQgfSBmcm9tICcuLi8uLi9jb250cm9scy9jb250cm9scyc7XHJcbmltcG9ydCB7IElJbWFnZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IFBhdHRlcm5zIH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIEltYWdlc1VybENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgX3Bob3RvTGlzdCA9IG5ldyBJbWFnZXNMaXN0Q29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfaW1hZ2VzQ29udGVudENvbXBvbmVudCA9IG5ldyBJbWFnZXNDb250ZW50Q29tcG9uZW50KCk7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZUNoYW5nZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNoYW5nZSA9ICgpID0+XHJcbiAge1xyXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcGhvdG8nKVsndmFsdWUnXTtcclxuICAgIHRoaXMuX2ltYWdlc0NvbnRlbnRDb21wb25lbnQuc2hvd0ltYWdlQnlMaW5rKGxpbmspO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3VibWl0ID0gKGZvcm1WYWx1ZXM6IG9iamVjdCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBpbWFnZTogSUltYWdlTW9kZWwgPSB7XHJcbiAgICAgIGxpbms6IGZvcm1WYWx1ZXNbJ3VybCddLFxyXG4gICAgICBuYW1lOiBmb3JtVmFsdWVzWyduYW1lJ10sXHJcbiAgICAgIGF1dGhvckZ1bGxOYW1lOiAnJyxcclxuICAgIH07XHJcbiAgICBjb25zb2xlLmxvZygnaW1hZ2UnLCBpbWFnZSk7XHJcblxyXG4gICAgdGhpcy5fcGhvdG9MaXN0LmFkZChpbWFnZSk7XHJcbiAgICB0aGlzLnJlc2V0Rm9ybSgpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgcmVzZXRGb3JtKCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXBob3RvJylbJ3ZhbHVlJ10gPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgY29uc3QgY29udGVudCA9IGAgPGRpdiBjbGFzcz1cImZsZXhcIj4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1waG90b1wiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVybFwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJVcmwgaW1hZ2UuLlwiIHJlcXVpcmVkIHBhdHRlcm49XCIke1BhdHRlcm5zLkltYWdlVXJsfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXhcIj4gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtbmFtZVwiICB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIkltYWdlIG5hbWUuLlwiIHJlcXVpcmVkIHBhdHRlcm49XCIke1BhdHRlcm5zLk5hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgYDtcclxuICAgIHJldHVybiBmb3JtQ29udGVudChjb250ZW50LCB0aGlzLmhhbmRsZVN1Ym1pdCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNVcmxDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy11cmwuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlcy1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZXNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZXMtbGlzdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50XG5leHBvcnQgY2xhc3MgSW1hZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxue1xuICBwcml2YXRlIF91cmxDb21wb25lbnQgPSBuZXcgSW1hZ2VzVXJsQ29tcG9uZW50KCk7XG4gIHByaXZhdGUgX3Bob3RvQ29udGVudENvbXBvbmVudCA9IG5ldyBJbWFnZXNDb250ZW50Q29tcG9uZW50KCk7XG4gIHByaXZhdGUgX3Bob3RvTGlzdCA9IG5ldyBJbWFnZXNMaXN0Q29tcG9uZW50KCk7XG5cbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXG4gIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fdXJsQ29tcG9uZW50LnRlbXBsYXRlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fcGhvdG9Db250ZW50Q29tcG9uZW50LnRlbXBsYXRlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fcGhvdG9MaXN0LnRlbXBsYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXG4gIHtcbiAgICByZXR1cm4gYCBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1oZWFkZXJcIj5QaG90byBHYWxsZXJ5PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPVwicGhvdG8tZGF0YVwiIGNsYXNzPVwicGhvdG8tZGF0YVwiPiBcbiAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInVybC1yb290XCIgY2xhc3M9XCJ1cmwtcm9vdFwiPjwvZGl2PiAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInBob3RvLXJvb3RcIiBjbGFzcz1cInBob3RvLXJvb3RcIj48L2Rpdj4gICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUZpbG1zTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5jbGFzcyBGaWxtU2VydmljZUNsYXNzXHJcbntcclxuICBwcml2YXRlIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZVNlcnZpY2U8SUZpbG1zTW9kZWw+KCdmaWxtJyk7XHJcblxyXG4gIHB1YmxpYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBJRmlsbXNNb2RlbFxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0QnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGlzdCgpOiBJRmlsbXNNb2RlbFtdXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaXRlbTogSUZpbG1zTW9kZWwpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgZmlsbUxpc3Q6IElGaWxtc01vZGVsW10gPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICBmaWxtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGZpbG1MaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogSUZpbG1zTW9kZWxbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBmaWxtTGlzdCA9IHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgaXRlbXMpXHJcbiAgICB7XHJcbiAgICAgIGZpbG1MaXN0LnB1c2goaW1hZ2UpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGZpbG1MaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVCeUlkKGlkOiBudW1iZXIpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBGaWxtU2VydmljZSA9IG5ldyBGaWxtU2VydmljZUNsYXNzKCk7IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsbVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9maWxtLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB1cHBlckNhc2UgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgY2xhc3MgRmlsbXNDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgSUNvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIHNob3dGaWxtQnlJZChpZDogbnVtYmVyKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHZpZGVvID0gRmlsbVNlcnZpY2UuZ2V0QnlJZChpZCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsbXMtbmFtZScpLmlubmVySFRNTCA9IGBUcmFjayA6ICR7dXBwZXJDYXNlKHZpZGVvLm5hbWUpfWA7XHJcbiAgICB0aGlzLnNob3dGaWxtQnlMaW5rKHZpZGVvLmxpbmspO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dGaWxtQnlMaW5rKGxpbms6IHN0cmluZyk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxtcy12aWRlbycpO1xyXG4gICAgY29uc29sZS5sb2coJ3ZpZGVvJywgdmlkZW8pO1xyXG4gICAgdmlkZW8uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dmlkZW8gY29udHJvbHMgYXV0b3BsYXk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2UgaWQ9XCJmaWxtXCIgc3JjPVwiJHtsaW5rfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC92aWRlbz5cclxuICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxtJylbJ3NyYyddID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgY29uc3QgZmlsbUxpc3QgPSBGaWxtU2VydmljZS5nZXRMaXN0KCk7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxtcy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbXMtcGxheVwiIGlkPVwiZmlsbXMtcGxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbG1zLW5hbWVcIiBpZD1cImZpbG1zLW5hbWVcIj5UcmFjayA6ICR7dXBwZXJDYXNlKGZpbG1MaXN0WzBdLm5hbWUpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbG1zLXZpZGVvXCIgaWQ9XCJmaWxtcy12aWRlb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dmlkZW8gY29udHJvbHM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBpZD1cImZpbG1cIiBzcmM9XCIke2ZpbG1MaXN0WzBdLmxpbmt9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdmlkZW8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICBgO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbG1zQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vZmlsbXMtY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJRmlsbXNNb2RlbCB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBGaWxtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ZpbG0uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBGaWxtc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9maWxtc0NvbnRlbnRDb21wb25lbnQgPSBuZXcgRmlsbXNDb250ZW50Q29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBhY3RpdmVJZDogbnVtYmVyO1xyXG4gIHByaXZhdGUgYnVmZmVyOiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZChmaWxtOiBJRmlsbXNNb2RlbCk6IHZvaWRcclxuICB7XHJcbiAgICBGaWxtU2VydmljZS5hZGQoZmlsbSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIHRoaXMuYWN0aXZlSWQgPSB0aGlzLmJ1ZmZlcjtcclxuICAgIHRoaXMuYWN0aXZhdGVFbGVtZW50KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2goKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGZpbG1zID0gRmlsbVNlcnZpY2UuZ2V0TGlzdCgpO1xyXG4gICAgY29uc3QgZmlsbXNVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxtcy11bCcpO1xyXG4gICAgbGV0IHN0ciA9ICcnO1xyXG5cclxuICAgIGZpbG1zLmZvckVhY2goZmlsbSA9PlxyXG4gICAge1xyXG4gICAgICB0aGlzLmJ1ZmZlciA9IGZpbG0uaWQ7XHJcbiAgICAgIHN0ciArPSBgXHJcbiAgICAgICAgICAgICA8bGkgaWQ9XCJmaWxtLWxpXCIgY2xhc3M9XCJmaWxtLWxpXCIgZGF0YS1pZD0ke2ZpbG0uaWR9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJmaWxtLXNwYW5cIiBjbGFzcz1cImZpbG0tc3BhblwiID5cclxuICAgICAgICAgICAgICAgICAgICAke2ZpbG0uaWR9LiBOYW1lOiAke2ZpbG0ubmFtZX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGlkPSdmYS1jbG9zZScgY2xhc3M9XCJmYSBmYS1jbG9zZVwiIHN0eWxlPVwiZm9udC1zaXplOjI0cHhcIj48L2k+XHJcbiAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgYDtcclxuICAgIH0pO1xyXG4gICAgZmlsbXNVbC5pbm5lckhUTUwgPSBzdHI7XHJcblxyXG4gICAgdGhpcy5hZGRTcGFuQ2xpY2tIYW5kbGVyKGZpbG1zVWwpO1xyXG4gICAgdGhpcy5hZGRJQ2xpY2tIYW5kbGVyKGZpbG1zVWwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTcGFuQ2xpY2tIYW5kbGVyID0gKGZpbG1zOiBIVE1MRWxlbWVudCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBzcGFuQ29sbGVjdGlvbiA9IGZpbG1zLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcclxuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oc3BhbkNvbGxlY3Rpb24pO1xyXG5cclxuICAgIGxpc3RBcnJheS5mb3JFYWNoKHNwYW5FbGVtZW50ID0+XHJcbiAgICB7XHJcbiAgICAgIHNwYW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cclxuICAgICAge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNwYW5FbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChwYXJlbnQuZGF0YXNldC5pZCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX2ZpbG1zQ29udGVudENvbXBvbmVudC5zaG93RmlsbUJ5SWQoaWQpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVFbGVtZW50KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGFjdGl2YXRlRWxlbWVudCA9ICgpID0+XHJcbiAge1xyXG4gICAgY29uc3QgbGlDb2xsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbG1zLXVsIGxpJyk7XHJcbiAgICBjb25zdCBsaXN0TGkgPSBBcnJheS5mcm9tKGxpQ29sbGVjdGlvbik7XHJcbiAgICBjb25zdCBsaUVsZW0gPSBsaXN0TGkuZmluZChsZSA9PiBwYXJzZUludChsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSkgPT09IHRoaXMuYWN0aXZlSWQpO1xyXG4gICAgbGlFbGVtLmNsYXNzTGlzdC5hZGQoJ25ld1NwYW4nKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgYWRkSUNsaWNrSGFuZGxlciA9IChmaWxtc1VsOiBIVE1MRWxlbWVudCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBJQ29sbGVjdGlvbiA9IGZpbG1zVWwucXVlcnlTZWxlY3RvckFsbCgnaScpO1xyXG4gICAgY29uc3QgbGlzdEFycmF5ID0gQXJyYXkuZnJvbShJQ29sbGVjdGlvbik7XHJcblxyXG4gICAgbGlzdEFycmF5LmZvckVhY2goaUVsZW1lbnQgPT5cclxuICAgIHtcclxuICAgICAgaUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gaUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KHBhcmVudC5kYXRhc2V0LmlkKTtcclxuICAgICAgICBGaWxtU2VydmljZS5yZW1vdmVCeUlkKGlkKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB0aGlzLl9maWxtc0NvbnRlbnRDb21wb25lbnQuY2xlYXIoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxtcy1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZmlsbXMtdWxcIiBpZD1cImZpbG1zLXVsXCI+PC91bD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYXR0ZXJucyB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbW1vbic7XHJcbmltcG9ydCB7IEZpbG1zTGlzdENvbXBvbmVudCB9IGZyb20gJy4vZmlsbXMtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGaWxtc0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2ZpbG1zLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgZm9ybUNvbnRlbnQgfSBmcm9tICcuLi8uLi9jb250cm9scy9jb250cm9scyc7XHJcbmltcG9ydCB7IElGaWxtc01vZGVsIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21vZGVscyc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBGaWxtc1VybENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHB1YmxpYyBfZmlsbUxpc3QgPSBuZXcgRmlsbXNMaXN0Q29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfZmlsbUNvbnRlbnRDb21wb25lbnQgPSBuZXcgRmlsbXNDb250ZW50Q29tcG9uZW50KCk7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtZmlsbXMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZUNoYW5nZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNoYW5nZSA9ICgpID0+XHJcbiAge1xyXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtZmlsbXMnKVsndmFsdWUnXTtcclxuICAgIHRoaXMuX2ZpbG1Db250ZW50Q29tcG9uZW50LnNob3dGaWxtQnlMaW5rKGxpbmspO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3VibWl0ID0gKGZvcm1WYWx1ZXM6IG9iamVjdCkgPT5cclxuICB7XHJcbiAgICBjb25zdCB2aWRlbzogSUZpbG1zTW9kZWwgPSB7XHJcbiAgICAgIGxpbms6IGZvcm1WYWx1ZXNbJ3VybCddLFxyXG4gICAgICBuYW1lOiBmb3JtVmFsdWVzWyduYW1lJ10sXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2ZpbG1MaXN0LmFkZCh2aWRlbyk7XHJcbiAgICB0aGlzLnJlc2V0Rm9ybSgpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgcmVzZXRGb3JtKCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLWZpbG1zJylbJ3ZhbHVlJ10gPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgY29uc3QgY29udGVudCA9IGAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleFwiPiAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1maWxtc1wiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInVybFwiIHBsYWNlaG9sZGVyPVwiVXJsIGZpbG1zLi5cIiByZXF1aXJlZCBwYXR0ZXJuPVwiJHtQYXR0ZXJucy5GaWxtVXJsfVwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleFwiPiAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1uYW1lXCIgIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpbG1zIG5hbWUuLlwiIHJlcXVpcmVkIHBhdHRlcm49XCIke1BhdHRlcm5zLk5hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICByZXR1cm4gZm9ybUNvbnRlbnQoY29udGVudCwgdGhpcy5oYW5kbGVTdWJtaXQpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbG1zVXJsQ29tcG9uZW50IH0gZnJvbSAnLi9maWxtcy11cmwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsbXNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9maWxtcy1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbG1zTGlzdENvbXBvbmVudCB9IGZyb20gJy4vZmlsbXMtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgY2xhc3MgRmlsbXNDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF91cmxDb21wb25lbnQgPSBuZXcgRmlsbXNVcmxDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9maWxtc0NvbnRlbnRDb21wb25lbnQgPSBuZXcgRmlsbXNDb250ZW50Q29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBfZmlsbXNMaXN0Q29tcG9uZW50ID0gbmV3IEZpbG1zTGlzdENvbXBvbmVudCgpO1xyXG5cclxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fdXJsQ29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsbXMtcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl9maWxtc0NvbnRlbnRDb21wb25lbnQudGVtcGxhdGUoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxtcy1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX2ZpbG1zTGlzdENvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxtLWhlYWRlclwiPkZpbG1zPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxtLWRhdGFcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ1cmwtcm9vdFwiIGNsYXNzPVwidXJsLXJvb3RcIj48L2Rpdj4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZmlsbXMtcm9vdFwiIGNsYXNzPVwiZmlsbXMtcm9vdFwiPjwvZGl2PiAgICAgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIGA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IElNdXNpY01vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgTXVzaWNTZXJ2aWNlQ2xhc3Ncclxue1xyXG4gIHByaXZhdGUgc3RvcmFnZSA9IG5ldyBTdG9yYWdlU2VydmljZTxJTXVzaWNNb2RlbD4oJ211c2ljJyk7XHJcblxyXG4gIHB1YmxpYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBJTXVzaWNNb2RlbFxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0QnlJZChpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGlzdCgpOiBJTXVzaWNNb2RlbFtdXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaXRlbTogSU11c2ljTW9kZWwpOiB2b2lkXHJcbiAge1xyXG4gICAgICBjb25zdCBtdXNpY0xpc3Q6IElNdXNpY01vZGVsW10gPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICAgIG11c2ljTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkobXVzaWNMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogSU11c2ljTW9kZWxbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBtdXNpY0xpc3QgPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICBmb3IgKGNvbnN0IG11c2ljIG9mIGl0ZW1zKVxyXG4gICAge1xyXG4gICAgICBtdXNpY0xpc3QucHVzaChtdXNpYyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkobXVzaWNMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVCeUlkKGlkOiBudW1iZXIpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUJ5SWQoaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBNdXNpY1NlcnZpY2UgPSBuZXcgTXVzaWNTZXJ2aWNlQ2xhc3MoKTsiLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdXBwZXJDYXNlIH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnRcclxuZXhwb3J0IGNsYXNzIE11c2ljQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHB1YmxpYyBzaG93TXVzaWNCeUlkKGlkOiBudW1iZXIpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgbXVzaWMgPSBNdXNpY1NlcnZpY2UuZ2V0QnlJZChpZCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVzaWMtYXV0aG9yJykuaW5uZXJIVE1MID0gYE5hbWUgOiAke3VwcGVyQ2FzZShtdXNpYy5hdXRob3JGdWxsTmFtZSl9YDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYy1uYW1lJykuaW5uZXJIVE1MID0gYFRyYWNrIDogJHt1cHBlckNhc2UobXVzaWMubmFtZSl9YDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYy1jb3ZlcicpWydzcmMnXSA9IG11c2ljLmxpbmtJbWFnZTtcclxuICAgIGNvbnNvbGUubG9nKCdtdXNpYy5saW5rSW1hZ2UnLCBtdXNpYy5saW5rSW1hZ2UpO1xyXG4gICAgdGhpcy5zaG93TXVzaWNCeUxpbmsobXVzaWMubGluayk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd011c2ljQnlMaW5rKGxpbms6IHN0cmluZyk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYy1wbGF5Jyk7XHJcbiAgICBhdWRpby5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgPGF1ZGlvIGNvbnRyb2xzIGF1dG9wbGF5IGxvb3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHR5cGU9XCJhdWRpby9tcGVnXCIgaWQ9XCJtdXNpY1wiIHNyYz1cIiR7bGlua31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L2F1ZGlvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgYDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljJylbJ3NyYyddID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgY29uc3QgbXVzaWNMaXN0ID0gTXVzaWNTZXJ2aWNlLmdldExpc3QoKTtcclxuXHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtcGFyYW1ldHJcIiBpZD1cIm11c2ljLXBhcmFtZXRyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1pbWFnZVwiIGlkPVwibXVzaWMtaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtdXNpYy1jb3ZlclwiIGlkPVwibXVzaWMtY292ZXJcIiBhbHQ9XCJOb3QgaW1hZ2VcIiBzcmM9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1hdXRob3JcIiBpZD1cIm11c2ljLWF1dGhvclwiPk5hbWU6IDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtbmFtZVwiIGlkPVwibXVzaWMtbmFtZVwiPlRyYWNrIDogPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1wbGF5XCIgaWQ9XCJtdXNpYy1wbGF5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXVkaW8gY29udHJvbHM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSB0eXBlPVwiYXVkaW8vbXBlZ1wiIGlkPVwibXVzaWNcIiBzcmM9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXVkaW8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTXVzaWNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpYy1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHVwcGVyQ2FzZSB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbW1vbic7XHJcbmltcG9ydCB7IElNdXNpY01vZGVsIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21vZGVscyc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBJQ29tcG9uZW50XHJcbntcclxuICBwcml2YXRlIF9tdXNpY3NDb250ZW50Q29tcG9uZW50ID0gbmV3IE11c2ljQ29udGVudENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgYWN0aXZlSWQ6IG51bWJlcjtcclxuICBwcml2YXRlIGJ1ZmZlcjogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQobXVzaWM6IElNdXNpY01vZGVsKTogdm9pZFxyXG4gIHtcclxuICAgIE11c2ljU2VydmljZS5hZGQobXVzaWMpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUlkID0gdGhpcy5idWZmZXI7XHJcbiAgICB0aGlzLmFjdGl2YXRlRWxlbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoKCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBtdXNpYyA9IE11c2ljU2VydmljZS5nZXRMaXN0KCk7XHJcbiAgICBjb25zdCBtdXNpY1VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljLXVsJyk7XHJcbiAgICBsZXQgc3RyID0gJyc7XHJcblxyXG4gICAgbXVzaWMuZm9yRWFjaChtdXNpYyA9PlxyXG4gICAge1xyXG4gICAgICB0aGlzLmJ1ZmZlciA9IG11c2ljLmlkO1xyXG4gICAgICBzdHIgKz0gYFxyXG4gICAgICAgICAgICAgIDxsaSBpZD1cIm11c2ljLWxpXCIgY2xhc3M9XCJtdXNpYy1saVwiIGRhdGEtaWQ9JHttdXNpYy5pZH0+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cIm11c2ljLXNwYW5cIiBjbGFzcz1cIm11c2ljLXNwYW5cIiA+XHJcbiAgICAgICAgICAgICAgICAgICAke211c2ljLmlkfS4gJHt1cHBlckNhc2UobXVzaWMuYXV0aG9yRnVsbE5hbWUpfSAtICR7bXVzaWMubmFtZX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpIGlkPSdmYS1jbG9zZScgY2xhc3M9XCJmYSBmYS1jbG9zZVwiIHN0eWxlPVwiZm9udC1zaXplOjI0cHhcIj48L2k+XHJcbiAgICAgICAgICAgICAgPC9saT4gXHJcbiAgICAgICAgICAgICBgO1xyXG4gICAgfSk7XHJcbiAgICBtdXNpY1VsLmlubmVySFRNTCA9IHN0cjtcclxuXHJcbiAgICB0aGlzLmFkZFNwYW5DbGlja0hhbmRsZXIobXVzaWNVbCk7XHJcbiAgICB0aGlzLmFkZElDbGlja0hhbmRsZXIobXVzaWNVbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFNwYW5DbGlja0hhbmRsZXIgPSAobXVzaWNVbDogSFRNTEVsZW1lbnQpID0+XHJcbiAge1xyXG4gICAgY29uc3Qgc3BhbkNvbGxlY3Rpb24gPSBtdXNpY1VsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcclxuICAgIGNvbnN0IGxpc3RBcnJheSA9IEFycmF5LmZyb20oc3BhbkNvbGxlY3Rpb24pO1xyXG5cclxuICAgIGxpc3RBcnJheS5mb3JFYWNoKHNwYW5FbGVtZW50ID0+XHJcbiAgICB7XHJcbiAgICAgIHNwYW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cclxuICAgICAge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNwYW5FbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChwYXJlbnQuZGF0YXNldC5pZCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX211c2ljc0NvbnRlbnRDb21wb25lbnQuc2hvd011c2ljQnlJZChpZCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUVsZW1lbnQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgYWN0aXZhdGVFbGVtZW50ID0gKCkgPT5cclxuICB7XHJcbiAgICBjb25zdCBsaUNvbGxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubXVzaWMtdWwgbGknKTtcclxuICAgIGNvbnN0IGxpc3RMaSA9IEFycmF5LmZyb20obGlDb2xsZWN0aW9uKTtcclxuICAgIGNvbnN0IGxpRWxlbSA9IGxpc3RMaS5maW5kKGxlID0+IHBhcnNlSW50KGxlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKSA9PT0gdGhpcy5hY3RpdmVJZCk7XHJcbiAgICBsaUVsZW0uY2xhc3NMaXN0LmFkZCgnbmV3U3BhbicpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBhZGRJQ2xpY2tIYW5kbGVyID0gKG11c2ljVWw6IEhUTUxFbGVtZW50KSA9PlxyXG4gIHtcclxuICAgIGNvbnN0IElDb2xsZWN0aW9uID0gbXVzaWNVbC5xdWVyeVNlbGVjdG9yQWxsKCdpJyk7XHJcbiAgICBjb25zdCBsaXN0QXJyYXkgPSBBcnJheS5mcm9tKElDb2xsZWN0aW9uKTtcclxuXHJcbiAgICBsaXN0QXJyYXkuZm9yRWFjaChpRWxlbWVudCA9PlxyXG4gICAge1xyXG4gICAgICBpRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XHJcbiAgICAgIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSBpRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocGFyZW50LmRhdGFzZXQuaWQpO1xyXG4gICAgICAgIE11c2ljU2VydmljZS5yZW1vdmVCeUlkKGlkKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB0aGlzLl9tdXNpY3NDb250ZW50Q29tcG9uZW50LmNsZWFyKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIHJldHVybiBgIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJtdXNpYy11bFwiIGlkPVwibXVzaWMtdWxcIj48L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICBgO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBNdXNpY0xpc3RDb21wb25lbnQgfSBmcm9tICcuL211c2ljLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVzaWNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpYy1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGZvcm1Db250ZW50IH0gZnJvbSAnLi4vLi4vY29udHJvbHMvY29udHJvbHMnO1xyXG5pbXBvcnQgeyBQYXR0ZXJucyB9IGZyb20gJy4uLy4uLy4uL2xpYnJlcmlzL2NvbW1vbic7XHJcbmltcG9ydCB7IElNdXNpY01vZGVsIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21vZGVscyc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY1VybENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHB1YmxpYyBfbXVzaWNMaXN0ID0gbmV3IE11c2ljTGlzdENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX211c2ljQ29udGVudENvbXBvbmVudCA9IG5ldyBNdXNpY0NvbnRlbnRDb21wb25lbnQoKTtcclxuXHJcbiAgcHVibGljIG9uSW5pdCgpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1tdXNpYycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ2hhbmdlID0gKCkgPT5cclxuICB7XHJcbiAgICAvL2NvbnN0IGxpbmtJbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbXVzaWMtaW1hZ2UnKVsndmFsdWUnXTtcclxuICAgIGNvbnN0IGxpbmtNdXNpYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbXVzaWMnKVsndmFsdWUnXTtcclxuICAgIHRoaXMuX211c2ljQ29udGVudENvbXBvbmVudC5zaG93TXVzaWNCeUxpbmsobGlua011c2ljKTtcclxuICB9O1xyXG5cclxuICBwcml2YXRlIGhhbmRsZVN1Ym1pdCA9IChldmVudDogRXZlbnQpID0+XHJcbiAge1xyXG4gICAgY29uc3QgbXVzaWM6IElNdXNpY01vZGVsID0ge1xyXG4gICAgICBsaW5rOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW11c2ljJylbJ3ZhbHVlJ10sXHJcbiAgICAgIGxpbmtJbWFnZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1tdXNpYy1pbWFnZScpWyd2YWx1ZSddLFxyXG4gICAgICBuYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW5hbWUnKVsndmFsdWUnXSxcclxuICAgICAgYXV0aG9yRnVsbE5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtYXV0aG9yJylbJ3ZhbHVlJ10sXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX211c2ljTGlzdC5hZGQobXVzaWMpO1xyXG4gICAgdGhpcy5yZXNldEZvcm0oKTtcclxuICB9O1xyXG5cclxuICBwcml2YXRlIHJlc2V0Rm9ybSgpOiB2b2lkXHJcbiAge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybC1tdXNpYycpWyd2YWx1ZSddID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLW11c2ljLWltYWdlJylbJ3ZhbHVlJ10gPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtbmFtZScpWyd2YWx1ZSddID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXJsLWF1dGhvcicpWyd2YWx1ZSddID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgY29uc3QgY29udGVudCA9IGAgPGRpdiBjbGFzcz1cImZsZXhcIj4gICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1tdXNpY1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVcmwgbXVzaWMuLlwiIHJlcXVpcmVkIHBhdHRlcm49XCIke1BhdHRlcm5zLk11c2ljVXJsfVwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4XCI+ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtN1wiIGlkPVwidXJsLW11c2ljLWltYWdlXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVybCBtdXNpYy4uXCIgcmVxdWlyZWQgcGF0dGVybj1cIiR7UGF0dGVybnMuSW1hZ2VVcmx9XCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGk+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXhcIj4gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVmZmVjdC03XCIgaWQ9XCJ1cmwtYXV0aG9yXCIgIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJBdXRob3IgbmFtZS4uXCIgcmVxdWlyZWQgcGF0dGVybj1cIiR7UGF0dGVybnMuTmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb2N1cy1ib3JkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInVybC1uYW1lXCIgIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJNdXNpYyBuYW1lLi5cIiByZXF1aXJlZCBwYXR0ZXJuPVwiJHtQYXR0ZXJucy5OYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvY3VzLWJvcmRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWZmZWN0LTdcIiBpZD1cInN1Ym1pdFwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlNhdmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9jdXMtYm9yZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIHJldHVybiBmb3JtQ29udGVudChjb250ZW50LCB0aGlzLmhhbmRsZVN1Ym1pdCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlicmVyaXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVzaWNVcmxDb21wb25lbnQgfSBmcm9tICcuL211c2ljLXVybC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY0xpc3RDb21wb25lbnQgfSBmcm9tICcuL211c2ljLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVzaWNDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tdXNpYy1jb250ZW50LmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50XHJcbmV4cG9ydCBjbGFzcyBNdXNpY0NvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgX3VybENvbXBvbmVudCA9IG5ldyBNdXNpY1VybENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX211c2ljTGlzdCA9IG5ldyBNdXNpY0xpc3RDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tdXNpY0NvbnRlbnRDb21wb25lbnQgPSBuZXcgTXVzaWNDb250ZW50Q29tcG9uZW50KCk7XHJcblxyXG4gIHB1YmxpYyBvbkluaXQoKTogdm9pZFxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmwtcm9vdCcpLmlubmVySFRNTCArPSB0aGlzLl91cmxDb21wb25lbnQudGVtcGxhdGUoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXNpYy1yb290JykuaW5uZXJIVE1MICs9IHRoaXMuX211c2ljTGlzdC50ZW1wbGF0ZSgpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211c2ljLXJvb3QnKS5pbm5lckhUTUwgKz0gdGhpcy5fbXVzaWNDb250ZW50Q29tcG9uZW50LnRlbXBsYXRlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVtcGxhdGUoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWhlYWRlclwiPk11c2ljPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1kYXRhXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidXJsLXJvb3RcIiBjbGFzcz1cInVybC1yb290XCI+PC9kaXY+ICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cIm11c2ljLXJvb3RcIiBjbGFzcz1cIm11c2ljLXJvb3RcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gIH1cclxufSIsImludGVyZmFjZSBJR3Jvd2xcclxue1xyXG4gIGR1cmF0aW9uPzogbnVtYmVyO1xyXG4gIGxvY2F0aW9uPzogJ2RlZmF1bHQnIHwgJ3RsJyB8ICd0cicgfCAnYmwnIHwgJ2JyJyB8ICd0YyAnIHwgJ2JjJyB8ICdjYycgfCAnY2wnIHwgJ2NyICc7XHJcbiAgc3R5bGU/OiAnZGVmYXVsdCcgfCAnZXJyb3InIHwgJ25vdGljZScgfCAnd2FybmluZyc7XHJcbiAgc2l6ZT86ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHcm93bFxyXG57XHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ3Jvd2xEZWZhdWx0OiBJR3Jvd2wgPSB7XHJcbiAgICBkdXJhdGlvbjogMzIwMCxcclxuICAgIGxvY2F0aW9uOiAndHInLFxyXG4gICAgc3R5bGU6ICdlcnJvcicsXHJcbiAgICBzaXplOiAnc21hbGwnLFxyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgbm90aWNlKG1lc3NhZ2U6IHN0cmluZywgc2V0dGluZ3M6IElHcm93bCA9IHt9KTogdm9pZFxyXG4gIHtcclxuICAgIHNldHRpbmdzLnN0eWxlID0gJ25vdGljZSc7XHJcbiAgICBzZXR0aW5ncy50aXRsZSA9ICdOb3RpY2UnO1xyXG4gICAgdGhpcy5hZGRHcm93bHMobWVzc2FnZSwgc2V0dGluZ3MpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyB3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZywgc2V0dGluZ3M6IElHcm93bCA9IHt9KTogdm9pZFxyXG4gIHtcclxuICAgIHNldHRpbmdzLnN0eWxlID0gJ3dhcm5pbmcnO1xyXG4gICAgc2V0dGluZ3MudGl0bGUgPSAnV2FybmluZyc7XHJcbiAgICB0aGlzLmFkZEdyb3dscyhtZXNzYWdlLCBzZXR0aW5ncyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgc2V0dGluZ3M6IElHcm93bCA9IHt9KTogdm9pZFxyXG4gIHtcclxuICAgIHNldHRpbmdzLnN0eWxlID0gJ2Vycm9yJztcclxuICAgIHNldHRpbmdzLnRpdGxlID0gJ0Vycm9yJztcclxuICAgIHRoaXMuYWRkR3Jvd2xzKG1lc3NhZ2UsIHNldHRpbmdzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGFkZEdyb3dscyhtZXNzYWdlOiBzdHJpbmcsIHNldHRpbmdzOiBJR3Jvd2wgPSB7fSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBncm93bCA9IHsuLi50aGlzLmdyb3dsRGVmYXVsdCwgLi4uc2V0dGluZ3N9O1xyXG5cclxuICAgIHRoaXMuc2hvdyhncm93bCwgbWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHNob3coZ3Jvd2w6IElHcm93bCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGlkOiBzdHJpbmcgPSBgZ3Jvd2wtaWQtJHtNYXRoLnJhbmRvbSgpfWA7XHJcblxyXG4gICAgY29uc3QgZ3Jvd2xIdG1sID0gYDxkaXYgaWQ9XCIke2lkfVwiIGNsYXNzPVwiZ3Jvd2wgJHtncm93bC5zdHlsZX0gJHtncm93bC5zaXplfVwiIHN0eWxlPVwib3BhY2l0eTogMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncm93bC1jbG9zZVwiIGlkPVwiZ3Jvd2wtY2xvc2VcIj7DlzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncm93bC10aXRsZVwiPiR7Z3Jvd2wudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyb3dsLW1lc3NhZ2VcIj4ke21lc3NhZ2V9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgIGNvbnN0IGdyb3dscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncm93bC1pZCcpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PlxyXG4gICAge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgIH0sIDEpO1xyXG5cclxuICAgIGdyb3dscy5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBncm93bEh0bWwpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyb3dsLWNsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmUpO1xyXG5cclxuICAgIGNvbnN0IHNob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBzaG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHN0b3ApO1xyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICBsZXQgdGltZW91dDogbnVtYmVyO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0YXJ0KCk6IHZvaWRcclxuICAgIHtcclxuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQocmVtb3ZlLCBHcm93bC5ncm93bERlZmF1bHQuZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3AoKTogdm9pZFxyXG4gICAge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblxyXG4gICAgICBzaG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0Jywgc3RhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgIT09IG51bGwpXHJcbiAgICAgIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgfVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+XHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpICE9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0KCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBkaXYgPSBgPGRpdiBpZD1cImdyb3dsLWlkXCIgY2xhc3M9XCJncm93bHMtJHt0aGlzLmdyb3dsRGVmYXVsdC5sb2NhdGlvbn1cIj48L2Rpdj5gO1xyXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBkaXYpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElDb21wb25lbnQgfSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCB7IEltYWdlc0NvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2VzL2ltYWdlcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9saWJyZXJpcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGaWxtc0NvbXBvbmVudCB9IGZyb20gJy4vZmlsbXMvZmlsbXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTXVzaWNDb21wb25lbnQgfSBmcm9tICcuL211c2ljL211c2ljLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdyb3dsIH0gZnJvbSAnLi4vLi4vbGlicmVyaXMvZ3Jvd2wnO1xyXG5cclxuQENvbXBvbmVudFxyXG5leHBvcnQgY2xhc3MgTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgX2ltYWdlc0NvbXBvbmVudCA9IG5ldyBJbWFnZXNDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9tdXNpY3NDb21wb25lbnQgPSBuZXcgTXVzaWNDb21wb25lbnQoKTtcclxuICBwcml2YXRlIF9maWxtc0NvbXBvbmVudCA9IG5ldyBGaWxtc0NvbXBvbmVudCgpO1xyXG5cclxuICBwdWJsaWMgb25Jbml0KCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCh0aGlzLl9tdXNpY3NDb21wb25lbnQpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KHRoaXMuX2ltYWdlc0NvbXBvbmVudCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KHRoaXMuX211c2ljc0NvbXBvbmVudCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsMycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KHRoaXMuX2ZpbG1zQ29tcG9uZW50KSk7XHJcblxyXG4gICAgR3Jvd2wubm90aWNlKCcxJyk7XHJcbiAgICBHcm93bC53YXJuaW5nKCcyJyk7XHJcbiAgICBHcm93bC5lcnJvcignMycpO1xyXG4gICAgR3Jvd2wubm90aWNlKCc0Jyk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVTdWJtaXQgPSAoY29tcG9uZW50OiBJQ29tcG9uZW50KSA9PlxyXG4gIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlKCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHB1YmxpYyB0ZW1wbGF0ZSgpOiBzdHJpbmdcclxuICB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiYnV0dG9uR3Jvd2xcIj5CdXR0b248L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVcIj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsMVwiPjxpIGNsYXNzPVwiZmEgZmEteW91dHViZS1wbGF5XCIgc3R5bGU9XCJmb250LXNpemU6MzZweFwiPjwvaT5QaG90bzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiMVwiIGlkPVwiZmwyXCI+PGkgY2xhc3M9XCJmYSBmYS1tdXNpY1wiIHN0eWxlPVwiZm9udC1zaXplOjM2cHhcIj48L2k+TXVzaWM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYjFcIiBpZD1cImZsM1wiPjxpIGNsYXNzPVwiZmEgZmEtcGhvdG9cIiBzdHlsZT1cImZvbnQtc2l6ZTozNnB4O1wiPjwvaT5GaWxtPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIGlkPVwiY29udGVudFwiPjwvZGl2PmA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUNvbXBvbmVudCB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IHsgZm9ybUNvbnRlbnQgfSBmcm9tICcuLi9jb250cm9scy9jb250cm9scyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXV0aENvbXBvbmVudCBpbXBsZW1lbnRzIElDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgaGFuZGxlciA9ICgpID0+XHJcbiAge1xyXG4gICAgY29uc29sZS53YXJuKCdIQU5ETEVSJyk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHRlbXBsYXRlKCk6IHN0cmluZ1xyXG4gIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydCBlcnJvclwiPkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmQhPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHR5cGU9XCJlbWFpbFwiIHJlcXVpcmVkICAvPjxpIGNsYXNzPVwiZmEgZmEtdXNlclwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgcmVxdWlyZWQgcGF0dGVybj1cIlswLTldezYsMTR9XCIvPjxpIGNsYXNzPVwiZmEgZmEtbG9ja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmLXJpZ2h0XCIgbmFtZT1cIkxvZ2luXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTG9naW5cIiAvPmA7XHJcblxyXG4gICAgcmV0dXJuIGZvcm1Db250ZW50KGNvbnRlbnQsIHRoaXMuaGFuZGxlcik7XHJcblxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNYWluQ29tcG9uZW50IH0gZnJvbSAnLi9tYWluL21haW5Db21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2F1dGguY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgX2F1dGhDb21wb25lbnQgPSBuZXcgQXV0aENvbXBvbmVudCgpO1xyXG4gIHByaXZhdGUgX21haW5Db21wb25lbnQgPSBuZXcgTWFpbkNvbXBvbmVudCgpO1xyXG5cclxuICBwdWJsaWMgcmVuZGVyKCk6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aC1yb290JykuaW5uZXJIVE1MID0gdGhpcy5fYXV0aENvbXBvbmVudC50ZW1wbGF0ZSgpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tcm9vdCcpLmlubmVySFRNTCA9IHRoaXMuX21haW5Db21wb25lbnQudGVtcGxhdGUoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC9hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgR3Jvd2wgfSBmcm9tICcuL2xpYnJlcmlzL2dyb3dsJztcclxuXHJcbkdyb3dsLmluaXQoKTtcclxuXHJcbmNvbnN0IGFwcENvbXBvbmVudCA9IG5ldyBBcHBDb21wb25lbnQoKTtcclxuYXBwQ29tcG9uZW50LnJlbmRlcigpOyJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7OztJQWdCQSxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztJQUN6QyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEYsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFL0UsSUFBTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztBQUVELElBQU8sSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUU7SUFDNUQsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN6RCxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRixLQUFLO0lBQ0wsSUFBSSxPQUFPLENBQUMsQ0FBQztJQUNiLEVBQUM7QUFFRCxJQVVPLFNBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUMxRCxJQUFJLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqSSxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkksU0FBUyxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEosSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7dUJDL0NxRCxjQUFzQztRQUUxRjtZQUFxQkEsMkJBQWM7WUFFakM7Z0JBQUEsWUFFRSxpQkFBTyxTQVlSO2dCQVhDLEtBQUksQ0FBQyxRQUFRLEdBQUc7b0JBQUEsaUJBVWY7b0JBUkMsVUFBVSxDQUFDO3dCQUVULElBQUksT0FBTyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQ3pEOzRCQUNFLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzt5QkFDNUM7cUJBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDTixPQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckQsQ0FBQzs7YUFDSDtZQUNILGNBQUM7U0FBQSxDQWpCb0IsY0FBYyxHQWlCakM7SUFDSixDQUFDOztJQ3RCTTtRQUlMLHdCQUFZLEdBQVc7WUFFckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDaEI7UUFFTSxrQ0FBUyxHQUFoQixVQUFpQixLQUFRO1lBRXZCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBRU0sa0NBQVMsR0FBaEI7WUFFRSxJQUFNLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU1QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFFTSw4QkFBSyxHQUFaO1lBRUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkM7UUFFTSxpQ0FBUSxHQUFmO1lBRUUsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RCO1FBQ0gscUJBQUM7SUFBRCxDQUFDLElBQUE7O0lDdEJNO1FBSUwsd0JBQVksR0FBVztZQUVyQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFtQixHQUFHLENBQUMsQ0FBQztTQUNqRTtRQUVNLGdDQUFPLEdBQWQsVUFBZSxFQUFVO1lBRXZCLElBQU0sT0FBTyxHQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBQSxDQUFDLENBQUM7U0FDdkM7UUFFTSwrQkFBTSxHQUFiO1lBRUUsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzNELE9BQU8sa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUMxRDtRQUVNLGlDQUFRLEdBQWYsVUFBZ0IsS0FBVTtZQUV4QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRWhELElBQUksT0FBTyxLQUFLLElBQUksRUFDcEI7Z0JBQ0UsSUFBTSxVQUFVLEdBQXFCO29CQUNuQyxLQUFLLEVBQUUsQ0FBQztvQkFDUixJQUFJLEVBQUUsRUFBRTtpQkFDVCxDQUFDO2dCQUVGLEtBQW1CLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLO29CQUFuQixJQUFNLElBQUksY0FBQTtvQkFFYixJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7b0JBQzNCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMzQixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3BCO2dCQUNELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzNDO2lCQUVEO2dCQUNFLEtBQW1CLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLO29CQUFuQixJQUFNLElBQUksY0FBQTtvQkFFYixJQUFJLElBQUksQ0FBQyxFQUFFLE1BQU0sQUFBUSxTQUFTLENBQUMsRUFDbkM7d0JBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO3dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDeEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUNqQjtpQkFDRjtnQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QztTQUNGO1FBRU0sbUNBQVUsR0FBakIsVUFBa0IsRUFBVTtZQUUxQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25ELElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLFFBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUMsQ0FBQyxDQUFDO1lBQzVELFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVqQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMzQztRQUVNLDhCQUFLLEdBQVo7WUFFRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzdCO1FBQ0gscUJBQUM7SUFBRCxDQUFDLElBQUE7O0lDM0VEO1FBQUE7WUFFVSxZQUFPLEdBQUcsSUFBSSxjQUFjLENBQWMsT0FBTyxDQUFDLENBQUM7U0FzQzVEO1FBcENRLG1DQUFPLEdBQWQsVUFBZSxFQUFVO1lBRXZCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakM7UUFFTSxtQ0FBTyxHQUFkO1lBRUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlCO1FBRU0sK0JBQUcsR0FBVixVQUFXLElBQWlCO1lBRTFCLElBQU0sU0FBUyxHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3ZELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEM7UUFFTSxvQ0FBUSxHQUFmLFVBQWdCLEtBQW9CO1lBRWxDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsS0FBb0IsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUs7Z0JBQXBCLElBQU0sS0FBSyxjQUFBO2dCQUVkLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkI7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsQztRQUVNLHNDQUFVLEdBQWpCLFVBQWtCLEVBQVU7WUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDN0I7UUFFTSxpQ0FBSyxHQUFaO1lBRUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QjtRQUNILHdCQUFDO0lBQUQsQ0FBQyxJQUFBO0FBRUQsSUFBTyxJQUFNLFlBQVksR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7O3VCQ3hDMUIsR0FBVztRQUduQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7QUFFRCxJQUtBLElBQVksUUFPWDtJQVBELFdBQVksUUFBUTtRQUVsQiwrREFBbUQsQ0FBQTtRQUNuRCxrREFBc0MsQ0FBQTtRQUN0QyxpREFBcUMsQ0FBQTtRQUNyQyw2RUFBbUMsQ0FBQTtJQUVyQyxDQUFDLEVBUFcsUUFBUSxLQUFSLFFBQVEsUUFPbkI7QUFFRCxJQUFPLElBQU0sZUFBZSxHQUFHLDZCQUE2QixDQUFDOztJQ25CdEQ7UUFBQTtTQTZCTjtRQTNCUSw4Q0FBYSxHQUFwQixVQUFxQixFQUFVO1lBRTdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDekU7UUFFTSxnREFBZSxHQUF0QixVQUF1QixJQUFZO1lBRWpDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ2hEO1FBRU0sc0NBQUssR0FBWjtZQUVFLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsZUFBZSxDQUFDO1NBQzNEO1FBRU0seUNBQVEsR0FBZjtZQUVFLE9BQU8sa1FBSXNELGVBQWUsaUdBSTNFLENBQUM7U0FDSDtRQTVCVSxzQkFBc0I7WUFEbEMsU0FBUztXQUNHLHNCQUFzQixDQTZCbEM7UUFBRCw2QkFBQztLQUFBLElBQUE7O0lDNUJNO1FBRFA7WUFBQSxpQkFpR0M7WUE5RlMsMkJBQXNCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBeUN0RCx3QkFBbUIsR0FBRyxVQUFDLE1BQW1CO2dCQUVoRCxJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRTdDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO29CQUUzQixXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUVwQyxJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO3dCQUN6QyxJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBQ25CLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQzlDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDZixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7cUJBQ3hCLENBQUMsQ0FBQztpQkFDSixDQUFDLENBQUM7YUFDSixDQUFDO1lBRUssb0JBQWUsR0FBRztnQkFFdkIsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM3RCxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN4QyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxLQUFJLENBQUMsUUFBUSxHQUFBLENBQUMsQ0FBQztnQkFDekYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDakMsQ0FBQztZQUVLLHFCQUFnQixHQUFHLFVBQUMsTUFBbUI7Z0JBRTVDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakQsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFMUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7b0JBRXhCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7d0JBRWpDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7d0JBQ3RDLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN2QyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM1QixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUNyQyxDQUFDLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2FBQ0osQ0FBQztTQVVIO1FBMUZRLG9DQUFNLEdBQWI7WUFFQSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFFUSxpQ0FBRyxHQUFWLFVBQVcsS0FBa0I7WUFFM0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO1FBRU8scUNBQU8sR0FBZjtZQUFBLGlCQXNCQztZQXBCQyxJQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFYixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFFbEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN2QixHQUFHLElBQUksbUVBQzZDLEtBQUssQ0FBQyxFQUFFLCtGQUU1QyxLQUFLLENBQUMsRUFBRSxpQkFBWSxLQUFLLENBQUMsSUFBSSxnSkFJN0MsQ0FBQzthQUNILENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBRXZCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUErQ00sc0NBQVEsR0FBZjtZQUVFLE9BQU8sdUpBSUUsQ0FBQztTQUNYO1FBL0ZVLG1CQUFtQjtZQUQvQixTQUFTO1dBQ0csbUJBQW1CLENBZ0cvQjtRQUFELDBCQUFDO0tBQUEsSUFBQTs7eUJDdkcyQixPQUFlLEVBQUUsUUFBa0I7UUFFN0QsSUFBTSxFQUFFLEdBQVcsYUFBVyxJQUFJLENBQUMsTUFBTSxFQUFJLENBQUM7UUFFOUMsVUFBVSxDQUFDO1lBRVQsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQW9CLENBQUM7WUFFNUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQVk7Z0JBRTNDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFdkIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQ3hCO29CQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUN2QyxJQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZjtxQkFFRDtvQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDckM7YUFDRixDQUFDLENBQUM7U0FDSixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ04sT0FBTywwQ0FBcUMsRUFBRSxXQUFLLE9BQU8sWUFBUyxDQUFDO0lBQ3RFLENBQUM7QUFFRCx1QkFBMEIsSUFBbUM7UUFFM0QsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUMsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWYsS0FBb0IsVUFBUyxFQUFULHVCQUFTLEVBQVQsdUJBQVMsRUFBVCxJQUFTO1lBQXhCLElBQU0sS0FBSyxrQkFBQTtZQUVkLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQzNDO2dCQUNFLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUMvQztTQUNGO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOztJQ25DTTtRQURQO1lBQUEsaUJBK0RDO1lBNURTLGVBQVUsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7WUFDdkMsNEJBQXVCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBT3ZELGlCQUFZLEdBQUc7Z0JBRXJCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEQsQ0FBQztZQUVNLGlCQUFZLEdBQUcsVUFBQyxVQUFrQjtnQkFFeEMsSUFBTSxLQUFLLEdBQWdCO29CQUN6QixJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQztvQkFDdkIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUM7b0JBQ3hCLGNBQWMsRUFBRSxFQUFFO2lCQUNuQixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUU1QixLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCLENBQUM7U0FtQ0g7UUF6RFEsbUNBQU0sR0FBYjtZQUVFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwRjtRQXFCTyxzQ0FBUyxHQUFqQjtZQUVFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25ELFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ25EO1FBRU0scUNBQVEsR0FBZjtZQUVFLElBQU0sT0FBTyxHQUFHLHVQQUV5SCxRQUFRLENBQUMsUUFBUSw2Y0FRWCxRQUFRLENBQUMsSUFBSSxnakJBWTVJLENBQUM7WUFDakIsT0FBTyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRDtRQTdEVSxrQkFBa0I7WUFEOUIsU0FBUztXQUNHLGtCQUFrQixDQThEOUI7UUFBRCx5QkFBQztLQUFBLElBQUE7O0lDaEVNO1FBRFA7WUFHVSxrQkFBYSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUN6QywyQkFBc0IsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7WUFDdEQsZUFBVSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztTQW1CaEQ7UUFqQlEsZ0NBQU0sR0FBYjtZQUVFLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0UsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFGLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDL0U7UUFFTSxrQ0FBUSxHQUFmO1lBRUUsT0FBTywwU0FNTixDQUFDO1NBQ0g7UUF0QlUsZUFBZTtZQUQzQixTQUFTO1dBQ0csZUFBZSxDQXVCM0I7UUFBRCxzQkFBQztLQUFBLElBQUE7O0lDM0JEO1FBQUE7WUFFVSxZQUFPLEdBQUcsSUFBSSxjQUFjLENBQWMsTUFBTSxDQUFDLENBQUM7U0FzQzNEO1FBcENRLGtDQUFPLEdBQWQsVUFBZSxFQUFVO1lBRXZCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakM7UUFFTSxrQ0FBTyxHQUFkO1lBRUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlCO1FBRU0sOEJBQUcsR0FBVixVQUFXLElBQWlCO1lBRTFCLElBQU0sUUFBUSxHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7UUFFTSxtQ0FBUSxHQUFmLFVBQWdCLEtBQW9CO1lBRWxDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdkMsS0FBb0IsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUs7Z0JBQXBCLElBQU0sS0FBSyxjQUFBO2dCQUVkLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztRQUVNLHFDQUFVLEdBQWpCLFVBQWtCLEVBQVU7WUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDN0I7UUFFTSxnQ0FBSyxHQUFaO1lBRUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QjtRQUNILHVCQUFDO0lBQUQsQ0FBQyxJQUFBO0FBRUQsSUFBTyxJQUFNLFdBQVcsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7O0lDdkMzQztRQUFBO1NBMENOO1FBeENRLDRDQUFZLEdBQW5CLFVBQW9CLEVBQVU7WUFFNUIsSUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsR0FBRyxhQUFXLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFHLENBQUM7WUFDckYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7UUFFTSw4Q0FBYyxHQUFyQixVQUFzQixJQUFZO1lBRWhDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLFNBQVMsR0FBRywrR0FFOEIsSUFBSSxtRUFFakMsQ0FBQztTQUNyQjtRQUVNLHFDQUFLLEdBQVo7WUFFRSxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUM3QztRQUVNLHdDQUFRLEdBQWY7WUFFRSxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFdkMsT0FBTyxpTUFHNkQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUxBRzdDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLDBJQUt6RCxDQUFDO1NBQ1g7UUF6Q1UscUJBQXFCO1lBRGpDLFNBQVM7V0FDRyxxQkFBcUIsQ0EwQ2pDO1FBQUQsNEJBQUM7S0FBQSxJQUFBOztJQ3pDTTtRQURQO1lBQUEsaUJBaUdDO1lBOUZTLDJCQUFzQixHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztZQXlDckQsd0JBQW1CLEdBQUcsVUFBQyxLQUFrQjtnQkFFL0MsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RCxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUU3QyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVztvQkFFM0IsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTt3QkFFcEMsSUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQzt3QkFDekMsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3ZDLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO3dCQUNuQixLQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM3QyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3FCQUN4QixDQUFDLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2FBQ0osQ0FBQztZQUVLLG9CQUFlLEdBQUc7Z0JBRXZCLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDL0QsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDeEMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssS0FBSSxDQUFDLFFBQVEsR0FBQSxDQUFDLENBQUM7Z0JBQ3pGLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDLENBQUM7WUFFSyxxQkFBZ0IsR0FBRyxVQUFDLE9BQW9CO2dCQUU3QyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRTFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO29CQUV4QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUVqQyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO3dCQUN0QyxJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDM0IsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDckMsQ0FBQyxDQUFDO2lCQUNKLENBQUMsQ0FBQzthQUNKLENBQUM7U0FVSDtRQTFGUSxtQ0FBTSxHQUFiO1lBRUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO1FBRU0sZ0NBQUcsR0FBVixVQUFXLElBQWlCO1lBRTFCLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUVPLG9DQUFPLEdBQWY7WUFBQSxpQkFzQkM7WUFwQkMsSUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBRWIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBRWhCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDdEIsR0FBRyxJQUFJLGlFQUMyQyxJQUFJLENBQUMsRUFBRSw2RkFFekMsSUFBSSxDQUFDLEVBQUUsZ0JBQVcsSUFBSSxDQUFDLElBQUksdUpBSW5DLENBQUM7YUFDVixDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUV4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO1FBK0NNLHFDQUFRLEdBQWY7WUFFRSxPQUFPLDhJQUlFLENBQUM7U0FDWDtRQS9GVSxrQkFBa0I7WUFEOUIsU0FBUztXQUNHLGtCQUFrQixDQWdHOUI7UUFBRCx5QkFBQztLQUFBLElBQUE7O0lDOUZNO1FBRFA7WUFBQSxpQkErREM7WUE1RFEsY0FBUyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUNwQywwQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFPcEQsaUJBQVksR0FBRztnQkFFckIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0QsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqRCxDQUFDO1lBRU0saUJBQVksR0FBRyxVQUFDLFVBQWtCO2dCQUV4QyxJQUFNLEtBQUssR0FBZ0I7b0JBQ3pCLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDO29CQUN2QixJQUFJLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQztpQkFDekIsQ0FBQztnQkFFRixLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCLENBQUM7U0FxQ0g7UUF6RFEsa0NBQU0sR0FBYjtZQUVFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwRjtRQW1CTyxxQ0FBUyxHQUFqQjtZQUVFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25ELFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ25EO1FBRU0sb0NBQVEsR0FBZjtZQUVFLElBQU0sT0FBTyxHQUFHLHFRQUdzSCxRQUFRLENBQUMsT0FBTywyZUFRVixRQUFRLENBQUMsSUFBSSw0b0JBYXpJLENBQUM7WUFDakIsT0FBTyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRDtRQTdEVSxpQkFBaUI7WUFEN0IsU0FBUztXQUNHLGlCQUFpQixDQThEN0I7UUFBRCx3QkFBQztLQUFBLElBQUE7O0lDaEVNO1FBRFA7WUFHVSxrQkFBYSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUN4QywyQkFBc0IsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFDckQsd0JBQW1CLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1NBbUJ4RDtRQWpCUSwrQkFBTSxHQUFiO1lBRUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMvRSxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUYsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3hGO1FBRU0saUNBQVEsR0FBZjtZQUVFLE9BQU8saVJBTUMsQ0FBQztTQUNWO1FBdEJVLGNBQWM7WUFEMUIsU0FBUztXQUNHLGNBQWMsQ0F1QjFCO1FBQUQscUJBQUM7S0FBQSxJQUFBOztJQzNCRDtRQUFBO1lBRVUsWUFBTyxHQUFHLElBQUksY0FBYyxDQUFjLE9BQU8sQ0FBQyxDQUFDO1NBc0M1RDtRQXBDUSxtQ0FBTyxHQUFkLFVBQWUsRUFBVTtZQUV2QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO1FBRU0sbUNBQU8sR0FBZDtZQUVFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM5QjtRQUVNLCtCQUFHLEdBQVYsVUFBVyxJQUFpQjtZQUV4QixJQUFNLFNBQVMsR0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN2RCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BDO1FBRU0sb0NBQVEsR0FBZixVQUFnQixLQUFvQjtZQUVsQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hDLEtBQW9CLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLO2dCQUFwQixJQUFNLEtBQUssY0FBQTtnQkFFZCxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEM7UUFFTSxzQ0FBVSxHQUFqQixVQUFrQixFQUFVO1lBRTFCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdCO1FBRU0saUNBQUssR0FBWjtZQUVFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdEI7UUFDSCx3QkFBQztJQUFELENBQUMsSUFBQTtBQUVELElBQU8sSUFBTSxZQUFZLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDOztJQ3ZDN0M7UUFBQTtTQWtETjtRQWhEUSw2Q0FBYSxHQUFwQixVQUFxQixFQUFVO1lBRTdCLElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBVSxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBRyxDQUFDO1lBQ2hHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQVcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUcsQ0FBQztZQUNyRixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7UUFFTSwrQ0FBZSxHQUF0QixVQUF1QixJQUFZO1lBRWpDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEQsS0FBSyxDQUFDLFNBQVMsR0FBRyxzSUFFK0MsSUFBSSxpRUFFbEQsQ0FBQztTQUNyQjtRQUVNLHFDQUFLLEdBQVo7WUFFRSxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUM5QztRQUVNLHdDQUFRLEdBQWY7WUFFRSxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFekMsT0FBTyx3OUJBaUJFLENBQUM7U0FDWDtRQWpEVSxxQkFBcUI7WUFEakMsU0FBUztXQUNHLHFCQUFxQixDQWtEakM7UUFBRCw0QkFBQztLQUFBLElBQUE7O0lDaERNO1FBRFA7WUFBQSxpQkFpR0M7WUE5RlMsNEJBQXVCLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1lBeUN0RCx3QkFBbUIsR0FBRyxVQUFDLE9BQW9CO2dCQUVqRCxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRTdDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO29CQUUzQixXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUVwQyxJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO3dCQUN6QyxJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBQ25CLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQy9DLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDZixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7cUJBQ3hCLENBQUMsQ0FBQztpQkFDSixDQUFDLENBQUM7YUFDSixDQUFDO1lBRUssb0JBQWUsR0FBRztnQkFFdkIsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMvRCxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN4QyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxLQUFJLENBQUMsUUFBUSxHQUFBLENBQUMsQ0FBQztnQkFDekYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDakMsQ0FBQztZQUVLLHFCQUFnQixHQUFHLFVBQUMsT0FBb0I7Z0JBRTdDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFMUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7b0JBRXhCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7d0JBRWpDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7d0JBQ3RDLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN2QyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM1QixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUN0QyxDQUFDLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2FBQ0osQ0FBQztTQVVIO1FBMUZRLG1DQUFNLEdBQWI7WUFFRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFFTSxnQ0FBRyxHQUFWLFVBQVcsS0FBa0I7WUFFM0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO1FBRU8sb0NBQU8sR0FBZjtZQUFBLGlCQXNCQztZQXBCQyxJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckMsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFYixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFFakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN2QixHQUFHLElBQUksb0VBQzhDLEtBQUssQ0FBQyxFQUFFLDhGQUU5QyxLQUFLLENBQUMsRUFBRSxVQUFLLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQU0sS0FBSyxDQUFDLElBQUkseUpBSW5FLENBQUM7YUFDVixDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUV4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO1FBK0NNLHFDQUFRLEdBQWY7WUFFRSxPQUFPLDRJQUlDLENBQUM7U0FDVjtRQS9GVSxrQkFBa0I7WUFEOUIsU0FBUztXQUNHLGtCQUFrQixDQWdHOUI7UUFBRCx5QkFBQztLQUFBLElBQUE7O0lDL0ZNO1FBRFA7WUFBQSxpQkFpRkM7WUE5RVEsZUFBVSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUNyQywyQkFBc0IsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFPckQsaUJBQVksR0FBRztnQkFHckIsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEUsS0FBSSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4RCxDQUFDO1lBRU0saUJBQVksR0FBRyxVQUFDLEtBQVk7Z0JBRWxDLElBQU0sS0FBSyxHQUFnQjtvQkFDekIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUNuRCxTQUFTLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDOUQsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUNsRCxjQUFjLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7aUJBQy9ELENBQUM7Z0JBRUYsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQixDQUFDO1NBb0RIO1FBM0VRLGtDQUFNLEdBQWI7WUFFRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEY7UUFzQk8scUNBQVMsR0FBakI7WUFFRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuRCxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pELFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2xELFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3JEO1FBRU0sb0NBQVEsR0FBZjtZQUVFLElBQU0sT0FBTyxHQUFHLHdPQUV5RyxRQUFRLENBQUMsUUFBUSwwYkFRWCxRQUFRLENBQUMsUUFBUSx3YkFRbkIsUUFBUSxDQUFDLElBQUksOFdBTWhCLFFBQVEsQ0FBQyxJQUFJLGlqQkFZdkgsQ0FBQztZQUVqQixPQUFPLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2hEO1FBL0VVLGlCQUFpQjtZQUQ3QixTQUFTO1dBQ0csaUJBQWlCLENBZ0Y3QjtRQUFELHdCQUFDO0tBQUEsSUFBQTs7SUNsRk07UUFEUDtZQUdVLGtCQUFhLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1lBQ3hDLGVBQVUsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDdEMsMkJBQXNCLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1NBbUI5RDtRQWpCUSwrQkFBTSxHQUFiO1lBRUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMvRSxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlFLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMzRjtRQUVNLGlDQUFRLEdBQWY7WUFFRSxPQUFPLGlRQU1OLENBQUM7U0FDSDtRQXRCVSxjQUFjO1lBRDFCLFNBQVM7V0FDRyxjQUFjLENBdUIxQjtRQUFELHFCQUFDO0tBQUEsSUFBQTs7SUNyQk07UUFBQTtTQWdHTjtRQXZGZSxZQUFNLEdBQXBCLFVBQXFCLE9BQWUsRUFBRSxRQUFxQjtZQUFyQix5QkFBQSxFQUFBLGFBQXFCO1lBRXpELFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ25DO1FBRWEsYUFBTyxHQUFyQixVQUFzQixPQUFlLEVBQUUsUUFBcUI7WUFBckIseUJBQUEsRUFBQSxhQUFxQjtZQUUxRCxRQUFRLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUMzQixRQUFRLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUVhLFdBQUssR0FBbkIsVUFBb0IsT0FBZSxFQUFFLFFBQXFCO1lBQXJCLHlCQUFBLEVBQUEsYUFBcUI7WUFFeEQsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDekIsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFFYyxlQUFTLEdBQXhCLFVBQXlCLE9BQWUsRUFBRSxRQUFxQjtZQUFyQix5QkFBQSxFQUFBLGFBQXFCO1lBRTdELElBQU0sS0FBSyxnQkFBTyxJQUFJLENBQUMsWUFBWSxFQUFLLFFBQVEsQ0FBQyxDQUFDO1lBRWxELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO1FBRWEsVUFBSSxHQUFsQixVQUFtQixLQUFhLEVBQUUsT0FBZTtZQUUvQyxJQUFNLEVBQUUsR0FBVyxjQUFZLElBQUksQ0FBQyxNQUFNLEVBQUksQ0FBQztZQUUvQyxJQUFNLFNBQVMsR0FBRyxlQUFZLEVBQUUseUJBQWtCLEtBQUssQ0FBQyxLQUFLLFNBQUksS0FBSyxDQUFDLElBQUksNktBRTFCLEtBQUssQ0FBQyxLQUFLLHVFQUNULE9BQU8sa0VBRXZDLENBQUM7WUFFcEIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuRCxVQUFVLENBQUM7Z0JBRVQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzthQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRU4sTUFBTSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRCxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUV6RSxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekMsS0FBSyxFQUFFLENBQUM7WUFFUixJQUFJLE9BQWUsQ0FBQztZQUVwQjtnQkFFRSxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNEO1lBRUQ7Z0JBRUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzFDO1lBRUQ7Z0JBRUUsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFDeEM7b0JBQ0UsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztpQkFDakQ7Z0JBQ0QsVUFBVSxDQUFDO29CQUVULElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQ3hDO3dCQUNFLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ3RDO2lCQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDVjtTQUNGO1FBRWEsVUFBSSxHQUFsQjtZQUVFLElBQU0sR0FBRyxHQUFHLHlDQUFvQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsY0FBVSxDQUFDO1lBQ3JGLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO1FBN0ZjLGtCQUFZLEdBQVc7WUFDcEMsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDO1FBeUZKLFlBQUM7S0FBQSxJQUFBOztJQ2pHTTtRQURQO1lBR1UscUJBQWdCLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUN6QyxxQkFBZ0IsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3hDLG9CQUFlLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQWdCdkMsaUJBQVksR0FBRyxVQUFDLFNBQXFCO2dCQUUzQyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7YUFFckUsQ0FBQztTQWFIO1FBL0JRLDhCQUFNLEdBQWI7WUFBQSxpQkFZQztZQVZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDekMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFBLENBQUMsQ0FBQztZQUMxRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUEsQ0FBQyxDQUFDO1lBQzFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1lBRXpHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFbkI7UUFRTSxnQ0FBUSxHQUFmO1lBRUUsT0FBTyw4ZkFPMEMsQ0FBQztTQUNuRDtRQXBDVSxhQUFhO1lBRHpCLFNBQVM7V0FDRyxhQUFhLENBcUN6QjtRQUFELG9CQUFDO0tBQUEsSUFBQTs7SUMxQ007UUFBQTtZQUVHLFlBQU8sR0FBRztnQkFFaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN6QixDQUFDO1NBaUJIO1FBZlEsZ0NBQVEsR0FBZjtZQUVFLElBQU0sT0FBTyxHQUFHLGtrQkFRbUUsQ0FBQztZQUVwRixPQUFPLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBRTNDO1FBQ0gsb0JBQUM7SUFBRCxDQUFDLElBQUE7O0lDdEJNO1FBQUE7WUFFRyxtQkFBYyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDckMsbUJBQWMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1NBTzlDO1FBTFEsNkJBQU0sR0FBYjtZQUVFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEYsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqRjtRQUNILG1CQUFDO0lBQUQsQ0FBQyxJQUFBOztJQ1ZELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUViLElBQU0sWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDeEMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7OyJ9
