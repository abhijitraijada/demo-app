import React from "react";
import axios from "axios";

const whitney = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    onUploadProgress: function (progressEvent) {
        console.log("Pregress event: ", progressEvent)
    },
})

export const getWillFlow = (flowId,data,formdata, binderId) => {
    console.log("binder id from: ", flowId,data,formdata, binderId)
    if (!flowId){
        console.log("Error in will flow please send flowid with will flow")
        return
    }
    let userData = JSON.parse(localStorage.getItem("project_whiteney_user_data"))
    let formData = {}
    let willFlowUrl = "https://development.project-whitney.com/whitney/public/api/v1/binderdetails/category/10001/topic/" + flowId
    if(!data) {
        let data = {}
        data['uuid'] = userData.uuid
        data['access_token'] = userData.access_token
        if(binderId) {
            console.log("Binder id added: ", binderId)
            data["main_binder_id"] = binderId
        }
        formData = new FormData()
        Object.keys(data).map((item, index) => {
            formData.set(item, data[item])
        })
        return whitney.post(willFlowUrl,formData)
    } else {
        data['uuid'] = userData.uuid
        data['access_token'] = userData.access_token
        if(binderId?.length > 0) {
            data["main_binder_id"] = binderId
        }
        console.log("Data test >>>>", data)
        if(!formdata){
            formData = new FormData()
            Object.keys(data).map((item, index) => {
                formData.set(item, data[item])
            })
        } else {
            formData = new FormData(data)
        }
        console.log("Form data", formData)
        return whitney.post(willFlowUrl, formData)
    }
}

export const listBinderDetails = (flowId) => {
    let userData = JSON.parse(localStorage.getItem("project_whiteney_user_data"))
    let formData = {}
    let willFlowUrl = "https://development.project-whitney.com/whitney/public/api/v1/binderlist/category/10001/topic/" + flowId
    let data = {}
    data['uuid'] = userData.uuid
    data['access_token'] = userData.access_token
    formData = new FormData()
    Object.keys(data).map((item, index) => {
        formData.set(item, data[item])
    })
    return whitney.post(willFlowUrl, formData)
}