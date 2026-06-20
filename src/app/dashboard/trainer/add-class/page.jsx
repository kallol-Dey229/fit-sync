"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    Select,
    ListBox,
    TextArea,
    FieldError,
    Button
} from "@heroui/react";
import { DollarSign, Clock, Trophy, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { createClass } from "@/lib/actions/classes";
import { authClient } from "@/lib/auth-client";

export default function AddClassForm() {
    const [errors, setErrors] = useState({});

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validations matching your configuration style
        const newErrors = {};
        if (!data.title) newErrors.title = "Class title is required";
        if (!data.category) newErrors.category = "Category is required";
        if (!data.price) newErrors.price = "Price is required";
        if (!data.duration) newErrors.duration = "Duration is required";
        if (!data.difficulty) newErrors.difficulty = "Difficulty level is required";
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

        const res = await createClass(payload);

        if (res) {
            toast.success("Class added successfully!");
            form.reset();

        }
    };

    // Exact HEX palettes matching your layout design
    const textInputClass = "w-full text-white bg-[#1C1E30] border border-transparent data-[hover=true]:bg-[#23273D] group-data-[focus=true]:bg-[#1C1E30] group-data-[focus=true]:border-[#222538] rounded-xl h-12 px-3 text-sm placeholder:text-[#4A4E69] outline-none transition-all";
    const textAreaClass = "w-full text-white bg-[#1C1E30] border border-transparent data-[hover=true]:bg-[#23273D] group-data-[focus=true]:bg-[#1C1E30] group-data-[focus=true]:border-[#222538] rounded-xl p-3 text-sm placeholder:text-[#4A4E69] outline-none transition-all";

    const triggerClasses = "w-full flex items-center justify-between bg-[#1C1E30] border border-transparent data-[hover=true]:bg-[#23273D] h-12 rounded-xl px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-[#222538]";
    const popoverClasses = "bg-[#1C1E30] border border-[#222538] text-white rounded-xl shadow-2xl p-1 min-w-[200px]";
    const listItemClasses = "flex items-center justify-between p-2.5 rounded-lg data-[hover=true]:bg-[#23273D] cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-[#23273D]";

    return (
        <div className="min-h-screen text-white p-8 flex flex-col justify-start items-start font-sans">

            <h1 className="text-3xl font-extrabold tracking-wider uppercase mb-8 text-[#F4F4F6]">
                Add New Class
            </h1>


            <div className="w-full max-w-xl bg-[#06081f] border border-[#222538] rounded-2xl shadow-2xl p-8">

                <Form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    validationErrors={errors}
                    validationBehavior="aria"
                >
                    <Fieldset className="space-y-6 w-full">

                        {/* Title Field */}
                        <TextField name="title" isInvalid={!!errors.title} className="flex flex-col gap-1.5 w-full">
                            <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Title</Label>
                            <Input placeholder="Class name..." className={textInputClass} />
                            {errors.title && <FieldError className="text-xs text-danger mt-1">{errors.title}</FieldError>}
                        </TextField>

                        {/* Category & Price Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Category Select */}
                            <Select name="category" isInvalid={!!errors.category} className="w-full">
                                <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase mb-1.5 block">Category</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <div className="flex items-center gap-2">
                                        <Layers size={16} className="text-[#717694]" />
                                        <Select.Value className="text-white" placeholder="Select category" />
                                    </div>
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.category && <span className="text-xs text-danger mt-1 block">{errors.category}</span>}
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="hiit" className={listItemClasses} textValue="HIIT">HIIT</ListBox.Item>
                                        <ListBox.Item id="yoga" className={listItemClasses} textValue="Yoga">Yoga</ListBox.Item>
                                        <ListBox.Item id="strength" className={listItemClasses} textValue="Strength">Strength</ListBox.Item>
                                        <ListBox.Item id="cardio" className={listItemClasses} textValue="Cardio">Cardio</ListBox.Item>
                                    </ListBox>

                                </Select.Popover>
                            </Select>

                            {/* Price Input */}
                            <TextField name="price" isInvalid={!!errors.price} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Price ($)</Label>
                                <div className="relative flex items-center">
                                    <DollarSign size={16} className="absolute left-3 text-[#717694] pointer-events-none z-10" />
                                    <Input type="number" placeholder="35" className={`${textInputClass} pl-9`} />
                                </div>
                                {errors.price && <FieldError className="text-xs text-danger mt-1">{errors.price}</FieldError>}
                            </TextField>
                        </div>

                        {/* Duration & Difficulty Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Duration Input */}
                            <TextField name="duration" isInvalid={!!errors.duration} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Duration</Label>
                                <div className="relative flex items-center">
                                    <Clock size={16} className="absolute left-3 text-[#717694] pointer-events-none z-10" />
                                    <Input placeholder="45 min" className={`${textInputClass} pl-9`} />
                                </div>
                                {errors.duration && <FieldError className="text-xs text-danger mt-1">{errors.duration}</FieldError>}
                            </TextField>

                            {/* Difficulty Select */}
                            <Select name="difficulty" isInvalid={!!errors.difficulty} className="w-full">
                                <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase mb-1.5 block">Difficulty</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <div className="flex items-center gap-2">
                                        <Trophy size={16} className="text-[#717694]" />
                                        <Select.Value className="text-white" placeholder="Select level" />
                                    </div>
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.difficulty && <span className="text-xs text-danger mt-1 block">{errors.difficulty}</span>}
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="beginner" className={listItemClasses} textValue="Beginner">Beginner</ListBox.Item>
                                        <ListBox.Item id="intermediate" className={listItemClasses} textValue="Intermediate">Intermediate</ListBox.Item>
                                        <ListBox.Item id="advanced" className={listItemClasses} textValue="Advanced">Advanced</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Description Textarea */}
                        <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1.5 w-full">
                            <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Description</Label>
                            <TextArea
                                placeholder="Describe your class or post..."
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