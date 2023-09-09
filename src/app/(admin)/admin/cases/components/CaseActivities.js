import moment from "moment";

const CaseActivities = ({ logs = [] }) => {
  return (
    <div style={{ maxHeight: "250px", overflowY: "auto" }}>
      <ol className="activity-feed">
        {logs.map((log) => {
          return (
            <li className="feed-item">
              <time className="date">
                {moment(log.created_at).format("LLLL")}
              </time>
              <span className="text">{log.content}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default CaseActivities;
