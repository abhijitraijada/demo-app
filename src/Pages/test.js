import React, { useState } from "react";
import { Image } from "@mantine/core"
import loginImage from "../assets/Images/login.svg"
import { getWillFlow } from "../apis/willFlowApis"
import axios, {post} from 'axios'


const Test = ({ navigate }) => {
    const [page, setPage] = useState()
    const [name, setName] = useState("");
    let url = "https://development.project-whitney.com/whitney/public/api/v1/userdata/827ccb0eea8a706c4c34a16891f84e7b04/827ccb0eea8a706c4c34a16891f84e7b04/category/10001/topic/200000001"

    const handleSubmit = (event,files) => {
        event.preventDefault();
        let data = {
            "SaveDocument": "Submit",
            "question_id": 210000003,
            "uploaded_files": files
        }
        let formData = new FormData()
        Object.keys(data).map((item, index) => {
            formData.set(item, data[item])
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            } 
        }
        console.log("form data from login: ", formData)
        post(url,formData,config).then((res) => {
            console.log("Success submit: ", res.data)
        }, (err) => {
            console.log("Error in submit: ",err)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Enter your name:
                    <input
                        type="file"
                        onChange={(e) => {console.log("File changed: ", e); handleSubmit(e, e.target.files)}}
                    />
                </label>
                <input type="submit" />
            </form>
        </>
    )
}

export default Test