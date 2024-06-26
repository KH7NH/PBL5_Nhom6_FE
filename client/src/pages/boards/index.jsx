import { boardApi } from "@/apis/board.api";
import { CreateBoard } from "@/components/create-board";
import MainHeader from "@/components/main-header";
import { SideBar } from "@/components/side-bar";
import { Button } from "@/components/ui/button";
import path from "@/constants/path";
import { useQuery } from "@tanstack/react-query";
import { Columns3, LayoutGrid, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const BoardsPage = () => {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["boards"],
    queryFn: () => boardApi.getAllBoards(),
  });

  const { data: dataBoardShared } = useQuery({
    queryKey: ["boards-shared"],
    queryFn: () => boardApi.getAllBoardsShared(),
  });
  const boards = data?.data?.result || [];

  const boardShared = useMemo(() => {
    return dataBoardShared?.data?.result || [];
  }, [dataBoardShared]);

  return (
    <>
      <MainHeader setOpen={setOpen} />
      <div className="container mx-auto flex justify-center">
        <SideBar />
        <div className="w-full mt-10 mx-4">
          <div>
            {boardShared && boardShared.length > 0 && (
              <div className="pb-5">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Được chia sẻ</span>
                </div>
                <div className="w-full flex flex-wrap gap-4 mt-2">
                  {boardShared.map((board) => (
                    <Link
                      to={`${path.boards}/${board.id}`}
                      key={board.id}
                      style={{
                        backgroundImage:
                          "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x336/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg)",
                      }}
                      className="w-[23.5%] p-2 rounded-sm h-28 bg-cover mb-5"
                    >
                      <span className="text-white font-semibold text-lg">
                        {board.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
                  <Link
                    to={`${path.boards}/${board.id}`}
                    key={board.id}
                    className="w-[23.5%] p-2 rounded-sm h-28 bg-pink-700 cursor-pointer"
                  >
                    <span className="text-white font-semibold text-lg">
                      {board.name}
                    </span>
                  </Link>
                ))}

                <div
                  onClick={() => setOpen(true)}
                  className="w-[23.5%] p-2 rounded-sm h-28 bg-slate-200 flex justify-center items-center text-center"
                >
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
