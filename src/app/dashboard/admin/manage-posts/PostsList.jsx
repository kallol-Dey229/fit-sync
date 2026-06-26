"use client";

import { deleteForumPost } from "@/lib/actions/posts";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import DeletePostDialog from "./DeletePostDialog";

const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const PostsList = ({ initialPosts }) => {
    const [posts, setPosts] = useState(initialPosts);
    const [deletingId, setDeletingId] = useState(null);
    const [pendingPost, setPendingPost] = useState(null);
    const [error, setError] = useState(null);

    const requestDelete = (post) => {
        setError(null);
        setPendingPost(post);
    };

    const confirmDelete = async () => {
        if (!pendingPost) return;
        const postId = pendingPost._id;

        setError(null);
        setDeletingId(postId);

        try {
            await deleteForumPost(postId);
            setPosts((prev) => prev.filter((p) => p._id !== postId));
        } catch (err) {
            setError("Couldn't delete the post. Try again.");
        } finally {
            setDeletingId(null);
            setPendingPost(null);
        }
    };

    if (!posts || posts.length === 0) {
        return (
            <div className="rounded-xl border border-white/10 bg-[#13131f] p-10 text-center">
                <p className="text-sm text-slate-400">No forum posts yet.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {error && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                    {error}
                </p>
            )}

            {posts.map((post) => {
                const postId = post._id;
                const isDeleting = deletingId === postId;
                const authorName = post.Name || "Unknown";
                const role = (post.role || "member").toUpperCase();
                const dateLabel = formatDate(post.createdAt || post.date);

                return (
                    <article
                        key={postId}
                        className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#13131f] p-4 transition-opacity sm:p-5"
                        style={{ opacity: isDeleting ? 0.5 : 1 }}
                    >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5 sm:h-20 sm:w-20">
                            {post.photo ? (
                                <Image
                                    src={post.photo}
                                    height={100}
                                    width={100}
                                    alt="post image"
                                    className="h-full w-full object-cover"
                                />
                            ) : null}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-base font-bold text-white sm:text-lg">
                                {post.title || "Untitled post"}
                            </h2>
                            <p className="mt-1 truncate text-sm text-slate-400">
                                {authorName}
                                {dateLabel ? ` · ${dateLabel}` : ""}
                            </p>
                        </div>

                        <span className="hidden shrink-0 rounded-md border border-white/15 px-3 py-1.5 font-mono text-xs tracking-wide text-slate-300 sm:inline-block">
                            {role}
                        </span>

                        <Button
                            type="button"
                            variant="danger"
                            onPress={() => requestDelete(post)}
                            isDisabled={isDeleting}
                            className="flex shrink-0 items-center gap-1.5 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <TrashIcon />
                            {isDeleting ? "Deleting…" : "Delete"}
                        </Button>
                    </article>
                );
            })}

            <DeletePostDialog
                post={pendingPost}
                isDeleting={deletingId !== null}
                onConfirm={confirmDelete}
                onClose={() => setPendingPost(null)}
            />
        </div>
    );
};

const TrashIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
    </svg>
);

export default PostsList;