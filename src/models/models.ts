export interface IEntity
{
  id?: number;
}

export interface IImageModel extends IEntity
{
  link?: string;
  name?: string;
  authorFullName?: string;
}

export interface IMusicModel extends IEntity
{
  link?: string;
  name?: string;
  authorFullName?: string;
}

export interface IFilmsModel extends IEntity
{
  link?: string;
  name?: string;
  authorFullName?: string;
}
