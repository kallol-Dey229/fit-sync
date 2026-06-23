"use client";

import React, { useState } from "react";
import { Form, Fieldset, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { applyAsTrainer } from "@/lib/actions/application";

const ApplyTrainerForm = ({ userId, userName }) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const textInputClass = "w-full text-white bg-[#1C1E30] border border-transparent data-[hover=true]:bg-[#23273D] group-data-[focus=true]:bg-[#1C1E30] group-data-[focus=true]:border-[#222538] rounded-xl h-12 px-3 text-sm placeholder:text-[#4A4E69] outline-none transition-all";
    const selectClass = "w-full hover:cursor-pointer text-white bg-[#1C1E30] border border-transparent data-[hover=true]:bg-[#23273D] group-data-[focus=true]:bg-[#1C1E30] group-data-[focus=true]:border-[#222538] rounded-xl h-12 px-3 text-sm outline-none transition-all appearance-none";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};
        if (!data.experience) newErrors.experience = "Experience is required";
        if (!data.specialty || data.specialty === "choose") newErrors.specialty = "Specialty is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const payload = {
            experience: data.experience,
            specialty: data.specialty,
            userId,
            userName,
            appliedAt: new Date().toISOString(),
        };

        try {
            const res = await applyAsTrainer(payload);

            if (res?.error === "ALREADY_APPLIED") {
                toast.error("You have already applied! Please wait for approval.");
                router.refresh();
                return;
            }

            if (res?._id || res?.insertedId) {
                toast.success("Application submitted successfully!");
                form.reset();
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="space-y-6"
            validationErrors={errors}
            validationBehavior="aria"
        >
            <Fieldset className="space-y-6 w-full">

                <TextField
                    name="experience"
                    isInvalid={!!errors.experience}
                    className="flex flex-col gap-1.5 w-full"
                >
                    <Label className="text-xs font-semibold tracking-widest text-[#565B7F] uppercase">
                        Experience (Years)
                    </Label>
                    <Input
                        type="number"
                        placeholder="e.g. 3"
                        className={textInputClass}
                    />
                    {errors.experience && <FieldError className="text-xs text-danger mt-1">{errors.experience}</FieldError>}
                </TextField>

                <div className="flex flex-col gap-1.5 w-full">
                    <Label className="text-xs font-semibold tracking-widest text-[#565B7F] uppercase">
                        Specialty
                    </Label>
                    <div className="relative w-full">
                        <select
                            name="specialty"
                            defaultValue={'choose'}
                            className={selectClass}
                        >
                            <option value="choose" disabled className="bg-[#1C1E30]">choose</option>
                            <option value="Yoga" className="bg-[#1C1E30]">Yoga</option>
                            <option value="Fitness" className="bg-[#1C1E30]">Fitness</option>
                            <option value="Bodybuilding" className="bg-[#1C1E30]">Bodybuilding</option>
                            <option value="Crossfit" className="bg-[#1C1E30]">Crossfit</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#717694]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {errors.specialty && <p className="text-xs text-danger mt-1">{errors.specialty}</p>}
                </div>

            </Fieldset>

            <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                className="w-full bg-[#FF4500] text-white font-extrabold uppercase tracking-wider h-12 rounded-xl transition-all hover:bg-[#E03E00]"
            >
                Submit Application
            </Button>
        </Form>
    );
};

export default ApplyTrainerForm;