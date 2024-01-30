import { useEffect, useState } from "react";

export const useGetUserId = () => {
  const [userId, setUserId] = useState(null);

  const fetchUserId = () => {
    return window.localStorage.getItem("userId")
      ? window.localStorage.getItem("userId")
      : "";
  };

  useEffect(() => {
    const user_id = fetchUserId();
    setUserId(user_id);
  }, []);

  return { userId };
};
