import React, { useState } from "react";
import { Image } from "@mantine/core"
import loginImage from "../assets/Images/login.svg"
import { getWillFlow } from "../apis/willFlowApis"
import axios, {post} from 'axios'


const Login = ({ navigate }) => {
    const [page, setPage] = useState()
    const [name, setName] = useState("");
    let url = "https://development.project-whitney.com/whitney/public/api/v1/userdata/827ccb0eea8a706c4c34a16891f84e7b04/827ccb0eea8a706c4c34a16891f84e7b04/category/10001/topic/200000001?test_json_response=test"

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append("answer", name)
        const config = {
            headers: {
                'Content-Type': 'application/json',
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
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
        </>
    )
}

export default Login