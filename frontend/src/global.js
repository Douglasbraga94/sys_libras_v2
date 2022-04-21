import Vue from 'vue'

export const userKey = '__knowledge_user'
export const baseApiUrl = 'https://2a9b-2804-14c-6584-5180-ec54-f5d9-f9a1-837.ngrok.io'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }
