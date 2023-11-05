import React from 'react'
import {useList} from '@refinedev/core'
import {Box,Typography} from '@mui/material'
import { AgentsCard } from 'components'

function Agents() {
  const {data,isLoading,isError}=useList({resource:'user'})  //this uselist gives us direct feature of getting data from this entered routes and utilize the dataprovider
  const allAgents=data?.data??[]
  // console.log(allAgents)
  if(isLoading) return <h1>Loading...!</h1>
  if(isError) return <h1>Error...!</h1>
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} >Users List</Typography>
   
   <Box
   mt="20px"
   sx={{
    display:'flex',
    flexWrap:'wrap',
    gap:'20px'

   }}
   >
   {
    allAgents.map((a)=>(
      <AgentsCard key={a._id}
      id={a._id} name={a.name} email={a.email} avatar={a.avatar} 
      noOfProperties={a.allProperties.length} phone={a.phone}></AgentsCard>
    ))
   }

   </Box>
    </Box>
  )
}

export default Agents
