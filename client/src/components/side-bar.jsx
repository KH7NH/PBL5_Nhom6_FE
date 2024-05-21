import { Columns3, Heart, LayoutDashboard, Plus, Settings, Users, Warehouse } from "lucide-react"

export const SideBar = () => {
  return (
    <div className="w-80 max-h-[90vh] mt-10 px-4 sticky top-10">
        <ul className="w-full border-b">
            <li className="mb-1">
                <div className="bg-blue-100 text-blue-600 flex items-center rounded-md font-medium gap-2 min-h-5 overflow-hidden py-1 px-2">
                    <Columns3 className="w-4 h-4" />
                    <span>Bảng</span>
                </div>
            </li>
            <li className="mb-1">
                <div className="flex items-center rounded-md font-medium gap-2 min-h-5 overflow-hidden py-1 px-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Mẫu</span>
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
            <div className="h-8 pl-3 text-xs font-semibold text-slate-600 py-2">
                Không gian làm việc
            </div>
            <li className="mb-1">
                <div className="flex items-center bg-transparent rounded-md font-medium gap-2 min-h-5 overflow-hidden py-1 px-2">
                    <div className="flex items-center justify-center text-white font-bold text-sm rounded h-6 w-6 bg-green-400">T</div>
                    <span className="text-sm">TASKIFY không gian làm việc</span>
                </div>
                <ul>
                    <li className="mb-1">
                        <div className="mt-1 min-h-6 py-1 pt-2 pl-10 flex items-center bg-transparent rounded-md gap-2 overflow-hidden">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">Yêu thích</span>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="mt-1 min-h-6 py-1 pt-2 pl-10 flex items-center bg-transparent rounded-md gap-2 overflow-hidden">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">Thành viên</span>
                            <Plus className="w-4 h-4 ml-auto" />
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="mt-1 min-h-6 py-1 pt-2 pl-10 flex items-center bg-transparent rounded-md gap-2 overflow-hidden">
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">Cài đặt</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
  )
}
