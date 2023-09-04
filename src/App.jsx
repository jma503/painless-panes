import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import FormPage from "./pages/FormPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
  <Layout>
    <Routes>
      <Route exact path="/:page?" element={<FormPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Layout>
  );
}
