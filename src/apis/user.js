import axios from '@/utils/request.js'

export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}