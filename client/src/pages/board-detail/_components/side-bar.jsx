import {
  Calendar,
  Columns3,
  Plus,
  Table,
  Users,
  Warehouse,
} from "lucide-react";

export const SideBar = () => {
  return (
    <div style={{ height: "calc(100vh - 64px)" }} className="w-80 pt-2 px-4 sticky top-10 border-r">
      <ul className="w-full border-b">
        <li className="mb-1">
          <div className="flex items-center rounded-md font-medium gap-2 min-h-5 overflow-hidden py-1 px-2">
            <Columns3 className="w-4 h-4" />
            <span>Bảng</span>
          </div>
        </li>
        <li className="mb-1">
          <div className="flex items-center rounded-md font-medium gap-2 min-h-5 overflow-hidden py-1 px-2">
            <Users className="w-4 h-4" />
            <span>Thành viên</span>
            <Plus className="w-4 h-4 ml-auto" />
          </div>
        </li>
        <li className="mb-1">
          <div className="flex items-center rounded-md font-medium gap-2 min-h-5 overflow-hidden py-1 px-2">
            <Warehouse className="w-4 h-4" />
            <span>Trang chủ</span>
          </div>
        </li>
      </ul>
      <ul className="pt-3 pb-10">
        <div className="h-8 text-sm font-semibold text-slate-600 py-2">
          Dạng xem không gian làm việc
        </div>
        <li className="mb-1">
          <ul>
            <li className="mb-1">
              <div className="mt-1 min-h-6 py-1 pt-2 flex items-center bg-transparent rounded-md gap-2 overflow-hidden">
                <Table className="w-4 h-4" />
                <span className="text-sm">Bảng</span>
              </div>
            </li>
            <li className="mb-1">
              <div className="mt-1 min-h-6 py-1 pt-2 flex items-center bg-transparent rounded-md gap-2 overflow-hidden">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Lịch</span>
                <Plus className="w-4 h-4 ml-auto" />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
