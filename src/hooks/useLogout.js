import { useAuthContext } from "hooks/useAuthContext";
import { LOGOUT } from "actions";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: LOGOUT });
  };

  return { logout };
};
