import { Route, Routes } from "react-router";
import IndexPage from "./pages/index-page";
import GlobalLayout from "./components/layouts/global-layout";
import SettingsPage from "./pages/settings-page";
import { PAGE_PATHS } from "./lib/navigation";
import NotFoundPage from "./pages/not-found-page";
import StatisticsPage from "./pages/statistics-page";

const RootRoute = () => {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path={PAGE_PATHS.HOME} element={<IndexPage />} />
        <Route path={PAGE_PATHS.SETTINGS} element={<SettingsPage />} />
        <Route path={PAGE_PATHS.STATISTICS} element={<StatisticsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RootRoute;
