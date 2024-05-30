import Logo from "@/assets/logo.png";
import path from "@/constants/path";
import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Tính năng",
    path: path.home,
  },
  {
    title: "Giải pháp",
    path: path.home,
  },
  {
    title: "Tài liệu",
    path: path.home,
  },
];

const Header = () => {
  const {isAuthenticated} = useContext(AppContext);
  return (
    <div className="header px-2 flex items-center bg-white shadow-md h-16 fixed top-0 left-0 right-0 w-full z-10">
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
      </div>
      <div className="flex items-stretch ml-auto h-full">
        {
          !isAuthenticated && <><Link
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
        </Link></>
        }
        {
          isAuthenticated && <><Link
          to={path.boards}
          className="text-lg text-slate-50 py-5 px-6 h-full cursor-pointer bg-blue-600 hover:bg-blue-800"
        >
          Dashboard
        </Link></>
        }
        
      </div>
    </div>
  );
};

export default Header;
