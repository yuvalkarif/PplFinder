import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import UserFavorite from "components/UserFavorite";
import * as S from "./style";
import { useCountries } from "hooks";
import { useFavorites } from "hooks/useFavorites";

const UserList = ({ users, isLoading, setNats, nats }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [countries, checkedNats, handleCheckBox] = useCountries();
  const [favorites, isInFavorites, addToFavorites] = useFavorites();

  const handleMouseEnter = (id) => {
    setHoveredUserId(id);
  };
  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  useEffect(() => {
    // Updating Nats array used to Fetch (Excluding the initial empty fetching repetition)
    if (nats.length !== 0 || !nats.length !== !checkedNats.length) {
      setNats(checkedNats);
    }
  }, [checkedNats]);

  return (
    <S.UserList>
      <S.Filters>
        {countries.map((country, i) => (
          <CheckBox
            value={country.value}
            label={country.label}
            onChange={handleCheckBox}
            key={i}
          />
        ))}
      </S.Filters>
      <S.List>
        {users &&
          users.map((user, index) => {
            const uuid = user?.login.uuid;
            return (
              <S.User
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <UserFavorite
                  isHovered={index === hoveredUserId}
                  isFavorite={isInFavorites(uuid)}
                  user={user}
                  onClick={(isFavorite) => addToFavorites(uuid, isFavorite)}
                />
              </S.User>
            );
          })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
