import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Detect } from "./pages/Detect";
import { Bins } from "./pages/Bins";
import { Alerts } from "./pages/Alerts";
import { Collections } from "./pages/Collections";
import { Analytics } from "./pages/Analytics";
import { About } from "./pages/About";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Detect />} />
        <Route path="/bins" element={<Bins />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
