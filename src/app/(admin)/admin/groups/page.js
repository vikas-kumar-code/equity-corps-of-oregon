import "../../../styles/backend-theme.css";
import ListGroupsAndmembers from "./components/ListGroupsAndMembers";


export const metadata = {
  title: `Groups & Members - Admin Panel`,
  description: `${process.env.APP_NAME} - Admin Panel`,
};

export default function Roles() {
  return (
    <div className="content-wrapper">
      <div className="row ">
        <div className="col-12 grid-margin">
          <ListGroupsAndmembers />
        </div>
      </div>
    </div>
  );
}
