import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import useDimensions from "react-use-dimensions";

export default function CustomModal({
  show,
  onHide,
  children,
  setModalWidth,
  modalTitle
}) {
  const [modalRef, { width }] = useDimensions();

  useEffect(() => {
    //console.log("modal", width);
    setModalWidth(width);
  }, [width, setModalWidth]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      //size="xl"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={modalRef}>{children}</div>
      </Modal.Body>
    </Modal>
  );
}
