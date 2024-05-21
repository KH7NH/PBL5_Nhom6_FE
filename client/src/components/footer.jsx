import { ChevronDown, Globe } from "lucide-react";
import { FacebookFilled, GooglePlusOutlined, YoutubeFilled } from "@ant-design/icons"

const menuItems = [
  {
    title: "Tìm hiểu về TASKIFY",
    children: {
      title: "Công cụ nền tảng.",
    },
  },
  {
    title: "Việc làm",
    children: {
      title: "Tìm hiểu về các vai trò chưa ai đảm nhiệm trong nhóm TASKIFY.",
    },
  },
  {
    title: "Ứng dụng",
    children: {
      title: "Tải xuống Ứng dụng TASKIFY cho Máy tính hoặc Thiết bị di động.",
    },
  },
  {
    title: "Liên hệ với chúng tôi",
    children: {
      title: "Bạn cần giúp đỡ hãy liên lạc với chúng tôi.",
    },
  },
];
const Footer = () => {
  return (
    <>
      <div className="w-full bg-[#F6F4F4]">
        <div className="container mx-auto py-8 grid grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <div key={item.title} className="w-full flex flex-col gap-4">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <span>{item.children.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-slate-white border-t border-slate-300 py-2">
        <div className="container mx-auto p-2 grid grid-cols-4 gap-8">
          <div className="flex items-center gap-2">
            <Globe />
            <span>Tiếng việt</span>
            <ChevronDown />
          </div>
          <span>Chính sách quyền riêng tư</span>
          <span>Bản quyền 2024</span>
          <div className="flex items-center gap-8">
            <FacebookFilled className="text-2xl" />
            <GooglePlusOutlined className="text-2xl" />
            <YoutubeFilled className="text-2xl" />
          </div>
        </div>
      </div>
    </> 
  );
};

export default Footer;
