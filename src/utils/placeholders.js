const placeholders = (models = {}) => {
  return {
    // Populating user placeholders
    user_name: `${models?.users?.name || "N/A"}`,
    user_email: `${models?.users?.email || "N/A"}`,

    // Populating case placeholders
    case_number: `${models?.cases?.case_number || "N/A"}`,
    case_title: `${models?.cases?.title || "N/A"}`,

    // Populating case roles
    role_name: `${models?.roles?.name || "N/A"}`,

    // Populating case associated names
    case_associated_name: `${models?.case_associated_names?.name || "N/A"}`,
  };
};

export default placeholders;
