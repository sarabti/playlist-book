import { ChevronLeft, PanelRightDashed } from "lucide-react";
import { useMatches } from "react-router";

const translatePageRoute = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "خانه";
    case "/dashboard":
      return "داشبورد";
    case "/screen":
      return "اسکرین";
    case "/channel":
      return "کانال";
    case "/playlist":
      return "پلی لیست";
    case "/media":
      return "مدیا";
    case "/link":
      return "لینک";
    case "/report":
      return "گزارش‌ها";
    case "/ticket":
      return "تیکت";
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
