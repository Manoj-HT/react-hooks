export type InitialFormType = {
    [key: string]: [initialValue: any, ...Validator[]];
  };
export type FormControlType = {
    value: any;
    validators: Validator[];
    touched: boolean;
    error: boolean;
    name: string;
    valid: boolean
  };
export type FormControlObjectType = {
    [key: string]: FormControlType;
  };
export type ReturnTypeValidator = (...params: any) => (value: any) => boolean;
export type ReferenceTypeValidator = (value: any) => boolean;
export type Validator = ReturnTypeValidator | ReferenceTypeValidator;
  