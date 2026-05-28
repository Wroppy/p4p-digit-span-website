import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import TlxPage from "./pages/TlxPage";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="tlx" element={<TlxPage />} />
      </Route>
    </Routes>
  );
}

export default App;
