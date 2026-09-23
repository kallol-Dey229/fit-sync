"use client";

import { Table, Button } from "@heroui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import DeleteClassDialog from "../../admin/manage-classes/DeleteClassDialog";
import { useState } from "react";
import Link from "next/link";

const TrainerClassesList = ({ initialClasses = [] }) => {
  const [classes, setClasses] = useState(initialClasses);

  return (
    <div className="bg-[#141522] border border-[#222538] rounded-2xl p-4 shadow-2xl">
      {classes.length === 0 ? (
        <p className="py-10 text-center text-sm text-[#717694]">
          You have not created any classes yet.
        </p>
      ) : (
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="My Classes List"
              className="min-w-150"
              classNames={{
                th: "bg-transparent text-[#717694] font-bold text-xs uppercase tracking-widest p-4 border-b border-[#222538]",
                tr: "border-b border-[#1C1E30]/60 last:border-0 hover:bg-[#1C1E30]/30 transition",
                td: "p-4 align-middle",
              }}
            >
              <Table.Header>
                <Table.Column id="name" isRowHeader>CLASS</Table.Column>
                <Table.Column id="category">CATEGORY</Table.Column>
                <Table.Column id="bookings">BOOKINGS</Table.Column>
                <Table.Column id="status">STATUS</Table.Column>
                <Table.Column id="actions" className="text-right">ACTIONS</Table.Column>
              </Table.Header>

              <Table.Body>
                {classes.map((item) => (
                  <Table.Row key={item._id || item.id}>
                    <Table.Cell className="font-bold text-white text-base">{item.title}</Table.Cell>
                    <Table.Cell>
                      <span className="border border-[#2A2D44] bg-[#1C1E30]/50 text-[#717694] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md inline-block">
                        {item.category || "General"}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="text-[#8E94B7] font-semibold text-base">
                      {item.bookings ?? item.totalBookings ?? 0}
                    </Table.Cell>
                    <Table.Cell>
                      <span className="border border-[#144634] bg-[#0E2820] text-[#10B981] text-xs font-black tracking-wider px-3 py-1.5 rounded-lg inline-block">
                        {(item.status || "active").toUpperCase()}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <div className="flex flex-wrap items-center justify-end gap-2.5">
                        <Button size="sm" variant="secondary" isDisabled className="border-[#222538] text-zinc-400 font-medium rounded-lg h-9 text-xs px-3 min-w-0">
                          <FaEdit />
                          Edit
                        </Button>
                        <DeleteClassDialog
                          classItem={item}
                          onDeleted={(id) => setClasses((current) => current.filter((entry) => entry._id !== id))}
                        />
                        <Link href="/dashboard/trainer/students" className="inline-flex h-9 min-w-0 items-center gap-2 rounded-lg border border-[#104454] px-3 text-xs font-bold text-white transition-colors hover:bg-[#104454]/30">
                          <FaUser size={14} />
                          Students
                        </Link>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}
    </div>
  );
};

export default TrainerClassesList;
