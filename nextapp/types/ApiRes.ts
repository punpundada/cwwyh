export interface ApiRes<T>{
    isSuccess:boolean,
    data:T,
}

export type GenericResponse<T> =
  | {
      isSuccess: true;
      result: T;
      message: string;
    }
  | {
      isSuccess: false;
      issues: any[];
      message: string;
    };