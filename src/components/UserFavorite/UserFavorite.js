import React from "react";
import * as S from "../UserList/style";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
function UserFavorite({ isFavorite, isHovered, onClick }) {
  const handleClick = () => {
    onClick && onClick(isFavorite);
  };
  return (
    <S.IconButtonWrapper isVisible={isFavorite || isHovered}>
      <IconButton onClick={handleClick}>
        <FavoriteIcon color="error" />
      </IconButton>
    </S.IconButtonWrapper>
  );
}

export default UserFavorite;
