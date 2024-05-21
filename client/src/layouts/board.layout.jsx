import MainHeader from "@/components/main-header";
import { SideBar } from "@/components/side-bar";

/* eslint-disable react/prop-types */
const BoardLayout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <div className="container mx-auto flex justify-center">
        <SideBar />
        <div className="w-full mt-10 mx-4">
        {children}
        </div>
      </div>
    </>
  );
};

export default BoardLayout;
