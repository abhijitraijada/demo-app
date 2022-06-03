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

export const getWillFlow = (flowId,data,formdata) => {
    flowId = "200000001"
    let formData = {}
    let willFlowUrl = "https://development.project-whitney.com/whitney/public/api/v1/userdata/827ccb0eea8a706c4c34a16891f84e7b04/827ccb0eea8a706c4c34a16891f84e7b04/category/10001/topic/" + flowId
    if(!data) {
        console.log("Without data")
        return whitney.get(willFlowUrl)
    } else {
        console.log("Data in api call: ", data)
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

