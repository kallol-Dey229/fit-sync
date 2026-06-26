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
import { DollarSign, Clock, Trophy, Layers, ImagePlus, CalendarDays } from "lucide-react";
import toast from "react-hot-toast";
import { createClass } from "@/lib/actions/classes";
import { authClient } from "@/lib/auth-client";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AddClassForm() {
    const [errors, setErrors] = useState({});
    
    // Store selected schedule as: { Monday: "08:00", Wednesday: "16:30" }
    const [scheduleConfig, setScheduleConfig] = useState({});

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [photoUrl, setPhotoUrl] = useState('');
    const [fileName, setFileName] = useState("No file selected");
    const [isUploading, setIsUploading] = useState(false);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, photo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
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

    // Toggle active day state
    const handleDayToggle = (day) => {
        setScheduleConfig(prev => {
            const updated = { ...prev };
            if (updated[day]) {
                delete updated[day];
            } else {
                updated[day] = "08:00"; // Default baseline time when selected
            }
            return updated;
        });
    };

    // Update specific day timing change
    const handleTimeChange = (day, timeValue) => {
        setScheduleConfig(prev => ({
            ...prev,
            [day]: timeValue
        }));
    };

    const formatTo12Hour = (timeStr) => {
        if (!timeStr) return "";
        let [hours, minutes] = timeStr.split(":");
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const strHours = hours < 10 ? `0${hours}` : hours;
        return `${strHours}:${minutes} ${ampm}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const structuredScheduleArray = Object.entries(scheduleConfig).map(([day, time]) => {
            const shortDay = day.substring(0, 3);
            return `${shortDay} at ${formatTo12Hour(time)}`;
        });

        const newErrors = {};
        if (!data.title) newErrors.title = "Class title is required";
        if (!data.category) newErrors.category = "Category is required";
        if (!data.price) newErrors.price = "Price is required";
        if (!data.duration) newErrors.duration = "Duration is required";
        if (!data.difficulty) newErrors.difficulty = "Difficulty level is required";
        if (structuredScheduleArray.length === 0) newErrors.schedule = "Please select at least one day and time";
        if (!data.description) newErrors.description = "Description is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        
        const payload = {
            ...data,
            trainerId: user?.id,
            trainerName: user?.name,
            trainerImage: user?.image,
            status: "active",
            image: photoUrl, 
            schedule: structuredScheduleArray, 
            role: user?.role,
            createdAt: new Date().toISOString(),
            isPubliclyVisible: true
        };

        const res = await createClass(payload);

        if (res) {
            toast.success("Class added successfully!");
            form.reset();
            setScheduleConfig({});
            setFileName("No file selected");
            setPhotoUrl("");
        }
    };

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
                            <TextField name="duration" isInvalid={!!errors.duration} className="flex flex-col gap-1.5 w-full">
                                <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Duration</Label>
                                <div className="relative flex items-center">
                                    <Clock size={16} className="absolute left-3 text-[#717694] pointer-events-none z-10" />
                                    <Input placeholder="45 min" className={`${textInputClass} pl-9`} />
                                </div>
                                {errors.duration && <FieldError className="text-xs text-danger mt-1">{errors.duration}</FieldError>}
                            </TextField>

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

                        {/* Image Upload Input */}
                        <TextField name="image-upload" className="flex flex-col gap-1.5 w-full">
                            <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Post Image</Label>
                            <label htmlFor="image" className="flex items-center gap-3 cursor-pointer bg-[#1C1E30] border border-[#222538] rounded-xl px-4 py-3 text-sm text-[#717694] hover:bg-[#23273D] transition-colors">
                                <ImagePlus size={18} className="text-[#717694]" />
                                <span className={fileName !== "No file selected" ? "text-white" : ""}>{fileName}</span>
                            </label>
                            <input id="image" type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
                        </TextField>

                        {/* Day & Time Schedule Section */}
                        <div className="flex flex-col gap-3 w-full">
                            <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase flex items-center gap-2">
                                <CalendarDays size={14} /> Class Schedule & Timing
                            </Label>
                            
                            <div className="bg-[#141624] border border-[#222538] rounded-xl p-4 space-y-3">
                                {DAYS_OF_WEEK.map((day) => {
                                    const isSelected = !!scheduleConfig[day];
                                    return (
                                        <div 
                                            key={day} 
                                            className="flex items-center justify-between gap-4 border-b border-[#222538]/40 pb-2.5 last:border-none last:pb-0"
                                        >
                                           
                                            <button
                                                type="button"
                                                onClick={() => handleDayToggle(day)}
                                                className={`w-28 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all text-center select-none ${
                                                    isSelected
                                                        ? "bg-[#FF4500] border-transparent text-white font-bold"
                                                        : "bg-[#1C1E30] border-[#222538] text-gray-400 hover:border-gray-600"
                                                }`}
                                            >
                                                {day}
                                            </button>

                                            
                                            <input
                                                type="time"
                                                disabled={!isSelected}
                                                value={isSelected ? (scheduleConfig[day] || "08:00") : ""}
                                                onChange={(e) => handleTimeChange(day, e.target.value)}
                                                className={`hover:cursor-pointer text-xs rounded-lg px-3 py-1.5 outline-none transition-colors h-8 w-32 border ${
                                                    isSelected 
                                                        ? "bg-[#1C1E30] text-white border-[#222538] focus:border-[#FF4500] " 
                                                        : "bg-[#0c0d17] text-gray-600 border-transparent opacity-30 cursor-not-allowed"
                                                }`}
                                                style={{ colorScheme: "dark" }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {errors.schedule && <span className="text-xs text-danger mt-1">{errors.schedule}</span>}
                        </div>

                        {/* Description Textarea */}
                        <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1.5 w-full">
                            <Label className="text-xs font-semibold tracking-widest text-[#717694] uppercase">Description</Label>
                            <TextArea placeholder="Describe your class or post..." rows={4} className={textAreaClass} />
                            {errors.description && <FieldError className="text-xs text-danger mt-1">{errors.description}</FieldError>}
                        </TextField>
                    </Fieldset>

                    <Button
                        type="submit"
                        className="w-full bg-[#FF4500] data-[hover=true]:bg-[#E03D00] text-white font-black tracking-widest uppercase rounded-xl h-12 text-sm shadow-lg transition-all"
                    >
                        {isUploading ? "Uploading Image..." : "Submit Class"}
                    </Button>
                </Form>
            </div>
        </div>
    );
}