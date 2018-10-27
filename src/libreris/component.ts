import { IComponent } from '../app/types';

export function Component<TFunction extends Function>(target: TFunction): TFunction
{
  const newConstructor: Function = function (this: IComponent): void
  {
    this.template = function (): any
    {
      setTimeout(() => {
        if (typeof target.prototype.onInit === 'function')
        {
          target.prototype.onInit.call(this);
        }
      }, 1);

      return target.prototype.template.call(this);
    };
  };
  newConstructor.prototype = target.prototype;
  return <TFunction>  newConstructor;
}