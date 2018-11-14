export function createCopy<T>(obj: T): T
{
  return JSON.parse(JSON.stringify(obj));
}

export function imageUrlIsValid(str: string): boolean
{
  const myRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  return myRegex.test(str);
}

export function isExistHtmlInDOM(element: HTMLElement)
{
  return document.body.contains(element);
}