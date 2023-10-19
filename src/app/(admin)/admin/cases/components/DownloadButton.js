import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

const DownloadButton = ({ path = "", fileName = "" }) => {
  const [loader, setLoader] = useState(false);
  const downloadFile = async () => {
    try {
      setLoader(true);
      const response = await fetch(path);
      const blob = await response.blob();
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);
      anchor.download = fileName;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      // Clean up
      URL.revokeObjectURL(anchor.href);
      document.body.removeChild(anchor);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  return loader ? (
    <Button variant="none" size="sm">
      <Spinner size="sm" variant="primary" />
    </Button>
  ) : (
    <Button variant="none" size="sm" onClick={downloadFile}>
      <span className="mdi mdi-folder-download text-success fs-4"></span>
    </Button>
  );
};

export default DownloadButton;
