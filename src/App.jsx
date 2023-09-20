import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import FormPage from "./pages/FormPage";
import NotFoundPage from "./pages/NotFoundPage";
import PriorProjectsPage from "./pages/PriorProjectsPage"

export default function App() {
  return (
    <Layout>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Navigate to="/form/1" />} />
        <Route exact path="/form/:page" element={<FormPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route exact path="/projects" element={<PriorProjectsPage />} />
      </Routes>
    </Layout>
  );
}
