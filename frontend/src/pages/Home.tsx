import { Box, Typography } from "@mui/material";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import Example from "../components/Home/Example";

function Home() {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: 35,
          backgroundColor: "#7b1fa2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontSize: { xs: "8px", sm: "12px" } }}
          color="#fff"
        >
          ⭐️ If you like Country State City API , give it a star on{" "}
          <a
            style={{ textDecoration: "none", color: "#fff" }}
            href="https://github.com/devhiteshk/CCS_API"
            target="_blank"
          >
            <u>GitHub!</u>
          </a>{" "}
          ⭐️
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          pl: { xs: 1, md: 10 },
          pr: { xs: 1, md: 10 },
        }}
      >
        <Hero />
      </Box>
      <Box sx={{ backgroundColor: "#F0F0F0", pb: 20, pt: 10 }}>
        <Box sx={{ pl: { xs: 1, md: 10 }, pr: { xs: 1, md: 10 } }}>
          <Features />
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#f2f6fa", pb: 10, pt: 10 }}>
        <Box sx={{ pl: { xs: 1, md: 10 }, pr: { xs: 1, md: 10 } }}>
          <Example />
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#252B48", pb: 10, pt: 10 }}>
        <Box sx={{ pl: { xs: 1, md: 10 }, pr: { xs: 1, md: 10 } }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Home;
