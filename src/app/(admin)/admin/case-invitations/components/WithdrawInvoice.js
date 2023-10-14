import { Modal, Button, Form, Spinner } from "react-bootstrap";

const WithdrawInvoice = ({
  closeModal,
  showWithdrawModal,
  sendInvoice,
  setWithdraw,
  withdraw,
  errors,
  submitted,
}) => {
  return (
    <Modal
      show={showWithdrawModal[0]}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h3> Withdraw Invoice</h3>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Reason for withdraw</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: "calc(4.25rem + 2px)" }}
              rows={3}
              value={withdraw}
              onChange={(e) => setWithdraw(e.target.value)}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors || ""}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="md"
          type="submit"
          variant="secondary"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          size="md"
          type="submit"
          variant="success"
          onClick={() =>
            sendInvoice(showWithdrawModal[1], showWithdrawModal[2])
          }
        >
          {submitted && <Spinner size="sm" variant="light" className="me-1" />}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WithdrawInvoice;
