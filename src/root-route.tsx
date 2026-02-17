import { Route, Routes } from "react-router";
import IndexPage from "./pages/index-page";
import GlobalLayout from "./components/layouts/global-layout";
import SettingsPage from "./pages/settings-page";
import HeatmapPage from "./pages/heatmap-page";

const RootRoute = () => {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
      </Route>
    </Routes>
  );
};

export default RootRoute;
