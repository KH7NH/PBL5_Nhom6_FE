/* eslint-disable react/prop-types */
import { listApi } from "@/apis/list.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const AddListForm = ({ setList, boardId }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")

  const createListMutation = useMutation({
    mutationFn: (data) => listApi.createList(data),
    onSuccess: (data) => {
      setList((prev) => [...prev, data?.data?.result])
      setOpen(false)
      setTitle("")
    }
  })
  const handleAddList = () => {
    createListMutation.mutate({
      name: title,
      board_id: boardId
    })
  }
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={cn(
          "w-72 rounded-xl bg-white/50 text-slate-600 text-sm h-fit px-4 py-2 cursor-pointer",
          open && "hidden"
        )}
      >
        <div className="flex gap-4 items-center">
          <Plus className="w-4 h-4" />
          Thêm danh sách
        </div>
      </div>
      <div
        className={cn(
          "w-72 rounded-xl bg-slate-50 text-sm h-fit px-4 py-2 cursor-pointer",
          !open && "hidden"
        )}
      >
        <Input
          className="w-full"
          type="text"
          placeholder="Nhập tên danh sách"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-2 items-center mt-2">
          <Button onClick={handleAddList} variant="main">Thêm</Button>
          <X
            onClick={() => setOpen(false)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default AddListForm;
