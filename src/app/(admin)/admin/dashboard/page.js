import DashboardData from "./components/DashboardData";

export const metadata = {
  title: `Dashboard - Admin Panel`,
};
export default async function Dashboard() {
  return (
    <div className="content-wrapper">
      <DashboardData />
    </div>
  );
}
