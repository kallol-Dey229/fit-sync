import React from "react";
import { Table } from "@heroui/react";
import { getAllTrainers } from "@/lib/api/trainers";
import DemoteTrainerButton from "./DemoteTrainerButton";


const ManageTrainersPage = async () => {

    const response = await getAllTrainers();
    const trainers = Array.isArray(response) ? response : [];

    return (
        <div className="min-h-screen text-white p-8 font-sans">

            <h1 className="text-3xl font-black tracking-wider uppercase mb-8 text-[#F4F4F6]">
                Manage Trainers
            </h1>

            <div className="w-full border border-[#161826] rounded-2xl overflow-hidden p-2 shadow-2xl">
                <Table className="w-full text-left bg-transparent border-none">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Manage Trainers Table" className="min-w-200">

                            <Table.Header className="border-b border-[#161826]">
                                <Table.Column isRowHeader className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">TRAINER</Table.Column>
                                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">SPECIALTY</Table.Column>
                                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">STUDENTS</Table.Column>
                                <Table.Column className="text-xs font-bold tracking-widest text-[#565B7F] uppercase p-4">ACTION</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {trainers.map((trainer) => (
                                    <Table.Row
                                        key={trainer.id || trainer._id}
                                        className="border-b border-[#111322]/50 hover:bg-[#111322]/30 transition-colors"
                                    >
                                        <Table.Cell className="p-4 font-bold text-[#F4F4F6] text-sm">
                                            {trainer.name}
                                        </Table.Cell>

                                        <Table.Cell className="p-4">
                                            <span className="px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-[#565B7F] border border-[#222538]">
                                                {trainer.specialty}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell className="p-4 text-sm text-[#A8ACC8] font-mono">
                                            {trainer.students}
                                        </Table.Cell>

                                        <Table.Cell className="p-4">
                                            <DemoteTrainerButton trainer={trainer} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>

                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>

                {trainers.length === 0 && (
                    <p className="text-center text-sm text-[#565B7F] py-10">
                        No trainers found.
                    </p>
                )}
            </div>

        </div>
    );
};

export default ManageTrainersPage;