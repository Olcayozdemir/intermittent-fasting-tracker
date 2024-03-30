export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserPayload {
  userId: number;
  status: boolean;
}

export interface UserState {
  user: UserPayload | null;
  loading: boolean;
  error: string | null;
}

export type UserAction =
  | { type: "REGISTER_REQUEST" }
  | { type: "REGISTER_SUCCESS"; payload: UserPayload }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "LOGOUT" };
