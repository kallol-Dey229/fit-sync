"use client";

import React, { useState } from "react";
import { Form, Fieldset, TextField, Label, Input, Select, ListBox, TextArea, FieldError, Button } from "@heroui/react";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { ImagePlus } from "lucide-react";
import { createForumPost } from "@/lib/actions/posts";



export default function AddForumPost() {
    const [errors, setErrors] = useState({});

    const { data: session } = authClient.useSession();
    const user = session?.user;

    // Auxiliary Upload States
    const [photoUrl, setPhotoUrl] = useState('');
    const [fileName, setFileName] = useState("No file selected");
    const [isUploading, setIsUploading] = useState(false);

    // 2. Client side Imgbb Upload Handler
    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;


        setFileName(file.name);

        // Simple Validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, photo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Replace with your real IMGBB API key environmental variable injection
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setPhotoUrl(data.data.url);
                setErrors(prev => ({ ...prev, photo: null }));
            } else {
                setErrors(prev => ({ ...prev, photo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, photo: "Network error during photo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validations matching your configuration style
        const newErrors = {};
        if (!data.title) newErrors.title = "Post title is required";
        if (!photoUrl) newErrors.image = "Please upload an image.";
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
            photo: photoUrl,
            status: "active",
            role: user.role,
            likes: 0,
            comments: 0,
            createdAt: new Date().toISOString(),
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


                        {/* image section here*/}
                        <TextField
                            name="image"
                            isInvalid={!!errors.image}
                            className="flex flex-col gap-1.5 w-full"
                        >
                            <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">
                                Post Image
                            </Label>

                            <label
                                htmlFor="image"
                                className="flex items-center gap-3 cursor-pointer bg-[#1C1E30] border border-[#222538] rounded-xl px-4 py-3"
                            >
                                <ImagePlus size={18} />
                                <span>{fileName}</span>
                            </label>

                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handlePhotoUpload}
                            />

                            {errors.image && (
                                <FieldError className="text-xs text-danger mt-1">
                                    {errors.image}
                                </FieldError>
                            )}
                        </TextField>




                        {/* description */}
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
                        isLoading={isUploading}
                        isDisabled={isUploading}
                        className="w-full bg-[#FF4500]"
                    >
                        {isUploading ? "Uploading Image..." : "Submit Post"}
                    </Button>
                </Form>

            </div>
        </div>
    );
}