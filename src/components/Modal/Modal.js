import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import { BootModal, ButtonContainer, ModalContainer } from './styled'

const Modal = ({
  hideHeading,
  bodyString,
  actionBtnTitle,
  headingTitle,
  onCloseModal,
  onActionBtnClick
}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    onCloseModal()
  }

  const handleAction = () => {
    setShow(false)
    onActionBtnClick()
  }

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <ModalContainer>
      <BootModal show={show} onHide={handleClose}>
        {hideHeading || (
          <BootModal.Header closeButton>
            <BootModal.Title>{headingTitle}</BootModal.Title>
          </BootModal.Header>
        )}
        <BootModal.Body>{bodyString}</BootModal.Body>
        <BootModal.Footer>
          <ButtonContainer sm={{ span: 6, offset: 4 }}>
            <Button onClick={handleClose} variant='secondary'>
              Close
            </Button>
          </ButtonContainer>
          <ButtonContainer sm={{ span: 3, offset: 2 }}>
            <Button onClick={handleAction}>{actionBtnTitle}</Button>
          </ButtonContainer>
        </BootModal.Footer>
      </BootModal>
    </ModalContainer>
  )
}

export default connect(
  null,
  {}
)(Modal)
