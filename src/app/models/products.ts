export interface IProducts {
  id: number,
  model:string,
  desc:string
  year: number,
  subTitle: string,
  title: string,
  price:number,
  image?:string,
  configure:IProductsConfig;

}
export interface IProductsConfig{
  chip: string,
  ssd: string,
  memory: string,
  display:string
}
