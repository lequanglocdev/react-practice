import axios from "./customize-axios";

const fetchApiUser = (page) => {
    return axios.get(`/api/users?page=${page}`)

}
const postApiUser = (name, job) => {
    return axios.post("/api/users", { name: name, job: job })
}
const putUpdateUser = (name, job) => {
    return axios.put("/api/users/2", { name, job })
}
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}
export { fetchApiUser, postApiUser, putUpdateUser, deleteUser };