import axios from '@/utils/request.js'

export const getPostList = (category) => {
  return axios({
    url: `/post?category=${category}&pageSize=50`,
  })
}