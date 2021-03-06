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

export const UserDetail = (id) => {
  return axios({
    url: `/user/${id}`,
    // 由于后面的接口都需要token,所以需要设置一个请求拦截器
    // headers: { Authorization: localStorage.getItem('mytoken') }
  })
}

// 更新用户
export const updateUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
    // 由于后面的接口都需要token,所以需要设置一个请求拦截器
    // headers: { Authorization: localStorage.getItem('mytoken') }
  })
}
// 关注用户
export const userFollow = (id) => {
  return axios({
    url: `/user_follows/${id}`,
  })
}
// 取关
export const userunFollow = (id) => {
  return axios({
    url: `/user_unfollow/${id}`,
  })
}

// 用户关注列表
export const getUserFollow = () => {
  return axios({
    url: `/user_follows`,
  })
}

// 用户收藏列表
export const getUserStar = () => {
  return axios({
    url: `/user_star`,
  })
}