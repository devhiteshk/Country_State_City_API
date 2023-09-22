import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<>Login</>} />
        <Route path="/" element={<>HomePage</>} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
