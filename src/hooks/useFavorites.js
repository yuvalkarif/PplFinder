import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isSynced, setIsSynced] = useState(false);
  useEffect(() => {
    if (!isSynced) {
      const localFavorites = localStorage.getItem("favorites");
      localFavorites && setFavorites(JSON.parse(localFavorites));
      setIsSynced(true);
    }
  });

  useEffect(() => {
    // localStorage.removeItem("favorites");
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const addToFavorites = (uuid, isFavorite) => {
    let newFavorites = favorites ? favorites.slice() : [];
    if (isFavorite) {
      newFavorites = newFavorites.filter((newFavorite) => {
        return newFavorite !== uuid;
      });
    } else {
      newFavorites.push(uuid);
    }

    setFavorites(newFavorites);
  };
  const isInFavorites = (uuid) => {
    let isIn = false;
    if (uuid && favorites.length) {
      favorites.forEach((favorite) => {
        if (favorite === uuid) {
          isIn = true;
        }
      });
    }
    return isIn;
  };

  return [favorites, isInFavorites, addToFavorites];
};
