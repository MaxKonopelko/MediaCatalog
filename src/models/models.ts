export interface IStorageModel
{
  index: number;
  musicList?: IMusicModel[];
}

export interface IMusicModel
{
  id?: number;
  link?: string;
  name?: string;
  authorFullName?: string;
}