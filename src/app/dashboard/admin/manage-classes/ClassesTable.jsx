"use client";

import { useState } from "react";
import DeleteClassDialog from "./DeleteClassDialog";

const ClassesTable = ({ initialClasses }) => {
    
    const [classes, setClasses] = useState(
        Array.isArray(initialClasses) ? initialClasses.filter(Boolean) : []
    );

    const handleDeleted = (classId) => {
        setClasses((prev) => prev.filter((c) => c._id !== classId));
    };

    if (classes.length === 0) {
        return (
            <div className="rounded-xl border border-white/10 p-10 text-center">
                <p className="text-sm text-slate-400">No classes yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wide text-slate-500">
                        <th className="px-6 py-4">Class</th>
                        <th className="px-6 py-4">Trainer</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem) => (
                        <tr
                            key={classItem._id}
                            className="border-b border-white/5 last:border-0"
                        >
                            <td className="px-6 py-4 font-bold text-white">
                                {classItem.title || "Untitled class"}
                            </td>
                            <td className="px-6 py-4 text-slate-400">
                                {classItem.trainerName || "Unknown"}
                            </td>
                            <td className="px-6 py-4">
                                <span className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-xs tracking-wide text-slate-300">
                                    {(classItem.category || "").toUpperCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <DeleteClassDialog
                                    classItem={classItem}
                                    onDeleted={handleDeleted}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClassesTable;