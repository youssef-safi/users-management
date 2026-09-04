export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: ErrorDetail[];
}

export interface ErrorDetail {
  field: string;
  message: string;
}

export class ApiError extends Error {
  code: string;
  details?: ErrorDetail[];

  constructor(code: string, message: string, details?: ErrorDetail[]) {
    super(message);
    this.code = code;
    this.details = details;
  }
}
