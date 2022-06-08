export interface IMenuData {
  id: number;
  StoreId: number;
  menuName: string;
  explanation: string;
  price: number;
  menuImg?: string;
}

export interface IStoreData {
  id: number;
  PriceToOrder: number;
  orderTime: string;
  orderTip: string;
  menuImg: string;
  storeName: string;
}
