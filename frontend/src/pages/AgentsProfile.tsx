import React from 'react'
import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";
function AgentsProfile() {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
      resource: "user",
      id: id as string,
  });

  console.log(data);
//can't use like this because now we are working dirrent typeof dat
  // const myProfile = data?.data ?? [];
  const myProfile = data?.data || { allProperties: [] };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;
  return (
    <Profile
    type="User"
    name={myProfile.name}
    email={myProfile.email}
    avatar={myProfile.avatar}
    properties={myProfile.allProperties}
/>
  )
}

export default AgentsProfile
