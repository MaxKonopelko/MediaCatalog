import { IFilmsModel, IImageModel, IMusicModel } from './models/models';
import { MusicService } from './services/music.service';
import { AppComponent } from './app/app.component';
import { ImageService } from './services/image.service';
import { FilmService } from './services/film.service';

// const component = new AppComponent();
// component.init(0);

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

MusicService.clear();

const x: IMusicModel[] = [
  {name: 'asd'},
  {name: 'fff'},
  {name: 'gggg'},
  {name: 'asd'},
];

const u: IImageModel[] = [
  {name: '7777'},
  {name: '8888'},
  {name: '99999'},
  {name: '33333'},
];

MusicService.addArray(x);
ImageService.addArray(u);

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
