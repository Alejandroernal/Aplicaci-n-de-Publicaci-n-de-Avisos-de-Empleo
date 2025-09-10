import axios from 'axios'

const baseUrl = 'http://localhost:3001/empresa'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = (newEmpresa) => {
  return axios.post(baseUrl, newEmpresa).then(response => response.data)
}

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update =(id, updatedEmpresa) => axios.put(`${baseUrl}/${id}`, updatedEmpresa).then(res => res.data)

export default { getAll, create , remove, update}
