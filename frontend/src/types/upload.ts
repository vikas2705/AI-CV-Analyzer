export interface UploadRequest {
  cv: File;
  jd: File;
}

export interface UploadResponse {
  result: {
    result: string;
  };
}

export interface UploadError {
  message: string;
  status?: number;
}
