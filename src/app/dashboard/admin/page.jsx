import AdminDashboardHomePage from "@/components/dashboard/AdminDashboardHomePage";
import { getUserSession } from "@/lib/core/session";


export default async function AdminDashboardPage() {
  const user = await getUserSession();
  return (
    <AdminDashboardHomePage user={user}/>
  );
}