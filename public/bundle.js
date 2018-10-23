(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
    'use strict';

    var BooksComponent = (function () {
        function BooksComponent() {
        }
        BooksComponent.prototype.init = function () {
            return " \n            <div class=\"photo-header\">Photo</div>\n            <div class=\"photo-data\"></div>\n    ";
        };
        return BooksComponent;
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
            this.booksComponent = new BooksComponent();
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

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYXBwL3ZpZXdzL2Jvb2tzLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvdmlld3MvbXVzaWNzLmNvbXBvbmVudC50cyIsIi4uL3NyYy9hcHAvdmlld3MvZmlsbXMuY29tcG9uZW50LnRzIiwiLi4vc3JjL2FwcC9hcHAuY29tcG9uZW50LnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCb29rc0NvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIGluaXQoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGAgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaG90by1oZWFkZXJcIj5QaG90bzwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGhvdG8tZGF0YVwiPjwvZGl2PlxyXG4gICAgYDtcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgTXVzaWNzQ29tcG9uZW50XHJcbntcclxuICBwdWJsaWMgaW5pdCgpOiBzdHJpbmdcclxuICB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtaGVhZGVyXCI+TmFtZSB0cmFjazwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtZGF0YVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stbGlzdFwiPjE8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stbGlzdFwiPjI8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stbGlzdFwiPjM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stbGlzdFwiPjQ8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stbGlzdFwiPjU8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stbGlzdFwiPjY8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stbGlzdFwiPjc8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWFnZXMvZ3VmLmpwZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdXNpYy1hdXRob3JcIj5OYW1lIDogR3VmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm11c2ljLW5hbWVcIj5UcmFjayBuYW1lIDogQXppbm83Nzc8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXVzaWMtcGxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YXVkaW8gY29udHJvbHM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHR5cGU9XCJhdWRpby9tcGVnXCIgc3JjPVwiaW1hZ2VzLzE0Mi5tcDNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hdWRpbz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gIH1cclxufSIsImV4cG9ydCBjbGFzcyBGaWxtc0NvbXBvbmVudFxyXG57XHJcbiAgcHVibGljIGluaXQoKTogc3RyaW5nXHJcbiAge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbS1oZWFkZXJcIj5GaWxtczwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxtLWRhdGFcIj48L2Rpdj5cclxuICAgIGA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEJvb2tzQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3cy9ib29rcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdXNpY3NDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdzL211c2ljcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGaWxtc0NvbXBvbmVudCB9IGZyb20gJy4vdmlld3MvZmlsbXMuY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnRcclxue1xyXG4gIHByaXZhdGUgYm9va3NDb21wb25lbnQgPSBuZXcgQm9va3NDb21wb25lbnQoKTtcclxuICBwcml2YXRlIG11c2ljc0NvbXBvbmVudCA9IG5ldyBNdXNpY3NDb21wb25lbnQoKTtcclxuICBwcml2YXRlIGZpbG1zQ29tcG9uZW50ID0gbmV3IEZpbG1zQ29tcG9uZW50KCk7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnRzID0gW3RoaXMuYm9va3NDb21wb25lbnQsIHRoaXMubXVzaWNzQ29tcG9uZW50LCB0aGlzLmZpbG1zQ29tcG9uZW50XTtcclxuXHJcbiAgcHVibGljIGluaXQoaW5kZXg6IG51bWJlcik6IHZvaWRcclxuICB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpLmlubmVySFRNTCA9IHRoaXMuY29tcG9uZW50c1tpbmRleF0uaW5pdCgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwL2FwcC5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgY29tcG9uZW50ID0gbmV3IEFwcENvbXBvbmVudCgpO1xyXG5jb25zdCBidXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYjEnKTtcclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7IGkrKylcclxue1xyXG4gIGJ1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxyXG4gIHtcclxuICAgIGNvbXBvbmVudC5pbml0KGkpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vL2NvbnN0IGFwcENvbXBvbmVudCA9IG5ldyBBcHBDb21wb25lbnQoKTtcclxuLy9hcHBDb21wb25lbnQuaW5pdCgpO1xyXG5cclxuLy8gTXVzaWNTZXJ2aWNlLmNsZWFyKCk7XHJcbi8vIGNvbnN0IG11czogSU11c2ljTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJ2ZzZmZmZidcclxuLy8gfTtcclxuLy9cclxuLy8gY29uc3QgbXVzczogSU11c2ljTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJ2dnZ2dnJyxcclxuLy8gfTtcclxuLy9cclxuLy8gY29uc3QgbXVzc3M6IElNdXNpY01vZGVsID0ge1xyXG4vLyAgIG5hbWU6ICdhYWFhYScsXHJcbi8vIH07XHJcbi8vXHJcbi8vIGNvbnN0IG11c3NzczogSU11c2ljTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJ2tra2tra2tra2trJyxcclxuLy8gfTtcclxuLy9cclxuLy8gY29uc3QgbXVzc3NzczogSU11c2ljTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJ21tbW1tbW1tbW1tJyxcclxuLy8gfTtcclxuLy9cclxuLy8gY29uc3QgYWRhZDogSU11c2ljTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJ2V3ZWVlZWVlZWUnLFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBhZGFkZDogSU11c2ljTW9kZWwgPSB7XHJcbi8vICAgbmFtZTogJ2ZmZmZmZmZmZmZmZicsXHJcbi8vIH07XHJcbi8vXHJcbi8vIGNvbnN0IHogPSBbbXVzLCBtdXNzLCBtdXNzc107XHJcbi8vIC8vY29uc3QgZyA9IFttdXNzc3MsIG11c3Nzc3NdO1xyXG4vLyBNdXNpY1NlcnZpY2UuYWRkQXJyYXkoeik7XHJcbi8vIE11c2ljU2VydmljZS5hZGQoYWRhZCk7XHJcbi8vIE11c2ljU2VydmljZS5hZGRBcnJheShnKTtcclxuLy8gTXVzaWNTZXJ2aWNlLmFkZChhZGFkZCk7XHJcblxyXG4vL011c2ljU2VydmljZS5hZGQobXVzKTtcclxuLy9NdXNpY1NlcnZpY2UuYWRkKG11c3MpO1xyXG5cclxuLy9jb25zdCB0ID0gTXVzaWNTZXJ2aWNlLmdldEFsbCgpO1xyXG4vL2NvbnNvbGUubG9nKCdmZmZmJywgdCk7XHJcblxyXG4vLy8vLy8gICAgICAvLy8vLy8gICAgICAvLy8vLy8gICAgICAvLy8vLy9cclxuXHJcbi8vIGludGVyZmFjZSBJTW9kZWxUZXN0XHJcbi8vIHtcclxuLy8gICBpZDogbnVtYmVyO1xyXG4vLyB9XHJcbi8vXHJcbi8vIGludGVyZmFjZSBJVGVzdFJlc3VsdFxyXG4vLyB7XHJcbi8vICAgaWQ6IG51bWJlcjtcclxuLy8gICBtZWdhSWQ6IHN0cmluZztcclxuLy8gfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vIGNsYXNzIEFcclxuLy8ge1xyXG4vLyAgIHB1YmxpYyB0ZXN0KG1vZGVsOiBJTW9kZWxUZXN0KTogdm9pZFxyXG4vLyAgIHtcclxuLy8gICAgIGNvbnN0IHAgPSBuZXcgUHJvc2xvaWthKCk7XHJcbi8vICAgICBwLnByb3MobW9kZWwpO1xyXG4vLyAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBjbGFzcyBQcm9zbG9pa2FcclxuLy8ge1xyXG4vLyAgIHB1YmxpYyBwcm9zKHByb3M6IElNb2RlbFRlc3QpOiB2b2lkXHJcbi8vICAge1xyXG4vLyAgICAgY29uc3QgYiA9IG5ldyBCKCk7XHJcbi8vICAgICBjb25zdCBjOiBJVGVzdFJlc3VsdCA9IHtcclxuLy8gICAgICAgaWQ6IHByb3MuaWQsXHJcbi8vICAgICAgIG1lZ2FJZDogJ2FzZGFzZCcgKyBwcm9zLmlkLFxyXG4vLyAgICAgfTtcclxuLy9cclxuLy8gICAgIGIudGVzdChjKTtcclxuLy8gICB9XHJcbi8vIH1cclxuLy9cclxuLy8gY2xhc3MgQlxyXG4vLyB7XHJcbi8vICAgcHVibGljIHRlc3QobW9kZWw6IElUZXN0UmVzdWx0KVxyXG4vLyAgIHtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnLCBtb2RlbCk7XHJcbi8vICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGNvbnN0IHg6IElNb2RlbFRlc3QgPSB7XHJcbi8vICAgaWQ6IDc3LFxyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBhID0gbmV3IEEoKTtcclxuLy8gYS50ZXN0KHgpO1xyXG4vL1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUFPO1FBQUE7U0FTTjtRQVBRLDZCQUFJLEdBQVg7WUFFRSxPQUFPLDRHQUdOLENBQUM7U0FDSDtRQUNILHFCQUFDO0lBQUQsQ0FBQyxJQUFBOztJQ1RNO1FBQUE7U0FnQ047UUE5QlEsOEJBQUksR0FBWDtZQUVFLE9BQU8scW9DQTBCTixDQUFDO1NBQ0g7UUFDSCxzQkFBQztJQUFELENBQUMsSUFBQTs7SUNoQ007UUFBQTtTQVNOO1FBUFEsNkJBQUksR0FBWDtZQUVFLE9BQU8saUdBR04sQ0FBQztTQUNIO1FBQ0gscUJBQUM7SUFBRCxDQUFDLElBQUE7O0lDTE07UUFBQTtZQUVHLG1CQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUN0QyxvQkFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDeEMsbUJBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3RDLGVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FNdkY7UUFKUSwyQkFBSSxHQUFYLFVBQVksS0FBYTtZQUV2QixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzlFO1FBQ0gsbUJBQUM7SUFBRCxDQUFDLElBQUE7O0lDYkQsSUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNyQyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBRTdDLENBQUM7UUFFUixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBRW5DLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQU5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFBOUIsQ0FBQztLQU1UOzs7OyJ9
