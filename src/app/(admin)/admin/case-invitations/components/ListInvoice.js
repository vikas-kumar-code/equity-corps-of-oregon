const ListInvoice = () => {
  const getRecords = async () => {
    let REQUEST_URI = common.apiPath(
      `/admin/cases/invitation?page=${pageNumber}`
    );
    if (fields !== null) {
      fields["page"] = pageNumber;
      const queryString = new URLSearchParams(fields).toString();
      REQUEST_URI = common.apiPath(`/admin/cases/invitation?${queryString}`);
    }
    fetch(REQUEST_URI)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRecords(response.records);
          setTotalRecords(response.totalRecords);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoader(false));
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Document Name </th>
          <th>Uploaded On</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};
