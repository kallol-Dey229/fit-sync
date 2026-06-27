"use client";

import { AlertDialog, Button } from "@heroui/react";
import { editComment } from "@/lib/actions/comments";
import toast from "react-hot-toast";
import { useState } from "react";

const CommentEdit = ({ commentId, forumPostId, userId, initialComment }) => {

  const [text, setText] = useState(initialComment);

  const handleSave = async () => {

    const result = await editComment(
      commentId,
      forumPostId,
      userId,
      text
    );

    if (result.modifiedCount > 0) {
      toast.success("Comment updated.");
      window.location.reload();
    } else {
      toast.error("You are not allowed to edit this comment.");
    }
  };

  return (
    <AlertDialog>
      <Button variant="light" className="text-blue-800 text-xs hover:bg-gray-800 ">
        Edit
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>

            <AlertDialog.Header>
              Edit Comment
            </AlertDialog.Header>

            <AlertDialog.Body>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full bg-[#111116] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none"
              />
            </AlertDialog.Body>

            <AlertDialog.Footer>

              <Button slot="close">
                Cancel
              </Button>

              <Button
                color="primary"
                onClick={handleSave}
                disabled={!text.trim()}
              >
                Save
              </Button>

            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default CommentEdit;