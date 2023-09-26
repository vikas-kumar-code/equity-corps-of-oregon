import StatusCard from "./components/StatusCard";
import ListInvoices from "./components/ListInvoices";
import ListAttorney from "./components/ListAttorney";

export const metadata = {
  title: `Dashboard - Admin Panel`,
};
export default async function Dashboard() {
  return (
    <div className="content-wrapper">
      <StatusCard/>
      <div className="row">
        <div className="col-md-7">
          <ListInvoices />
        </div>
        <div className="col-md-5">
          <ListAttorney />
        </div>
      </div>
    </div>
  );
}
