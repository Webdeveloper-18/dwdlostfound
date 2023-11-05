
import { AgentCardProp,InfoBarProps } from 'interfaces/agent' 
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocationCity from "@mui/icons-material/LocationCity";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import { Article } from '@mui/icons-material';
import { useGetIdentity } from "@refinedev/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack
      flex={1}
      minWidth={{ xs: "100%", sm: 300 }}
      gap={1.5}
      direction="row"
  >
      {icon}
      <Typography fontSize={14} color="#808191">
          {name}
      </Typography>
  </Stack>
);
function AgentsCard({id,avatar,email,name,noOfProperties,phone}:AgentCardProp) {
  interface  currentUser{
    email: string;
    // Add other properties as needed
  }
  const { data: currentUser } = useGetIdentity() as { data: currentUser };

const generateLink = () => {
    if (currentUser.email === email) return "/my profile";

    return `/user/show/${id}`;
};

return (
    <Box
        component={Link}
        to={generateLink()}
        width="100%"
        sx={{
            borderRadius:'15px',
            backgroundColor:"#e6e1e3",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "20px",
            padding: "20px",
            "&:hover": {
                boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
            },
        }}
    >
        <img
            src={
                checkImage(avatar)
                    ? avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
            }
            alt="user"
            width={90}
            height={90}
            style={{ borderRadius: 8, objectFit: "cover" }}
        />
        <Stack
            direction="column"
            justifyContent="space-between"
            flex={1}
            gap={{ xs: 4, sm: 2 }}
        >
            <Stack
                gap={2}
                direction="row"
                flexWrap="wrap"
                alignItems="center"
            >
                <Typography fontSize={22} fontWeight={600} color="#11142d">
                    {name}
                </Typography>
                <Typography fontSize={14} color="#808191">
                    student
                </Typography>
            </Stack>
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
            >
                <InfoBar
                    icon={<EmailOutlined sx={{ color: "#808191" }} />}
                    name={email}
                />
                <InfoBar
                    icon={<Place sx={{ color: "#808191" }} />}
                    name="Dharwad"
                />
                <InfoBar
                    icon={<Phone sx={{ color: "#808191" }} />}
                    name="unknown"
                />
                <InfoBar
                    icon={<Article sx={{ color: "#808191" }} />}
                    name={`${noOfProperties} Posts`}
                />
            </Stack>
        </Stack>
    </Box>
);
};

export default AgentsCard;
