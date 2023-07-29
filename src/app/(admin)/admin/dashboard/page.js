import RecentLoans from './components/loans';
import DashboardData from './components/dashboard-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    return (
        <div className="content-wrapper">

            <div className="row ">
                <div className="col-12 grid-margin">
                    {JSON.stringify(session)}
                </div>
            </div>
        </div>
    )
}
