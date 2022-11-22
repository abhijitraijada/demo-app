import React, { useState } from "react";
import Header from '../Component/header'
import SideBar from "../Component/sidebar";
import Footer from "../Component/footer";
import {Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import EssentialDocs from '../Pages/essentialDocs'
import InfoBinder from '../Pages/infoBinder'
import WillFlow from '../Pages/willFlow'
import Test from '../Pages/test'
import PowerOfAttorney from "./powerOfAttorney";
import Trust from "./trust";
import LivingWill from "./livingWill";
import HealthcareProxy from "./healthcareProxy";

const Home = ({setLoggedIn}) => {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(0)
    return(
        <div>
            <Header/>
            <div style={{display : 'flex', flexDirection: 'row'}}>
                <SideBar navigate = {navigate} setLoggedIn = {setLoggedIn}/>
                <div style={{overflowX: 'auto', height: window.innerHeight - 148, position:'relative', width:'100%'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', padding: 20}}>
                        <Routes>
                            <Route path="/infoBinder" element={<InfoBinder navigate={navigate}/>}/>
                            <Route path="/test" element={<Test navigate={navigate}/>}/>
                            <Route path="/essentialDocs" element={<EssentialDocs navigate={navigate}/>}/>
                            <Route path="/essentialDocs/willFlow" element={<WillFlow navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                            <Route path="/essentialDocs/powerOfAttorney" element={<PowerOfAttorney navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                            <Route path="/essentialDocs/trust" element={<Trust navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                            <Route path="/essentialDocs/livingWill" element={<LivingWill navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
                            <Route path="/essentialDocs/healthcareProxy" element={<HealthcareProxy navigate={navigate} counter = {counter} setCounter={setCounter}/>}/>
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