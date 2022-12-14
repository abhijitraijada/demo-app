import React, {useEffect, useRef, useState}from "react";
import { Button, Textarea, Text, useMantineTheme, Group, Select, TextInput, Avatar } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { IoPlayOutline } from 'react-icons/io5'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { BiTrash, BiPencil } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import { getWillFlow } from "../apis/willFlowApis";
import { ConfirmationModal } from "./modal";

const InputControl = ({ 
        data, handleButtonClick, step, 
        modalMessage, setModalMessage, modalStatus, 
        setModalStatus, setAnswer, answer, 
        prefill, setPrefill, btnClick, flowId, willFlow
    }) => {
    const theme = useMantineTheme();
    const [dateError, setDateError] = useState()
    const [textInputError, setTextInputError] = useState()
    const fileRef = useRef()
    const [confirmMessage, setConfirmMessage] = useState({})
    const [confirmModalStatus, setConfirmModalStatus] = useState(false)

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
                            content: data.text
                        }
                        setModalMessage(temp)
                        setModalStatus(!modalStatus)
                    }}
                >
                    <HiOutlineLightBulb color="#045C87" size='1.3vw' /> {data.title}
                </div>
            )
        case "videoHint": 
            return (
                <div style={{ 'display': 'flex', "cursor":'pointer', 'flexDirection': 'row', 'width': '100%', "gap": "1.63vw", 'marginBottom':'2vw', 'color': '#045C87', 'fontSize': '1.3vw' }}
                    onClick={() => {
                        let temp = {
                            title: data.title,
                            content: data.text,
                            url: data.videoUrl
                        }
                        setModalMessage(temp)
                        setModalStatus(!modalStatus)
                    }}
                >
                    <IoPlayOutline color="#045C87" size='1.3vw' /> {data.title}
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
            const uploadFiles = (files) => {
                // let data = {
                //     "SaveDocument": "Submit",
                //     "question_id": 210000003,
                //     "uploaded_files[]": fileRef.current.firstChild.files
                // }
                console.log("form data here: ", fileRef.current)
                let formElement = document.getElementById("Fileform")
                console.log("Form data Here: ", document.getElementById("Fileform"), formElement)
                let formData = new FormData(formElement)
                formData.set("question_id", 210000003)
                // console.log("Data from dropzone: ", files)
                // console.log("Data from ref: ", fileRef.current.firstChild.files)
                // console.log("Data from html Element: ", document.getElementById("fileInputRef").firstChild.files)
                getWillFlow(flowId,formData, true).then((response) => {
                    console.log("Files upload response: ", response.data)
                }, (error) => {
                    console.log("Files upload Error: ", error)
                })
            }
            const deleteFiles = (documentId, questionId) => {
                let data = {
                    "DeleteDocument":"Delete",
                    "document_id": documentId,
                    "question_id": questionId
                }
                getWillFlow(flowId, data).then((response) => {
                    console.log("Delete document response: ", response.data)
                    willFlow.set(response.data)
                }, (error) => {
                    console.log("Delete document error: ", error)
                })
            }
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'column', 'width': '100%', "gap": "1.63vw", 'marginTop': '4vw', 'marginBottom': '4vw' }}>
                    <form  onSubmit={uploadFiles} method="post" enctype="multipart/form-data" id = "Fileform">
                        <Dropzone onDrop={(files) => {console.log('accepted files', files); uploadFiles(files)}}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            multiple={true}
                            id = "fileInputRef"
                            name = "uploaded_files[]"
                            styles={{
                                'root': { "width": '100%' }
                            }}
                            onChange={(e) => {console.log("File on change value: ", e)}}
                        >
                            {(status) => dropzoneChildren(status, theme)}
                        </Dropzone>
                        <input type="submit" name="SaveDocument" value="Submit" hidden/>
                    </form>
                    { step?.documents?.length > 0 && 
                        <div>
                            {step.documents.map((item, index) => {
                                console.log("items in documents: ", item)
                                return (
                                    <div style={{'display': 'flex', 'width': '100%', "fontFamily":"'Roboto'", "fontStyle":"normal", "fontWeight":"400", "fontSize":"25px", "lineHeight":"120%", 'padding': '1vw', 'color': '#239E69'}}>
                                        <div style={{'display': 'flex', 'flex': 1}}>{item.originalname}</div>
                                        <div style={{'display': 'flex', 'flex': 1, 'justifyContent': 'flex-end'}}> 
                                            <Button variant="subtle" onClick={(e) => {
                                                deleteFiles(item.document_id, item.question_id)
                                            }}>
                                                <IoClose size='1.63vw'/>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
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
                        value={prefill[data.label]}
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
                            setPrefill({...prefill, [data.label]: e})
                            if (step.step === 5 || step.step === 8) {
                                let temp = {
                                    ...answer,
                                    [data.label.toLowerCase().replace(" ","_")]: e
                                }
                                console.log("Temp Var: ", temp)
                                setAnswer(temp)
                            } else {
                                setAnswer(e)
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
                                    [data.id]: e.target.value
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
        case 'date':
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
                            setPrefill({...prefill, [data.label]: e?.toDateString()})
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
            const deleteKeyContact = (contactTypeId, questionId, keyContactId) => {
                setModalStatus(!modalMessage)
                let data = {
                    "DeleteKeyContact": "Delete",
                    "contact_type_id": contactTypeId,
                    "question_id": questionId,
                    "key_contact_id": keyContactId
                }
                console.log("Executinon to this point")
                getWillFlow(flowId, data).then((response) => {
                    console.log("Delete contact success response: ", response.data)
                    willFlow.set(response.data)
                }, (error) => {
                    console.log("Delete contact error: ", error)
                })
            }
            const showConfirmModal = (contactTypeId, questionId, keyContactId, name, relation) => {
                let temp = {
                    title: "Are you sure you want to delete " + name,
                    content: "Deleting this will result in permanent loss of data regarding " + name,
                    args: [contactTypeId, questionId, keyContactId],
                    deleteAction: deleteKeyContact
                }
                setModalStatus(!modalStatus)
                setConfirmMessage(temp)
                setConfirmModalStatus(!confirmModalStatus)
            } 
            return (
                <div style={{ 'display': 'flex', 'flexDirection': 'column', 'width': '100%', "gap": "1.05vw", 'marginBottom': '2vw' }}>
                    <ConfirmationModal modalMessage={confirmMessage} status={confirmModalStatus} setStatus={setConfirmModalStatus}/>
                    <div style={{ "display": "flex", "flexDirection": "row", "alignItems": "center", "padding": "2%", "gap": "10px", "background": "#DEF1FD", "borderRadius": "3px 3px 0px 0px", "flex": "none", "order": "0", "flexGrow": "0", "paddingRight": "8%", "justifyContent": "space-between" }}>
                        <div style={{ "fontFamily": "'Source Sans Pro'", "fontStyle": "normal", "fontWeight": "600", "fontSize": "1.3vw", "display": "flex", "alignItems": "center", "color": "#505664", "flexGrow": "15" }}>
                            {data.titles[0]}
                        </div>
                        <div style={{ "fontFamily": "'Source Sans Pro'", "fontStyle": "normal", "fontWeight": "600", "fontSize": "1.3vw", "display": "flex", "alignItems": "center", "color": "#505664", "flexGrow": "1", "justifyContent": "center" }}>
                            {data.titles[1]}
                        </div>
                    </div>
                    {data && step.table_data.map((item, index) => {
                        return (
                            <div style={{"display":"flex","flexDirection":"column","alignItems":"flex-start","padding":"0px","boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)"}}>
                                <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"center","padding":"0px","gap":"64px", 'width': '100%'}}>
                                    <div style={{"display":"flex","flexDirection":"row","alignItems":"center","padding":"0px","gap":"16px", 'padding':'1%', 'minWidth': '70%'}}>
                                        <Avatar size='4vw' radius='xl'/>
                                        <div style={{"display":"flex","flexDirection":"column"}}>
                                            <Text style={{'color': '#023047', 'fontSize':'1.63vw'}}>{data.rows[index].details[0].value}</Text>
                                            <Text style={{"color": "#505664", "fontSize":"1.05vw"}}>{data.rows[index].details[1].value}</Text>
                                        </div>
                                    </div>
                                    <div style={{"display":"flex","flexDirection":"row","alignItems":"center","padding":"0px","gap":"16px", 'flexGrow': '1', 'justifyContent':'space-evenly'}}>
                                        <Button 
                                            leftIcon={<BiPencil/>} 
                                            style={{"fontSize":'1.3vw', "backgroundColor":"#023047", 'height':'3.8vw', 'width':'8vw', "boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)"}}
                                            onClick = {() => {btnClick(item)}}    
                                        >
                                            {data.rows[index].buttons[0]}
                                        </Button>
                                        <Button 
                                            style={{"fontSize":'1.3vw', "backgroundColor":"#ffffff", 'color':'#023047', 'height':'3.8vw', 'width':'3.8vw', "boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)"}}
                                            onClick = {(e) => {
                                                // deleteKeyContact(item.contact_type_id, item.question_id, item.key_contact_id)
                                                showConfirmModal(item.contact_type_id, item.question_id, item.key_contact_id, data.rows[index].details[0].value, data.rows[index].details[1].value)
                                            }}
                                        >
                                            <BiTrash/>
                                        </Button>
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