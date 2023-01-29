import React, { useState } from "react";

import { useWorkoutsContext } from "hooks/useWorkoutsContext";
import { CREATE_WORKOUT } from "actions";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(workout),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);

      dispatch({
        type: CREATE_WORKOUT,
        payload: json,
      });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Exercise title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        min={0}
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        min={0}
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
