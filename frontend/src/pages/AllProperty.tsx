import React, { useMemo, useState, useEffect } from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PropertyCard, CustomButton } from "components";

function AllProperty() {
  const [currentPriceOrder, setCurrentPriceOrder] = useState<"asc" | "desc">("asc");

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable();
  const navigate = useNavigate();

  const allproperties = data?.data ?? [];

  useEffect(() => {
    setSorters([{ field: "createdAt", order: currentPriceOrder }]);
  }, [currentPriceOrder, setSorters]);

  const toggleSort = () => {
    const newOrder = currentPriceOrder === "asc" ? "desc" : "asc";
    setCurrentPriceOrder(newOrder);
  };

  const currentfilter = useMemo(() => {
    const logicalfilter = filters.flatMap((item) =>
      "field" in item ? item : []
    );
    return {
      title: logicalfilter.find((item) => item.field === "title")?.value || "",
      propertyType:
        logicalfilter.find((item) => item.field === "propertyType")?.value || "",
    };
  }, [filters]);

  if (isLoading) return <h1>Loading...!</h1>;
  if (isError) return <h1>Error...!</h1>;

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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          <Stack direction="column" width="100%">
            <Box
              mb={2}
              mt={3}
              display="flex"
              width="84%"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                mb={{ xs: "20px", sm: 0 }}
              >
                <CustomButton
                  title={` ${currentPriceOrder === "asc" ? "Old to New" : "New to Old"}`}
                  handleClick={toggleSort}
                  backgroundColor="#1976D2"
                  color="#fcfcfc"
                />
                <TextField
                  variant="outlined"
                  placeholder="Search by title"
                  value={currentfilter.title}
                  onChange={(e) => {
                    setFilters([
                      {
                        field: "title",
                        operator: "contains",
                        value: e.currentTarget.value
                          ? e.currentTarget.value
                          : undefined,
                      },
                    ]);
                  }}
                />
                <Select
                  variant="outlined"
                  displayEmpty
                  required
                  inputProps={{ "aria-label": "label" }}
                  defaultValue=""
                  value={currentfilter.propertyType}
                  onChange={(e) => {
                    setFilters(
                      [
                        {
                          field: "propertyType",
                          operator: "eq",
                          value: e.target.value,
                        },
                      ],
                      "replace"
                    );
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {[
                    "Phone",
                    "Earbuds",
                    "Book",
                    "Bottle",
                    "Watch",
                    "Other",
                  ].map((e) => (
                    <MenuItem value={e} key={e}>
                      {e}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Stack>
        </Box>
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
      {allproperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#1976D2"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />

          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px"
          >
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#1976D2"
            color="#fcfcfc"
            disabled={current === pageCount}
          />

          <Select
            variant="outlined"
            displayEmpty
            required
            inputProps={{ "aria-label": "label" }}
            defaultValue={10}
            onChange={(e) =>
              setPageSize(e.target.value ? Number(e.target.value) : 10)
            }
          >
            {[10, 20, 30, 40].map((e) => (
              <MenuItem key={e} value={e}>
                Show {e}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
}

export default AllProperty;
