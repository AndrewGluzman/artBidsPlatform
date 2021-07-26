import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.element}
    </Modal>
  )
}
export default MyVerticallyCenteredModal
