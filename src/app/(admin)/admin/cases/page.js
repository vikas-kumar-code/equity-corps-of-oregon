import ListCases from "./components/ListCases";
import "./style.css";

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
