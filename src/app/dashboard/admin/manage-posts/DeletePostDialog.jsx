"use client";

import { AlertDialog, Button } from "@heroui/react";

const DeletePostDialog = ({ post, isDeleting, onConfirm, onClose }) => {
    return (
        <AlertDialog.Container
            isOpen={post !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <AlertDialog.Dialog className="sm:max-w-100">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                    <AlertDialog.Icon status="danger" />
                    <AlertDialog.Heading>Delete this post?</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                    <p>
                        This will permanently delete{" "}
                        <strong>{post?.title || "this post"}</strong> and all of its
                        comments. This action cannot be undone.
                    </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button slot="close" variant="tertiary">
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onPress={onConfirm}
                        isDisabled={isDeleting}
                    >
                        {isDeleting ? "Deleting…" : "Delete Post"}
                    </Button>
                </AlertDialog.Footer>
            </AlertDialog.Dialog>
        </AlertDialog.Container>
    );
};

export default DeletePostDialog;