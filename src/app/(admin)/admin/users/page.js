import ListUsers from "./components/ListUsers";
import "./style.css";
export const metadata = {
  title: `Users - Admin Panel`
}
export default function Users() {
  return (
    <div className="content-wrapper">
      <div className="row ">
        <div className="col-12 grid-margin">
          <ListUsers />
        </div>
      </div>
    </div>
  );
}
