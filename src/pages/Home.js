import React, { useEffect } from "react";

import WorkoutDetails from "components/WorkoutDetails";
import WorkoutForm from "components/WorkoutForm";
import { useWorkoutsContext } from "hooks/useWorkoutsContext";
import { useAuthContext } from "hooks/useAuthContext";
import { SET_WORKOUTS } from "actions";

const Home = () => {
  const { workouts, isLoading, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: SET_WORKOUTS,
          payload: json,
        });
      }
    };
    if (user) {
      fetchWorkouts();
    }
    // eslint-disable-next-line
  }, [user]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.length ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <h2>There are no workouts yet</h2>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
