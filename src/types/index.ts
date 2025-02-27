import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface IErrorData {
  success: boolean;
  message?: string;
  statusCode?: number;
  stack?: string;
  err?: {
    statusCode?: number;
  };
}

export interface ModalData {
  text1: string;
  text2: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}

export type TError = {
  data: {
    success?: boolean;
    message?: string;
    stack?: string;
  };
  status?: number;
  message?: string;
};

export type TResponse<T> = {
  data: {
    data: T;
    meta: TMeta;
  };
  error?: TError;
  success?: boolean;
  message?: string;
};
export type TResponsee<T> = {
  data: {
    data: T;
  };
  error?: TError;
  success?: boolean;
  message?: string;
  meta?: TMeta;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TUser = {
  _id: string;
  id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isDeleted: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
};
