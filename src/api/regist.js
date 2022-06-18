import axios from '@utils/http/api'

export const unbindList = params => {
  return axios({
    url: '/regist/delete',
    method: 'delete',
    params: params
  })
}

export const bindList = params => {
  return axios({
    url: '/regist/saveOrUpdate',
    method: 'post',
    data: params
  })
}

export const getList = params => {
  return axios({
    url: '/regist/selectList',
    method: 'get',
    params: params
  })
}

export const getOption = params => {
  return axios({
    url: '/dic/selectList',
    method: 'get',
    params: params
  })
}

export const getCardId = params => {
  return axios({
    url: '/regist/selectByRel',
    method: 'get',
    params: params
  })
}

export default { unbindList, bindList, getList, getOption, getCardId }
