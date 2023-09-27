import StatusCard from "./components/StatusCard";
import ListAttorney from "./components/ListAttorney";
import ListRecentInvoices from "./components/ListRecentInvoices";

export const metadata = {
  title: `Dashboard - Admin Panel`,
};
export default async function Dashboard() {
  return (
    <div className="content-wrapper">
      <StatusCard/>
      <div className="row">
        <div className="col-md-7">
          <ListRecentInvoices />
        </div>
        <div className="col-md-5">
          <ListAttorney />
        </div>
      </div>
    </div>
  );
}
