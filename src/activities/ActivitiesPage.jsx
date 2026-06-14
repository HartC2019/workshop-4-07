import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);

  const { token } = useAuth();

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  async function handleDelete(activityId) {
    try {
      await deleteActivity(token, activityId);
      syncActivities();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <>
      <h1>Activities</h1>
      <ActivityList activities={activities} onDelete={handleDelete} />
      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}
