import React from 'react'
import { useGetIdentity, useOne } from "@refinedev/core";

import { Profile } from "components";
function Myprofile() {
  interface user {
    email: string;
    userid:string
    // Add other properties as needed
  }
 
  const { data: user } = useGetIdentity() as { data: user };
const { data, isLoading, isError } = useOne({
    resource: "user",
    id: user?.userid,
});
//can't use like this because now we are working dirrent typeof dat
  // const myProfile = data?.data ?? [];
  const myProfile = data?.data || { allProperties: [] };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;
  return (
    <Profile
    type="My"
    name={myProfile.name}
    email={myProfile.email}
    avatar={myProfile.avatar}
    properties={myProfile.allProperties}
/>
  )
}

export default Myprofile
