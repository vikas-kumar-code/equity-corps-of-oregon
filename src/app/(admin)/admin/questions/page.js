import ListQuestions from './components/ListQuestions'

export const metadata = {
    title: `Questions - Admin Panel`
}
export default function Questions() {
    return (
        <div className="content-wrapper">
            <div className="row ">
                <div className="col-12 grid-margin">
                    <ListQuestions />
                </div>
            </div>
        </div>
    )
}
