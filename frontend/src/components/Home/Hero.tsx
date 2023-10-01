import { Box, Typography, Button } from "@mui/material";
import globeblue from "./../../assets/images/globeblue.jpg";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import GitHubButton from "react-github-btn";

function Hero() {
  return (
    <Box height={"100%"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          pt: 5,
          pb: 10,
        }}
      >
        <Box
          sx={{
            width: { xs: "210px", sm: "240px", lg: "340px" },
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            mt: 0,
          }}
        >
          <img
            draggable={false}
            src={globeblue}
            width={"100%"}
            alt="404 page not found"
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Typography
            variant="h3"
            fontFamily={"Hind Siliguri, sans-serif"}
            fontWeight={"bold"}
            color="primary.light"
            sx={{ fontSize: { xs: 25, md: 36 } }}
          >
            Country State City API
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            endIcon={<RocketLaunchIcon />}
            variant="contained"
            sx={{
              pointerEvents: "none",
              ":hover": {
                background:
                  "linear-gradient( 135deg, #FD6585 10%, #0D25B9 100%)",
              },
              color: "#fff",
              background: "linear-gradient( 135deg, #f48fb1 10%, #1E2AD2 100%)",
            }}
          >
            Get Started
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <GitHubButton
            href="https://github.com/devhiteshk/CCS_API"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-size="large"
            data-show-count="true"
            aria-label="Star devhiteshk/CCS_API on GitHub"
          >
            Star
          </GitHubButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
