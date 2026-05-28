import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<div>Application</div>} />
      </Route>
    </Routes>
  );
}

export default App;
