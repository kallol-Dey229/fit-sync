"use client";

import { AlertDialog, Button } from "@heroui/react";

const DeletePostDialog = ({ post, isDeleting, onConfirm, onClose }) => {
  return (
    <AlertDialog.Container
      isOpen={post !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <AlertDialog.Dialog>
        <AlertDialog.Header>
          <AlertDialog.Icon status="danger" />
          <AlertDialog.Heading>Delete this post?</AlertDialog.Heading>
        </AlertDialog.Header>

        <AlertDialog.Body>
          <p>This action will delete {post?.title}. This can not be undone.</p>
        </AlertDialog.Body>

        <AlertDialog.Footer>
          <Button slot="close" variant="tertiary">
            Cancel
          </Button>
          <Button variant="danger" onPress={onConfirm} isDisabled={isDeleting}>
            {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Dialog>
    </AlertDialog.Container>
  );
};

export default DeletePostDialog;