import { useState } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);

  async function fetchUsers(query) {
    setIsLoading(true);
    if (!isFavorites) {
      const response = await axios.get(
        `https://randomuser.me/api/?results=25&page=1${
          query?.length ? ` &nat=${query.join(",")} ` : ""
        }`
      );
    }
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
