import common from "@/utils/common";
import { useState } from "react";
import {
  Button,
  Modal,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { IoEllipseOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const BlankCircle = ({ userId, reloadRecords }) => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (resend = false) => {
    setSubmitted(true);
    fetch(common.apiPath(`/admin/users/attorney-on-board`), {
      method: "POST",
      body: JSON.stringify({ userId: userId, resend: resend }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          setShowModal(false);
          reloadRecords();
        } else if (response.error) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(response.message);
      })
      .finally(() => setSubmitted(false));
  };

  return (
    <>
      <OverlayTrigger
        key="on-board-tooltip"
        placement="top"
        overlay={
          <Tooltip id="on-board-tooltip-1">Send login credential</Tooltip>
        }
      >
        <button className="circle-icon-btn">
          <IoEllipseOutline
            color="#999"
            size={28}
            onClick={() => setShowModal(true)}
            className="cursor-pointer on-board-icon"
          />
        </button>
      </OverlayTrigger>
      {showModal && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          backdrop="static"
          keyboard={false}
          centered
          size="md"
        >
          <Modal.Header closeButton>
            <h3>Attorney On-Board </h3>
          </Modal.Header>
          <Modal.Body>
            <b>Are you sure to send login credential email?</b>
            <p className="text-secondary mt-2">
              <b>Note:</b>Note: An email will be sent to the user with the auto
              generated password with their username. Once user logs in, they
              will be onboarded successfully.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => setShowModal(false)}
              disabled={submitted}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
              variant="primary"
              disabled={submitted}
            >
              {submitted && (
                <Spinner className="me-1" color="light" size="sm" />
              )}
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default BlankCircle;
