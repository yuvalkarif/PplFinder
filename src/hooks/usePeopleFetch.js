import { useState } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUsers(nats) {
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=1${
        nats?.length ? ` &nat=${nats.join(",")} ` : ""
      }`
    );
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
