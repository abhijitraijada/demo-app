import React from "react";
import axios from "axios";

const whitney = axios.create({
    headers: {
        'Content-Type': 'multipart/formdata',
        "Access-Control-Allow-Origin": "*"
    }
    
})

export const getWillFlow = (flowId,data) => {
    flowId = "200000001"
    let willFlowUrl = "https://development.project-whitney.com/whitney/public/api/v1/userdata/827ccb0eea8a706c4c34a16891f84e7b04/827ccb0eea8a706c4c34a16891f84e7b04/category/10001/topic/" + flowId
    if(!data) {
        console.log("Without data")
        return whitney.get(willFlowUrl)
    } else {
        let formData = new FormData()
        Object.keys(data).map((item, index) => {
            formData.set(item, data[item])
        })
        console.log("Form data", formData)
        return whitney.post(willFlowUrl, formData)
    }
}

