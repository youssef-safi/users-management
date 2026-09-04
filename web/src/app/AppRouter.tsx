import { Route, Routes } from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />}></Route>
    </Routes>
  );
}
