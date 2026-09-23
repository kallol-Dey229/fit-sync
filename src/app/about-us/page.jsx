import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Dumbbell, HeartPulse, ShieldCheck, Sparkles, Users } from "lucide-react";

const pillars = [
  {
    icon: Dumbbell,
    title: "Train with purpose",
    description: "Find structured classes built around real goals, from building strength to moving better every day.",
  },
  {
    icon: Users,
    title: "Learn from people",
    description: "Connect with dedicated trainers and a community that keeps progress personal, practical, and consistent.",
  },
  {
    icon: ShieldCheck,
    title: "Stay in control",
    description: "Manage your classes, bookings, favorites, and fitness journey in one focused space.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:pt-24">
        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-0.5 w-14 bg-[#ff5a1f]" />
            <span className="text-sm font-semibold uppercase tracking-[6px] text-[#ff5a1f]">About FitSync</span>
          </div>
          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl">
            Fitness that <span className="text-[#ff5a1f]">fits</span> your life.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
            FitSync brings classes, trainers, and a motivated community together so every workout has a clearer next step.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/all-classes" className="inline-flex items-center gap-2 bg-[#ff5a1f] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[#e04f1a]">
              Explore classes <ArrowRight size={16} />
            </Link>
            <Link href="/all-trainers" className="inline-flex items-center gap-2 border border-gray-700 px-6 py-3 text-sm font-black uppercase tracking-wider text-gray-300 transition-colors hover:border-[#ff5a1f] hover:text-white">
              Meet our trainers
            </Link>
          </div>
        </div>

        <div className="relative min-h-105 overflow-hidden rounded-3xl border border-white/10 bg-[#111116]">
          <Image
            src="/assets/banner-photo3.jpg"
            alt="Athlete training with focus"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#070b17] via-[#070b17]/15 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <p className="max-w-xs text-sm font-semibold leading-6 text-white">Small decisions. Stronger habits. Better performance.</p>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#ff5a1f] text-white">
              <HeartPulse size={22} />
            </span>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d1020]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-3 lg:px-8">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border-l-2 border-[#ff5a1f] pl-5">
              <Icon className="mb-5 text-[#ff5a1f]" size={24} />
              <h2 className="text-xl font-black uppercase text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <div>
          <span className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[5px] text-[#ff5a1f]">
            <Sparkles size={16} /> Built for momentum
          </span>
          <h2 className="text-4xl font-black uppercase leading-none text-white sm:text-5xl">Your next session starts here.</h2>
        </div>
        <div className="grid gap-6 text-sm leading-7 text-gray-400 sm:grid-cols-2">
          <p>Whether you are starting fresh or pushing toward your next milestone, FitSync helps turn intention into a repeatable routine.</p>
          <p>Save the classes that excite you, book the ones that matter, and use the community to keep your momentum moving forward.</p>
        </div>
      </section>

      <section className="mx-5 mb-20 bg-[#ff5a1f] px-6 py-12 text-center sm:px-10 lg:mx-auto lg:max-w-7xl">
        <h2 className="text-3xl font-black uppercase leading-none text-white sm:text-5xl">Ready to make your move?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80">Explore the FitSync experience and find the training rhythm that works for you.</p>
        <Link href="/auth/signup" className="mt-7 inline-flex items-center gap-2 bg-[#111116] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-black">
          Join FitSync <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}