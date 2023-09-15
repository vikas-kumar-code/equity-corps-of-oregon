import ListCases from "./components/ListCases";
import "./style.css";
import "../../../styles/animation.css"

export const metadata = {
  title: `Cases - Admin Panel`
}
export default function Cases() {
  return (
    <div className="content-wrapper">
      <div className="row ">
        <div className="col-12 grid-margin">
          <ListCases />
        </div>
      </div>
    </div>
  );
}
