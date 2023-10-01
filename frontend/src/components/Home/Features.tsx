import { Box, Paper, Typography } from "@mui/material";

function Features() {
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
          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h5" color="#000">
            Features
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Paper
            sx={{
              p: 2,
              height: 160,
              maxWidth: "sm",
              width: { xs: "100%", sm: "300px", md: "300px" },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="body1"
                color="primary.light"
                fontWeight={"bold"}
              >
                Index Search
              </Typography>
              <Typography variant="caption" color="grey">
                Now you can search any county, state or city just by typing the
                name. The results are generated using regex search and Full text
                search.
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              p: 2,
              height: 160,
              maxWidth: "sm",
              width: { xs: "100%", sm: "300px", md: "300px" },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="body1"
                color="primary.light"
                fontWeight={"bold"}
              >
                Faster Selection
              </Typography>
              <Typography variant="caption" color="grey">
                Decrease the time and hassele of selecting the country, state
                and then city now get instant results just by typing anything.
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              p: 2,
              height: 160,
              maxWidth: "sm",
              width: { xs: "100%", sm: "300px", md: "300px" },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="body1"
                color="primary.light"
                fontWeight={"bold"}
              >
                Highly Customizeable
              </Typography>
              <Typography variant="caption" color="grey">
                You can customise the API according to your needs. You can
                select the fields you want to get in the response.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Features;
