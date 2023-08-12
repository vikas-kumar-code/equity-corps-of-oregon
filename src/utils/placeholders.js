const placeholders = (models = {}) => {
  const placeholder = [];

  // Populating user placeholders
  placeholder["user_name"] = `${models.users.name || "N/A"}`;
  placeholder["user_email"] = `${models.users.email || "N/A"}`;

  // Populating case placeholders
  placeholder["case_number"] = `${models.cases.case_number || "N/A"}`;
  placeholder["case_title"] = `${models.cases.title || "N/A"}`;

  return placeholder;
};

export default placeholders;
