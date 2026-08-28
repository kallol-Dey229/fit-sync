"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import AllClassesCard from "./AllClassesCard";


const AllClassesGrid = ({ initialClasses }) => {
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");

    const classes = Array.isArray(initialClasses) ? initialClasses.filter(Boolean) : [];

    const handleSearch = () => {
        setSearch(query.trim());
    };

    const filteredClasses = classes.filter((c) =>
        (c.title || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="flex gap-3 mb-8 max-w-md">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search classes by title..."
                        className="w-full bg-card border border-card-border rounded-lg pl-11 pr-4 py-3 text-sm text-foreground placeholder-muted focus:outline-none focus:border-[#ff5a1f]/50"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-[#ff5a1f] hover:bg-[#e04f1a] text-white font-black uppercase tracking-wider text-xs px-6 rounded-lg transition-colors shrink-0 hover:cursor-pointer">
                    Search
                </button>
            </div>

            {filteredClasses.length === 0 ? (
                <div className="rounded-xl border border-card-border bg-card p-10 text-center">
                    <p className="text-sm text-muted">
                        No classes match &quot;{search}&quot;.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredClasses.map((classes) => (
                        <AllClassesCard key={classes._id} classes={classes} />
                    ))}
                </div>
            )}
        </>
    );
};

export default AllClassesGrid;