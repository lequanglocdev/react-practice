import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postApiUser, deleteUser } from "../services/userService"
import { toast } from 'react-toastify';

function ModalConfirm(props) {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)

        if (res && res.statusCode == 204) {
            toast.success("Delete user  success")
            handleClose()
            handleDeleteUserFromModal(dataUserDelete)
        }
        else {
            toast.error("Delete user error")
        }
        console.log("check res delete", res)
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

                        <h3>
                            This action can't be undone
                        </h3>
                        <br />
                        Do want to delete this user
                        <b> email ={dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-danger' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default ModalConfirm;