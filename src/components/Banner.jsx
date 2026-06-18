import { ArrowRight } from "lucide-react";
import Image from "next/image";


export default function Banner() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#080810]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000')",
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#050816] via-[#050816]/90 to-[#050816]/60" />

            {/* Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,69,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,69,0,0.08) 1px, transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

                    {/* Left Content */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-0.5 w-14 bg-[#ff5a1f]" />
                            <span className="uppercase tracking-[6px] text-[#ff5a1f] text-sm font-semibold">
                                Fitness Platform
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black uppercase leading-none">
                            <span className="block text-white">SYNC</span>

                            <span className="block text-[#ff5a1f] italic">
                                YOUR
                            </span>

                            <span className="block text-white">
                                FITNESS
                            </span>
                        </h1>

                        <p className="mt-8 text-gray-400 text-lg max-w-xl leading-relaxed">
                            Transform your body with elite trainers, personalized
                            workout programs, and a community that keeps you motivated
                            every day.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-5 mt-10">
                            <button className="bg-[#ff5a1f] hover:bg-[#ff6b35] transition-all duration-300 px-8 py-4 cursor-pointer rounded-lg text-white font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(255,90,31,0.35)]">
                                Explore Classes
                                <ArrowRight size={18} />
                            </button>

                            <button className="border border-[#ff5a1f] text-white hover:bg-[#ff5a1f]/10 transition-all cursor-pointer duration-300 px-8 py-4 rounded-lg font-bold">
                                Get Started
                            </button>
                        </div>
                    </div>


                    <div className="relative w-full h-150 lg:h-175 grid grid-cols-2 gap-4">

                        {/* Big Featured Image */}
                        <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/assets/banner-photo1.jpg"
                                alt="Fitness"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>


                        <div className="relative rounded-2xl overflow-hidden">
                            <Image
                                src="/assets/photo.jpg"
                                alt="Training"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>


                        <div className="relative rounded-2xl overflow-hidden">
                            <Image
                                src="/assets/banner-photo4.jpg"
                                alt="Workout"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>


                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#0b0b14]/90 backdrop-blur-md border border-white/10 px-6 py-4 rounded-xl shadow-lg">
                            <p className="text-white text-2xl font-bold">10K+</p>
                            <p className="text-gray-400 text-sm">Active Members</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}