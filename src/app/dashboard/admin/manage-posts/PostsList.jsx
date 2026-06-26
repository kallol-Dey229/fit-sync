"use client";

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
    const [posts, setPosts] = useState(
        Array.isArray(initialPosts) ? initialPosts.filter(Boolean) : []
    );

    const handleDeleted = (postId) => {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
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
            {posts.map((post) => {
                const authorName = post.Name || "Unknown";
                const role = (post.role || "member").toUpperCase();
                const dateLabel = formatDate(post.createdAt || post.date);

                return (
                    <article
                        key={post._id}
                        className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#13131f] p-4 sm:p-5"
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

                        <DeletePostDialog post={post} onDeleted={handleDeleted} />
                    </article>
                );
            })}
        </div>
    );
};

export default PostsList;