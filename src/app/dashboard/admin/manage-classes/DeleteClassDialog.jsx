"use client";

import { AlertDialog, Button } from "@heroui/react";

import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { deleteClass } from "@/lib/actions/classes";

const DeleteClassDialog = ({ classItem, onDeleted }) => {

    const handleDelete = async () => {
        const result = await deleteClass(classItem._id);

        if (result?.error) {
            toast.error(result.message || "Couldn't delete the class.");
            return;
        }

        if (result?.deletedCount > 0) {
            onDeleted(classItem._id);
        } else {
            toast.error("Couldn't delete the class.");
        }
    };

    return (
        <AlertDialog>
            <Button
                type="button"
                variant="danger"
                className="flex items-center gap-1.5 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-400 hover:bg-red-500/20"
            >
                <Trash />
                Delete
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete this class?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete{" "}
                                <strong>{classItem.title || "this class"}</strong>. This
                                action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button variant="danger" onPress={handleDelete}>
                                Delete Class
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};


export default DeleteClassDialog;