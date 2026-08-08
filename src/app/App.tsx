import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ShowcaseIndexPage from "@/pages/ShowcaseIndexPage";
import ShowcaseDetailPage from "@/pages/ShowcaseDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/showcase" element={<ShowcaseIndexPage />} />
        <Route path="/showcase/:slug" element={<ShowcaseDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
