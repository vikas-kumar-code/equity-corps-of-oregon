import Dashboard from "./components/Dashboard";

export const metadata = {
  title: `Dashboard - Admin Panel`,
};

export default async function DashboardPage() {
  return (
    <div className="content-wrapper">
      <Dashboard />
    </div>
  );
}
