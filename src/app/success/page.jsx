import Link from "next/link";

import { stripe } from "@/lib/stripe";
import { createPurchase } from "@/lib/api/purchases";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session ID");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);
  const isPaid = session.payment_status === "paid";

  const classId = session.metadata?.classId;
  const buyerEmail = session.metadata?.buyerEmail || session.customer_details?.email;
  const buyerName = session.metadata?.buyerName;

  if (isPaid && classId && buyerEmail) {
    await createPurchase({
      classId,
      buyerEmail,
      buyerName,
      stripeSessionId: session.id,
    });
  }

  if (!isPaid) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-[#111116] rounded-3xl shadow-xl border border-red-900/40 p-10 text-center">
          <h1 className="text-3xl font-bold text-white">Payment not completed</h1>
          <p className="mt-4 text-gray-400">
            We couldn&apos;t confirm your payment. If you were charged, please contact support.
          </p>
          <Link
            href="/all-classes"
            className="mt-8 inline-block bg-[#ff5a1f] hover:bg-[#e04f1a] text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Back to Classes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-[#111116] rounded-3xl shadow-xl border border-green-900/40 p-10 text-center">

        <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-black uppercase tracking-tight text-white">
          Booking Confirmed 🎉
        </h1>

        <p className="mt-4 text-gray-400 leading-7">
          Thank you for booking your class. Your payment has been confirmed
          and your slot is now reserved.
        </p>

        <div className="mt-6 bg-[#16161c] rounded-2xl p-4 border border-gray-800">
          <p className="text-xs font-mono uppercase tracking-wider text-gray-500">
            Confirmation sent to
          </p>
          <p className="mt-1 font-semibold text-white">{buyerEmail}</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-green-500">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="font-medium text-sm">Your slot has been reserved</span>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href={classId ? `/all-classes/${classId}` : "/all-classes"}
            className="flex-1 bg-[#ff5a1f] hover:bg-[#e04f1a] text-white py-3 rounded-xl font-black uppercase text-xs tracking-wider transition"
          >
            View Class
          </Link>

          <Link
            href="/all-classes"
            className="flex-1 border border-gray-800 py-3 rounded-xl font-black uppercase text-xs tracking-wider text-gray-300 hover:bg-[#16161c] transition"
          >
            Browse More
          </Link>
        </div>

        <p className="mt-8 text-xs font-mono text-gray-500">
          Need help? Contact our support team at{" "}
          <a href="mailto:support@fit-sync.com" className="text-[#ff5a1f] font-medium hover:underline">
            support@fit-sync.com
          </a>
        </p>
      </div>
    </main>
  );
}