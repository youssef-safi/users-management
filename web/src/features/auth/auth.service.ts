import { ApiError, type ApiErrorResponse } from "../../shared/ApiError";

export type RegisterUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export async function register(input: RegisterUserInput): Promise<User | void> {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (response.ok) {
    if (response.status !== 204) {
      return response.json();
    }
  } else {
    const responseError = (await response.json()) as ApiErrorResponse;

    throw new ApiError(
      responseError.code,
      responseError.message,
      responseError.details,
    );
  }
}
