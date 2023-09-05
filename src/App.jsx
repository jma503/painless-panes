import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import FormPage from "./pages/FormPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Navigate to="/form/1" />} />
        <Route exact path="/form/:page" element={<FormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
