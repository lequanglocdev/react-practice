import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchApiUser } from "../services/userService";
import ReactPaginate from 'react-paginate';
import ModaAddlUser from './ModalAddUser';
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash"
import "./TableUsers.scss"
import { debounce } from "lodash"
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from 'react-toastify';

const TableUsers = (props) => {
    // goi danh sach User
    const [listUsers, setListUsers] = useState([]);
    // sô lương danh sách api
    const [totalUser, setTotalUsers] = useState(0)
    // sô trang api
    const [totalPages, setTotalPages] = useState(0)

    // show modal add User
    const [ShowAddModal, setShowAddModal] = useState(false)
    // show modal edit User
    const [showEditModal, setShowEditModal] = useState(false)
    // đâỷ dư liêụ data api
    const [dataUserEdit, setDataUserEdit] = useState({})
    // show modal delete User
    const [showDeleteUser, setShowDeleteUser] = useState(false)
    //
    const [dataUserDelete, setDataUserDelete] = useState({})
    //
    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("id")

    const [dataExport, setDataExport] = useState([])
    const handleClose = () => {
        setShowAddModal(false)
        setShowEditModal(false)
        setShowDeleteUser(false)
    }


    useEffect(() => {
        // Call apis

        getAllUser();
    }, [])

    const getAllUser = async (page) => {
        let res = await fetchApiUser(page)
        if (res && res.data) {
            console.log(res)
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
        console.log(">> check res", res)
    }

    const handlePageClick = (event) => {
        getAllUser(+event.selected + 1)
    }

    // Modal AddUser
    const handleAddUser = (user) => {
        setListUsers([user, ...listUsers])
    }
    // Modal EditUser
    const handleEditUsers = (user) => {
        setDataUserEdit(user)
        setShowEditModal(true)
    }
    const handleDeleteUser = (user) => {
        setShowDeleteUser(true)
        setDataUserDelete(user)
    }
    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name;
        setListUsers(cloneListUser)

    }
    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUsers(cloneListUser)

    }
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
        setListUsers(cloneListUser)
    }
    const handleInput = debounce((event) => {
        console.log(event.target.value)
        let term = event.target.value
        if (term) {
            let cloneListUser = _.cloneDeep(listUsers)
            cloneListUser = cloneListUser.filter(item => item.email.includes(term))
            setListUsers(cloneListUser)
        } else {
            getAllUser(1)
        }
    }, 500)


    const getUserExport = (event, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(["Id", "Email", "First name", "Last name"]);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr)
            })
            setDataExport(result)
            done()
        }
    }
    const handleImporCSV = (event) => {
        // let files = event.target.files[0]
        // console.log('>> check file upload', files)
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept csv files...")
                return
            }
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "email"
                                || rawCSV[0][1] !== "first_name"
                                || rawCSV[0][2] !== "last_name"

                            ) {
                                toast.error("Wrong format Header CSV files")
                            } else {
                                console.log(rawCSV)
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj)
                                    }
                                })
                                setListUsers(result)
                                console.log("check upload csv", result)
                            }
                        } else {
                            toast.error("Wrong format csv file")
                        }
                    } else {
                        toast.error("Not found data on CSV file!")
                    }
                }
            })
        }
    }


    return (

        <>
            <div className='my-3 add-new d-sm-flex'>
                <span ><h3>List Users</h3></span>
                <div className="group-btns mt-sm-0 mt-2">

                    <label htmlFor="test" className="btn btn-warning " >
                        <i className="fa-solid fa-file-import text-white  "></i>Import
                    </label>
                    <input id="test" type="file" hidden
                        onChange={(event) => handleImporCSV(event)}
                    />
                    <CSVLink

                        filename={"users.csv"}
                        className="btn btn-primary"
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUserExport}
                    >
                        <i className="fa-solid fa-file-arrow-down "></i>Export
                    </CSVLink>
                </div>

            </div>
            <div className="col-12 col-sm-4  my-3">
                <input
                    className='form-control'
                    placeholder="Search"
                    onChange={(event) => handleInput(event)}
                />
            </div>
            <div className="customize-table">
                <Table striped bordered hover>
                    <thead >
                        <tr>
                            <th className="sort-header">Id
                                <span >
                                    <i className="fa-solid fa-arrow-down-long"

                                        onClick={() => handleSort('desc', "id")}
                                    >

                                    </i>
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', "id")}

                                    ></i>
                                </span>
                            </th>
                            <th>Email </th>
                            <th className="sort-header">First Name
                                <span>
                                    <i className="fa-solid fa-arrow-down-long"

                                        onClick={() => handleSort('desc', "first_name")}
                                    >

                                    </i>
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', "first_name")}

                                    ></i>
                                </span>
                            </th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {listUsers && listUsers.length > 0 &&

                            listUsers.map((item, index) => {
                                return (

                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className='btn btn-success'
                                                onClick={() => setShowAddModal(true)}
                                            ><i className="fa-solid fa-circle-plus mx-1"></i>Add
                                            </button>

                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => handleEditUsers(item)}
                                            ><i className="fa-solid fa-pen mx-1 text-white"></i>Edit
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteUser(item)}
                                            ><i className="fa-solid fa-trash mx-1"></i>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })

                        }

                    </tbody>
                </Table>
            </div>

            <ModaAddlUser />
            <ModaAddlUser
                show={ShowAddModal}
                handleClose={handleClose}
                handleAddUser={handleAddUser}

            />

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<<previous"
                // renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <ModalEditUser
                show={showEditModal}
                handleClose={handleClose}

                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={showDeleteUser}
                handleClose={handleClose}
                handleDeleteUser={handleDeleteUser}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    )
}

export default TableUsers;