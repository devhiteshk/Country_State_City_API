import { Favorite } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          maxWidth: "xl",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{ fontSize: { xs: "17px", sm: "18px" } }}
            fontFamily={"Roboto, sans-serif"}
            color="#EEEEEE"
          >
            Fix the cause, not the symptom !
          </Typography>
          <Typography variant="body2" textAlign={"right"} color="#EEEEEE">
            - Steve Maguire
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mt: 8,
          }}
        >
          <Typography variant="caption" color="#fff">
            Made with
          </Typography>
          <Favorite sx={{ fill: "red", fontSize: "20px" }} />
          <Typography variant="caption" color="#fff">
            in India
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
