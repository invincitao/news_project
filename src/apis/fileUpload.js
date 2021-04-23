import axios from '@/utils/request.js'

export const uploadFile = function (data) {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}