export type Res<T = any> =
  | {
      isSuccess: false;
      data: {
        message: string;
      };
    }
  | {
      isSuccess: true;
      data: {
        message: string;
        result: T;
      };
    };
