import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const { users, isLoading, fetchUsers } = usePeopleFetch();
  const [nats, setNats] = useState([]);
  React.useEffect(() => {
    if (nats) {
      fetchUsers(nats);
      console.log("nats changing", nats);
    }
  }, [nats]);

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} setNats={setNats} nats={nats} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
