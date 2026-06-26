import React from "react";
import { Table } from "@heroui/react";
import { getAllApplication } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";
import AppliedTrainersPageReject from "./AppliedTrainersPageReject";
import AppliedTrainersPageApprove from "./AppliedTrainersPageApprove";

const AppliedTrainersPage = async () => {

  const applications = await getAllApplication();
  const user = await getUserSession();


  const roleStyles = {
    USER: "text-[#565B7F] bg-[#161826] border border-[#222538]",
    TRAINER: "text-[#FF4500] bg-[#251614] border border-[#3E1F1A]",
    ADMIN: "text-[#FFB300] bg-[#252114] border border-[#3E351A]",
  };

  const statusStyles = {
    ACTIVE: "text-[#00E676] bg-[#0E2519] border border-[#163E26]",
    APPROVED: "text-[#00E676] bg-[#0E2519] border border-[#163E26]",
    REJECTED: "text-[#FF3D00] bg-[#251214] border border-[#3E1A1D]",
    BLOCKED: "text-[#FF3D00] bg-[#251214] border border-[#3E1A1D]",
  };

  return (
    <div className="min-h-screen text-white p-8 font-sans">


      <h1 className="text-3xl font-black tracking-wider uppercase mb-8 text-[#F4F4F6]">
        Trainer Applications
      </h1>


      <div className="w-full border border-[#161826] rounded-2xl overflow-hidden p-2 shadow-2xl">
        <Table className="w-full text-left bg-transparent border-none">
          <Table.ScrollContainer>
            <Table.Content aria-label="User Management Table" className="min-w-200">


              <Table.Header className="border-b border-[#161826]">
                <Table.Column isRowHeader className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">USER</Table.Column>
                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">EXPERIENCE</Table.Column>
                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">SPECIALTY</Table.Column>
                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">STATUS</Table.Column>
                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">ACTIONS</Table.Column>
              </Table.Header>


              <Table.Body>
                {applications?.map((application) => (
                  <Table.Row key={application.id || application._id} className="border-b border-[#111322]/50 hover:bg-[#111322]/30 transition-colors">


                    <Table.Cell className="p-4 font-bold text-[#F4F4F6] text-sm">
                      {application.userName}
                    </Table.Cell>


                    <Table.Cell className="p-4 text-sm text-[#4A4E69] font-mono">
                      {application.experience}
                    </Table.Cell>


                    <Table.Cell className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest ${roleStyles[application.specialty?.toUpperCase()] || roleStyles.USER}`}>
                        {application.specialty}
                      </span>
                    </Table.Cell>


                    <Table.Cell className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest ${statusStyles[application.status] || statusStyles.ACTIVE}`}>
                        {application.status}
                      </span>
                    </Table.Cell>


                    <Table.Cell className="p-4">
                      <div className="flex items-center gap-3">
                        {application.status !== "APPROVED" && (
                          <AppliedTrainersPageApprove application={application} />
                        )}
                        {application.status !== "REJECTED" && (
                          <AppliedTrainersPageReject application={application} />
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


export default AppliedTrainersPage;