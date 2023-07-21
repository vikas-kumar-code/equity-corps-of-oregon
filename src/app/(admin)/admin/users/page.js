import Image from 'next/image'
import ListUsers from './components/list-users'

export default function Users() {
    return (
        <div className="content-wrapper">
            <div className="row ">
                <div className="col-12 grid-margin">
                    <ListUsers />
                </div>
            </div>
        </div>
    )
}
