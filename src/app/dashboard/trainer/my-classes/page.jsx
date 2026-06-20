

import { Table, Button } from "@heroui/react";

import { getClass } from "@/lib/api/classes";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";




const MyClassesPage = async () => {
    const trainerId = '6a3584fd29a7459d0cfb0c11'
    const classesData = await getClass(trainerId) || [];
    
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white p-8">
      {/* Title */}
      <h1 className="text-2xl font-black uppercase tracking-wider mb-8">
        My Classes
      </h1>

      
      <div className="bg-[#141522] border border-[#222538] rounded-2xl p-4 shadow-2xl">
        
        <Table>
          <Table.ScrollContainer>
            <Table.Content 
              aria-label="My Classes List"
              className="min-w-150"
              classNames={{
                th: "bg-transparent text-[#717694] font-bold text-xs uppercase tracking-widest p-4 border-b border-[#222538]",
                tr: "border-b border-[#1C1E30]/60 last:border-0 hover:bg-[#1C1E30]/30 transition",
                td: "p-4 align-middle"
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
                {classesData.map((item) => (
                  <Table.Row key={item._id} id={item.id}>
                    
                    
                    <Table.Cell className="font-bold text-white text-base">
                      {item.title}
                    </Table.Cell>
                    
                    
                    <Table.Cell>
                      <span className="border border-[#2A2D44] bg-[#1C1E30]/50 text-[#717694] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md inline-block">
                        {item.category}
                      </span>
                    </Table.Cell>
                    
                    
                    <Table.Cell className="text-[#8E94B7] font-semibold text-base">
                      {item.bookings}
                    </Table.Cell>
                    
                    
                    <Table.Cell>
                      <span className="border border-[#144634] bg-[#0E2820] text-[#10B981] text-xs font-black tracking-wider px-3 py-1.5 rounded-lg inline-block">
                        APPROVED
                      </span>
                    </Table.Cell>
                    
                    
                    <Table.Cell className="text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        
                        <Button
                          size="sm"
                          variant="secondary"
                          className="border-[#222538] text-zinc-400 font-medium rounded-lg h-9 text-xs px-3 min-w-0"
                        >
                            <FaEdit />
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          className="border-[#441C24] font-medium rounded-lg h-9 text-xs px-3 min-w-0"
                          
                        >
                            <FaTrashAlt className="size-3" />
                          Delete
                        </Button>

                        <Button
                          size="sm"
                          variant="primary"
                          className="border-[#104454] font-bold rounded-lg h-9 text-xs px-3 min-w-0"
                         
                        >
                            <FaUser size={14} />
                          Students
                        </Button>

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

export default MyClassesPage;