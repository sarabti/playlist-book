import { ChevronLeft, PanelRightDashed } from "lucide-react";
import { useMatches } from "react-router";

const translatePageRoute = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "خانه";
    case "/playlist":
      return "پلی لیست";
    case "/dashboard":
      return "داشبورد";
    case "/screen":
      return "اسکرین";
    default:
      return "صفحه";
  }
};

const PageNav = () => {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  return (
    <div className="flex flex-row items-center space-x-1">
      <PanelRightDashed className="w-4 h-4 text-base-700" />
      <ChevronLeft className="w-4 h-4 text-base-700" />
      <p className="text-btn text-base-700">
        {translatePageRoute(currentMatch.pathname)}
      </p>
    </div>
  );
};

export default PageNav;
