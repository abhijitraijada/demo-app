import React, {useState}from "react";
import { Button, Textarea, Text, useMantineTheme, Group, Select, TextInput, Avatar } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { IoPlayOutline } from 'react-icons/io5'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { BiTrash, BiPencil } from 'react-icons/bi'

const InputControl = ({ data, handleButtonClick, step, modalMessage, setModalMessage, modalStatus, setModalStatus, setAnswer, answer, prefill, setPrefill, btnClick }) => {
    const theme = useMantineTheme();
    const [dateError, setDateError] = useState()
    const [textInputError, setTextInputError] = useState()

    switch (data.type) {
        case "yesNoButton":
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'maxWidth': '50%', "gap": "1.63vw" }}>
                    <Button
                        style={{ "display": "flex", "fontSize": "2.03vw", "color": "#023047", "flexDirection": "row", "justifyContent": "center", "alignItems": "center", "padding": "28px 128px", "gap": "10px", "height": "103px", "background": "#FEFEFE", "boxShadow": "1px 1px 13px 12px rgba(2, 48, 71, 0.1)", "borderRadius": "4px", "flex": "none", "order": "0", "flexGrow": "0" }}
                        onClick={(e) => { handleButtonClick(step, "primary") }}
                    >
                        {data.text1}
                    </Button>
                    <Button
                        style={{ "display": "flex", "fontSize": "2.03vw", "color": "#023047", "flexDirection": "row", "justifyContent": "center", "alignItems": "center", "padding": "28px 128px", "gap": "10px", "height": "103px", "background": "#FEFEFE", "boxShadow": "1px 1px 13px 12px rgba(2, 48, 71, 0.1)", "borderRadius": "4px", "flex": "none", "order": "0", "flexGrow": "0" }}
                        onClick={(e) => { handleButtonClick(step, "secondery") }}
                    >
                        {data.text2}
                    </Button>
                </div>
            )
        case "textarea":
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'width': '100%', "gap": "1.63vw", 'marginBottom': '2vw' }}>
                    <Textarea placeholder={data.placeholder} label={data.label} value={prefill[data.label]}
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '100%' },
                            wrapper: { 'minHeight': '10.4vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '10.04vw', 'border': 'none', 'color':'#023047', 'fontSize': '1.63vw' }
                        }}
                        onChange = {(e) => {
                            setPrefill({...prefill, [data.label]: e.target.value})
                            if (step.step === 5 || step.step === 8) {
                                let temp = answer
                                let key = data.label.toLowerCase().replace(" ","_")
                                temp[key] = e.target.value
                                console.log("Temp Var: ", temp)
                                setAnswer(temp)
                                
                            } else {
                                setAnswer(e.target.value)
                            }
                        }}
                    />
                </div>
            )
        case "hint":
            return (
                <div style={{ 'display': 'flex', "cursor":'pointer', 'flexDirection': 'row', 'width': '100%', "gap": "1.63vw", 'marginBottom':'2vw', 'color': '#045C87', 'fontSize': '1.3vw' }}
                    onClick={() => {
                        let temp = {
                            title: data.title,
                            content: data.content
                        }
                        setModalMessage(temp)
                        setModalStatus(!modalStatus)
                    }}
                >
                    <HiOutlineLightBulb color="#045C87" size='1.3vw' /> {data.text}
                </div>
            )
        case "videoHint": 
            return (
                <div style={{ 'display': 'flex', "cursor":'pointer', 'flexDirection': 'row', 'width': '100%', "gap": "1.63vw", 'marginBottom':'2vw', 'color': '#045C87', 'fontSize': '1.3vw' }}
                    onClick={() => {
                        let temp = {
                            title: data.title,
                            content: data.content,
                            url: data.videoUrl
                        }
                        setModalMessage(temp)
                        setModalStatus(!modalStatus)
                    }}
                >
                    <IoPlayOutline color="#045C87" size='1.3vw' /> {data.text}
                </div>
            )
        case 'fileUploader':
            const dropzoneChildren = (status, theme) => {
                return (

                    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                        <div>
                            <Text size="xl" inline>
                                Drag images here or click to select files
                            </Text>
                            <Text size="sm" color="dimmed" inline mt={7}>
                                Attach as many files as you like, each file should not exceed 5mb
                            </Text>
                        </div>
                    </Group>
                )
            }
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'width': '100%', "gap": "1.63vw", 'marginTop': '4vw', 'marginBottom': '4vw' }}>
                    <Dropzone onDrop={(files) => console.log('accepted files', files)}
                        onReject={(files) => console.log('rejected files', files)}
                        maxSize={3 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        multiple={true}
                        styles={{
                            'root': { "width": '100%' }
                        }}
                        onChange={(e) => {console.log("File on change value: ", e)}}
                    >
                        {(status) => dropzoneChildren(status, theme)}
                    </Dropzone>
                </div>
            )
        case "dropDown":
            let options = []
            data.options.map((item) => {
                let temp = { value: item, label: item }
                options.push(temp)
            })
            console.log("Options array for drop down: ", options)
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'width': '100%', "gap": "1.63vw", 'marginTop': '1.7vw' }}>
                    <Select
                        label={data.label}
                        placeholder={data.placeholder}
                        data={options}
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '50%' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047'},
                            dropdown: { 'border': 'none', 'borderRadius': '4px', "boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)"},
                            item: {'fontSize':'1.3vw', 'color':'#023047'},
                            hovered: {'backgroundColor': '#DEF1FD'}
                        }}
                        clearable
                        onChange={(e) => {
                            if (step.step === 5 || step.step === 8) {
                                let temp = {
                                    ...answer,
                                    [data.label.toLowerCase().replace(" ","_")]: e
                                }
                                console.log("Temp Var: ", temp)
                                setAnswer(temp)
                            } else {
                                setAnswer(e.target.value)
                            }
                        }}
                    />
                </div>
            )
        case "textInput":
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'width': '49%', "gap": "1.63vw", 'marginTop': '1.7vw', 'paddingRight': '1%' }}>
                    <TextInput
                        label={data.label}
                        placeholder={data.placeholder}
                        value={prefill[data.label]}
                        error = {textInputError}
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '100%' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                        onChange = {(e) => {
                            setPrefill({...prefill, [data.label]: e.target.value})
                            if(e.target.value.length > 0) {
                                if(data.label === "Email") {
                                    if(String(e.target.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                                        setTextInputError()
                                    } else {
                                        setTextInputError("Please enter correct email address")
                                    }
                                } else if (data.label === "Phone No") {
                                    let phone = e.target.value;
                                    let phoneNum = phone.replace(/[^\d]/g, '');
                                    if (phoneNum.length > 6 && phoneNum.length < 11) {  
                                        setTextInputError()  
                                    } else {
                                        setTextInputError("Please enter correct phone number")
                                    }
                                }
                            } else {
                                setTextInputError()
                            }
                            if (step.step === 5 || step.step === 8) {
                                let temp = {
                                    ...answer,
                                    [data.label.toLowerCase().replace(" ","_")]: e.target.value
                                }
                                console.log("Temp Var: ", temp)
                                setAnswer(temp)
                            } else {
                                setAnswer(e.target.value)
                            }
                        }}
                    />
                </div>
            )
        case "smallTextInput":
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'width': '49%', "gap": "1.63vw", 'marginTop': '1.7vw', 'paddingRight': '1%' }}>
                    <TextInput
                        label={data.label}
                        placeholder={data.placeholder}
                        value={prefill[data.label]}
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '25%' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                        onChange = {(e) => {
                            setPrefill({...prefill, [data.label]: e.target.value})
                            if (step.step === 5 || step.step === 8) {
                                let temp = {
                                    ...answer,
                                    [data.label.toLowerCase().replace(" ","_")]: e.target.value
                                }
                                console.log("Temp Var: ", temp)
                                setAnswer(temp)
                            } else {
                                setAnswer(e.target.value)
                            }
                        }}
                    />
                </div>
            )
        case 'dateInput':
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'width': '49%', "gap": "1.63vw", 'marginTop': '1.7vw', 'paddingRight': '1%' }}>
                    <DatePicker
                        label={data.label}
                        placeholder={data.placeholder}
                        error = {dateError}
                        styles={{
                            label: { 'color': '#023047', 'fontSize': '1.63vw' },
                            root: { 'width': '100%' },
                            wrapper: { 'minHeight': '3.8vw', 'border': '1px solid #ACB0B9', 'borderRadius': '4px' },
                            input: { 'height': '3.8vw', 'border': 'none', 'fontSize': '1.3vw', 'color':'#023047' }
                        }}
                        onChange = {(e) => {
                            if(e != null){
                                let diff = new Date().getFullYear() - e.getFullYear()
                                if(diff < 18) {
                                    setDateError("Age must be 18 or above")
                                } else {
                                    setDateError()
                                }
                            }
                            if (step.step === 5 || step.step === 8) {
                                let temp = {
                                    ...answer,
                                    [data.label.toLowerCase().replace(" ","_")]: e.toDateString()
                                }
                                console.log("Temp Var: ", temp)
                                setAnswer(temp)
                            } else {
                                setAnswer(e.target.value)
                            }
                        }}
                    />
                </div>
            )
        case 'table': 
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'column', 'width': '100%', "gap": "1.05vw", 'marginBottom': '2vw' }}>
                    <div style={{ "display": "flex", "flexDirection": "row", "alignItems": "center", "padding": "2%", "gap": "10px", "background": "#DEF1FD", "borderRadius": "3px 3px 0px 0px", "flex": "none", "order": "0", "flexGrow": "0", "paddingRight": "8%", "justifyContent": "space-between" }}>
                        <div style={{ "fontFamily": "'Source Sans Pro'", "fontStyle": "normal", "fontWeight": "600", "fontSize": "1.3vw", "display": "flex", "alignItems": "center", "color": "#505664", "flexGrow": "15" }}>
                            Name
                        </div>
                        <div style={{ "fontFamily": "'Source Sans Pro'", "fontStyle": "normal", "fontWeight": "600", "fontSize": "1.3vw", "display": "flex", "alignItems": "center", "color": "#505664", "flexGrow": "1", "justifyContent": "center" }}>
                            Action
                        </div>
                    </div>
                    {data && step.table_data.map((item, index) => {
                        return (
                            <div style={{"display":"flex","flexDirection":"column","alignItems":"flex-start","padding":"0px","boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)"}}>
                                <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"center","padding":"0px","gap":"64px", 'width': '100%'}}>
                                    <div style={{"display":"flex","flexDirection":"row","alignItems":"center","padding":"0px","gap":"16px", 'padding':'1%', 'minWidth': '70%'}}>
                                        <Avatar size='4vw' radius='xl'/>
                                        <Text style={{'color': '#023047', 'fontSize':'1.63vw'}}>{item.firstname} {item.lastname}</Text>
                                    </div>
                                    <div style={{"display":"flex","flexDirection":"row","alignItems":"center","padding":"0px","gap":"16px", 'flexGrow': '1', 'justifyContent':'space-evenly'}}>
                                        <Button 
                                            leftIcon={<BiPencil/>} 
                                            style={{"fontSize":'1.3vw', "backgroundColor":"#023047", 'height':'3.8vw', 'width':'8vw', "boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)"}}
                                            onClick = {() => {btnClick(item)}}    
                                        >
                                            Edit
                                        </Button>
                                        <Button style={{"fontSize":'1.3vw', "backgroundColor":"#ffffff", 'color':'#023047', 'height':'3.8vw', 'width':'3.8vw', "boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)"}}><BiTrash/></Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        case 'button': 
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'width': '49%', "gap": "1.63vw", 'paddingRight': '1%' }}>
                    <Button 
                        leftIcon={<BiPencil/>} 
                        style={{"boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)", 'backgroundColor':'white', 'color':'#023047', "fontSize":'1.3vw', 'height':'3.8vw'}}
                        onClick={() => {btnClick(); console.log("Btn click called")}}
                    >
                        {data.text}
                    </Button>
                </div>
            )
        default:
            return (
                <div>Default Case</div>
            )
    }
}

export default InputControl