import { apiPost } from "./api";
//验证码
export function getList(data) {
    return new Promise((resolve, reject) => {
        apiPost("https://www.zzgoodqc.cn/index.php/index/callcenter/getheaders", data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
//表单
export function getForm(data) {
    return new Promise((resolve, reject) => {
        apiPost("https://www.zzgoodqc.cn/index.php/index/index/mycenter", data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
//图片
export function getImage(data) {
    return new Promise((resolve, reject) => {
        apiPost("https://www.zzgoodqc.cn/index.php/index/upload/uploadimg", data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
