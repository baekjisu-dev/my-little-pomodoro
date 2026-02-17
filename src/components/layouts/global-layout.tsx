import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./header";
import { ScrollArea } from "../ui/scroll-area";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { useMemo } from "react";
import { NAV_TABS } from "@/lib/navigation";

const GlobalLayout = () => {
  const navigate = useNavigate();
  const pathname = useLocation();

  const activeTabPath = useMemo(() => {
    return NAV_TABS.find((tab) => tab.path === pathname.pathname)?.path;
  }, [pathname]);

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Header />
      <ScrollArea className="w-full h-[calc(100%-4rem)]">
        <div className="w-full max-w-2xl mx-auto">
          <ButtonGroup className="w-full flex justify-center mt-4">
            {NAV_TABS.map((tab) => (
              <Button
                key={tab.path}
                className="w-16"
                variant={activeTabPath === tab.path ? "default" : "outline"}
                onClick={() => handleTabClick(tab.path)}
              >
                {tab.label}
              </Button>
            ))}
          </ButtonGroup>
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  );
};

export default GlobalLayout;
