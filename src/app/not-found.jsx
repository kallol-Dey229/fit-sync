import Link from "next/link";
import { Home, Dumbbell } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20 text-center">

            
            <div className="flex items-center gap-4 mb-8">
                <div className="h-0.5 w-14 bg-[#ff5a1f]" />
                <span className="uppercase tracking-[6px] text-[#ff5a1f] text-sm font-semibold">
                    Set Failed
                </span>
                <div className="h-0.5 w-14 bg-[#ff5a1f]" />
            </div>

           
            <div className="flex items-center justify-center gap-0 mb-10 select-none" aria-hidden="true">
                <div className="h-3 w-3 rounded-full bg-card-border" />
                <div className="h-2 w-10 bg-card-border" />
                <div className="h-16 w-6 rounded-sm bg-muted/20 border-2 border-card-border" />
                <div className="h-24 w-9 rounded-md bg-card border-2 border-[#ff5a1f]/40 flex items-center justify-center">
                    <span className="font-mono font-black text-2xl text-[#ff5a1f] tracking-tight">
                        404
                    </span>
                </div>
                <div className="h-2 w-20 bg-card-border" />
                <div className="h-24 w-9 rounded-md bg-card border-2 border-[#ff5a1f]/40 flex items-center justify-center">
                    <span className="font-mono font-black text-2xl text-[#ff5a1f] tracking-tight">
                        404
                    </span>
                </div>
                <div className="h-16 w-6 rounded-sm bg-muted/20 border-2 border-card-border" />
                <div className="h-2 w-10 bg-card-border" />
                <div className="h-3 w-3 rounded-full bg-card-border" />
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-foreground mb-4">
                This url Doesn&apos;t Exist
            </h1>

            <p className="text-muted text-base sm:text-lg max-w-md mb-10 leading-relaxed">
                The page you&apos;re looking for got dropped somewhere between
                sets. Check the link, or head back and start your next set
                from the top.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/"
                    className="bg-[#ff5a1f] hover:bg-[#e04f1a] text-white font-black px-8 py-4 flex items-center justify-center gap-2 transition-colors duration-200 uppercase tracking-wider text-sm"
                >
                    <Home className="w-4 h-4" />
                    Back To Home
                </Link>

                <Link
                    href="/auth/signin"
                    className="border border-card-border hover:border-foreground/30 text-foreground font-black px-8 py-4 flex items-center justify-center gap-2 transition-colors duration-200 uppercase tracking-wider text-sm"
                >
                    <Dumbbell className="w-4 h-4" />
                    Signin
                </Link>
            </div>
        </div>
    );
}