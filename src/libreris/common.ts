export function createCopy<T>(obj: T): T
{
  return JSON.parse(JSON.stringify(obj));
}

export function upperCase(str: string): string
{
  return str[0].toUpperCase() + str.slice(1);
}

export function isExistHtmlInDOM(element: HTMLElement): boolean
{
  return document.body.contains(element);
}

//TODO
export enum Patterns
{
  MusicUrl = 'https?:\\/\\/.*\\.(?:mp3|mp4)',
  ImageUrl = 'https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif)',
  Name = '[A-Za-zА-Яа-яЁё0-9]{1,15}',

}

export const urlDefaultImage = 'http://placehold.it/200x200';