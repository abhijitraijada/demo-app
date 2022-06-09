import React, { useState } from "react";
import { Box, Avatar, Text, Button, List } from '@mantine/core'
import { BiHome, BiUserCircle, BiCog, BiLogOut, BiBookOpen } from 'react-icons/bi'
import { BsCircleFill } from 'react-icons/bs'

export default function SideBar({navigate, setLoggedIn}) {
    const [infoBinderMenu, setInfoBinderMenu] = useState(false)
    return (
        <Box sx={(theme) => (
            {
                backgroundColor: '#F6FBFD',
                height: window.innerHeight - 128,
                outerWidth: 300,
                display: 'flex',
            }
        )} style={{
            maxWidth: 300,
            zIndex: 200
        }}>
            <div>
                <div> {/* For profile pic and other info */}
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}> 
                        <div style={{paddingRight: 20, paddingLeft: 20}}>
                            <Avatar size={94} />
                        </div>
                        <div style={{ display: "flex", flexDirection: 'column' }}>
                            <Text style={{color: '#505664', fontSize: 20}}>Good Morning</Text>
                            <Text style={{color: '#023047', fontSize: 25, paddingRight: 20}}>Livia Phillips</Text>
                        </div>
                    </div>
                    <div style={{ paddingLeft: 24, maxWidth: 104, marginTop: 10 }}>
                       <Text style={{ backgroundColor: '#ECF9F3', borderRadius: 4, padding: 8, fontSize: 25, fontWeight: 600, color: '#239E69' }}>Testator</Text> 
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: 10, maxWidth: 270}}>
                    <div style={{ display: "flex", flexDirection: 'column' }}> {/* For nav buttons */}
                        <Button variant="subtle" style={{ display: 'flex', height: 50 }}>
                            <div style={{ display: "flex", flexDirection: 'row', alignContent: 'center' }}>
                                <BiHome size={28} color="#62697B"/>
                                <Text style={{color: '#62697B', fontSize: 25, paddingLeft: 10}}>Home</Text>
                            </div>
                        </Button>
                        <Button variant="subtle" style={{ display: 'flex', height: 50, maxWidth: 270 }}
                            onClick = {() => {
                                navigate('/infoBinder')
                                setInfoBinderMenu(!infoBinderMenu)
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: 'row', alignContent: 'center', wordWrap: 'break-word' }}>
                                <BiBookOpen size={28} color="#62697B"/>
                                <Text style={{color: '#62697B', fontSize: 25, paddingLeft: 10}}>Information Binder</Text>
                            </div>
                        </Button>
                        {infoBinderMenu && <>
                            <div style={{'position': 'relative', 'left': '20%', 'wordWrap': 'break-word', 'maxWidth': '200px', 'cursor': 'pointer'}}>
                                <div style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'alignContent': 'center', 'alignItems': 'center'}}
                                    onClick={() => {
                                        navigate('/essentialDocs')
                                    }}
                                >
                                    <div>
                                        <BsCircleFill color="#023047"/>
                                    </div>
                                    <div style={{'color': '#62697B', 'fontSize': 25, 'paddingLeft': 10}}>
                                        Essential Documents
                                    </div>
                                </div>
                            </div>
                        </>}
                        <Button variant="subtle" style={{ display: 'flex', height: 50 }}>
                            <div style={{ display: "flex", flexDirection: 'row', alignContent: 'center' }}>
                                <BiUserCircle size={28} color="#62697B"/>
                                <Text style={{color: '#62697B', fontSize: 25, paddingLeft: 10}}>Account</Text>
                            </div>
                        </Button>
                        <Button variant="subtle" style={{ display: 'flex', height: 50 }}>
                            <div style={{ display: "flex", flexDirection: 'row', alignContent: 'center' }}>
                                <BiCog size={28} color="#62697B"/>
                                <Text style={{color: '#62697B', fontSize: 25, paddingLeft: 10}}>Setting</Text>
                            </div>
                        </Button>
                        <Button variant="subtle" style={{ display: 'flex', height: 50 }}
                            onClick = {() => {
                                localStorage.removeItem("project_whiteney_email")
                                localStorage.removeItem("project_whiteney_user_data")
                                setLoggedIn(false)
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: 'row', alignContent: 'center' }}>
                                <BiLogOut size={28} color="#62697B"/>
                                <Text style={{color: '#62697B', fontSize: 25, paddingLeft: 10}}>Logout</Text>
                            </div>
                        </Button>
                    </div> 
                </div>
                <div></div> {/* For sidebar footer buttons */}
            </div>
        </Box>
    )
}