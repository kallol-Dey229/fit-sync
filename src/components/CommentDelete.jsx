"use client";

import { AlertDialog, Button } from "@heroui/react";
import { deleteComment } from "@/lib/actions/comments";
import toast from "react-hot-toast";

const CommentDelete = ({ commentId, forumPostId, userId }) => {

  const handleDelete = async () => {

    const result = await deleteComment(
      commentId,
      forumPostId,
      userId
    );

    if (result.deletedCount > 0) {
      toast.success("Comment deleted.");
      window.location.reload();
    } else {
      toast.error("You are not allowed to delete this comment.");
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="light"
        className="text-red-500 text-xs"
      >
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>

            <AlertDialog.Header>
              Delete Comment?
            </AlertDialog.Header>

            <AlertDialog.Body>
              This action cannot be undone.
            </AlertDialog.Body>

            <AlertDialog.Footer>

              <Button slot="close">
                Cancel
              </Button>

              <Button
                color="danger"
                onClick={handleDelete}
              >
                Delete
              </Button>

            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default CommentDelete;