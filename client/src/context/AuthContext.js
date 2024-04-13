import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: localStorage.getItem("user")!=='undefined' ? JSON.parse(localStorage.getItem("user")) : null,
  userId: localStorage.getItem("userId")!=='undefined' ? JSON.parse(localStorage.getItem("userId")) : null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        userId:null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        userId:action.payload.userId,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        userId:null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        userId:null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.user)
    localStorage.setItem("user", JSON.stringify(state.user));
  if (state.userId)
    localStorage.setItem("userId", JSON.stringify(state.userId));
  }, [state.user, state.userId]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userId:state.userId,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
