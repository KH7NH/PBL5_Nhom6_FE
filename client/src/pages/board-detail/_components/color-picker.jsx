/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";

const list_color = [
  "rgb(186, 243, 219)",
  "rgb(248, 230, 160)",
  "rgb(254, 222, 200)",
  "rgb(255, 213, 210)",
  "rgb(110, 93, 198)",
  "rgb(75, 206, 151)",
  "rgb(148, 111, 0)",
  "rgb(201, 55, 44)",
  "rgb(12, 102, 228)",
  "rgb(98, 111, 134)",
];

const ColorPicker = ({ color, setColor }) => {
  return (
    <Popover>
      <PopoverTrigger className="w-fit flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 items-center">
            {
                color.map((cl, index) => {
                    return (
                        <div
                            key={index}
                            className={cn(
                                "w-12 h-8 rounded-sm"
                            )}
                            style={{ backgroundColor: cl }}
                        ></div>
                    )
                })
            }
        </div>
        <div className="w-fit flex gap-1 p-1 px-2 border rounded-md items-center">
          <Tag className="w-4 h-4" />
          <span>Nhãn</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full grid grid-cols-5 gap-2">
        {list_color.map((cl, index) => {
          return (
            <div
              onClick={() => {
                if (color.includes(cl)) {
                  setColor(color.filter((c) => c !== cl));
                } else {
                  setColor([...color, cl]);
                }
              }}
              key={index}
              className={cn(
                "w-12 h-8 rounded-sm",
                color?.includes(cl) ? "border-2 border-blue-600" : ""
              )}
              style={{ backgroundColor: cl }}
            ></div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
