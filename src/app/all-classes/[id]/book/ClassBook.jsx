"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import Image from "next/image";

const ClassBook = ({ classes, user }) => {
    const classTitle = classes?.title || "Class Title";
    const classCategory = classes?.category || "category";
    const classPrice = classes?.price || "0";
    const classImage = classes?.image || "no image available";
    const trainerName = classes?.trainerName || "Trainer Name";

    

    return (
        <div className="min-h-screen text-white p-6 sm:p-12 font-sans flex flex-col items-center justify-start bg-[#06081f]">
            <div className="w-full max-w-5xl space-y-8">

                {/* Back Link */}
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-xs font-mono text-[#717694] hover:text-[#F4F4F6] transition-colors hover:cursor-pointer"
                >
                    <ArrowLeft size={14} />
                    Back to Class
                </button>

                {/* Headings */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-wider uppercase text-[#F4F4F6]">
                        Complete Booking
                    </h1>
                    <p className="text-sm text-[#717694] max-w-xl font-medium">
                        Review your order details below and proceed to our secure Stripe checkout.
                    </p>
                </div>

                {/* Grid Layout Container */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

                    {/* Left Card: Order Summary using HeroUI v3 Horizontal Setup */}
                    <Card className="md:col-span-7 bg-[#06081f] border border-[#222538] rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-stretch">
                        {/* Summary Thumbnail Image */}
                        <div className="relative h-40 w-full sm:w-40 shrink-0 overflow-hidden rounded-xl bg-[#1C1E30]">
                            <Image
                                src={classImage} alt={classTitle} height={50} width={50}
                                className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none">
                            </Image>
                        </div>

                        {/* Summary Metadata Details split across Header and Footer */}
                        <div className="flex flex-1 flex-col justify-between gap-4">
                            <Card.Header className="flex flex-col items-start p-0 gap-1">
                                <span className="text-xs font-mono tracking-widest text-[#717694] uppercase">Order Summary</span>
                                <Card.Title className="text-lg font-bold text-white pr-4">{classTitle}</Card.Title>
                                <Card.Description className="text-xs text-[#717694] capitalize">{classCategory}</Card.Description>
                            </Card.Header>

                            <Card.Footer className="flex w-full flex-col p-0 gap-3 border-t border-[#222538]/50 pt-3">
                                <div className="flex justify-between w-full text-xs">
                                    <span className="text-[#717694]">Trainer</span>
                                    <span className="font-bold text-white">{trainerName}</span>
                                </div>
                                <div className="flex justify-between items-center w-full pt-1">
                                    <span className="text-sm font-bold text-white">Total Due</span>
                                    <span className="text-xl font-black text-[#FF4500]">${classPrice}</span>
                                </div>
                            </Card.Footer>
                        </div>
                    </Card>

                    {/* Right Card: Payment Action Block */}
                    <Card className="md:col-span-5 bg-[#06081f] border border-[#222538] rounded-2xl p-6 flex flex-col justify-between gap-5">
                        <Card.Header className="items-center gap-5 p-0">
                            <Card.Title className="text-lg font-bold text-white">Payment</Card.Title>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C1E30] border border-[#222538] text-[10px] text-[#717694] uppercase font-mono">
                                <Lock size={10} />
                                Secure Checkout
                            </div>
                        </Card.Header>

                        <div className="flex gap-3 bg-[#1C1E30] border border-[#222538]/60 p-4 rounded-xl">
                            <ShieldCheck size={20} className="text-[#FF4500] shrink-0 mt-0.5" />
                            <Card.Description className="text-xs text-gray-300 leading-relaxed font-normal">
                                You will be redirected to <span className="font-bold text-white">Stripe</span> to complete your purchase securely. We do not store any payment tokens.
                            </Card.Description>
                        </div>

                        <Card.Footer className="p-0 w-full">
                            <form action="/api/checkout_sessions" method="POST" className="w-full">
                                <section className="w-full">
                                    <button
                                        type="submit"
                                        role="link"
                                        className="w-full bg-[#FF4500] hover:bg-[#E03D00] text-white font-black rounded-lg flex items-center justify-center gap-3 px-4 py-3 hover:cursor-pointer"
                                    >
                                        <Lock size={14} />
                                        Checkout
                                    </button>
                                </section>
                            </form>
                        </Card.Footer>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default ClassBook;