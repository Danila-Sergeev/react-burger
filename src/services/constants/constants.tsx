export interface IUserData {
  name: string;
  email: string;
  user: any;
  isAuthChecked: boolean;
  accessToken: string;
}
export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  user: any;
}
export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;

  map?: any;
  ingridient?: any;
  key?: any;
  index?: any;
}
export interface IOrderDetails {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string | number | Date;
  readonly updatedAt: string;
  readonly number: number;
  readonly order?: any;
}

export interface IOrderData {
  readonly order: {
    readonly _id: string;
    readonly ingredients: Array<string>;
    readonly status: string;
    readonly name: string;
    readonly createdAt: string | number | Date;
    readonly updatedAt: string;
  };
}
