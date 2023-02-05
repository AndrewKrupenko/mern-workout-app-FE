import { useAuthContext } from "hooks/useAuthContext";
import { useWorkoutsContext } from "hooks/useWorkoutsContext";
import { LOGOUT, SET_WORKOUTS } from "actions";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user");

    authDispatch({ type: LOGOUT });
    workoutsDispatch({ type: SET_WORKOUTS, payload: [] });
  };

  return { logout };
};
