export interface FieldError {
  field: string;
  message: string;
}

export class AppError extends Error {
  constructor(
    public readonly errorCode: string,
    message: string,
    public readonly statusCode: number,
    public readonly details?: FieldError[],
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: FieldError[]) {
    super("RESOURCE_NOT_FOUND", message, 404, details);
  }
}

export class BadRequestError extends AppError {
  constructor(errorCode: string, message: string, details?: FieldError[]) {
    super(errorCode, message, 400, details);
  }
}

export class ConflictError extends AppError {
  constructor(errorCode: string, message: string, details?: FieldError[]) {
    super(errorCode, message, 409, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "UNAUTHORIZED", details?: FieldError[]) {
    super("UNAUTHORIZED", message, 401, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "FORBIDDEN", details?: FieldError[]) {
    super("FORBIDDEN", message, 403, details);
  }
}
