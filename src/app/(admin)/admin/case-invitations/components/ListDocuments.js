import { Modal, Button } from "react-bootstrap";
import common from "@/utils/common";
import DownloadButton from "../../cases/components/DownloadButton";

const ListDocuments = ({
  closeModal,
  records,
  showDocList,
  caseInvitationIndex,
}) => {
  let files = records?.case_invoices != undefined && JSON.parse(records?.case_invoices[caseInvitationIndex]?.files || null);

  return (
    <Modal
      show={showDocList}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <h3> Case Invoice Documents</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive" style={{maxHeight:200}}>
          <table className="table table-borderless table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files?.length > 0 &&
                files?.map((file, i) => {
                  return (
                    <tr key={`documents-${i}`}>
                      <td>{i+1}</td>
                      <td>{file.originalFileName}</td>
                      <td>
                        <DownloadButton
                          fileName={file.originalFileName}
                          path={common.downloadLink(
                            "uploads/invoice_documents/" + file.fileName
                          )}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="lg"
          type="submit"
          variant="secondary"
          onClick={closeModal}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListDocuments;
