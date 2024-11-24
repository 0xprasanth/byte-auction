export interface AxiosRepsonse {
  Message: string;
  status: number;
}

export interface UploadResponseType extends AxiosRepsonse {
  fileName: string;
}
