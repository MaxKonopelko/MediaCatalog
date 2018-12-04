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

export enum Patterns
{
  ImageUrl = 'https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif)',
  MusicUrl = 'https?:\\/\\/.*\\.(?:mp3)',
  FilmUrl = 'https?:\\/\\/.*\\.(?:mp4)',
  Name = '[A-Za-zА-Яа-яЁё0-9]{1,15}',

}

export const urlDefaultImage = 'http://placehold.it/200x200';