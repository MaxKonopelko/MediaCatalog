import { AppComponent } from './app/app.component';

const component = new AppComponent();
const buttons = document.getElementsByClassName('b1');

for (let i = 0; i < buttons.length; i++)
{
  buttons[i].addEventListener('click', () =>
  {
    component.init(i);
  });
}

//const appComponent = new AppComponent();
//appComponent.init();

// MusicService.clear();
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
//
// const adadd: IMusicModel = {
//   name: 'ffffffffffff',
// };
//
// const z = [mus, muss, musss];
// //const g = [mussss, musssss];
// MusicService.addArray(z);
// MusicService.add(adad);
// MusicService.addArray(g);
// MusicService.add(adadd);

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
