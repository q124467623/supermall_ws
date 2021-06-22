import { request } from './request'

export function getHomeMultifata() {
    return request({
            url: 'home/multidata'
        })
        .then
}
