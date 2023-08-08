import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postApiUser } from "../services/userService"
import { toast } from 'react-toastify';
function ModalConfirm(props) {
    const { show, handleClose, handleDeleteUser, dataUserDelete } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const handleConfirm = () => {

    }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Bạn có muốn xóa không

                        Do want to delete this user ,
                        email ={dataUserDelete.email}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalConfirm;