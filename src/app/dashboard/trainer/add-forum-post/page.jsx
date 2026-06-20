"use client";

import React, { useState } from "react";
import { Form, Fieldset, TextField, Label, Input, Select, ListBox, TextArea, FieldError, Button} from "@heroui/react";

import toast from "react-hot-toast";
import { createForumPost } from "@/lib/actions/classes";
import { authClient } from "@/lib/auth-client";



export default function AddForumPost() {
    const [errors, setErrors] = useState({});

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validations matching your configuration style
        const newErrors = {};
        if (!data.title) newErrors.title = "Post title is required";
        if (!data.description) newErrors.description = "Description is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const payload = {
            ...data,
            trainerId: user.id,
            trainerName: user.name,
            trainerImage: user.image,
            status: "active",
            isPubliclyVisible: true
        };

        const res = await createForumPost(payload);

        if (res) {
            toast.success("Post added successfully!");
            form.reset();

        }
    };

    // Exact HEX palettes matching your layout design
    const textInputClass = "w-full text-white bg-[#1C1E30] border border-transparent data-[hover=true]:bg-[#23273D] group-data-[focus=true]:bg-[#1C1E30] group-data-[focus=true]:border-[#222538] rounded-xl h-12 px-3 text-sm placeholder:text-[#4A4E69] outline-none transition-all";
    const textAreaClass = "w-full text-white bg-[#1C1E30] border border-transparent data-[hover=true]:bg-[#23273D] group-data-[focus=true]:bg-[#1C1E30] group-data-[focus=true]:border-[#222538] rounded-xl p-3 text-sm placeholder:text-[#4A4E69] outline-none transition-all";

   

    return (
        <div className="min-h-screen text-white p-8 flex flex-col justify-start items-start font-sans">

            <h1 className="text-3xl font-extrabold tracking-wider uppercase mb-8 text-[#F4F4F6]">
                Add New Forum Post
            </h1>


            <div className="w-full max-w-xl bg-[#06081f] border border-[#222538] rounded-2xl shadow-2xl p-8">

                <Form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    validationErrors={errors}
                    validationBehavior="aria"
                >
                    <Fieldset className="space-y-6 w-full">

                       
                        <TextField name="title" isInvalid={!!errors.title} className="flex flex-col gap-1.5 w-full">
                            <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Title</Label>
                            <Input placeholder="Class name..." className={textInputClass} />
                            {errors.title && <FieldError className="text-xs text-danger mt-1">{errors.title}</FieldError>}
                        </TextField>

                        

                       

                        
                        <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1.5 w-full">
                            <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Description</Label>
                            <TextArea
                                placeholder="Describe your post..."
                                rows={4}
                                className={textAreaClass}
                            />
                            {errors.description && <FieldError className="text-xs text-danger mt-1">{errors.description}</FieldError>}
                        </TextField>

                    </Fieldset>

                    {/* Submission Button */}
                    <Button
                        type="submit"
                        className="w-full bg-[#FF4500] data-[hover=true]:bg-[#E03D00] text-white font-black tracking-widest uppercase rounded-xl h-12 text-sm shadow-lg transition-all"
                    >
                        Submit Class
                    </Button>
                </Form>

            </div>
        </div>
    );
}