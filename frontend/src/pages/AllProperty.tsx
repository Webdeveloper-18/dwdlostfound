import React, { useMemo, useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import {
  Box,
  
  Typography,
  Stack,
  
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PropertyCard, CustomButton } from "components";

function AllProperty() {
  

  const {
    tableQueryResult: { data, isLoading, isError },
    
  } = useTable();
  const navigate = useNavigate();

  const allproperties = data?.data ?? [];

  if(isError) <h1>Error..</h1>
  if(isLoading) <h1>Loading..</h1>

  return (
    <Box>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={25} fontWeight={700}>
            {!allproperties.length ? "Nothing ahead...!" : "All Belongings"}
          </Typography>
          <CustomButton
            title="Add Belongings"
            handleClick={() => {
              navigate("create"); 
            }}
            backgroundColor="#1976D2"
            icon={<Add />}
            color="#fcfcfc"
          />
        </Stack>
        
      </Box>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allproperties.map((e) => (
          <PropertyCard
            key={e._id}
            id={e._id}
            title={e.title}
            location={e.location}
            photo={e.photo}
            phone={e.phone}
            createdAt={e.createdAt}
            foundlost={e.foundlost}
          />
        ))}
      </Box>
      
    </Box>
  );
}

export default AllProperty;
