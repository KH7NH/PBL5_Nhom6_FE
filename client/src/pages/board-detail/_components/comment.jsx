/* eslint-disable react/prop-types */
import { commentApi } from "@/apis/comment.api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AppContext } from "@/contexts/app.context";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useMemo, useState } from "react";

const Comment = ({ cardId }) => {
  const [comment, setComment] = useState("");
  const { profile } = useContext(AppContext);

  const { data, refetch } = useQuery({
    queryKey: ["comment", cardId],
    queryFn: () => commentApi.getListComment(cardId),
    enabled: !!cardId,
  });

  const comments = useMemo(() => {
    if (!data) return [];
    return data.data?.result;
  }, [data]);

  const createComment = useMutation({
    mutationFn: (body) => commentApi.createComment(body),
    onSuccess: () => {
      setComment("");
      refetch();
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id) => commentApi.deleteComment(id),
    onSuccess: () => {
      refetch();
    },
  });

  const handleComment = () => {
    createComment.mutate({ content: comment, card_id: cardId });
  };
  return (
    <div>
      <div className="w-full flex items-center gap-2 mt-12">
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col gap-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Viết bình luận..."
          />
          <Button onClick={handleComment} size="sm" className="w-fit">
            Lưu
          </Button>
        </div>
      </div>
      {comments?.map((comment) => (
        <div key={comment.id} className="mt-2 w-full flex items-center gap-2">
          <Avatar>
            <AvatarFallback><span className="uppercase">{comment.username[0]}</span></AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-sm font-semibold">
              {comment?.username}<span className="font-normal ml-2">{moment(comment?.createdAt).format("DD/MM/YYYY HH:MM:ss")}</span>
            </span>
            <div className="w-full p-2 border rounded-lg shadow-sm">{comment?.content}</div>
            {
              profile?.id === comment?.user_id && (<span onClick={() => deleteCommentMutation.mutate(comment.id)} className="text-sm font-medium underline cursor-pointer">
                Xoá
              </span>)
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
