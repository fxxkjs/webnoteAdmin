import axios from 'axios';
export const api = import.meta.env.VITE_APP_URL
axios.defaults.withCredentials = true
// 获取浏览日志
export async function getUserLog(userKey) {
    return await axios.post(`${api}/getUserLog`, { userKey })
}
// 获取登录日志
export async function getUserSignInLog(userKey) {
    // console.log("/getUserSignInLog");
    return await axios.post(`${api}/getUserSignInLog`, { userKey })
}
// 获取图片列表
export async function getUserImgList(userKey) {
    return await axios.post(`${api}/getUserImgList`, { userKey })
}
// 获取用户列表
export async function getUserList() {
    return await axios.get(`${api}/getUserList`)
}

// 获取admin树
export async function getAdminNav() {
    return await axios.get(`${api}/getAdminNav`)
}

// 获取admin mdData
export async function getMdData(path) {
    return await axios.post(`${api}/getMdData`, { path })
}

// 获取admin mdData
export async function getAdminImg(imgKey, userKey) {
    return await axios.post(`${api}/getAdminImg`, { imgKey, userKey })
}

// 注册
export async function register(username, password, code) {
    return await axios.post(`${api}/register`, { username, password, code })
}

// 验证
export async function getCookieType() {
    return await axios.post(`${api}/cookieType`)
}

// 获取验证码
export async function getCode(username) {
    return await axios.post(`${api}/getCode`, { username })
}

// 设置session
export async function setSession() {
    return await axios.get(`${api}/session`)
}