import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { register, type RegisterUserInput } from "../auth.service";
import { ApiError } from "../../../shared/ApiError";

type RegisterField = keyof RegisterUserInput;
type RegisterErrors = Partial<Record<RegisterField, string>>;

export default function RegisterPage() {
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [formError, setFormError] = useState("");

  function clearFieldError(event: ChangeEvent<HTMLInputElement>) {
    const field = event.target.name as RegisterField;

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setFormError("");
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError("");

    const formData = new FormData(event.target);

    const input: RegisterUserInput = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await register(input);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "VALIDATION_ERROR") {
          const fieldErrors: RegisterErrors = {};

          err.details?.forEach(({ field, message }) => {
            if (field in input) {
              fieldErrors[field as RegisterField] = message;
            }
          });

          setErrors(fieldErrors);
        }

        if (err.code === "INTERNAL_SERVER_ERROR") {
          setFormError(err.message);
        }

        if (err.code === "EMAIL_ALREADY_EXISTS") {
          setErrors((previous) => ({
            ...previous,
            email: err.message,
          }));
        }
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="mb-4">
                <h1 className="h3 mb-2">Create your account</h1>
                <p className="text-body-secondary mb-0">
                  Register to get started.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="form-control"
                      autoComplete="given-name"
                      aria-invalid={Boolean(errors.firstName)}
                      aria-describedby={
                        errors.firstName ? "firstNameError" : undefined
                      }
                      onChange={clearFieldError}
                      required
                    />
                    {errors.firstName && (
                      <div
                        className="invalid-feedback d-block"
                        id="firstNameError"
                      >
                        {errors.firstName}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="form-control"
                      autoComplete="family-name"
                      aria-invalid={Boolean(errors.lastName)}
                      aria-describedby={
                        errors.lastName ? "lastNameError" : undefined
                      }
                      onChange={clearFieldError}
                      required
                    />
                    {errors.lastName && (
                      <div
                        className="invalid-feedback d-block"
                        id="lastNameError"
                      >
                        {errors.lastName}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "emailError" : undefined}
                      onChange={clearFieldError}
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block" id="emailError">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      autoComplete="new-password"
                      minLength={8}
                      maxLength={72}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={
                        errors.password ? "passwordError" : undefined
                      }
                      onChange={clearFieldError}
                      required
                    />
                    {errors.password && (
                      <div
                        className="invalid-feedback d-block"
                        id="passwordError"
                      >
                        {errors.password}
                      </div>
                    )}
                    <div className="form-text">
                      Use between 8 and 72 characters.
                    </div>
                  </div>

                  <div className="col-12 pt-2">
                    {formError && (
                      <div className="alert alert-danger" role="alert">
                        {formError}
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                      Create account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
