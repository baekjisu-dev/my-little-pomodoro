import { Outlet } from "react-router";
import Header from "./header";
import { ScrollArea } from "../ui/scroll-area";

const GlobalLayout = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Header />
      <ScrollArea className="w-full h-[calc(100%-4rem)]">
        <div className="w-full max-w-2xl mx-auto">
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  );
};

export default GlobalLayout;
