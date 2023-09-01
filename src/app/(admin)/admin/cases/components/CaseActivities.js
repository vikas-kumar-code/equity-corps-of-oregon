import moment from "moment";

const CaseActivities = ({ logs = [] }) => {
  return (
    <ol class="activity-feed">
      {logs.map((log) => {
        return (
          <li class="feed-item">
            <time class="date">{moment(log.created_at).format("LLLL")}</time>
            <span class="text">
              {log.content}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default CaseActivities;
