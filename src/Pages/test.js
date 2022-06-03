import React, { useState, useRef } from "react";
import { Image } from "@mantine/core"
import loginImage from "../assets/Images/login.svg"
import { getWillFlow } from "../apis/willFlowApis"
import axios, {post} from 'axios'


const Test = ({ navigate }) => {
    const [page, setPage] = useState()
    const [name, setName] = useState("");
    const fileRef = useRef()
    let url = "https://development.project-whitney.com/whitney/public/api/v1/userdata/827ccb0eea8a706c4c34a16891f84e7b04/827ccb0eea8a706c4c34a16891f84e7b04/category/10001/topic/200000001"

    const handleSubmit = (event,files) => {
        event.preventDefault();
        let data = {
            "SaveDocument": "Submit",
            "question_id": 210000003,
        }
        // let formData = new FormData()
        // Object.keys(data).map((item, index) => {
        //     formData.set(item, data[item])
        // })
        // let fileElement = document.getElementById("fileInput")
        // console.log("File input Element: ", fileElement.files)
        // console.log("File input ref: ", fileRef.current.files)
        // console.log("Files from argument: ", files)
        // formData.append("uploaded_files[]",fileElement.files)
        var formObj=document.getElementById("Fileform");
        var formdata = new FormData(formObj);
        console.log("FormData: ", formdata, document.getElementById("Fileform"))
        // const config = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     } 
        // }
        // console.log("form data from login: ", formData)
        post(url,formdata).then((res) => {
            console.log("Success submit: ", res.data)
        }, (err) => {
            console.log("Error in submit: ",err)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data" id = "Fileform">
                <label>Enter your name:
                    <input
                        type="file"
                        name="uploaded_files[]"
                        id="fileInput"
                        onChange={(e) => {console.log("File changed: ", e); handleSubmit(e, e.target.files)}}
                        ref = {fileRef}
                    />
                </label>
                <input type="submit" name="SaveDocument" value="Submit"/>
            </form>
        </>
    )
}

export default Test