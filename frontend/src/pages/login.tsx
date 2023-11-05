import { useLogin } from "@refinedev/core";
import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import { ThemedTitleV2 } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";
import { yariga } from "assets";

// Todo: Update your Google Client I D here
const GOOGLE_CLIENT_ID =
  "798905151781-k7p9boekli2u66k0u3v0u0adqbj91knu.apps.googleusercontent.com";

export const Login: React.FC = () => {
  
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
      
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
     
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <div>
          <Typography fontSize={25} fontWeight={600} color="GrayText">LostNFound!</Typography>
          
        </div>

        <GoogleButton />

        <Typography align="center" color={"text.secondary"} fontSize="12px">
          Powered by
          <img
            style={{ padding: "0 5px" }}
            alt="Google"
            src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
          />
          Google
        </Typography>
      </Box>
    </Container>
  );
};
