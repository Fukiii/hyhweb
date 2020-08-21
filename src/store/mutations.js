import state from './state.js';
import axios from 'axios';
import el from 'element-ui';

const mutations = {
    getuser() {
        axios({ method: "GET", url: "/codemaoapi/web/users/details" }).then(function (response) {
            state.user = response.data;
        }).catch(function () {
            console.log("用户未登录")
        })
    },
    signin(s, signins) {
        s = signins
        var data = {
            identity: signins.id,
            password: signins.password,
            pid: "65edCTyg"
        }
        axios({ url: "/codemaoapi/tiger/v3/web/accounts/login", method: "POST", timeout: 0, data: data }).then(function (response) {
            if (response.status == 200) {
                el.Message.success('登录成功');
                state.user = response.data.user_info;
            } else {
                el.Message.error('用户或密码错误');
            }
            //console.log(response)
        })
            .catch(function (error) {
                if (error.response.status == 403) {
                    el.Message.error('用户或密码错误');
                } else {
                    el.Message.error('未知错误');
                }
                //console.log(error)
            });
    },
    signout() {
        axios({ method: "POST", url: "/codemaoapi/tiger/v3/web/accounts/logout", data: {} }).then(function () {
            el.Message.success('退出成功');
        }).catch(function () {
            el.Message.error('未知错误');
        })
    },
    write(s, data) {
        s = data;
        axios({
            method: "POST",
            url: "/codemaoapi/web/works/subjects/856/post",
            data: data,
        }).then(function(){
            el.Message.success("发布成功")
        }).catch(function(error){
            el.Message.error("未知错误")
            console.log(error)
        })
    }
};

export default mutations;