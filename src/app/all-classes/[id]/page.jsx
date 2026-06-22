import { getClassById } from "@/lib/api/classes";
import { Card, Avatar, Button } from "@heroui/react";
import { Clock, Users, Calendar, Award, User, Heart, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AllClassDetailsPage({ params }) {
    const { id } = await params;
    const classes = await getClassById(id);
    

    // Dynamic array verification for handling schedule maps safely
    const activeSchedule = Array.isArray(classes?.schedule) ? classes.schedule : [];

    return (
        <div className="w-full min-h-screen bg-[#09090b] text-white py-8 px-4 sm:px-6 max-w-7xl mx-auto">
            
            
            <div className="mb-6">
                <Link 
                    href="/all-classes" 
                    className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors"
                >
                    <ChevronLeft size={14} /> Back to classes
                </Link>
            </div>

            {/* Hero Header Banner Card section (Referencing layout properties from image_08c37c.png) */}
            <div className="relative w-full h-70 sm:h-90 rounded-3xl overflow-hidden mb-8 border border-gray-900 shadow-2xl">
                <Image src={classes.image} alt={classes.title} height={200} width={200} className="w-full h-full object-cover brightness-[0.4]"></Image>
                <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-transparent to-transparent" />
                
                {/* Overlay Text Details Row */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {classes?.category && (
                            <span className="text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded bg-[#ff5a1f]/20 text-[#ff5a1f] border border-[#ff5a1f]/30">
                                {classes.category}
                            </span>
                        )}
                        {classes?.difficulty && (
                            <span className="text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                {classes.difficulty}
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight max-w-3xl">
                        {classes?.title || "Untitled Bootcamp"}
                    </h1>
                    <p className="text-xs sm:text-sm font-mono text-gray-400 mt-1">
                        By <span className="text-gray-200 font-medium">{classes?.trainerName || "null"}</span>
                    </p>
                </div>
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* About Card Wrapper block using HeroUI v3 declarative style */}
                    <Card className="bg-[#111116] border border-gray-800 p-6 rounded-2xl gap-3">
                        <Card.Header className="p-0 flex flex-col items-start gap-1">
                            <Card.Title className="text-sm font-bold uppercase tracking-wider text-[#ff5a1f] font-mono flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" /> About This Class
                            </Card.Title>
                        </Card.Header>
                        <p className="text-sm text-gray-300 leading-relaxed font-normal">
                            {classes?.description || "No description provided for this session."}
                        </p>
                    </Card>

                    {/* Class Information Metrics Data Grid Box */}
                    <Card className="bg-[#111116] border border-gray-800 p-6 rounded-2xl gap-4">
                        <Card.Header className="p-0">
                            <Card.Title className="text-sm font-bold uppercase tracking-wider text-[#ff5a1f] font-mono flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" /> Class Details
                            </Card.Title>
                        </Card.Header>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                            {/* Metric Grid Element item */}
                            <div className="p-3 bg-[#16161c] border border-gray-900 rounded-xl flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Clock size={14} className="text-[#ff5a1f]" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider">Duration</span>
                                </div>
                                <span className="text-sm font-bold text-gray-200">{classes?.duration || "N/A"}</span>
                            </div>

                            <div className="p-3 bg-[#16161c] border border-gray-900 rounded-xl flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Calendar size={14} className="text-[#ff5a1f]" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider">Schedule</span>
                                </div>
                                <span className="text-xs font-semibold text-gray-200 truncate text-wrap">
                                    {activeSchedule.length > 0 ? activeSchedule.slice(0, 3).join(', ') : "Flexible Dates"}
                                </span>
                            </div>

                            <div className="p-3 bg-[#16161c] border border-gray-900 rounded-xl flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Users size={14} className="text-[#ff5a1f]" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider">Slots</span>
                                </div>
                                <span className="text-sm font-bold text-gray-200">{classes?.slots || "0"} Available</span>
                            </div>

                            <div className="p-3 bg-[#16161c] border border-gray-900 rounded-xl flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Award size={14} className="text-[#ff5a1f]" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider">Category</span>
                                </div>
                                <span className="text-sm font-bold text-gray-200">{classes?.category || "General"}</span>
                            </div>

                            <div className="p-3 bg-[#16161c] border border-gray-900 rounded-xl flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <User size={14} className="text-[#ff5a1f]" />
                                    <span className="text-[10px] font-mono uppercase tracking-wider">Trainer</span>
                                </div>
                                <span className="text-sm font-bold text-gray-200 truncate">{classes?.trainerName || "Unassigned"}</span>
                            </div>
                        </div>
                    </Card>
                </div>

              
                <div className="lg:sticky lg:top-8 flex flex-col gap-4">
                    
                    
                    <Card className="bg-[#111116] border border-gray-800 p-6 rounded-2xl gap-5">
                        <div className="flex justify-between items-baseline">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Single Access</span>
                                <span className="text-3xl font-black text-white mt-1">${classes?.price || "0"}</span>
                            </div>
                            <span className="text-xs font-mono text-gray-500">per session</span>
                        </div>

                        
                        <div className="flex flex-col gap-2 font-mono text-xs border-t border-b border-gray-800/60 py-4 my-1">
                            <div className="flex justify-between text-gray-400">
                                <span className="flex items-center gap-2"><Users size={12} /> Total Available Slots:</span>
                                <span className="text-white font-bold">{classes?.slots || "0"}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span className="flex items-center gap-2"><Clock size={12} /> Live Schedule Time:</span>
                                <span className="text-white font-bold">08:00 AM</span>
                            </div>
                        </div>

                        
                        <div className="flex flex-col gap-3">
                            
                           <Link href={`/all-classes/${id}/book`}>
                            <Button 
                                className="w-full bg-[#ff5a1f] hover:bg-[#e04f1a] text-white font-black uppercase tracking-wider text-xs h-12 rounded-xl transition-all shadow-lg shadow-[#ff5a1f]/10"
                                size="lg"
                            >
                                Book Now
                            </Button>
                           </Link>
                           
                            
                            <Button
                                variant="bordered"
                                className="w-full border-gray-800 hover:border-gray-700 hover:bg-gray-900/20 text-gray-400 hover:text-white font-bold text-xs h-11 rounded-xl transition-all"
                            >
                                <Heart size={14} className="mr-1 text-red-500/70" /> Add to Favorites
                            </Button>
                        </div>
                    </Card>

                    
                    <Card className="bg-[#111116] border border-gray-800 p-4 rounded-xl flex flex-row items-center gap-3">
                        <Avatar aria-label={`${classes?.trainerName || 'Trainer'}'s profile view`} className="size-10 rounded-xl border border-gray-800 shrink-0">
                            <Avatar.Image
                                alt={classes?.trainerName || "Trainer"}
                                src={classes?.trainerImage || "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"}
                            />
                            <Avatar.Fallback className="text-xs font-mono bg-orange-600/20 text-orange-500">
                                {(classes?.trainerName || "TR").substring(0, 2).toUpperCase()}
                            </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Certified Specialist</span>
                            <span className="text-xs font-bold text-gray-200 truncate">{classes?.trainerName || "Expert Trainer"}</span>
                        </div>
                        {classes?.trainerName && (
                            <Link 
                                href={`/trainers/${classes.trainerName.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-[10px] font-mono text-[#ff5a1f] hover:underline"
                            >
                                Profile
                            </Link>
                        )}
                    </Card>

                </div>
            </div>
        </div>
    );
}