import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import Alert from "./shared/Alert";
import { useNavigate } from "react-router-dom";
import Card from "./shared/Card";
import Button from "./shared/Button";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface FormData {
  name: string;
  email: string;
  password: string;
}

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0px;
`;

const FormSubTitle = styled.span`
  font-size: 17px;
  font-weight: 400;
  margin-bottom: 56px;
`;

const FormInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: calc(100% - 31px);
  padding: 0px 16px;
  margin-bottom: 20px;
  font-size: 14px;
  height: 60px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5); /* blue-300 */
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e; /* red-500 */
  font-size: 12px; /* xs */
  margin-top: 4px; /* 1 * 4 */
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    max-width: 345px;
    width: 100%;
  }
`;

export default function RegisterForm() {
  const {
    registerUser,
    state: { user, loading, error },
  } = useUser();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    registerUser(data);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (user || userId) {
      navigate("/timer");
    }
  }, [user, navigate]);

  return (
    <Card>
      <FormTitle>Create New Profile</FormTitle>
      <FormSubTitle>Start Your Fasting Journey</FormSubTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <FormInput id="name" placeholder="Name" {...field} />
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <FormInput
                id="email"
                type="email"
                placeholder="Email Address"
                {...field}
              />
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <FormInput
                id="password"
                type="password"
                placeholder="Password"
                {...field}
              />
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>
          )}
        />
        <Alert type="error" message={error ?? ""} isVisible={!!error} />
        <div className="flex items-center justify-between">
          <Button type="submit" disabled={loading} loading={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
