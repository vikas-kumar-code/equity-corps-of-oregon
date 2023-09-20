const placeholders = (models = {}) => {
  return {
    // Populating user placeholders
    user_name: `${models?.users?.name || "N/A"}`,
    user_email: `${models?.users?.email || "N/A"}`,
    verification_code: `${models?.users?.verification_code || "N/A"}`,
    password: `${models?.password || "N/A"}`,    

    // Populating case placeholders
    case_number: `${models?.cases?.case_number || "N/A"}`,
    case_title: `${models?.cases?.title || "N/A"}`,
    case_url: `${process.env.NEXT_PUBLIC_API_URL}/admin/case-invitations` || "N/A",

    // Populating case invoice placeholders
    case_invoice_name: `${models?.case_invoices?.name || "N/A"}`,
    case_invoice_total_amount: `${models?.case_invoices?.total_amount || "N/A"}`,

    // Populating case roles
    role_name: `${models?.roles?.name || "N/A"}`,

  };
};

export default placeholders;
