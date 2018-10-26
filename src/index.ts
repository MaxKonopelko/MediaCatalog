import { ImageService } from './services/image.service';
import { AppComponent } from './app/app.component';

const component = new AppComponent();
component.init(0);

// const mus: IMusicModel = {
//   name: 'fsffff'
// };
//
// const muss: IMusicModel = {
//   name: 'ggggg',
// };
//
// const musss: IMusicModel = {
//   name: 'aaaaa',
// };
//
// const mussss: IMusicModel = {
//   name: 'kkkkkkkkkkk',
// };
//
// const musssss: IMusicModel = {
//   name: 'mmmmmmmmmmm',
// };
//
// const adad: IMusicModel = {
//   name: 'eweeeeeeee',
// };

//MusicService.clear();
ImageService.clear();

// const x: IMusicModel[] = [
//   {name: 'asd'},
//   {name: 'fff'},
//   {name: 'gggg'},
//   {name: 'asd'},
// ];
//
// const y: IMusicModel[] = [
//   {name: 'sss'},
//   {name: 'dddd'},
//   {name: 'ffff'},
//   {name: 'hhhhh'},
// ];
//
// const z: IMusicModel = {
//   name: 'zzzzzzzzzzz'
// };

//
// const u: IImageModel[] = [
//   {name: '7777'},
//   {name: '8888'},
//   {name: '99999'},
//   {name: '33333'},
// ];
//
// const i: IImageModel[] = [
//   {name: '999999'},
//   {name: '000000'},
//   {name: '0000999'},
//   {name: '3330890800033'},
// ];

//
// const image2: IImageModel = {
//   name: '22222222222222',
// };

// MusicService.addArray(y);
// MusicService.add(z);
// ImageService.addArray(i);

//ImageService.addArray(u);
// MusicService.clear();

//

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
//
// const submit = document.getElementById('form-image');
// submit.addEventListener('s', function (): void
// {
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

//

// const p: IMusicModel = {
//   name: '7887'
// };

// MusicService.addArray(x);
// ImageService.addArray(u);

// ImageService.add(p);
// MusicService.addArray(y);
// ImageService.addArray(i);

//
// const z = [mus, muss, musss];
// const g = [mussss, musssss];
// MusicService.addArray(z);
// MusicService.add(adad);
// MusicService.addArray(g);

// const image2: IImageModel = {
//   name: '22222222222222',
// };
//
// const image3: IImageModel = {
//   name: '33333333333333333',
// };

// const zaz = [image3, image2];

// ImageService.addArray(zaz);

// const image3: IFilmsModel = {
//   name: '77777777777777777777',
// };

//FilmService.add(image3);

//MusicService.add(mus);
//MusicService.add(muss);

//const t = MusicService.getAll();
//console.log('ffff', t);

//////      //////      //////      //////

// interface IModelTest
// {
//   id: number;
// }
//
// interface ITestResult
// {
//   id: number;
//   megaId: string;
// }

/////////////////

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
