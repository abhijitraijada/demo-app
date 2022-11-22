import React, { useState, useRef, useEffect } from "react";
import { Image, Modal } from "@mantine/core"
import loginImage from "../assets/Images/login.svg"
import { getWillFlow } from "../apis/willFlowApis"
import axios, {post} from 'axios'
import Card from "../Component/card"




const Test = ({ navigate }) => {
    const [page, setPage] = useState()
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true)
    const fileRef = useRef()
    const [userData, setUserData] = useState()
    const [opened, setOpened] = useState(false)
    const [useDetailData, setUseDetailData] = useState({})
    let url = "https://reqres.in/api/users?page=1"
    useEffect(() => {
        axios.get(url).then((res) => {
            console.log("Data from test API: ", res.data)
            setUserData(res.data)
            setLoading(false)
        }, (err) => {
            console.log("Error in test API: ", err)
        })
    }, [])

    function oddEven(num) {
        return num % 2 == 0 ? true : false
    }
    useEffect
    return (
        <>
        { !loading &&
            <div>
                <Modal opened = {opened} onClose={() => {setOpened(false)}} title="Card Title"/>
                {userData.data.map((item, index) => {
                    return(
                    <>
                    <Card data= {item} key={index} modalState = {opened} setModalState = {setOpened} useDetailData = {setUseDetailData}/>
                    </>
                    )
                })}
            </div>
        }
        </>
    )
}

export default Test