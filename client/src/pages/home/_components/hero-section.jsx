import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrelloUIImage from "@/assets/TrelloUICollage.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#00B8D9] to-[#DFF0F3] ">
      <div className="container mx-auto">
        <div className="w-full grid grid-cols-2">
          <div className="w-full py-32 px-4">
            <div className="box-border">
              <h1 className="text-5xl font-bold mb-2 text-slate-50">
              TASKIFY tập hợp tất cả nhiệm vụ, thành viên nhóm và công cụ của bạn lại với nhau
              </h1>
            </div>
            <div className="h-6" />
            <div className="w-full flex flex-col gap-4">
              <Input className="w-96" type="text" placeholder="Email" />
              <Button variant="main" className="w-fit" >Đăng ký</Button>
            </div>
            <div className="h-6" />
          </div>
          <div className="w-full px-4 pt-32">
            <img
              src={TrelloUIImage}
              className="w-full h-auto"
              alt
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
