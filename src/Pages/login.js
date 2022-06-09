import React, { useState } from "react";
import { Image, Box, Text, TextInput, Button, Loader } from "@mantine/core"
import loginImage from "../assets/Images/login.svg"
import { login, signUp, verifyOtp } from "../apis/loginApi"


const Login = ({ navigate, setLoggedIn }) => {
    const [newUser, setNewUser] = useState(false)
    const [otpScreen, setOtpScreen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loginDetails, setLoginDetails] = useState({"submit": "Submit"})
    const [signUpDetails, setSignUpDetails] = useState({"submit": "Submit"})
    const [otpDetails, setOtpDetails] = useState({"submit": "Submit"})
    const [otp, setOtp] = useState("")
    const [error, setError] = useState(false)
    const [loginEmailError, setLoginEmailError] = useState()
    const [loginPasswordError, setLoginPasswordError] = useState()
    const [registerFieldsError, setRegisterFieldsError] = useState()

    const loginBtn = () => {
        setLoading(true)
        setError(false)
        let submitOk = false
        if("email" in loginDetails && "password" in loginDetails) {
            if (!loginEmailError) {
                submitOk = true
            } else {
                setError({"message":"Enter correct email address"})   
                setLoading(false) 
            }
        } else {
            setError({"message":"Email address & password are required"})
            setLoading(false)
        }
        if(submitOk) {
        login(loginDetails).then((response) => {
            if(response.data.status ===  "success") {
                localStorage.setItem("project_whiteney_email", loginDetails.email)
                localStorage.setItem("project_whiteney_user_data", JSON.stringify(response.data.user_data))
                setLoggedIn(true)
            }
            if(response.data.status ===  "error") {
                setError(response.data)
            }
            setLoading(false)
        }, (error) => {
            console.log("Login API Failur: ", error)
            setLoading(false)
        })
        } 
        //else {
        //     setError({"message":"Invalid Credentials"})
        //     setLoading(false)
        // }
    }

    const signupBtn = () => {
        setLoading(true)
        setError(false)
        let submitOk = false
        let tempLength = Object.keys(signUpDetails).length
        if(tempLength < 5) {
            setError({"message": "All fields are required"})
            setLoading(false)
            submitOk = false
        } else {
            submitOk = true
        }
        if (submitOk) {
            signUp(signUpDetails).then((response) => {
                console.log("Signup API Success: ", response.data)
                if (response.data.status === "success") {
                    setOtpScreen(true)
                }
                if (response.data.status === "error") {
                    if(response.data.message === "Email already registerd.") {
                        setTimeout(() => {setOtpScreen(true)}, 500)
                    }
                    setError(response.data)
                    console.log("Setting Error: ", response.data)
                }
                setLoading(false)
            }, (error) => {
                console.log("Sign Up Failur : ", error)
            })
        }
    }

    const verifyOtpBtn = () => {
        setLoading(true)
        setError(false)
        let data = {
            "submit": "Submit",
            "email": signUpDetails.email,
        }
        if (otp.length > 0) {
            data["verification_code"] = otp
        } else {
            setError({"message":"Enter OTP"})
        }
        verifyOtp(data).then((response) => {
            console.log("OTP Verification Data: ", response.data)
            if(response.data.status === "success") {
                setNewUser(false)
                setLoading(false)
            }
            if (response.data.error === "error") {
                setError(response.data)
                setLoading(false)
            }
        }, () => {})
    }

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
                        <Text style={{"fontSize":"3.16vw", "color":"#023047", "fontWeight":700, "marginBottom": '2vw'}}>Sign in</Text>
                        <TextInput
                            label="Email"
                            placeholder="Name@gmail.com"
                            type="email"
                            error = {loginEmailError}
                            styles={{
                                label: { 'color': '#023047', 'fontSize': '1.63vw', "marginBottom":"0px" },
                                root: { 'width': '100%', 'marginBottom': '1.63vw' },
                                wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                            }}
                            onChange = {(e) => {
                                if(String(e.target.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                                    setLoginEmailError()
                                } else {
                                    setLoginEmailError("Please enter correct email address")
                                }
                                let temp = {...loginDetails, "email": e.target.value}
                                setLoginDetails(temp)
                            }}
                        />
                        <TextInput
                            label="Password"
                            placeholder="******"
                            type="password"
                            error = {loginPasswordError}
                            styles={{
                                label: { 'color': '#023047', 'fontSize': '1.63vw', "marginBottom":"0px" },
                                root: { 'width': '100%', 'marginBottom': '1.63vw' },
                                wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                            }}
                            onChange = {(e) => {
                                if(e.target.value.length > 0) {
                                    setLoginPasswordError()
                                } else {
                                    setLoginPasswordError("Password is required")
                                }
                                let temp = {...loginDetails, "password": e.target.value}
                                setLoginDetails(temp)
                            }}
                        />
                        <div style={{"marginBottom":"1.63vw"}}></div>
                        <Button style={{"display":"flex","flexDirection":"row","justifyContent":"center","alignItems":"center","background":"#023047","boxShadow":"1px 1px 13px 12px rgba(2, 48, 71, 0.1)","borderRadius":"4px","fontWeight":"600","fontSize":"2.03vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                            onClick={() => {
                                console.log("Data for login: ", loginDetails)
                                loginBtn()
                            }}
                        >
                            {loading ? <Loader variant="dots" style={{"fill":"#FFFFFF"}}/> :"Sign in"}
                        </Button>
                        {error !== false && <Text style={{"color":"red", "marginTop":"1vw", "marginBottom":"1vw", "maxWidth": "30vw", "fontSize":"1.63vw"}}>{error.message}</Text>}
                        <Button variant="subtle" style={{"display":"flex","flexDirection":"row","justifyContent":"center","alignItems":"center","marginTop":"1vw","color":"#023047","borderRadius":"4px","fontWeight":"600","fontSize":"1.63vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                            onClick={(e) => {setNewUser(!newUser)}}
                        >Create New Account</Button>
                    </div>
                }
                { newUser && !otpScreen &&
                    <div>
                    <Text style={{"fontSize":"1.3vw", "color":"#505664"}}>Welcome</Text>
                    <Text style={{"fontSize":"3.16vw", "color":"#023047", "fontWeight":700, "marginBottom": '2vw'}}>Create account</Text>
                    <TextInput
                        label="First Name"
                        placeholder="Jhon"
                        error = {registerFieldsError?.firstName}
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw', "marginBottom":"0px" },
                            root: { 'width': '100%', 'marginBottom': '1.63vw' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                        onChange = {(e) => {
                            let tempErr = {}
                            if(e.target.value.length > 0) {
                                tempErr = {...registerFieldsError, firstName: false}
                                setRegisterFieldsError(tempErr)
                            } else {
                                tempErr = {...registerFieldsError, firstName: "First name is required"}
                                setRegisterFieldsError(tempErr)
                            }
                            let temp = {...signUpDetails, "first_name": e.target.value}
                            setSignUpDetails(temp)
                        }}
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Doe"
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw', "marginBottom":"0px" },
                            root: { 'width': '100%', 'marginBottom': '1.63vw' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                        error = {registerFieldsError?.lastName}
                        onChange = {(e) => {
                            let tempErr = {}
                            if(e.target.value.length > 0) {
                                tempErr = {...registerFieldsError, lastName: false}
                                setRegisterFieldsError(tempErr)
                            } else {
                                tempErr = {...registerFieldsError, lastName: "Last name is required"}
                                setRegisterFieldsError(tempErr)
                            }
                            let temp = {...signUpDetails, "last_name": e.target.value}
                            setSignUpDetails(temp)
                        }}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Name@gmail.com"
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw', "marginBottom":"0px" },
                            root: { 'width': '100%', 'marginBottom': '1.63vw' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                        error = {registerFieldsError?.email}
                        onChange = {(e) => {
                            let tempErr = {}
                            if(e.target.value.length <= 0) {
                                tempErr = {...registerFieldsError, email: "Email address is required"}
                                setRegisterFieldsError(tempErr)
                            } else if (!String(e.target.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                                tempErr = {...registerFieldsError, email: "Invalid email address"}
                                setRegisterFieldsError(tempErr)
                            } else {
                                tempErr = {...registerFieldsError, email: false}
                                setRegisterFieldsError(tempErr)
                            }
                            let temp = {...signUpDetails, "email": e.target.value}
                            setSignUpDetails(temp)
                        }}
                    />
                    <TextInput
                        label="Phone Number"
                        placeholder="Jhon Doe"
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw', "marginBottom":"0px" },
                            root: { 'width': '100%', 'marginBottom': '1.63vw' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                        error = {registerFieldsError?.phoneNo}
                        onChange = {(e) => {
                            let tempErr = {}
                            if(e.target.value.length > 9) {
                                tempErr = {...registerFieldsError, phoneNo: false}
                                setRegisterFieldsError(tempErr)
                            } else if (e.target.value.length < 10) {
                                tempErr = {...registerFieldsError, phoneNo: "Invalid phone number"}
                                setRegisterFieldsError(tempErr)
                            } else {
                                tempErr = {...registerFieldsError, phoneNo: "Phone number is required"}
                                setRegisterFieldsError(tempErr)
                            }
                            let temp = {...signUpDetails, "phone_no": e.target.value}
                            setSignUpDetails(temp)
                        }}
                    />
                    <TextInput
                        label="Password"
                        placeholder="******"
                        type="password"
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw', "marginBottom":"0px" },
                            root: { 'width': '100%', 'marginBottom': '1.63vw' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                        error = {registerFieldsError?.password}
                        onChange = {(e) => {
                            let tempErr = {}
                            if(e.target.value.length > 0) {
                                tempErr = {...registerFieldsError, password: false}
                                setRegisterFieldsError(tempErr)
                            } else {
                                tempErr = {...registerFieldsError, password: "Password is required"}
                                setRegisterFieldsError(tempErr)
                            }
                            let temp = {...signUpDetails, "password": e.target.value}
                            setSignUpDetails(temp)
                        }}
                    />
                    <div style={{"marginBottom":"1.63vw"}}></div>
                    <Button style={{"display":"flex","flexDirection":"row","justifyContent":"center","alignItems":"center","background":"#023047","boxShadow":"1px 1px 13px 12px rgba(2, 48, 71, 0.1)","borderRadius":"4px","fontWeight":"600","fontSize":"2.03vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                        onClick={() => {
                            signupBtn()
                        }}
                    >{loading ? <Loader variant="dots" style={{"fill":"#FFFFFF"}}/> :"Create account"}</Button>
                    {error !== false && <Text style={{"color":"red", "marginTop":"1vw", "marginBottom":"1vw", "maxWidth": "30vw", "fontSize":"1.63vw"}}>{error.message}</Text>}
                    <Button variant="subtle" style={{"display":"flex","flexDirection":"row","maxWidth": "30vw","justifyContent":"center","alignItems":"center","marginTop":"1vw","color":"#023047","borderRadius":"4px","fontWeight":"600","fontSize":"1.63vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                        onClick={(e) => {setNewUser(!newUser)}}
                    >Sign in with existing account</Button>
                </div>
                }
                { otpScreen &&
                    <div>
                        <Text style={{"fontSize":"3.16vw", "color":"#023047", "fontWeight":700, "maxWidth": "30vw"}}>Verify email address</Text>
                        <Text style={{"fontSize":"1.3vw", "color":"#505664", "maxWidth": "30vw", "marginBottom": '2vw'}}>Enter the code you would have received, or will soon receive, in your email inbox.</Text>
                        <div style={{"display": "flex", "flexDirection":"row", "marginBottom":"5vw"}}>
                            <TextInput
                                label="OTP"
                                placeholder="#"
                                styles={{
                                    label: { 'color': '#023047', 'fontSize': '1.63vw' },
                                    root: { 'width': '100%', "maxWidth": "4vw", "maxHeight": "4vw", "height":"4vw", "marginRight":"1vw" },
                                    wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                    input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047', "textAlign": "center" }
                                }}
                                onChange = {(e) => {
                                    let temp = otp.concat(e.target.value)
                                    setOtp(temp)
                                }}
                            />
                            <TextInput
                                label="&zwnj;"
                                placeholder="#"
                                styles={{
                                    label: { 'color': '#023047', 'fontSize': '1.63vw' },
                                    root: { 'width': '100%', "maxWidth": "4vw", "maxHeight": "4vw", "height":"4vw", "marginRight":"1vw" },
                                    wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                    input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047', "textAlign": "center" }
                                }}
                                onChange = {(e) => {
                                    let temp = otp.concat(e.target.value)
                                    setOtp(temp)
                                }}
                            />
                            <TextInput
                                label="&zwnj;"
                                placeholder="#"
                                styles={{
                                    label: { 'color': '#023047', 'fontSize': '1.63vw' },
                                    root: { 'width': '100%', "maxWidth": "4vw", "maxHeight": "4vw", "height":"4vw", "marginRight":"1vw" },
                                    wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                    input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047', "textAlign": "center" }
                                }}
                                onChange = {(e) => {
                                    let temp = otp.concat(e.target.value)
                                    setOtp(temp)
                                }}
                            />
                            <TextInput
                                label="&zwnj;"
                                placeholder="#"
                                styles={{
                                    label: { 'color': '#023047', 'fontSize': '1.63vw' },
                                    root: { 'width': '100%', "maxWidth": "4vw", "maxHeight": "4vw", "height":"4vw", "marginRight":"1vw" },
                                    wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                    input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047', "textAlign": "center" }
                                }}
                                onChange = {(e) => {
                                    let temp = otp.concat(e.target.value)
                                    setOtp(temp)
                                }}
                            />
                            <TextInput
                                label="&zwnj;"
                                placeholder="#"
                                styles={{
                                    label: { 'color': '#023047', 'fontSize': '1.63vw' },
                                    root: { 'width': '100%', "maxWidth": "4vw", "maxHeight": "4vw", "height":"4vw", "marginRight":"1vw" },
                                    wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                    input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047', "textAlign": "center" }
                                }}
                                onChange = {(e) => {
                                    let temp = otp.concat(e.target.value)
                                    setOtp(temp)
                                }}
                            />
                            <TextInput
                                label="&zwnj;"
                                placeholder="#"
                                styles={{
                                    label: { 'color': '#023047', 'fontSize': '1.63vw' },
                                    root: { 'width': '100%', "maxWidth": "4vw", "maxHeight": "4vw", "height":"4vw", "marginRight":"1vw" },
                                    wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                                    input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047', "textAlign": "center" }
                                }}
                                onChange = {(e) => {
                                    let temp = otp.concat(e.target.value)
                                    setOtp(temp)
                                }}
                            />
                        </div>
                        {error !== false && <Text style={{"color":"red", "marginTop":"1vw", "marginBottom":"1vw", "maxWidth": "30vw", "fontSize":"1.63vw"}}>{error.message}</Text>}
                        <Button style={{"display":"flex","flexDirection":"row","justifyContent":"center","alignItems":"center","background":"#023047","boxShadow":"1px 1px 13px 12px rgba(2, 48, 71, 0.1)","borderRadius":"4px","fontWeight":"600","fontSize":"2.03vw","padding":"1.3vw 3.8vw", "height": "5vw", "width": "20vw"}}
                            onClick={() => {
                                verifyOtpBtn()
                            }}
                        >{loading ? <Loader variant="dots" style={{"fill":"#FFFFFF"}}/> :"Verify email"}</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login