/* eslint-disable react/prop-types */
import path from "@/constants/path";
import Logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AppContext } from "@/contexts/app.context";
import { clearLS } from "@/utils/auth";

const menuItems = [
  {
    title: "Gần đây",
    path: path.home,
  },
  {
    title: "Đã đánh dấu sao",
    path: path.home,
  },
  {
    title: "Mẫu",
    path: path.home,
  },
];

const MainHeader = ({setOpen = () => {}}) => {
  const {reset} = useContext(AppContext)
  const handleLogout = () => {
    reset()
    clearLS()
  }
  return (
    <div className="header px-2 flex items-center bg-white shadow-md h-16 w-full z-10">
      <Link className="py-3 px-8" to={path.home}>
        <img className="w-14" src={Logo} alt="" />
      </Link>
      <div className="flex items-center text-slate-800">
        {menuItems.map((item) => (
          <Link key={item.title} to={item.path}>
            <button className="p-4 py-5 h-full flex items-center gap-1">
              {item.title}
              <svg
                className="w-2"
                fill="currentColor"
                height={8}
                viewBox="0 0 13 8"
                width={13}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m11.7305.59279c.3626.362629.3885.93447.0777 1.32699l-.0777.08722-4.99999 4.99999c-.36263.36263-.93446.38853-1.32697.0777l-.08725-.0777-4.999959-4.99997c-.3905249-.39052-.3905242-1.023685 0-1.414209.362629-.36263.934469-.388553 1.326989-.077728l.08722.077728 4.29292 4.292139 4.29284-4.29216c.3626-.36263.9345-.388532 1.327-.077707z"></path>
              </svg>
            </button>
          </Link>
        ))}
        <Button onClick={() => setOpen(true)} variant="main" className="ml-4">Tạo mới</Button>
      </div>
      <div className="flex items-center ml-auto h-full gap-4">
        <Input placeholder="Tìm kiếm" />
        <Bell className="w-10 h-10" />
        <Avatar>
          <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
        </Avatar>
        <Button onClick={handleLogout} variant="outline">Đăng xuất</Button>
      </div>
    </div>
  );
};

export default MainHeader;
