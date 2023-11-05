import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";


import { CustomButton } from "components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const PropertyDetails = () => {
  interface UserType {
    email: string;
    // Add other properties as needed
  }
    const navigate = useNavigate();
    const { data: user } = useGetIdentity() as { data: UserType };
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const propertyDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === propertyDetails.creator.email;

    const handleDeleteProperty = () => {
      // eslint-disable-next-line no-restricted-globals
        const response = confirm(
            "Are you sure you want to delete this property?",
        );
        if (response) {
            mutate(
                {
                    resource: "belonging",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/belonging");
                    },
                },
            );
        }
    };

    return (
        <Box
            borderRadius="15px"
            padding="20px"
            
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} >
                Details
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={propertyDetails.photo}
                        alt="property_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="property_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                               
                                textTransform="capitalize"
                            >
                                {propertyDetails.propertyType}
                            </Typography>
                          
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                   
                                >
                                    {propertyDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place />
                                    <Typography fontSize={14} >
                                        {propertyDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} fontWeight={600} >
                                Description-:
                            </Typography>
                            <Typography fontSize={14} >
                                {propertyDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(propertyDetails.creator.avatar)
                                        ? propertyDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                   
                                >
                                    {propertyDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                   
                                >
                                    Agent
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                  
                                >
                                    IIIT-Dharwad
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                              
                            >
                                {propertyDetails.creator.allProperties.length}{" "}
                                Posts
                            </Typography>
                        </Stack>

                        <Stack
                          alignItems="center"
                          justifyContent="center"
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            {isCurrentUser&&<CustomButton
                                title=  "Edit"
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                     <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/belonging/edit/${propertyDetails._id}`,
                                        );
                                    }
                                }}
                            />}

                            {/* <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteProperty();
                                }}
                            /> */}
                            {
                                isCurrentUser?(
                                    
                                  <CustomButton
                                title= "Delete"
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon= {<Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteProperty();
                                }}
                            />
                                  
                                ):(
                                    <a href={`tel:${propertyDetails.phone}`}>
                                    <CustomButton
                                title="Call"
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={<Phone /> }
                                handleClick={() => {
                                    console.log("Hello World...!")
                                }}
                            />  </a>
                                )
                            }
                        </Stack>
                    </Stack>

                </Box>
            </Box>
        </Box>
    );
};

export default PropertyDetails;