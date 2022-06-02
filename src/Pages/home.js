import React, { useState } from "react";
import Header from '../Component/header'
import SideBar from "../Component/sidebar";
import Footer from "../Component/footer";
import {Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import EssentialDocs from '../Pages/essentialDocs'
import InfoBinder from '../Pages/infoBinder'
import WillFlow from '../Pages/willFlow'
import WillFlow1 from '../Pages/willFlow1'
import WillFlow2 from '../Pages/willFlow2'
import WillFlow3 from '../Pages/willFlow3'
import WillFlow4 from '../Pages/willFlow4'
import Test from '../Pages/test'

const Home = () => {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(0)
    return(
        <div>
            <Header/>
            <div style={{display : 'flex', flexDirection: 'row'}}>
                <SideBar navigate = {navigate} />
                <div style={{overflowX: 'auto', height: window.innerHeight - 148, position:'relative', width:'100%'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', padding: 20}}>
                        <Routes>
                            <Route path="/infoBinder" element={<InfoBinder navigate={navigate}/>}/>
                            <Route path="/test" element={<Test navigate={navigate}/>}/>
                            <Route path="/essentialDocs" element={<EssentialDocs navigate={navigate}/>}/>
                            <Route path="/essentialDocs/willFlow" element={<WillFlow navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                            <Route path="/essentialDocs/willFlow/1" element={<WillFlow1 navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                            <Route path="/essentialDocs/willFlow/2" element={<WillFlow2 navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                            <Route path="/essentialDocs/willFlow/3" element={<WillFlow3 navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                            <Route path="/essentialDocs/willFlow/4" element={<WillFlow4 navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                        </Routes>
                    </div>
                    <Outlet/>
                    {/* <Footer/> */}
                </div>
            </div>
        </div>
    )
}

export default Home