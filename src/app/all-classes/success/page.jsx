
import React from "react";
import { Button, Card } from "@heroui/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[#06081f] p-4">
            <div className="w-full max-w-sm text-center space-y-6">
                
                {/* Success Icon */}
                <div className="flex justify-center">
                    <CheckCircle2 size={56} className="text-[#FF4500]" />
                </div>

                {/* Message */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-wide uppercase">
                        Payment Success!
                    </h1>
                    <p className="text-xs text-[#717694]">
                        Your spot has been successfully reserved.
                    </p>
                </div>

                {/* HeroUI v3 Simple Card */}
                <Card className="bg-[#141624] border border-[#222538] rounded-2xl p-5 text-left">
                    <Card.Header className="p-0 flex flex-col items-start">
                        <span className="text-[10px] font-mono text-[#717694] uppercase mb-1">
                            welcome to FitSync classes
                        </span>
                        <Card.Title className="text-base font-bold text-white">
                            Successfully enrolled to the class
                        </Card.Title>
                        
                    </Card.Header>

                    <Card.Footer className="p-0 pt-4 w-full flex gap-2">
                        <Link href={'/all-classes'}>
                        <Button
                            
                            className="w-full bg-[#FF4500] hover:bg-[#E03D00] text-white font-bold uppercase rounded-xl h-11 text-xs tracking-wider flex items-center justify-center gap-2 transition-all">
                            Back to classes
                            
                        </Button>
                        </Link>
                        <Link href={'/dashboard'}>
                        <Button
                            
                            className="w-full bg-[#FF4500] hover:bg-[#E03D00] text-white font-bold uppercase rounded-xl h-11 text-xs tracking-wider flex items-center justify-center gap-2 transition-all">
                            Go to Dashboard
                            <ArrowRight size={12} />
                        </Button>
                        </Link>

                        
                    </Card.Footer>
                </Card>

            </div>
        </div>
    );
};

export default SuccessPage;