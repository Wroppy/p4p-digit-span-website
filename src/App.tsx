import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import PracticePage from "./pages/PracticePage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="test" element={<TestPage />} />
      </Route>
    </Routes>
  );
}

export default App;
