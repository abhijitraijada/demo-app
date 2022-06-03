import React, { useState } from "react";
import { Image, Box, Text, TextInput, Button } from "@mantine/core"
import loginImage from "../assets/Images/login.svg"
import { getWillFlow } from "../apis/willFlowApis"
import axios, {post} from 'axios'


const Login = ({ navigate }) => {
    const [newUser, setNewUser] = useState(false)
    const [otpScreen, setOtpScreen] = useState(false)

    return (
        <div style={{ "display":"flex", "flexDirection":"row" }}>
            <div style={{"minHeight":"100%", "width":"100%"}}>
                <Box style={{
                    "backgroundColor": "#023047",
                    "height": window.innerHeight,
                    "width":"100%",
                    "color":"#FFFFFF",
                    "padding":"2.03vw",
                    "fontSize": "1.63vw",
                    "display":"flex",
                    "flexDirection": "column",
                    "justifyContent": "space-between"
                }}>
                    <Text style={{"fontSize":"1.63vw"}}>Project Whitney</Text>
                    <Image style = {{ "paddingBottom": 150, "maxHeight": 384, "maxWidth": 683, 'alignSelf': 'center' }} src={loginImage}/>
                </Box>
            </div>
            <div style={{"minHeight":"100%", "width":"100%", 'display': 'flex', "alignContent": "center", "justifyContent": "center", "alignItems":"center"}}>
                {!newUser && !otpScreen &&
                    <div>
                        <Text style={{"fontSize":"1.3vw", "color":"#505664"}}>Welcome Back</Text>
                        <Text style={{"fontSize":"3.16vw", "color":"#023047", "fontWeight":700}}>Sign in</Text>
                        <TextInput
                            label="Email"
                            placeholder="Name@gmail.com"
                            styles={{
                                label: { 'color': '#023047', 'fontSize': '1.63vw' },
                                root: { 'width': '100%' },
                                wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                            }}
                        />
                        <TextInput
                            label="Password"
                            placeholder="******"
                            type="password"
                            styles={{
                                label: { 'color': '#023047', 'fontSize': '1.63vw' },
                                root: { 'width': '100%' },
                                wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                            }}
                        />
                        <div style={{"marginBottom":"1.63vw"}}></div>
                        <Button style={{"display":"flex","flexDirection":"row","justifyContent":"center","alignItems":"center","background":"#023047","boxShadow":"1px 1px 13px 12px rgba(2, 48, 71, 0.1)","borderRadius":"4px","fontWeight":"600","fontSize":"2.03vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                            onClick={() => {setOtpScreen(true)}}
                        >Sign in</Button>
                        <Button variant="subtle" style={{"display":"flex","flexDirection":"row","justifyContent":"center","alignItems":"center","marginTop":"1vw","color":"#023047","borderRadius":"4px","fontWeight":"600","fontSize":"1.63vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                            onClick={(e) => {setNewUser(!newUser)}}
                        >Create New Account</Button>
                    </div>
                }
                { newUser && !otpScreen &&
                    <div>
                    <Text style={{"fontSize":"1.3vw", "color":"#505664"}}>Welcome</Text>
                    <Text style={{"fontSize":"3.16vw", "color":"#023047", "fontWeight":700}}>Create account</Text>
                    <TextInput
                        label="Name"
                        placeholder="Jhon Doe"
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '100%' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Name@gmail.com"
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '100%' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                    />
                    <TextInput
                        label="Phone No."
                        placeholder="Jhon Doe"
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '100%' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                    />
                    <TextInput
                        label="Password"
                        placeholder="******"
                        type="password"
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '100%' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                    />
                    <div style={{"marginBottom":"1.63vw"}}></div>
                    <Button style={{"display":"flex","flexDirection":"row","justifyContent":"center","alignItems":"center","background":"#023047","boxShadow":"1px 1px 13px 12px rgba(2, 48, 71, 0.1)","borderRadius":"4px","fontWeight":"600","fontSize":"2.03vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                        onClick={() => {setOtpScreen(true)}}
                    >Create account</Button>
                    <Button variant="subtle" style={{"display":"flex","flexDirection":"row","justifyContent":"center","alignItems":"center","marginTop":"1vw","color":"#023047","borderRadius":"4px","fontWeight":"600","fontSize":"1.63vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                        onClick={(e) => {setNewUser(!newUser)}}
                    >Sign in with existing account</Button>
                </div>
                }
                { otpScreen &&
                    <div>OTP Screen</div>
                }
            </div>
        </div>
    )
}

export default Login