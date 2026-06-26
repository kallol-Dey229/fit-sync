import { getAllUsers } from "@/lib/api/users";
import { getAllClass } from "@/lib/api/classes";
import { getAllPurchases } from "@/lib/api/purchases";
import AdminDashboardHomePage from "@/components/dashboard/AdminDashboardHomePage";



export default async function Page() {
  const [users, classes, purchases] = await Promise.all([
    getAllUsers(),
    getAllClass(),
    getAllPurchases(),
  ]);

  return (
    <AdminDashboardHomePage
      users={users}
      classes={classes}
      purchases={purchases}
    />
  );
}