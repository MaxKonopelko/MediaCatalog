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
        function StorageService() {
            this.browserStorage = new BrowserStorage('music');
        }
        StorageService.prototype.addMusic = function (items) {
            var musicStorage = this.browserStorage.getObject();
            if (musicStorage === null) {
                var storageObj = {
                    index: 0,
                    musicList: [],
                };
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var music = items_1[_i];
                    music.id = storageObj.index;
                    storageObj.musicList.push(music);
                    storageObj.index++;
                }
                this.browserStorage.setObject(storageObj);
                console.log(storageObj);
            }
            else {
                for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                    var music = items_2[_a];
                    if (music.id === (undefined)) {
                        music.id = musicStorage.index;
                        musicStorage.musicList.push(music);
                        musicStorage.index++;
                    }
                }
                this.browserStorage.setObject(musicStorage);
                console.log(musicStorage);
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
            this.storage = new StorageService();
        }
        MusicServiceClass.prototype.add = function (item) {
            var musicList = this.storage.getObj();
            musicList.musicList.push(item);
            this.storage.addMusic(musicList.musicList);
        };
        MusicServiceClass.prototype.addArray = function (items) {
            var musicList = this.storage.getObj();
            if (musicList !== null) {
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var music = items_1[_i];
                    musicList.musicList.push(music);
                }
                this.storage.addMusic(musicList.musicList);
            }
            else {
                var arrList = [];
                for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                    var music = items_2[_a];
                    arrList.push(music);
                }
                this.storage.addMusic(arrList);
            }
        };
        MusicServiceClass.prototype.clear = function () {
            this.storage.clear();
        };
        return MusicServiceClass;
    }());
    var MusicService = new MusicServiceClass();

    MusicService.clear();
    var mus = {
        name: 'fsffff'
    };
    var muss = {
        name: 'ggggg',
    };
    var musss = {
        name: 'aaaaa',
    };
    var mussss = {
        name: 'kkkkkkkkkkk',
    };
    var musssss = {
        name: 'mmmmmmmmmmm',
    };
    var adad = {
        name: 'eweeeeeeee',
    };
    var adadd = {
        name: 'ffffffffffff',
    };
    var z = [mus, muss, musss];
    var g = [mussss, musssss];
    MusicService.addArray(z);
    MusicService.add(adad);
    MusicService.addArray(g);
    MusicService.add(adadd);

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbGlicmVyaXMvYnJvd3Nlci1zdG9yYWdlLnRzIiwiLi4vc3JjL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZS50cyIsIi4uL3NyYy9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCcm93c2VyU3RvcmFnZTxUPlxyXG57XHJcbiAgcHVibGljIGtleTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZylcclxuICB7XHJcbiAgICB0aGlzLmtleSA9IGtleTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRPYmplY3QodmFsdWU6IFQpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5rZXksIHN0cik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0T2JqZWN0KCk6IFRcclxuICB7XHJcbiAgICBjb25zdCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogdm9pZFxyXG4gIHtcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElNdXNpY01vZGVsLCBJU3RvcmFnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IEJyb3dzZXJTdG9yYWdlIH0gZnJvbSAnLi4vbGlicmVyaXMvYnJvd3Nlci1zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZVxyXG57XHJcbiAgcHJpdmF0ZSBicm93c2VyU3RvcmFnZSA9IG5ldyBCcm93c2VyU3RvcmFnZTxJU3RvcmFnZU1vZGVsPignbXVzaWMnKTtcclxuXHJcbiAgcHVibGljIGFkZE11c2ljKGl0ZW1zOiBJTXVzaWNNb2RlbFtdKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IG11c2ljU3RvcmFnZSA9IHRoaXMuYnJvd3NlclN0b3JhZ2UuZ2V0T2JqZWN0KCk7XHJcblxyXG4gICAgaWYgKG11c2ljU3RvcmFnZSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgY29uc3Qgc3RvcmFnZU9iajogSVN0b3JhZ2VNb2RlbCA9IHtcclxuICAgICAgICBpbmRleDogMCxcclxuICAgICAgICBtdXNpY0xpc3Q6IFtdLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBtdXNpYyBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIG11c2ljLmlkID0gc3RvcmFnZU9iai5pbmRleDtcclxuICAgICAgICBzdG9yYWdlT2JqLm11c2ljTGlzdC5wdXNoKG11c2ljKTtcclxuICAgICAgICBzdG9yYWdlT2JqLmluZGV4Kys7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5icm93c2VyU3RvcmFnZS5zZXRPYmplY3Qoc3RvcmFnZU9iaik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN0b3JhZ2VPYmopO1xyXG5cclxuICAgIH1cclxuICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGZvciAoY29uc3QgbXVzaWMgb2YgaXRlbXMpXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAobXVzaWMuaWQgPT09IChudWxsIHx8IHVuZGVmaW5lZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbXVzaWMuaWQgPSBtdXNpY1N0b3JhZ2UuaW5kZXg7XHJcbiAgICAgICAgICBtdXNpY1N0b3JhZ2UubXVzaWNMaXN0LnB1c2gobXVzaWMpO1xyXG4gICAgICAgICAgbXVzaWNTdG9yYWdlLmluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYnJvd3NlclN0b3JhZ2Uuc2V0T2JqZWN0KG11c2ljU3RvcmFnZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKG11c2ljU3RvcmFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0T2JqKCk6IElTdG9yYWdlTW9kZWxcclxuICB7XHJcbiAgICByZXR1cm4gdGhpcy5icm93c2VyU3RvcmFnZS5nZXRPYmplY3QoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5icm93c2VyU3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IElNdXNpY01vZGVsLCBJU3RvcmFnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgTXVzaWNTZXJ2aWNlQ2xhc3Ncclxue1xyXG4gIHByaXZhdGUgc3RvcmFnZSA9IG5ldyBTdG9yYWdlU2VydmljZSgpO1xyXG5cclxuICBwdWJsaWMgYWRkKGl0ZW06IElNdXNpY01vZGVsKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IG11c2ljTGlzdDogSVN0b3JhZ2VNb2RlbCA9IHRoaXMuc3RvcmFnZS5nZXRPYmooKTtcclxuICAgIG11c2ljTGlzdC5tdXNpY0xpc3QucHVzaChpdGVtKTtcclxuICAgIHRoaXMuc3RvcmFnZS5hZGRNdXNpYyhtdXNpY0xpc3QubXVzaWNMaXN0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBcnJheShpdGVtczogSU11c2ljTW9kZWxbXSk6IHZvaWRcclxuICB7XHJcbiAgICBjb25zdCBtdXNpY0xpc3QgPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqKCk7XHJcbiAgICBpZiAobXVzaWNMaXN0ICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICBmb3IgKGNvbnN0IG11c2ljIG9mIGl0ZW1zKVxyXG4gICAgICB7XHJcbiAgICAgICAgbXVzaWNMaXN0Lm11c2ljTGlzdC5wdXNoKG11c2ljKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0b3JhZ2UuYWRkTXVzaWMobXVzaWNMaXN0Lm11c2ljTGlzdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IGFyckxpc3Q6IElNdXNpY01vZGVsW10gPSBbXTtcclxuICAgICAgZm9yIChjb25zdCBtdXNpYyBvZiBpdGVtcylcclxuICAgICAge1xyXG4gICAgICAgIGFyckxpc3QucHVzaChtdXNpYyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdG9yYWdlLmFkZE11c2ljKGFyckxpc3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcHVibGljIGdldEFsbCgpOiBvYmplY3RcclxuICAvLyB7XHJcbiAgLy8gICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldE9iajtcclxuICAvLyB9XHJcblxyXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTXVzaWNTZXJ2aWNlID0gbmV3IE11c2ljU2VydmljZUNsYXNzKCk7XHJcbiIsImltcG9ydCB7IElNdXNpY01vZGVsIH0gZnJvbSAnLi9tb2RlbHMvbW9kZWxzJztcclxuaW1wb3J0IHsgTXVzaWNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9tdXNpYy5zZXJ2aWNlJztcclxuXHJcbk11c2ljU2VydmljZS5jbGVhcigpO1xyXG5jb25zdCBtdXM6IElNdXNpY01vZGVsID0ge1xyXG4gIG5hbWU6ICdmc2ZmZmYnXHJcbn07XHJcblxyXG5jb25zdCBtdXNzOiBJTXVzaWNNb2RlbCA9IHtcclxuICBuYW1lOiAnZ2dnZ2cnLFxyXG59O1xyXG5cclxuY29uc3QgbXVzc3M6IElNdXNpY01vZGVsID0ge1xyXG4gIG5hbWU6ICdhYWFhYScsXHJcbn07XHJcblxyXG5jb25zdCBtdXNzc3M6IElNdXNpY01vZGVsID0ge1xyXG4gIG5hbWU6ICdra2tra2tra2traycsXHJcbn07XHJcblxyXG5jb25zdCBtdXNzc3NzOiBJTXVzaWNNb2RlbCA9IHtcclxuICBuYW1lOiAnbW1tbW1tbW1tbW0nLFxyXG59O1xyXG5cclxuY29uc3QgYWRhZDogSU11c2ljTW9kZWwgPSB7XHJcbiAgbmFtZTogJ2V3ZWVlZWVlZWUnLFxyXG59O1xyXG5cclxuY29uc3QgYWRhZGQ6IElNdXNpY01vZGVsID0ge1xyXG4gIG5hbWU6ICdmZmZmZmZmZmZmZmYnLFxyXG59O1xyXG5cclxuY29uc3QgeiA9IFttdXMsIG11c3MsIG11c3NzXTtcclxuY29uc3QgZyA9IFttdXNzc3MsIG11c3Nzc3NdO1xyXG5NdXNpY1NlcnZpY2UuYWRkQXJyYXkoeik7XHJcbk11c2ljU2VydmljZS5hZGQoYWRhZCk7XHJcbk11c2ljU2VydmljZS5hZGRBcnJheShnKTtcclxuTXVzaWNTZXJ2aWNlLmFkZChhZGFkZCk7XHJcblxyXG4vL011c2ljU2VydmljZS5hZGQobXVzKTtcclxuLy9NdXNpY1NlcnZpY2UuYWRkKG11c3MpO1xyXG5cclxuLy9jb25zdCB0ID0gTXVzaWNTZXJ2aWNlLmdldEFsbCgpO1xyXG4vL2NvbnNvbGUubG9nKCdmZmZmJywgdCk7XHJcblxyXG4vLy8vLy8gICAgICAvLy8vLy8gICAgICAvLy8vLy8gICAgICAvLy8vLy9cclxuXHJcbi8vIGludGVyZmFjZSBJTW9kZWxUZXN0XHJcbi8vIHtcclxuLy8gICBpZDogbnVtYmVyO1xyXG4vLyB9XHJcbi8vXHJcbi8vIGludGVyZmFjZSBJVGVzdFJlc3VsdFxyXG4vLyB7XHJcbi8vICAgaWQ6IG51bWJlcjtcclxuLy8gICBtZWdhSWQ6IHN0cmluZztcclxuLy8gfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vIGNsYXNzIEFcclxuLy8ge1xyXG4vLyAgIHB1YmxpYyB0ZXN0KG1vZGVsOiBJTW9kZWxUZXN0KTogdm9pZFxyXG4vLyAgIHtcclxuLy8gICAgIGNvbnN0IHAgPSBuZXcgUHJvc2xvaWthKCk7XHJcbi8vICAgICBwLnByb3MobW9kZWwpO1xyXG4vLyAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBjbGFzcyBQcm9zbG9pa2FcclxuLy8ge1xyXG4vLyAgIHB1YmxpYyBwcm9zKHByb3M6IElNb2RlbFRlc3QpOiB2b2lkXHJcbi8vICAge1xyXG4vLyAgICAgY29uc3QgYiA9IG5ldyBCKCk7XHJcbi8vICAgICBjb25zdCBjOiBJVGVzdFJlc3VsdCA9IHtcclxuLy8gICAgICAgaWQ6IHByb3MuaWQsXHJcbi8vICAgICAgIG1lZ2FJZDogJ2FzZGFzZCcgKyBwcm9zLmlkLFxyXG4vLyAgICAgfTtcclxuLy9cclxuLy8gICAgIGIudGVzdChjKTtcclxuLy8gICB9XHJcbi8vIH1cclxuLy9cclxuLy8gY2xhc3MgQlxyXG4vLyB7XHJcbi8vICAgcHVibGljIHRlc3QobW9kZWw6IElUZXN0UmVzdWx0KVxyXG4vLyAgIHtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnLCBtb2RlbCk7XHJcbi8vICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGNvbnN0IHg6IElNb2RlbFRlc3QgPSB7XHJcbi8vICAgaWQ6IDc3LFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBhID0gbmV3IEEoKTtcclxuLy8gYS50ZXN0KHgpO1xyXG4vL1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUFPO1FBSUwsd0JBQVksR0FBVztZQUVyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNoQjtRQUVNLGtDQUFTLEdBQWhCLFVBQWlCLEtBQVE7WUFFdkIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDckM7UUFFTSxrQ0FBUyxHQUFoQjtZQUVFLElBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJ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
