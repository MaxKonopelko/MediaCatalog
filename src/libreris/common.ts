export function createCopy<T>(obj: T): T
{
  return JSON.parse(JSON.stringify(obj));
}

export function imageUrlIsValid(str: string): boolean
{
  const myRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  return myRegex.test(str);
}

export function musicUrlIsValid(str: string): boolean
{
  const myRegex = /(https?:\/\/.*\.(?:mp3|mp4))/i;
  return myRegex.test(str);
}

export function upperCase(str: string)
{
  return str[0].toUpperCase() + str.slice(1);
}

export function isExistHtmlInDOM(element: HTMLElement)
{
  return document.body.contains(element);
}