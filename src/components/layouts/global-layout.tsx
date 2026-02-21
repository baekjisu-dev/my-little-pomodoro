import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./header";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { useMemo } from "react";
import { NAV_TABS } from "@/lib/navigation";
import { useIsRunning } from "@/stores/pomodoro-status";

const GlobalLayout = () => {
  const isRunning = useIsRunning();
  const navigate = useNavigate();
  const pathname = useLocation();

  const activeTabPath = useMemo(() => {
    return NAV_TABS.find((tab) => tab.path === pathname.pathname)?.path;
  }, [pathname]);

  const handleTabClick = (path: string) => {
    if (path === activeTabPath) return;

    navigate(path);
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col justify-center">
      <Header />
      <div className="w-full max-w-2xl mx-auto h-135 overflow-auto">
        <ButtonGroup className="w-full flex justify-center mt-4">
          {NAV_TABS.map((tab) => (
            <Button
              key={tab.path}
              className="w-16"
              variant={activeTabPath === tab.path ? "default" : "outline"}
              disabled={isRunning && activeTabPath !== tab.path}
              onClick={() => handleTabClick(tab.path)}
            >
              {tab.label}
            </Button>
          ))}
        </ButtonGroup>
        <Outlet />
      </div>
    </div>
  );
};

export default GlobalLayout;
