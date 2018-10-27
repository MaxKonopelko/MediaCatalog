import { ImageService } from './services/image.service';
import { AppComponent } from './app/app.component';

const component = new AppComponent();
component.render(0);

ImageService.clear();

// const urlPhoto = document.getElementById('url-photo');
// const photos = document.getElementById('photos');
// let x = 0;
//
// urlPhoto.addEventListener('change', function (): void
// {
//   //Add Url in box "photo-size"
//   document.getElementById('image')['src'] = document.getElementById('url-photo')['value'];
//
// });

// const submit = document.getElementById('form-image');
// submit.addEventListener('submit',  (event: Event) =>
// {
//   event.preventDefault();
//   //Create <li> and add in "photos"
//   const newLi = document.createElement('li');
//   newLi.className = 'photo-li';
//   newLi.innerHTML = '<strong>Download!</strong> Фото ' + (++x);
//   console.log(newLi);
//   photos.appendChild(newLi);
//
//   const y = document.getElementById('url-photo')['value']
//   const x = {
//     link : '',
//     name: '',
//     authorFullName: '',
//     top: '',
//   };
//   x.link = document.getElementById('url-photo')['value'];
//   ImageService.add(x);
// });

//const t = MusicService.getAll();
//console.log('ffff', t);

//////      //////      //////      //////

// class A
// {
//   public test(model: IModelTest): void
//   {
//     const p = new Prosloika();
//     p.pros(model);
//   }
// }
//
// class Prosloika
// {
//   public pros(pros: IModelTest): void
//   {
//     const b = new B();
//     const c: ITestResult = {
//       id: pros.id,
//       megaId: 'asdasd' + pros.id,
//     };
//
//     b.test(c);
//   }
// }
//
// class B
// {
//   public test(model: ITestResult)
//   {
//     console.log('result', model);
//   }
// }
//
// const x: IModelTest = {
//   id: 77,
// };
//
// const a = new A();
// a.test(x);
//
