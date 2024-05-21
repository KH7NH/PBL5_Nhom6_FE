import { CreateBoard } from "@/components/create-board";
import MainHeader from "@/components/main-header";
import { SideBar } from "@/components/side-bar";
import { Button } from "@/components/ui/button";
import path from "@/constants/path";
import { getBoards } from "@/lib/dump";
import { Clock9, Columns3, LayoutGrid, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BoardsPage = () => {
  const [boards, setBoards] = useState(getBoards());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setBoards(getBoards())
  }, [open])
  
  return (
    <>
      <MainHeader setOpen={setOpen} />
      <div className="container mx-auto flex justify-center">
        <SideBar />
        <div className="w-full mt-10 mx-4">
          <div>
            <div className="pb-5">
              <div className="flex items-center gap-2">
                <Clock9 className="w-6 h-6" />
                <span className="font-medium">Gần đây</span>
              </div>
              <div className="w-full flex flex-wrap gap-4 mt-2">
                <div
                  style={{
                    backgroundImage:
                      "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x300/95020ee27beb21fb11c7b3ad5ad8b307/photo-1706820643404-71812d9d7d3a.jpg)",
                  }}
                  className="w-[23.5%] p-2 rounded-sm h-28 bg-cover mb-5"
                >
                  <span className="text-white font-semibold text-lg">
                    Project 1
                  </span>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div className="flex items-center gap-2">
                <span className="font-medium uppercase">
                  CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
                </span>
              </div>
              <div className="flex justify-between items-center gap-2 mt-4">
                <div className="flex items-center bg-transparent rounded-md font-medium gap-2 min-h-5 overflow-hidden py-1">
                  <div className="flex items-center justify-center text-white font-bold text-sm rounded h-10 w-10 bg-green-400">
                    T
                  </div>
                  <span className="text-base font-semibold">
                    TASKIFY không gian làm việc
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    className="flex items-center gap-1"
                    variant="secondary"
                    size="sm"
                  >
                    <Columns3 className="w-4 h-4" />
                    <span>Bảng</span>
                  </Button>
                  <Button
                    className="flex items-center gap-1"
                    variant="secondary"
                    size="sm"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Dạng xem</span>
                  </Button>
                  <Button
                    className="flex items-center gap-1"
                    variant="secondary"
                    size="sm"
                  >
                    <Users className="w-4 h-4" />
                    <span>Thành viên</span>
                  </Button>
                </div>
              </div>
              <div className="w-full flex flex-wrap gap-4 mt-2">
                {boards.map((board) => (
                  <Link to={`${path.boards}/${board.id}`}
                    key={board.title}
                    className="w-[23.5%] p-2 rounded-sm h-28 bg-pink-700 cursor-pointer"
                  >
                    <span className="text-white font-semibold text-lg">
                      {board.title}
                    </span>
                  </Link>
                ))}

                <div onClick={() => setOpen(true)} className="w-[23.5%] p-2 rounded-sm h-28 bg-slate-200 flex justify-center items-center text-center">
                  <span className="text-slate-600">Tạo bảng mới</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateBoard open={open} setOpen={setOpen} />
    </>
  );
};

export default BoardsPage;
