import Image from 'next/image'
import ChangePasswordForm from './components/change-password-form'
import UpdateProfileForm from './components/update-profile-form'

export default function Settings() {
    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <ChangePasswordForm />
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                    <UpdateProfileForm />
                </div>
            </div>
        </div>
    )
}
