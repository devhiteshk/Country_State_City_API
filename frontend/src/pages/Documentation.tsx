import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CodeBlock, dracula } from "react-code-blocks";
import PublicIcon from "@mui/icons-material/Public";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { GitHub } from "@mui/icons-material";

// ─── Data ────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api/csc";

const endpoints = [
  {
    id: "search",
    method: "GET",
    path: "/search",
    summary: "Unified Search — Countries, States & Cities",
    description:
      "Performs a combined full-text search and regex autocomplete across the entire dataset. Full-text search (MongoDB text index on the csc field) runs first for relevance, then regex autocomplete fills in additional matches. Results are merged with full-text hits first.",
    params: [
      { name: "search", type: "string", required: true, description: "Search term. Minimum 2 characters." },
      { name: "limit", type: "number", required: false, description: "Max results to return. Defaults to 15." },
      { name: "offSet", type: "number", required: false, description: "Results to skip for pagination. Defaults to 0." },
    ],
    examples: [
      { label: "fetch", code: `fetch("${BASE_URL}/search?search=Delhi")\n  .then(res => res.json())\n  .then(data => console.log(data));` },
      { label: "Axios", code: `import axios from "axios";\n\nconst res = await axios.get("${BASE_URL}/search", {\n  params: { search: "Delhi", limit: 10, offSet: 0 },\n});\nconsole.log(res.data);` },
      { label: "cURL — basic", code: `curl -X GET "${BASE_URL}/search?search=Delhi"` },
      { label: "cURL — paginated", code: `curl -X GET "${BASE_URL}/search?search=Delhi&limit=5&offSet=5"` },
      { label: "cURL — 400 (too short)", code: `curl -X GET "${BASE_URL}/search?search=D"` },
      { label: "cURL — 400 (missing)", code: `curl -X GET "${BASE_URL}/search"` },
    ],
    successResponse: `{
  "success": true,
  "results": [
    { "_id": "6508394b2c6174d1c83e80ed", "csc": "Delhi, Delhi, India" },
    { "_id": "6508394b2c6174d1c83e80fb", "csc": "New Delhi, Delhi, India" },
    { "_id": "650839a62c6174d1c847576f", "csc": "Delhi, Louisiana, United States" }
  ]
}`,
    errorResponses: [
      { status: 400, body: `{ "success": false, "message": "Search length must be greater than 3 characters" }`, reason: "search param missing or less than 2 characters" },
      { status: 400, body: `{ "success": false, "message": "<mongo error>" }`, reason: "Database query error" },
      { status: 429, body: `{ "message": "Too many requests, please try again later." }`, reason: "Rate limit exceeded" },
    ],
  },
  {
    id: "countries",
    method: "GET",
    path: "/countries",
    summary: "List All Countries",
    description:
      "Returns every unique country in the database, sorted alphabetically. Each entry includes the country name, ISO code, emoji flag, phone code, currency, and coordinates. Useful for populating a country picker.",
    params: [],
    examples: [
      { label: "fetch", code: `fetch("${BASE_URL}/countries")\n  .then(res => res.json())\n  .then(data => console.log(data));` },
      { label: "Axios", code: `const res = await axios.get("${BASE_URL}/countries");\nconsole.log(res.data);` },
      { label: "cURL", code: `curl -X GET "${BASE_URL}/countries"` },
    ],
    successResponse: `{
  "success": true,
  "count": 250,
  "results": [
    {
      "name": "India",
      "isoCode": "IN",
      "flag": "🇮🇳",
      "phonecode": "91",
      "currency": "INR",
      "latitude": "20.00000000",
      "longitude": "77.00000000"
    },
    {
      "name": "United States",
      "isoCode": "US",
      "flag": "🇺🇸",
      "phonecode": "1",
      "currency": "USD",
      "latitude": "38.00000000",
      "longitude": "-97.00000000"
    }
  ]
}`,
    errorResponses: [
      { status: 500, body: `{ "success": false, "message": "<error>" }`, reason: "Database error" },
      { status: 429, body: `{ "message": "Too many requests, please try again later." }`, reason: "Rate limit exceeded" },
    ],
  },
  {
    id: "country-detail",
    method: "GET",
    path: "/countries/:isoCode",
    summary: "Get Country Detail",
    description:
      "Returns full detail for a single country by its ISO 3166-1 alpha-2 code, including all timezone data. Great for showing country info cards or pre-filling forms.",
    params: [
      { name: "isoCode", type: "string (path)", required: true, description: "ISO 3166-1 alpha-2 country code. Case-insensitive. e.g. IN, US, GB" },
    ],
    examples: [
      { label: "fetch", code: `fetch("${BASE_URL}/countries/IN")\n  .then(res => res.json())\n  .then(data => console.log(data));` },
      { label: "Axios", code: `const res = await axios.get("${BASE_URL}/countries/IN");\nconsole.log(res.data);` },
      { label: "cURL — India", code: `curl -X GET "${BASE_URL}/countries/IN"` },
      { label: "cURL — USA", code: `curl -X GET "${BASE_URL}/countries/US"` },
      { label: "cURL — 404", code: `curl -X GET "${BASE_URL}/countries/XX"` },
    ],
    successResponse: `{
  "success": true,
  "result": {
    "name": "India",
    "isoCode": "IN",
    "flag": "🇮🇳",
    "phonecode": "91",
    "currency": "INR",
    "latitude": "20.00000000",
    "longitude": "77.00000000",
    "timezones": [
      {
        "zoneName": "Asia/Kolkata",
        "gmtOffset": 19800,
        "gmtOffsetName": "UTC+05:30",
        "abbreviation": "IST",
        "tzName": "Indian Standard Time"
      }
    ]
  }
}`,
    errorResponses: [
      { status: 404, body: `{ "success": false, "message": "Country not found" }`, reason: "isoCode does not match any country" },
      { status: 500, body: `{ "success": false, "message": "<error>" }`, reason: "Database error" },
    ],
  },
  {
    id: "states",
    method: "GET",
    path: "/countries/:isoCode\n/states",
    summary: "Get States for a Country",
    description:
      "Returns all states/provinces/regions for a given country, sorted alphabetically. Each state includes its ISO code and coordinates.",
    params: [
      { name: "isoCode", type: "string (path)", required: true, description: "ISO 3166-1 alpha-2 country code. e.g. IN, US, AU" },
    ],
    examples: [
      { label: "fetch", code: `fetch("${BASE_URL}/countries/IN/states")\n  .then(res => res.json())\n  .then(data => console.log(data));` },
      { label: "Axios", code: `const res = await axios.get("${BASE_URL}/countries/IN/states");\nconsole.log(res.data);` },
      { label: "cURL — India", code: `curl -X GET "${BASE_URL}/countries/IN/states"` },
      { label: "cURL — USA", code: `curl -X GET "${BASE_URL}/countries/US/states"` },
      { label: "cURL — 404", code: `curl -X GET "${BASE_URL}/countries/XX/states"` },
    ],
    successResponse: `{
  "success": true,
  "count": 36,
  "results": [
    {
      "name": "Delhi",
      "isoCode": "DL",
      "countryCode": "IN",
      "latitude": "28.70405920",
      "longitude": "77.10249020"
    },
    {
      "name": "Maharashtra",
      "isoCode": "MH",
      "countryCode": "IN",
      "latitude": "19.75147980",
      "longitude": "75.71388840"
    }
  ]
}`,
    errorResponses: [
      { status: 404, body: `{ "success": false, "message": "Country not found or has no states" }`, reason: "isoCode not found or country has no state data" },
      { status: 500, body: `{ "success": false, "message": "<error>" }`, reason: "Database error" },
    ],
  },
  {
    id: "cities",
    method: "GET",
    path: "/countries/:isoCode\n/states/:stateCode\n/cities",
    summary: "Get Cities in a State",
    description:
      "Returns all cities within a specific state of a country. Both country and state are identified by their ISO codes. Ideal for building cascading Country → State → City dropdowns.",
    params: [
      { name: "isoCode", type: "string (path)", required: true, description: "ISO 3166-1 alpha-2 country code. e.g. IN" },
      { name: "stateCode", type: "string (path)", required: true, description: "State ISO code as returned by the /states endpoint. e.g. DL, MH" },
    ],
    examples: [
      { label: "fetch", code: `fetch("${BASE_URL}/countries/IN/states/DL/cities")\n  .then(res => res.json())\n  .then(data => console.log(data));` },
      { label: "Axios", code: `const res = await axios.get("${BASE_URL}/countries/IN/states/DL/cities");\nconsole.log(res.data);` },
      { label: "cURL — Delhi cities", code: `curl -X GET "${BASE_URL}/countries/IN/states/DL/cities"` },
      { label: "cURL — California cities", code: `curl -X GET "${BASE_URL}/countries/US/states/CA/cities"` },
      { label: "cURL — 404", code: `curl -X GET "${BASE_URL}/countries/IN/states/XX/cities"` },
    ],
    successResponse: `{
  "success": true,
  "count": 23,
  "results": [
    {
      "name": "New Delhi",
      "countryCode": "IN",
      "stateCode": "DL",
      "latitude": "28.63576000",
      "longitude": "77.22445000"
    },
    {
      "name": "Rohini",
      "countryCode": "IN",
      "stateCode": "DL",
      "latitude": "28.73541000",
      "longitude": "77.06390000"
    }
  ]
}`,
    errorResponses: [
      { status: 404, body: `{ "success": false, "message": "No cities found for this state" }`, reason: "isoCode/stateCode combination not found" },
      { status: 500, body: `{ "success": false, "message": "<error>" }`, reason: "Database error" },
    ],
  },
  {
    id: "city-lookup",
    method: "GET",
    path: "/cities",
    summary: "Look Up a City by Name",
    description:
      "Finds all occurrences of a city name across every country. Useful for disambiguation — e.g. 'Delhi' exists in India and the United States. Returns city coordinates alongside the parent state and country.",
    params: [
      { name: "name", type: "string", required: true, description: "Exact city name (case-insensitive). Minimum 2 characters." },
    ],
    examples: [
      { label: "fetch", code: `fetch("${BASE_URL}/cities?name=Delhi")\n  .then(res => res.json())\n  .then(data => console.log(data));` },
      { label: "Axios", code: `const res = await axios.get("${BASE_URL}/cities", {\n  params: { name: "Delhi" },\n});\nconsole.log(res.data);` },
      { label: "cURL — Delhi", code: `curl -X GET "${BASE_URL}/cities?name=Delhi"` },
      { label: "cURL — Springfield", code: `curl -X GET "${BASE_URL}/cities?name=Springfield"` },
      { label: "cURL — 404", code: `curl -X GET "${BASE_URL}/cities?name=Xyzabc123"` },
    ],
    successResponse: `{
  "success": true,
  "count": 2,
  "results": [
    {
      "city": {
        "name": "Delhi",
        "countryCode": "IN",
        "stateCode": "DL",
        "latitude": "28.65195000",
        "longitude": "77.23149000"
      },
      "state": { "name": "Delhi", "isoCode": "DL" },
      "country": { "name": "India", "isoCode": "IN", "flag": "🇮🇳" }
    },
    {
      "city": {
        "name": "Delhi",
        "countryCode": "US",
        "stateCode": "LA",
        "latitude": "32.45764000",
        "longitude": "-91.49317000"
      },
      "state": { "name": "Louisiana", "isoCode": "LA" },
      "country": { "name": "United States", "isoCode": "US", "flag": "🇺🇸" }
    }
  ]
}`,
    errorResponses: [
      { status: 400, body: `{ "success": false, "message": "City name must be at least 2 characters" }`, reason: "name param missing or too short" },
      { status: 404, body: `{ "success": false, "message": "City not found" }`, reason: "No city matches the given name" },
      { status: 500, body: `{ "success": false, "message": "<error>" }`, reason: "Database error" },
    ],
  },
];

const rateLimitInfo = [
  { label: "Window", value: "60 minutes" },
  { label: "Max requests", value: "100 per IP" },
  { label: "Scope", value: "Per IP address" },
  { label: "Response header", value: "RateLimit", note: "Combined draft-7 field — limit, remaining, reset in one header." },
  { label: "Example", value: "RateLimit: limit=100, remaining=97, reset=3600" },
  { label: "On exceeded", value: "HTTP 429", note: '{ "success": false, "message": "Too many requests..." }' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "#22c55e",
    POST: "#3b82f6",
    PUT: "#f59e0b",
    DELETE: "#ef4444",
  };
  return (
    <Chip
      label={method}
      size="small"
      sx={{
        backgroundColor: colors[method] || "#6b7280",
        color: "#fff",
        fontWeight: 700,
        fontFamily: "monospace",
        fontSize: 12,
        borderRadius: "4px",
        height: 24,
      }}
    />
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Tooltip title={copied ? "Copied!" : "Copy"}>
      <IconButton size="small" onClick={handleCopy} sx={{ color: "#9ca3af" }}>
        {copied ? <CheckIcon fontSize="small" sx={{ color: "#22c55e" }} /> : <ContentCopyIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}

function EndpointCard({ ep }: { ep: typeof endpoints[0] }) {
  const [tab, setTab] = useState(0);

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        overflow: "hidden",
        mb: 4,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 2,
          backgroundColor: "#f9fafb",
          borderBottom: "1px solid #e5e7eb",
          flexWrap: "wrap",
        }}
      >
        <MethodBadge method={ep.method} />
        <Typography
          fontFamily="monospace"
          fontWeight={600}
          fontSize={15}
          color="#111827"
        >
          {ep.path}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          — {ep.summary}
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 3 }}>
        {/* Description */}
        <Typography variant="body2" color="text.secondary" mb={3} lineHeight={1.8}>
          {ep.description}
        </Typography>

        {/* Query Params */}
        <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="#374151">
          Query Parameters
        </Typography>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: "1px solid #e5e7eb", borderRadius: 2, mb: 4 }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                {["Parameter", "Type", "Required", "Description"].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700, fontSize: 12, color: "#6b7280" }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ep.params.map((p) => (
                <TableRow key={p.name} hover>
                  <TableCell>
                    <Typography fontFamily="monospace" fontSize={13} color="#7c3aed">
                      {p.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontFamily="monospace" fontSize={12} color="#0369a1">
                      {p.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={p.required ? "required" : "optional"}
                      size="small"
                      sx={{
                        fontSize: 11,
                        height: 20,
                        backgroundColor: p.required ? "#fef2f2" : "#f0fdf4",
                        color: p.required ? "#dc2626" : "#16a34a",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {p.description}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Code Examples */}
        <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="#374151">
          Code Examples
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 2,
            minHeight: 36,
            "& .MuiTab-root": { minHeight: 36, fontSize: 12, textTransform: "none", fontWeight: 600 },
            "& .MuiTabs-indicator": { backgroundColor: "#504099" },
          }}
        >
          {ep.examples.map((ex, i) => (
            <Tab key={i} label={ex.label} />
          ))}
        </Tabs>
        <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
            <CopyButton text={ep.examples[tab].code} />
          </Box>
          <CodeBlock
            text={ep.examples[tab].code}
            language="javascript"
            theme={dracula}
            showLineNumbers={false}
          />
        </Box>

        {/* Success Response */}
        <Typography variant="subtitle2" fontWeight={700} mt={4} mb={1.5} color="#374151">
          Success Response{" "}
          <Chip label="200 OK" size="small" sx={{ ml: 1, backgroundColor: "#dcfce7", color: "#16a34a", fontWeight: 700, fontSize: 11, height: 20 }} />
        </Typography>
        <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
            <CopyButton text={ep.successResponse} />
          </Box>
          <CodeBlock
            text={ep.successResponse}
            language="json"
            theme={dracula}
            showLineNumbers={false}
          />
        </Box>

        {/* Error Responses */}
        <Typography variant="subtitle2" fontWeight={700} mt={4} mb={1.5} color="#374151">
          Error Responses
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {ep.errorResponses.map((err) => (
            <Box key={err.status}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Chip
                  label={err.status}
                  size="small"
                  sx={{
                    backgroundColor: err.status === 429 ? "#fff7ed" : "#fef2f2",
                    color: err.status === 429 ? "#c2410c" : "#dc2626",
                    fontWeight: 700,
                    fontSize: 11,
                    height: 20,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {err.reason}
                </Typography>
              </Box>
              <CodeBlock text={err.body} language="json" theme={dracula} showLineNumbers={false} />
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Documentation() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Top bar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#fff",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          sx={{
            maxWidth: "1100px",
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <PublicIcon sx={{ fontSize: 28, fill: "#504099" }} />
            <Typography fontFamily="cursive" variant="h6" fontSize={26} color="#424242" fontWeight="bold">
              CSC
            </Typography>
            <Chip label="API Docs" size="small" sx={{ backgroundColor: "#ede9fe", color: "#504099", fontWeight: 600, fontSize: 11 }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Tooltip title="View on GitHub">
              <Link to="https://github.com/devhiteshk/CCS_API" target="_blank" style={{ color: "#374151" }}>
                <GitHub sx={{ fontSize: 24 }} />
              </Link>
            </Tooltip>
            <Tooltip title="Back to Home">
              <Link to="/" style={{ color: "#374151", display: "flex", alignItems: "center" }}>
                <ArrowBackIcon sx={{ fontSize: 22 }} />
              </Link>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1100px", mx: "auto", px: { xs: 2, md: 4 }, py: 6, display: "flex", gap: 5, alignItems: "flex-start" }}>
        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            width: 220,
            flexShrink: 0,
            position: "sticky",
            top: 72,
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography variant="overline" color="text.secondary" fontWeight={700} fontSize={11}>
            Endpoints
          </Typography>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
            {endpoints.map((ep) => (
              <Box
                key={ep.id}
                component="a"
                href={`#${ep.id}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  textDecoration: "none",
                  color: "#374151",
                  fontSize: 13,
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#ede9fe", color: "#504099" },
                }}
              >
                <MethodBadge method={ep.method} />
                <Typography fontFamily="monospace" fontSize={12}>{ep.path}</Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="overline" color="text.secondary" fontWeight={700} fontSize={11}>
            Rate Limiting
          </Typography>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
            {rateLimitInfo.map((item) => (
              <Box key={item.label}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.05em", fontSize: 10 }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" fontWeight={600} fontSize={12} color="#374151" sx={{ fontFamily: item.label === "Example" ? "'Fira Code', monospace" : "inherit", wordBreak: "break-all" }}>
                  {item.value}
                </Typography>
                {item.note && (
                  <Typography variant="caption" color="text.secondary" fontSize={10} lineHeight={1.4} display="block" mt={0.3}>
                    {item.note}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Main content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Page header */}
          <Box mb={5}>
            <Typography variant="h4" fontWeight={800} color="#111827" mb={1}>
              API Reference
            </Typography>
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              The Country State City API lets you search across a comprehensive dataset of countries, states, and cities using a single unified endpoint. It combines full-text search with regex autocomplete for fast, flexible results.
            </Typography>
          </Box>

          {/* Base URL */}
          <Box mb={5}>
            <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="#374151">
              Base URL
            </Typography>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1.5,
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                backgroundColor: "#1e1e2e",
              }}
            >
              <Typography fontFamily="monospace" fontSize={14} color="#cdd6f4">
                {BASE_URL}
              </Typography>
              <CopyButton text={BASE_URL} />
            </Paper>
          </Box>

          {/* Rate limit alert */}
          <Alert
            severity="warning"
            sx={{ mb: 5, borderRadius: 2, fontSize: 13 }}
          >
            This API is rate-limited to <strong>15 requests per 60 minutes</strong> per IP address. Plan your integration accordingly.
          </Alert>

          {/* Response schema */}
          <Box mb={5}>
            <Typography variant="subtitle1" fontWeight={700} mb={2} color="#374151">
              Response Schema
            </Typography>
            <Paper elevation={0} sx={{ border: "1px solid #e5e7eb", borderRadius: 3, overflow: "hidden" }}>
              <Box sx={{ px: 3, py: 2, backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <Typography variant="body2" fontWeight={600} color="#374151">
                  Result Object
                </Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                      {["Field", "Type", "Description"].map((h) => (
                        <TableCell key={h} sx={{ fontWeight: 700, fontSize: 12, color: "#6b7280" }}>{h}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { field: "_id", type: "string", desc: "MongoDB ObjectId of the record" },
                      { field: "csc", type: "string", desc: 'Formatted string: "City, State, Country" — comma-separated location hierarchy' },
                    ].map((row) => (
                      <TableRow key={row.field} hover>
                        <TableCell><Typography fontFamily="monospace" fontSize={13} color="#7c3aed">{row.field}</Typography></TableCell>
                        <TableCell><Typography fontFamily="monospace" fontSize={12} color="#0369a1">{row.type}</Typography></TableCell>
                        <TableCell><Typography variant="caption" color="text.secondary">{row.desc}</Typography></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          <Divider sx={{ mb: 5 }} />

          {/* Endpoints */}
          <Typography variant="h6" fontWeight={700} mb={3} color="#111827">
            Endpoints
          </Typography>
          {endpoints.map((ep) => (
            <Box key={ep.id} id={ep.id}>
              <EndpointCard ep={ep} />
            </Box>
          ))}

          {/* Integration tips */}
          <Box mt={2}>
            <Typography variant="h6" fontWeight={700} mb={3} color="#111827">
              Integration Tips
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                {
                  title: "Debounce your requests",
                  body: "Since the API is rate-limited, debounce user input by 300–500ms before firing a search request to avoid burning through your quota.",
                },
                {
                  title: "Use the csc field for display",
                  body: 'The csc field is a human-readable string like "New Delhi, Delhi, India". Use it directly in dropdowns or autocomplete inputs — it already contains the full location context.',
                },
                {
                  title: "Pagination",
                  body: "Use limit and offSet together to paginate results. For example, page 2 with 10 results per page: limit=10&offSet=10.",
                },
                {
                  title: "Minimum search length",
                  body: "Always validate that the search term is at least 2 characters on the client side before making a request to avoid unnecessary 400 errors.",
                },
              ].map((tip) => (
                <Paper
                  key={tip.title}
                  elevation={0}
                  sx={{ border: "1px solid #e5e7eb", borderRadius: 2, px: 3, py: 2 }}
                >
                  <Typography fontFamily="monospace" variant="body2" fontWeight={700} color="#374151" mb={0.5} textOverflow={"clip"}>
                    {tip.title}
                  </Typography>
                  <Typography fontFamily="monospace" variant="body2" color="text.secondary" lineHeight={1.7}>
                    {tip.body}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
