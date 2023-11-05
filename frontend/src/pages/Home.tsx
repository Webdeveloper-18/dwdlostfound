import React from 'react'
import { useList } from "@refinedev/core";
import {PropertyCard} from 'components'
import {Box,Typography,Stack} from '@mui/material'

function Home() {
  const { data, isLoading, isError } = useList({
   
    resource: "belonging",
    config: {
        
        pagination: {
            pageSize: 3,
        
        },
     
    },
});

const latestProperties = data?.data ?? [];

if (isLoading) return <Typography>Loading...</Typography>;
if (isError) return <Typography>Something went wrong!</Typography>;
  return (
    <Box >
       <Typography fontSize={25} fontWeight={700} >
       Some Belongings
       </Typography>
        <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
               
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            foundlost={property.foundlost}
                            photo={property.photo}
                            phone={property.phone}
                            createdAt={property.createdAt}

                        />
                    ))}
                </Box>
            </Box>
    </Box>
  )
}

export default Home
