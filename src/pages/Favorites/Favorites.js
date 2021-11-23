import React from "react";
import * as S from "../Home/style";
import Text from "components/Text";

function Favorites() {
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
      </S.Content>
    </S.Home>
  );
}

export default Favorites;
