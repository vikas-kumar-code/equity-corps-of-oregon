const path = require("path");
const fs = require("fs");
const { authOptions } = require("@/app/api/auth/[...nextauth]/route");
const { getServerSession } = require("next-auth");
const { redirect } = require("next/navigation");

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

// delete file
const deleteFile = (filePath = "") => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
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

// Redirect to dashboard based on user's role (if authenticated)
// [1 => Admin, 2 => Attorney, 3 => Eco Provider]
const redirectToDashboard = async () => {
  const session = await getSession();
  const WEB_URL = process.env.NEXT_PUBLIC_API_URL;
  if (session?.user) {
    if (session.user.role_id === 1 || session.user.role_id === 3 || session.user.role_id === 4) {
      if (
        Number(session.user.is_first_login) === 1 &&
        session.user.role_id !== 1
      ) {
        redirect(WEB_URL + "/admin" + "/settings?is_first_login=1");
      } else if (session.user.role_id === 3) {
        redirect(WEB_URL + "/admin" + "/case-invitations");
      }else if (session.user.role_id === 4) {
        redirect(WEB_URL + "/admin" + "/case-invitations");
      } else {
        redirect(WEB_URL + "/admin" + "/dashboard");
      }
    } else if (session.user.role_id === 2) {
      redirect(WEB_URL + "/account");
    }
  }
};

module.exports = {
  moveFile,
  getSession,
  redirectToDashboard,
  deleteFile,
};
