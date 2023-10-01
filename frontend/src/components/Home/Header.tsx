import { Box, Tooltip, Typography } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { GitHub } from "@mui/icons-material";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 3,
        zIndex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          maxWidth: "xl",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          pl: { xs: 2, md: 10 },
          pr: { xs: 2, md: 10 },
          pt: 0.2,
          pb: 0.2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PublicIcon sx={{ fontSize: 34, fill: "#424242" }} />
          <Typography
            sx={{ fontFamily: "cursive" }}
            variant="h6"
            fontSize={34}
            color={"#424242"}
            fontWeight={"bold"}
          >
            CSC
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={"View on github"}>
            <GitHub sx={{ fontSize: 30, cursor: "pointer" }} />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
