import MainHeader from "@/components/main-header";
import BoardContent from "@/pages/board-detail/_components/board-content";
import { SideBar } from "@/pages/board-detail/_components/side-bar";

const BoardDetail = () => {

  return (
    <>
      <MainHeader />
      <div className="flex justify-center">
        <SideBar />
        <div style={{ width: "calc(100% - 320px)" }} className="overflow-x-scroll">
          <BoardContent />
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
