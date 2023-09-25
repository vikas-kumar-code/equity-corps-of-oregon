import ListCaseInvitations from './components/ListCaseInvitations';
import './style.css';
import '../cases/style.css';

export default function Cases() {
    return (
        <div className="content-wrapper">
            <div className="row ">
                <div className="col-12 grid-margin">
                    <ListCaseInvitations />
                </div>
            </div>
        </div>
    )
}
