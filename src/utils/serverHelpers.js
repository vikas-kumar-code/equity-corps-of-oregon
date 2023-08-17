const path = require("path");
const fs = require("fs");
const { authOptions } = require("@/app/api/auth/[...nextauth]/route");
const { getServerSession } = require("next-auth");

// Move file
const moveFile = (sourceFilePath = "", destinationFilePath = "") => {
  try {
    if (sourceFilePath && destinationFilePath) {
      // Create destination directory, if not exists
      if (!fs.existsSync(path.dirname(destinationFilePath))) {
        fs.mkdirSync(path.dirname(destinationFilePath), { recursive: true });
      }
      if (fs.existsSync(sourceFilePath)) {
        let stats = fs.statSync(sourceFilePath);
        if (!stats.isDirectory()) {
          fs.renameSync(sourceFilePath, destinationFilePath);
        }
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// Get session
const getSession = async () => {
  return await getServerSession(authOptions);
};

module.exports = {
  moveFile,
  getSession,
};
