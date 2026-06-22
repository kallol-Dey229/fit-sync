import React from "react";
import { Table, Button } from "@heroui/react";
import { XCircle, Shield, CheckCircle } from "lucide-react";
import { getAllUsers } from "@/lib/api/users";

export default async function ManageUsersPage() {
  
  const users = await getAllUsers();
  
 
  const roleStyles = {
    USER: "text-[#565B7F] bg-[#161826] border border-[#222538]",
    TRAINER: "text-[#FF4500] bg-[#251614] border border-[#3E1F1A]",
    ADMIN: "text-[#FFB300] bg-[#252114] border border-[#3E351A]",
  };

  const statusStyles = {
    ACTIVE: "text-[#00E676] bg-[#0E2519] border border-[#163E26]",
    BLOCKED: "text-[#FF3D00] bg-[#251214] border border-[#3E1A1D]",
  };

  return (
    <div className="min-h-screen bg-[#060713] text-white p-8 font-sans">
      
      
      <h1 className="text-3xl font-black tracking-wider uppercase mb-8 text-[#F4F4F6]">
        Manage Users
      </h1>

      
      <div className="w-full bg-[#090A15] border border-[#161826] rounded-2xl overflow-hidden p-2 shadow-2xl">
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
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest ${roleStyles[user.role] || roleStyles.USER}`}>
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
                        {user.status === "ACTIVE" ? (
                          <Button 
                            size="sm"
                            className="bg-transparent text-[#FF3D00] hover:bg-[#251214] font-bold text-xs px-3 h-8 border border-transparent hover:border-[#3E1A1D] rounded-lg flex items-center gap-1.5"
                          >
                            <XCircle size={14} />
                            Block
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            className="bg-transparent text-[#00E676] hover:bg-[#0E2519] font-bold text-xs px-3 h-8 border border-transparent hover:border-[#163E26] rounded-lg flex items-center gap-1.5"
                          >
                            <CheckCircle size={14} />
                            Unblock
                          </Button>
                        )}

                        {user.role !== "ADMIN" && (
                          <Button 
                            size="sm"
                            className="bg-transparent text-[#FFB300] hover:bg-[#252114] font-bold text-xs px-3 h-8 border border-transparent hover:border-[#3E351A] rounded-lg flex items-center gap-1.5"
                          >
                            <Shield size={14} />
                            Make Admin
                          </Button>
                        )}
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