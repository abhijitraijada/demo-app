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

export const getDocList = (flowId,data,formdata) => {
    flowId = "200000001"
    let userData = JSON.parse(localStorage.getItem("project_whiteney_user_data"))
    let formData = {}
    let docList = "https://development.project-whitney.com/whitney/public/api/v1/usertopics"
    if(!data) {
        let data = {}
        data['uuid'] = userData.uuid
        data['access_token'] = userData.access_token
        formData = new FormData()
        Object.keys(data).map((item, index) => {
            formData.set(item, data[item])
        })
        return whitney.post(docList,formData)
    } else {
        data['uuid'] = userData.uuid
        data['access_token'] = userData.access_token
        if(!formdata){
            formData = new FormData()
            Object.keys(data).map((item, index) => {
                formData.set(item, data[item])
            })
        } else {
            formData = new FormData(data)
        }
        console.log("Form data", formData)
        return whitney.post(docList, formData)
    }
}

export const addTopic = (topicId) => {
    let userData = JSON.parse(localStorage.getItem("project_whiteney_user_data"))
    let data = {}
    let formData = {}
    let addTopicUrl = "https://development.project-whitney.com/whitney/public/api/v1/usertopic/add/" + topicId
    data['uuid'] = userData.uuid
    data['access_token'] = userData.access_token
    data['topic_id'] = topicId
    formData = new FormData()
    Object.keys(data).map((item, index) => {
        formData.set(item, data[item])
    })
    return whitney.post(addTopicUrl, formData)
}

export const deleteTopic = (topicId) => {
    let userData = JSON.parse(localStorage.getItem("project_whiteney_user_data"))
    let data = {}
    let formData = {}
    let addTopicUrl = "https://development.project-whitney.com/whitney/public/api/v1/usertopic/delete/" + topicId
    data['uuid'] = userData.uuid
    data['access_token'] = userData.access_token
    data['topic_id'] = topicId
    formData = new FormData()
    Object.keys(data).map((item, index) => {
        formData.set(item, data[item])
    })
    return whitney.post(addTopicUrl, formData)
}

