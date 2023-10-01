import { Box, Typography } from "@mui/material";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import Example from "../components/Home/Example";
import { Dna } from "react-loader-spinner";
import { useEffect, useState } from "react";
function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          display: loading ? "flex" : "none",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 2,
        }}
      >
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </Box>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <a href="https://www.freepik.com/free-vector/vector-world-globe-map-india-middle-east-asia-centered-map-blue-planet-sphere-icon-isolated-white-background_16311609.htm#query=globe&position=14&from_view=keyword&track=sph">
          <Typography variant="caption" color="blue">
            Image by callmetak
          </Typography>
        </a>
        <Typography variant="caption" color="initial">
          on Freepik
        </Typography>
      </Box>
    </>
  );
}

export default Home;
