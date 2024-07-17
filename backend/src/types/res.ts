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
