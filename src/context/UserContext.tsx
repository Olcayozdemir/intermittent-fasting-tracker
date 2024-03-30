import React, { createContext, useReducer, ReactNode, useMemo } from "react";
import { UserState, UserAction, User } from "../types/userTypes";

const getInitialState = (): UserState => {
  const userId = localStorage.getItem("userId");

  return {
    user: userId ? { userId: parseInt(userId, 10), status: true } : null,
    loading: false,
    error: null,
  };
};

const initialState: UserState = getInitialState();

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true };
    case "REGISTER_SUCCESS":
      const { userId, status } = action.payload;
      localStorage.setItem("user", userId + "");
      return { ...state, loading: false, user: { userId, status } };
    case "REGISTER_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      localStorage.removeItem("userId");
      return { ...state, user: null };
    default:
      return state;
  }
};

interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  registerUser: (userData: Omit<User, "id">) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  state: initialState,
  dispatch: () => undefined,
  registerUser: async () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const registerUser = async (userData: Omit<User, "id">) => {
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      const response = await fetch(
        "https://fe-challange-24.me-f72.workers.dev/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer olzxoqpibrhq6lfjkkypy",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Kayıt işlemi başarısız.");
      }

      const user = await response.json();
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { userId: user.id, status: user.status },
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "REGISTER_FAILURE", payload: error.message });
      } else {
        dispatch({
          type: "REGISTER_FAILURE",
          payload: "Bilinmeyen bir hata oluştu.",
        });
      }
    }
  };

  const value = useMemo(
    () => ({
      state,
      dispatch,
      registerUser,
    }),
    [state, registerUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
