import Logo from "@/assets/logo.png";
import path from "@/constants/path";
import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Tính năng",
    path: path.home,
    components: [
      {
        title: "Dạng xem",
        desc: "Xem các dự án nhóm của bạn từ mọi góc độ.",
      },
      {
        title: "Tiện ích bổ sung",
        desc: "Tăng cường sức mạnh cho nhóm bằng cách liên kết các công cụ yêu thích của nhóm",
      },
      {
        title: "Kế hoạch",
        desc: "Cung cấp cho nhóm của bạn kế hoạch chi tiết dẫn tới thành công",
      },
    ],
  },
  {
    title: "Giải pháp",
    path: path.home,
    components: [
      {
        title: "Quản lý dự án",
        desc: "Sử dụng các bảng quản lý và tính năng lộ trình phát triển.",
      },
      {
        title: "Quản lý thời gian",
        desc: "Giúp nhóm của bạn quản lý thời gian hợp lý.",
      },
    ],
  },
  {
    title: "Tài liệu",
    path: path.home,
    components: [
      {
        title: "Tài nguyên trợ giúp",
        desc: "Bạn cần giúp đỡ , các bài viết và câu hỏi thường gặp giúp gỡ rồi cho bạn.",
      },
      {
        title: "Hướng dẫn",
        desc: "Cung cấp cho nhóm của bạn kế hoạch chi tiết dẫn tới thành công",
      },
    ],
  },
];

const Header = () => {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <div className="header px-2 flex items-center bg-white shadow-md h-16 fixed top-0 left-0 right-0 w-full z-10">
      <Link className="py-3 px-8" to={path.home}>
        <img className="w-14" src={Logo} alt="" />
      </Link>
      <div className="flex items-center text-slate-800">
        {menuItems.map((item) => (
          <div key={item.title}>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <button className="p-4 py-5 h-full flex items-center gap-1">
                      {item.title}
                    </button>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[700px] gap-3 p-4 grid-cols-3 ">
                      {item.components.map((component) => (
                        <li key={component.title}>
                          <div
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">
                              {component.title}
                            </div>
                            <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
                              {component.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        ))}
      </div>
      <div className="flex items-stretch ml-auto h-full">
        {!isAuthenticated && (
          <>
            <Link
              to={path.login}
              className="text-lg text-slate-800 py-5 px-6 h-full cursor-pointer"
            >
              Đăng nhập
            </Link>
            <Link
              to={path.register}
              className="text-lg text-slate-50 py-5 px-6 h-full cursor-pointer bg-blue-600 hover:bg-blue-800"
            >
              Đăng ký
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link
              to={path.boards}
              className="text-lg text-slate-50 py-5 px-6 h-full cursor-pointer bg-blue-600 hover:bg-blue-800"
            >
              Danh sách bảng
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
