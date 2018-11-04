import { IComponent } from '../app/types';

export function Component<TFunction extends Function>(oldConstructor: { new(): IComponent; }): any
{
  return class extends oldConstructor
  {
    constructor()
    {
      super();
      this.template = function (): any
      {
        setTimeout(() =>
        {
          if (typeof oldConstructor.prototype.onInit === 'function')
          {
            oldConstructor.prototype.onInit.call(this);
          }
        }, 1);
        return oldConstructor.prototype.template.call(this);
      };
    }
  };
}