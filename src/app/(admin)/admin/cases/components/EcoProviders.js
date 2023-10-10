export default function EcoProviders({ record }) {
  if (record?.case_invitations && record?.case_invitations.length > 0) {
    return record.case_invitations.map((item) => item?.user?.name).join(", ");
  } else {
    return "N/A";
  }
}
