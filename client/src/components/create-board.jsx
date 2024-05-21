/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createBoard } from "@/lib/dump"
import { useState } from "react"

export function CreateBoard({ open, setOpen }) {
  const [title, setTitle] = useState("")

  const handleCreateBoard = () => {
    if(title) {
      createBoard({ title })
      setOpen(false)
      setTitle("")
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo bảng</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Tiêu đề
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Thành viên
            </Label>
            <Input
              id="title"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Mô tả
            </Label>
            <Textarea />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateBoard} variant="main">Tạo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
