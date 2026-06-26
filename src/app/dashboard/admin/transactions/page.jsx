import { getAllPurchases } from "@/lib/api/purchases";


const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const TransactionsPage = async () => {
    const purchases = await getAllPurchases();
    const transactions = Array.isArray(purchases) ? purchases.filter(Boolean) : [];

    return (
        <div className="min-h-screen px-6 py-10 sm:px-10">
            <h1 className="mb-8 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                Transactions
            </h1>

            {transactions.length === 0 ? (
                <div className="rounded-xl border border-white/10 p-10 text-center">
                    <p className="text-sm text-slate-400">No transactions yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wide text-slate-500">
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">User Email</th>
                                <th className="px-6 py-4">Class</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr
                                    key={transaction._id}
                                    className="border-b border-white/5 last:border-0"
                                >
                                    <td className="px-6 py-4 font-mono text-sm text-slate-400">
                                        {transaction.stripeSessionId || transaction._id}
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {transaction.buyerEmail}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-white">
                                        {transaction.classTitle}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-orange-500">
                                        ${transaction.price}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm text-slate-400">
                                        {formatDate(transaction.purchasedAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;