/* eslint-disable react/prop-types */
import { memberApi } from "@/apis/member.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ShareForm = ({ boardId, members }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const addMemberMutation = useMutation({
    mutationFn: (body) => memberApi.addMember(body),
    onSuccess: () => {
      toast.success("Chia sẻ bảng thành công");
      setOpen(false);
      setUsername("");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  const handleSubmit = () => {
    addMemberMutation.mutate({ boardId, username });
  };

  console.log("members", members);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span>Chia sẻ</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chia sẻ bảng</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="link"
              placeholder="Nhập username"
            />
          </div>
        </div>
        <h5>Các thành viên:</h5>
        <div className="flex flex-col gap-2">
          {
            members && members.map((member) => (
              <div
                className="p-2 bg-slate-200 rounded-lg"
                key={member.id}
              >
                <span className="font-medium">{member.username}</span>
                <p className="text-slate-500">{member.email}</p>
              </div>
            ))
          }
        </div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleSubmit} type="button">
            Chia sẻ
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareForm;
