import axios from '@/utils/request.js'

export const getPostList = (params) => {
  return axios({
    url: `/post`,
    params
  })
}

export const getPostDetail = (id) => {
  return axios({
    url: `/post/${id}`,
  })
}

// 点赞
export const postLike = (id) => {
  return axios({
    url: `/post_like/${id}`,
  })
}
// 收藏
export const postStar = (id) => {
  return axios({
    url: `/post_star/${id}`,
  })
}

// 获取评论页
export const getCommentList = (id) => {
  return axios({
    url: `/post_comment/${id}`,
  })
}
// 发表评论
export const publishComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data,
  })
}