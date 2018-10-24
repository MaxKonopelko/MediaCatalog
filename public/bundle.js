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
            localStorage.clear();
        };
        return BrowserStorage;
    }());

    var StorageService = (function () {
        function StorageService(key) {
            this.browserStorage = new BrowserStorage(this.key);
            this.key = key;
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
            return this.browserStorage.getObject();
        };
        StorageService.prototype.clear = function () {
            this.browserStorage.clear();
        };
        return StorageService;
    }());

    var MusicServiceClass = (function () {
        function MusicServiceClass() {
            this.storage = new StorageService('music');
        }
        MusicServiceClass.prototype.add = function (item) {
            var list = [];
            var musicList = this.storage.getObj();
            if (musicList !== null) {
                musicList.list.push(item);
            }
            list.push(item);
            this.storage.addArray(list);
        };
        MusicServiceClass.prototype.addArray = function (items) {
            var musicList = this.storage.getObj();
            if (musicList !== null) {
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var music = items_1[_i];
                    musicList.list.push(music);
                }
                this.storage.addArray(musicList.list);
            }
            else {
                var arrList = [];
                for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                    var music = items_2[_a];
                    arrList.push(music);
                }
                this.storage.addArray(arrList);
            }
        };
        MusicServiceClass.prototype.clear = function () {
            this.storage.clear();
        };
        return MusicServiceClass;
    }());
    var MusicService = new MusicServiceClass();

    var ImageServiceClass = (function () {
        function ImageServiceClass() {
            this.storage = new StorageService('image');
        }
        ImageServiceClass.prototype.add = function (item) {
            var list = [];
            var imageList = this.storage.getObj();
            if (imageList !== null) {
                imageList.list.push(item);
            }
            list.push(item);
            this.storage.addArray(list);
        };
        ImageServiceClass.prototype.addArray = function (items) {
            var imageList = this.storage.getObj();
            if (imageList !== null) {
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var image = items_1[_i];
                    imageList.list.push(image);
                }
                this.storage.addArray(imageList.list);
            }
            else {
                var arrList = [];
                for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                    var image = items_2[_a];
                    arrList.push(image);
                }
                this.storage.addArray(arrList);
            }
        };
        ImageServiceClass.prototype.clear = function () {
            this.storage.clear();
        };
        return ImageServiceClass;
    }());
    var ImageService = new ImageServiceClass();

    MusicService.clear();
    var x = [
        { name: 'asd' },
        { name: 'fff' },
        { name: 'gggg' },
        { name: 'asd' },
    ];
    var u = [
        { name: '7777' },
        { name: '8888' },
        { name: '99999' },
        { name: '33333' },
    ];
    MusicService.addArray(x);
    ImageService.addArray(u);

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbGlicmVyaXMvYnJvd3Nlci1zdG9yYWdlLnRzIiwiLi4vc3JjL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZS50cyIsIi4uL3NyYy9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlLnRzIiwiLi4vc3JjL3NlcnZpY2VzL2ltYWdlLnNlcnZpY2UudHMiLCIuLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJyb3dzZXJTdG9yYWdlPFQ+XHJcbntcclxuICBwdWJsaWMga2V5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKVxyXG4gIHtcclxuICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE9iamVjdCh2YWx1ZTogVCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBzdHIgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgc3RyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPYmplY3QoKTogVFxyXG4gIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSk7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSUVudGl0eSwgSVN0b3JhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBCcm93c2VyU3RvcmFnZSB9IGZyb20gJy4uL2xpYnJlcmlzL2Jyb3dzZXItc3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcmFnZVNlcnZpY2U8VCBleHRlbmRzIElFbnRpdHk+XHJcbntcclxuICBwcml2YXRlIHJlYWRvbmx5IGtleTogc3RyaW5nO1xyXG4gIHByaXZhdGUgYnJvd3NlclN0b3JhZ2UgPSBuZXcgQnJvd3NlclN0b3JhZ2U8SVN0b3JhZ2VNb2RlbDxUPj4odGhpcy5rZXkpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZylcclxuICB7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogVFtdKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG5cclxuICAgIGlmIChzdG9yYWdlID09PSBudWxsKVxyXG4gICAge1xyXG4gICAgICBjb25zdCBzdG9yYWdlT2JqOiBJU3RvcmFnZU1vZGVsPFQ+ID0ge1xyXG4gICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgIGxpc3Q6IFtdLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKVxyXG4gICAgICB7XHJcbiAgICAgICAgaXRlbS5pZCA9IHN0b3JhZ2VPYmouaW5kZXg7XHJcbiAgICAgICAgc3RvcmFnZU9iai5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgc3RvcmFnZU9iai5pbmRleCsrO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYnJvd3NlclN0b3JhZ2Uuc2V0T2JqZWN0KHN0b3JhZ2VPYmopO1xyXG4gICAgICBjb25zb2xlLmxvZyhzdG9yYWdlT2JqKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGlmIChpdGVtLmlkID09PSAobnVsbCB8fCB1bmRlZmluZWQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGl0ZW0uaWQgPSBzdG9yYWdlLmluZGV4O1xyXG4gICAgICAgICAgc3RvcmFnZS5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICBzdG9yYWdlLmluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYnJvd3NlclN0b3JhZ2Uuc2V0T2JqZWN0KHN0b3JhZ2UpO1xyXG4gICAgICBjb25zb2xlLmxvZyhzdG9yYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRPYmooKTogSVN0b3JhZ2VNb2RlbDxUPlxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLmJyb3dzZXJTdG9yYWdlLmdldE9iamVjdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmJyb3dzZXJTdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSU11c2ljTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5jbGFzcyBNdXNpY1NlcnZpY2VDbGFzc1xyXG57XHJcbiAgcHJpdmF0ZSBzdG9yYWdlID0gbmV3IFN0b3JhZ2VTZXJ2aWNlPElNdXNpY01vZGVsPignbXVzaWMnKTtcclxuXHJcbiAgcHVibGljIGFkZChpdGVtOiBJTXVzaWNNb2RlbCk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBsaXN0OiBJTXVzaWNNb2RlbFtdICA9IFtdO1xyXG4gICAgY29uc3QgbXVzaWNMaXN0ID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG5cclxuICAgIGlmIChtdXNpY0xpc3QgIT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIG11c2ljTGlzdC5saXN0LnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgICBsaXN0LnB1c2goaXRlbSk7XHJcbiAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkobGlzdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkQXJyYXkoaXRlbXM6IElNdXNpY01vZGVsW10pOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgbXVzaWNMaXN0ID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgaWYgKG11c2ljTGlzdCAhPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgZm9yIChjb25zdCBtdXNpYyBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIG11c2ljTGlzdC5saXN0LnB1c2gobXVzaWMpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5hZGRBcnJheShtdXNpY0xpc3QubGlzdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IGFyckxpc3Q6IElNdXNpY01vZGVsW10gPSBbXTtcclxuICAgICAgZm9yIChjb25zdCBtdXNpYyBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGFyckxpc3QucHVzaChtdXNpYyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGFyckxpc3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBNdXNpY1NlcnZpY2UgPSBuZXcgTXVzaWNTZXJ2aWNlQ2xhc3MoKTsiLCJpbXBvcnQgeyBJSW1hZ2VNb2RlbCwgSVN0b3JhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbmNsYXNzIEltYWdlU2VydmljZUNsYXNzXHJcbntcclxuICBwcml2YXRlIHN0b3JhZ2UgPSBuZXcgU3RvcmFnZVNlcnZpY2U8SUltYWdlTW9kZWw+KCdpbWFnZScpO1xyXG5cclxuICBwdWJsaWMgYWRkKGl0ZW06IElJbWFnZU1vZGVsKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGxpc3Q6IElJbWFnZU1vZGVsW10gID0gW107XHJcbiAgICBjb25zdCBpbWFnZUxpc3Q6IElTdG9yYWdlTW9kZWw8SUltYWdlTW9kZWw+ID0gdGhpcy5zdG9yYWdlLmdldE9iaigpO1xyXG4gICAgaWYgKGltYWdlTGlzdCAhPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgaW1hZ2VMaXN0Lmxpc3QucHVzaChpdGVtKTtcclxuICAgIH1cclxuICAgIGxpc3QucHVzaChpdGVtKTtcclxuICAgIHRoaXMuc3RvcmFnZS5hZGRBcnJheShsaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogSUltYWdlTW9kZWxbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBpbWFnZUxpc3QgPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICBpZiAoaW1hZ2VMaXN0ICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGl0ZW1zKVxyXG4gICAgICB7XHJcbiAgICAgICAgaW1hZ2VMaXN0Lmxpc3QucHVzaChpbWFnZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdG9yYWdlLmFkZEFycmF5KGltYWdlTGlzdC5saXN0KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgY29uc3QgYXJyTGlzdDogSUltYWdlTW9kZWxbXSA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGl0ZW1zKVxyXG4gICAgICB7XHJcbiAgICAgICAgYXJyTGlzdC5wdXNoKGltYWdlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0b3JhZ2UuYWRkQXJyYXkoYXJyTGlzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEltYWdlU2VydmljZSA9IG5ldyBJbWFnZVNlcnZpY2VDbGFzcygpOyIsImltcG9ydCB7IElGaWxtc01vZGVsLCBJSW1hZ2VNb2RlbCwgSU11c2ljTW9kZWwgfSBmcm9tICcuL21vZGVscy9tb2RlbHMnO1xyXG5pbXBvcnQgeyBNdXNpY1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL211c2ljLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC9hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsbVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbG0uc2VydmljZSc7XHJcblxyXG4vLyBjb25zdCBjb21wb25lbnQgPSBuZXcgQXBwQ29tcG9uZW50KCk7XHJcbi8vIGNvbXBvbmVudC5pbml0KDApO1xyXG5cclxuLy8gY29uc3QgbXVzOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAnZnNmZmZmJ1xyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBtdXNzOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAnZ2dnZ2cnLFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBtdXNzczogSU11c2ljTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJ2FhYWFhJyxcclxuLy8gfTtcclxuLy9cclxuLy8gY29uc3QgbXVzc3NzOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAna2tra2tra2tra2snLFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBtdXNzc3NzOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAnbW1tbW1tbW1tbW0nLFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBhZGFkOiBJTXVzaWNNb2RlbCA9IHtcclxuLy8gICBuYW1lOiAnZXdlZWVlZWVlZScsXHJcbi8vIH07XHJcblxyXG5NdXNpY1NlcnZpY2UuY2xlYXIoKTtcclxuXHJcbmNvbnN0IHg6IElNdXNpY01vZGVsW10gPSBbXHJcbiAge25hbWU6ICdhc2QnfSxcclxuICB7bmFtZTogJ2ZmZid9LFxyXG4gIHtuYW1lOiAnZ2dnZyd9LFxyXG4gIHtuYW1lOiAnYXNkJ30sXHJcbl07XHJcblxyXG5jb25zdCB1OiBJSW1hZ2VNb2RlbFtdID0gW1xyXG4gIHtuYW1lOiAnNzc3Nyd9LFxyXG4gIHtuYW1lOiAnODg4OCd9LFxyXG4gIHtuYW1lOiAnOTk5OTknfSxcclxuICB7bmFtZTogJzMzMzMzJ30sXHJcbl07XHJcblxyXG5NdXNpY1NlcnZpY2UuYWRkQXJyYXkoeCk7XHJcbkltYWdlU2VydmljZS5hZGRBcnJheSh1KTtcclxuXHJcbi8vXHJcbi8vIGNvbnN0IHogPSBbbXVzLCBtdXNzLCBtdXNzc107XHJcbi8vIGNvbnN0IGcgPSBbbXVzc3NzLCBtdXNzc3NzXTtcclxuLy8gTXVzaWNTZXJ2aWNlLmFkZEFycmF5KHopO1xyXG4vLyBNdXNpY1NlcnZpY2UuYWRkKGFkYWQpO1xyXG4vLyBNdXNpY1NlcnZpY2UuYWRkQXJyYXkoZyk7XHJcblxyXG4vLyBjb25zdCBpbWFnZTI6IElJbWFnZU1vZGVsID0ge1xyXG4vLyAgIG5hbWU6ICcyMjIyMjIyMjIyMjIyMicsXHJcbi8vIH07XHJcbi8vXHJcbi8vIGNvbnN0IGltYWdlMzogSUltYWdlTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJzMzMzMzMzMzMzMzMzMzMzMzJyxcclxuLy8gfTtcclxuXHJcbi8vIGNvbnN0IHpheiA9IFtpbWFnZTMsIGltYWdlMl07XHJcblxyXG4vLyBJbWFnZVNlcnZpY2UuYWRkQXJyYXkoemF6KTtcclxuXHJcbi8vIGNvbnN0IGltYWdlMzogSUZpbG1zTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3JyxcclxuLy8gfTtcclxuXHJcbi8vRmlsbVNlcnZpY2UuYWRkKGltYWdlMyk7XHJcblxyXG4vL011c2ljU2VydmljZS5hZGQobXVzKTtcclxuLy9NdXNpY1NlcnZpY2UuYWRkKG11c3MpO1xyXG5cclxuLy9jb25zdCB0ID0gTXVzaWNTZXJ2aWNlLmdldEFsbCgpO1xyXG4vL2NvbnNvbGUubG9nKCdmZmZmJywgdCk7XHJcblxyXG4vLy8vLy8gICAgICAvLy8vLy8gICAgICAvLy8vLy8gICAgICAvLy8vLy9cclxuXHJcbi8vIGludGVyZmFjZSBJTW9kZWxUZXN0XHJcbi8vIHtcclxuLy8gICBpZDogbnVtYmVyO1xyXG4vLyB9XHJcbi8vXHJcbi8vIGludGVyZmFjZSBJVGVzdFJlc3VsdFxyXG4vLyB7XHJcbi8vICAgaWQ6IG51bWJlcjtcclxuLy8gICBtZWdhSWQ6IHN0cmluZztcclxuLy8gfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vIGNsYXNzIEFcclxuLy8ge1xyXG4vLyAgIHB1YmxpYyB0ZXN0KG1vZGVsOiBJTW9kZWxUZXN0KTogdm9pZFxyXG4vLyAgIHtcclxuLy8gICAgIGNvbnN0IHAgPSBuZXcgUHJvc2xvaWthKCk7XHJcbi8vICAgICBwLnByb3MobW9kZWwpO1xyXG4vLyAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBjbGFzcyBQcm9zbG9pa2FcclxuLy8ge1xyXG4vLyAgIHB1YmxpYyBwcm9zKHByb3M6IElNb2RlbFRlc3QpOiB2b2lkXHJcbi8vICAge1xyXG4vLyAgICAgY29uc3QgYiA9IG5ldyBCKCk7XHJcbi8vICAgICBjb25zdCBjOiBJVGVzdFJlc3VsdCA9IHtcclxuLy8gICAgICAgaWQ6IHByb3MuaWQsXHJcbi8vICAgICAgIG1lZ2FJZDogJ2FzZGFzZCcgKyBwcm9zLmlkLFxyXG4vLyAgICAgfTtcclxuLy9cclxuLy8gICAgIGIudGVzdChjKTtcclxuLy8gICB9XHJcbi8vIH1cclxuLy9cclxuLy8gY2xhc3MgQlxyXG4vLyB7XHJcbi8vICAgcHVibGljIHRlc3QobW9kZWw6IElUZXN0UmVzdWx0KVxyXG4vLyAgIHtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnLCBtb2RlbCk7XHJcbi8vICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGNvbnN0IHg6IElNb2RlbFRlc3QgPSB7XHJcbi8vICAgaWQ6IDc3LFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBhID0gbmV3IEEoKTtcclxuLy8gYS50ZXN0KHgpO1xyXG4vL1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUFPO1FBSUwsd0JBQVksR0FBVztZQUVyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNoQjtRQUVNLGtDQUFTLEdBQWhCLFVBQWlCLEtBQVE7WUFFdkIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDckM7UUFFTSxrQ0FBUyxHQUFoQjtZQUVFLElBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUVNLDhCQUFLLEdBQVo7WUFFRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdEI7UUFDSCxxQkFBQztJQUFELENBQUMsSUFBQTs7SUN0Qk07UUFLTCx3QkFBWSxHQUFXO1lBRmYsbUJBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBbUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBSXRFLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2hCO1FBRU0saUNBQVEsR0FBZixVQUFnQixLQUFVO1lBRXhCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFaEQsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUNwQjtnQkFDRSxJQUFNLFVBQVUsR0FBcUI7b0JBQ25DLEtBQUssRUFBRSxDQUFDO29CQUNSLElBQUksRUFBRSxFQUFFO2lCQUNULENBQUM7Z0JBRUYsS0FBbUIsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUs7b0JBQW5CLElBQU0sSUFBSSxjQUFBO29CQUVi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
