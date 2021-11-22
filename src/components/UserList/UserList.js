import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, setNats, nats }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  //Converted each country checkbox values to array of values in state to follow if its checked
  //and to be able to add as many countries as you wish.
  const [countries, setCountries] = useState([
    { value: "BR", label: "Brazil", isChecked: false },
    { value: "AU", label: "Australia", isChecked: false },
    { value: "CA", label: "Canada", isChecked: false },
    { value: "DE", label: "Germany", isChecked: false },
    { value: "NZ", label: "New Zealand", isChecked: false },
  ]);
  const [checkedNats, setCheckedNats] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  const handleCheckBox = (value) => {
    // Updating object checked in arr
    const newCountries = countries.slice();
    countries.forEach((element, i) => {
      if (element.value === value) {
        newCountries[i] = { ...element, isChecked: !element.isChecked };
      }
    });
    setCountries(newCountries);
  };
  useEffect(() => {
    // Updating (inner) Checked Nats array used to Evaluate if there is a need to update the main one.
    if (countries) {
      setCheckedNats(
        countries.flatMap((country) => {
          return country.isChecked ? country.value : [];
        })
      );
    }
  }, [countries]);

  useEffect(() => {
    // Updating Nats array used to Fetch (Excluding the initial empty fetching repititon)
    if (nats.length !== 0 || !nats.length !== !checkedNats.length) {
      setNats(checkedNats);
    }
  }, [checkedNats]);

  return (
    <S.UserList>
      <S.Filters>
        {countries.map((country) => (
          <CheckBox
            value={country.value}
            label={country.label}
            onChange={handleCheckBox}
          />
        ))}
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
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
