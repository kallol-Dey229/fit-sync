import React from "react";
import { Table } from "@heroui/react";
import ManageUsersBlockToggle from "./ManageUsersBlockToggle";
import ManageUsersRoleToggle from "./ManageUsersRoleToggle";
import { getAllUsers } from "@/lib/api/users";

export default async function ManageUsersPage() {

  const users = await getAllUsers();


  const roleStyles = {
    member: "text-[#565B7F] bg-[#161826] border border-[#222538]",
    trainer: "text-[#FF4500] bg-[#251614] border border-[#3E1F1A]",
    admin: "text-[#FFB300] bg-[#252114] border border-[#3E351A]",
  };

  const statusStyles = {
    ACTIVE: "text-[#00E676] bg-[#0E2519] border border-[#163E26]",
    BLOCKED: "text-[#FF3D00] bg-[#251214] border border-[#3E1A1D]",
  };

  return (
    <div className="min-h-screen text-white p-8 font-sans">


      <h1 className="text-3xl font-black tracking-wider uppercase mb-8 text-[#F4F4F6]">
        Manage Users
      </h1>


      <div className="w-full border border-[#161826] rounded-2xl overflow-hidden p-2 shadow-2xl">
        <Table className="w-full text-left bg-transparent border-none">
          <Table.ScrollContainer>
            <Table.Content aria-label="User Management Table" className="min-w-200">


              <Table.Header className="border-b border-[#161826]">
                <Table.Column isRowHeader className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">USER</Table.Column>
                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">EMAIL</Table.Column>
                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">ROLE</Table.Column>
                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">STATUS</Table.Column>
                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">ACTIONS</Table.Column>
              </Table.Header>


              <Table.Body>
                {users?.map((user) => (
                  <Table.Row key={user.id || user._id} className="border-b border-[#111322]/50 hover:bg-[#111322]/30 transition-colors">


                    <Table.Cell className="p-4 font-bold text-[#F4F4F6] text-sm">
                      {user.name}
                    </Table.Cell>


                    <Table.Cell className="p-4 text-sm text-[#4A4E69] font-mono">
                      {user.email}
                    </Table.Cell>


                    <Table.Cell className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest uppercase ${roleStyles[user.role] || roleStyles.member}`}>
                        {user.role}
                      </span>
                    </Table.Cell>


                    <Table.Cell className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest ${statusStyles[user.status] || statusStyles.ACTIVE}`}>
                        {user.status}
                      </span>
                    </Table.Cell>


                    <Table.Cell className="p-4">
                      <div className="flex items-center gap-3">
                        <ManageUsersBlockToggle user={user} />
                        <ManageUsersRoleToggle user={user} />
                      </div>
                    </Table.Cell>

                  </Table.Row>
                ))}
              </Table.Body>

            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

    </div>
  );
}