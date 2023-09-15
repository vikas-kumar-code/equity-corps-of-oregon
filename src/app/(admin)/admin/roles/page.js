import ListRoles from './components/ListRoles'
import '../../../styles/backend-theme.css'

export const metadata = {
    title: `Roles - Admin Panel`,
    description: `${process.env.APP_NAME} - Admin Panel`,
}

export default function Roles() {
    return (
        <div className="content-wrapper">
            <div className="row ">
                <div className="col-12 grid-margin">
                    <ListRoles />
                </div>
            </div>
        </div>
    )
}
