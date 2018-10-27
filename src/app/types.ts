export interface IComponent
{
  onInit?: () => void;
  template: () => string;
}