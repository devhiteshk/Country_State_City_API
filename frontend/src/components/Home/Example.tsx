import { Box, Typography, InputLabel, TextField } from "@mui/material";
import * as React from "react";

import CodeBlockJS from "./CodeBlock";
import { Search } from "@mui/icons-material";
import { searchDB } from "../../API/searchDB";
import debounce from "lodash.debounce";

// searchDB(e.target.value, parseInt(limit), parseInt(offset)),

// example of interface

interface resInterface {
  err: string;
}

function Example() {
  const [value, setValue] = React.useState("");
  const [limit, setLimit] = React.useState("20");
  const [offset, setOffset] = React.useState("0");

  const [results, setResults] = React.useState<resInterface[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // lodash debounce searchDB

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchDB = React.useCallback(
    debounce((value, limit, offset) => {
      if (value.length > 2) {
        searchDB(value, parseInt(limit), parseInt(offset))
          .then((res) => {
            setResults(res.results);
          })
          .catch(() =>
            setResults([{ err: "429 Too Many Requests !!! Limit Exceeded" }])
          );
      } else {
        setResults([{ err: "min 3 characters" }]);
      }
    }, 500),
    [searchDB]
  );

  React.useEffect(() => {
    debouncedSearchDB(value, limit, offset);
  }, [value, limit, offset, debouncedSearchDB]);

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
        <Box>
          <Typography variant="h5" color="initial">
            Example
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            gap: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2" color="grey">
            Just type any country, state or city and get the results in reltime
            with debouncing
          </Typography>
          <Typography variant="caption" color="grey">
            (min 3 characters)
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              maxWidth: "sm",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <TextField
              sx={{
                height: "25px",
                width: { xs: "95%", sm: "70%", md: "60%" },
              }}
              InputProps={{
                startAdornment: (
                  <Search
                    sx={{
                      borderRight: "1px solid #d5d5d5",
                      pr: 1,
                      fontSize: "20px",
                      width: "30px",
                    }}
                  />
                ),
              }}
              inputProps={{
                style: { height: "10px", fontSize: "12px", marginLeft: "10px" },
              }}
              size="small"
              id=""
              label=""
              value={value}
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <InputLabel sx={{ fontSize: 14 }}>limit :</InputLabel>
              <TextField
                size="small"
                id=""
                label=""
                type="number"
                InputProps={{
                  inputProps: { min: 0, max: 100 },
                  style: { height: "24px", fontSize: "12px" },
                }}
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <InputLabel sx={{ fontSize: 14 }}>offset :</InputLabel>
              <TextField
                size="small"
                type="number"
                id=""
                InputProps={{
                  inputProps: { min: 0, max: 100 },
                  style: { height: "24px", fontSize: "12px" },
                }}
                label=""
                value={offset}
                onChange={(e) => setOffset(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 4,
            backgroundColor: "#0f1924",
            maxWidth: "sm",
            width: "100%",
            height: "100%",
          }}
        >
          <Box p={0.3}>
            <Typography sx={{ ml: 1 }} variant="caption" color="#fff">
              Results :
            </Typography>
          </Box>
          <CodeBlockJS results={results} />
        </Box>
      </Box>
    </Box>
  );
}

export default Example;
