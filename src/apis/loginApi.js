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

export const login = (data) => {
    let formData = {}
    let willFlowUrl = "https://development.project-whitney.com/whitney/public/api/v1/sign-in"
    console.log("Data in api call: ", data)
    formData = new FormData()
    Object.keys(data).map((item, index) => {
        formData.set(item, data[item])
    })
    console.log("Form data", formData)
    return whitney.post(willFlowUrl, formData)
}

export const signUp = (data) => {
    let formData = {}
    let willFlowUrl = "https://development.project-whitney.com/whitney/public/api/v1/sign-up"
    console.log("Data in api call: ", data)
    formData = new FormData()
    Object.keys(data).map((item, index) => {
        formData.set(item, data[item])
    })
    console.log("Form data", formData)
    return whitney.post(willFlowUrl, formData)
}

export const verifyOtp = (data) => {
    let formData = {}
    let willFlowUrl = "https://development.project-whitney.com/whitney/public/api/v1/sign-up-verification"
    console.log("Data in api call: ", data)
    formData = new FormData()
    Object.keys(data).map((item, index) => {
        formData.set(item, data[item])
    })
    console.log("Form data", formData)
    return whitney.post(willFlowUrl, formData)
}

