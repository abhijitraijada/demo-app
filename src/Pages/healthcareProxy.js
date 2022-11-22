import React, { useEffect, useState } from "react";
import FlowTitle from '../Component/flowTitle'
import InputControl from '../Component/inputControl'
import { Affix, Button, Text, LoadingOverlay } from '@mantine/core'
import { BiChevronLeft } from 'react-icons/bi'
import { RiPagesLine, RiRadioButtonFill } from 'react-icons/ri'
import axios from 'axios'

import TipModal from '../Component/modal'
import { getWillFlow, listBinderDetails } from '../apis/willFlowApis'
import Footer from "../Component/footer";
import BreadCrumbs from '../Component/breadCrumb'

const HealthcareProxy = ({ navigate, counter, setCounter }) => {
    const [modalMessage, setModalMessage] = useState({})
    const [modalStatus, setModalStatus] = useState(false)
    const [willFlow, setWillFlow] = useState({})
    const [loading, setLoading] = useState(true)
    const [prevStep, setPrevStep] = useState(-1)
    const [beneficiaries, setBeneficiaries] = useState(true)
    const [executors, setExecutors] = useState(true)
    const [prefill, setPrefill] = useState()
    const [editMode, setEditMode] = useState(false)
    // const willFlow = require("../willFlow.json")
    const [answer, setAnswer] = useState()
    const [questionId, setQuestionId] = useState(false)

    const handleClick = (step, btnClick) => {
        console.log("step from handleClick: ", step)
        if (step.step === 1 && btnClick === "secondery") {
            let temp = {
                title: "Modal title",
                content: "Modal description"
            }
            setModalMessage(temp)
            setModalStatus(!modalStatus)
        } else if (step.step === 4 && btnClick === "secondery") {
            setPrevStep(counter)
            setBeneficiaries(false)
            setCounter(6)
        } else if (step.step === 7 && btnClick === "secondery") {
            setPrevStep(counter)
            setExecutors(false)
            setCounter(9)
        } else if (btnClick === "continue with api") {
            if (step.step === 10 || step.step === 2) {
                submitNotes(step)
            } else if (step.step === 5 || step.step === 8) {
                submitForm(step)
            } else {
                setPrevStep(counter)
                setCounter(counter + 1)
            }
        } else if (!step.lastStep) {
            setPrevStep(counter)
            setCounter(counter + 1)
        } else {
            navigate(-1)
            setCounter(0)
        }
    }

    const submitForm = (step) => {
        let data = {}
        if (!answer || typeof (answer) != 'object') {
            if (!step.lastStep) {
                setPrevStep(counter)
                setCounter(counter + 1)
            } else {
                navigate(-1)
                setCounter(0)
            }
            return
        }
        if (step.step === 5) {
            data = {
                "SaveKeyContact": "Submit",
                "contact_type_id": 101,
                "question_id": questionId,
                ...answer
            }
        } else {
            data = {
                "SaveKeyContact": "Submit",
                "contact_type_id": 102,
                "question_id": questionId,
                ...answer
            }
        }
        if(editMode?.value) {
            data.question_id = editMode?.data?.question_id
            data.contact_type_id = editMode?.data?.contact_type_id
            data.key_contact_id = editMode?.data?.key_contact_id
        }
        setLoading(true)
        getWillFlow("200000005", data).then((response) => {
            console.log("Api call success: ", response.data)
            if (!step.lastStep) {
                setPrevStep(counter)
                setCounter(counter + 1)
            } else {
                navigate(-1)
                setCounter(0)
            }
            setWillFlow(response.data)
            setLoading(false)
            setAnswer()
            setEditMode(false)
        }, (error) => {
            console.log("Error in API call: ", error)
            setPrevStep(counter)
            setCounter(counter + 1)
            setLoading(false)
        })
    }

    const submitNotes = (step) => {
        console.log("Submit Notes called")
        let data = {}
        if (!answer || typeof (answer) != 'string') {
            if (!step.lastStep) {
                setPrevStep(counter)
                setCounter(counter + 1)
            } else {
                navigate(-1)
                setCounter(0)
            }
            return
        }
        if(step.step == 2){

            data = {
                "SaveData": "Submit",
                "question_id": questionId,
                "answer": answer
            }
        }
        if( step.step == 10){
            data = {
                "SaveData": "Submit",
                "question_id": questionId,
                "answer": answer
            }
        }
        setLoading(true)
        getWillFlow("200000005", data).then((response) => {
            console.log("Api call success: ", response.data)
            if (!step.lastStep) {
                setPrevStep(counter)
                setCounter(counter + 1)
            } else {
                navigate(-1)
                setCounter(0)
            }
            setWillFlow(response.data)
            setLoading(false)
            setAnswer()
        }, (error) => {
            console.log("Error in API call: ", error)
            setPrevStep(counter)
            setCounter(counter + 1)
            setLoading(false)
        })
    }

    const backBtnClick = (step) => {
        if (counter != 0) {
            if (beneficiaries === false && step.step === 7) {
                setCounter(3)
                setPrevStep(2)
            } else if (executors === false && step.step === 10) {
                setCounter(6)
                setPrevStep(5)
            } else {
                setCounter(prevStep)
                setPrevStep(prevStep - 1)
            }
        } else {
            navigate(-1)
        }
    }

    const btnClick = (data) => {
        setCounter(counter - 1)
        setEditMode({value: true, data: data})
        if(data) {
            let temp = willFlow
            console.log("Data from btn click: ", data)
            console.log("Inputlist on btnCLick: ",  data)
            temp.steps[counter-1].inputList.map((item, index) => {
                console.log("Match see: ", item.id, data[item.id])
                item.prefill = data[item.id]
            })
            console.log("Temp Object from btnCLick: ", temp.steps[counter-1].inputList)
            setWillFlow(temp)
        }
    }

    useEffect(() => {
        setLoading(true)
        listBinderDetails("200000005").then((response) => {
            console.log("Binder List for topic Id 200000002: ", response.data)
        }, (err) => {
            console.log("Error in getting binder List")
        })
        getWillFlow("200000005").then((response) => {
            console.log("Response of get willflow object: ", response.data)
            setWillFlow(response.data)
        }, (error) => {
            console.log("Error in getting willflow object: ", error)
        })
    }, [])

    useEffect(() => {
        if (Object.keys(willFlow).length > 0) {
            setLoading(false)
        }
    }, [willFlow])

    useEffect(() => {
        console.log("Loading changed: ", loading, willFlow)
    }, [loading])

    useEffect(() => {
        if(!loading) {
            let temp = willFlow.steps[counter]
            let prefillObj = {}
            let ansObj = {}
            temp.inputList.map((item, index) => {
                if(item?.prefill != undefined){
                    prefillObj = {...prefillObj, [item.label]: item.prefill}
                    ansObj = {...ansObj, [item?.id]: item.prefill}
                }
            })
            console.log("answer Object: ", ansObj, prefillObj)
            setQuestionId(willFlow.steps[counter].question_id)
            setPrefill(prefillObj)
            setAnswer(ansObj)
            setPrevStep(counter-1)
        }
    }, [counter, loading])


    if (loading) {
        return (
            <LoadingOverlay visible={loading} />
        )
    }
    return (
        <div style={{ "display": 'flex', 'flexDirection': 'column', 'paddingRight': '2%', 'height': window.innerHeight - 148 }}>
            <TipModal modalMessage={modalMessage} status={modalStatus} setStatus={setModalStatus} />
            {!loading && <div style={{"display": 'flex', 'flexDirection': 'row', 'justifyContent': 'space-evenly'}}>
                {willFlow.breadCrumbsList.map((breadCrumb, index) => {
                    // console.log("Breadcrumb List: ", willFlow.steps[counter].activBreadCrumb)

                    return (
                        <div 
                            style={{"display": 'flex', 'flexDirection': 'row', 'paddingRight': '2%', 'alignItems':'center', 'cursor':'pointer', 'marginBottom': '2%'}}
                            onClick = {(e) => {
                                console.log("Click on breadCrumb")
                                for (let i = 0; i < willFlow.steps.length; i++) {
                                    if(willFlow.steps[i].activBreadCrumb == breadCrumb) {
                                        console.log("Navigate to step: ", willFlow.steps[i].step)
                                        setCounter(willFlow.steps[i].step - 1)
                                        break;
                                    }
                                }
                            }}
                        >
                            <RiRadioButtonFill color={breadCrumb == willFlow.steps[counter].activBreadCrumb ? "#023047" : '#ACB0B9'} size="1.3vw"/>
                            {breadCrumb == willFlow.steps[counter].activBreadCrumb ? 
                                <Text style={{"fontSize":"1.3vw", 'fontWeight':"600", 'color':'#023047'}}>{breadCrumb}</Text> : 
                                <Text style={{"fontSize":"1.3vw", 'fontWeight':"600", 'color':'#ACB0B9'}}>{breadCrumb}</Text>
                            }
                        </div>
                    )
                })}
            </div>}
            {!loading && <div style={{ "display": 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', 'alignContent': 'center' }}>
                <div style={{ "display": "flex", "flexDirection": "row", "color": "#62697B", "fontSize": "1.63vw", "fontWeight": 600, 'alignItems': 'center' }}>
                    <RiPagesLine color="#62697B" size="1.63vw" />
                    Will
                </div>
                {willFlow?.steps[counter]?.label && <Text
                    style={{ 'backgroundColor': '#F7EEFE', 'borderRadius': '4px', 'padding': '8px', 'fontSize': '1.3vw', 'fontWeight': '600', 'color': '#7A28BA' }}
                >
                    {willFlow?.steps[counter]?.label}
                </Text>}
            </div>}
            {!loading && <div style={{ 'minWidth': '100%' }}>
                <FlowTitle title={willFlow?.steps[counter]?.title} discription={willFlow?.steps[counter]?.description} />
            </div>}
            {!loading && <div style={{ "display": 'flex', "flexDirection": 'row', "paddingRight": '1%', "paddingBottom": '3vw', "flexWrap": "wrap", 'height': '40vw', 'alignContent': 'flex-start' }}>
                {willFlow?.steps[counter]?.inputList.map((item, index) => {
                    return (
                        <InputControl
                            data={item}
                            key={index}
                            handleButtonClick={handleClick}
                            step={willFlow?.steps[counter]}
                            modalMessage={modalMessage}
                            setModalMessage={setModalMessage}
                            modalStatus={modalStatus}
                            setModalStatus={setModalStatus}
                            setAnswer={setAnswer}
                            answer={answer}
                            prefill = {prefill}
                            setPrefill = {setPrefill}
                            btnClick = {btnClick}
                            flowId = "200000005"
                            willFlow = {{get: () => {return willFlow}, set: setWillFlow}}
                        />
                    )
                })}
                <div style={{ "width": "100%", "paddingBottom": "160px" }}></div>
            </div>}
            {!modalStatus && !loading && <Affix
                position={{ "bottom": 0, 'left': 270 }}
                style={{ "width": '100%', "padding": '1vw', "backgroundColor": '#ffffff', 'height': '100px' }}
            >
                <Affix position={{ bottom: 70, left: 330 }}>
                    <Button
                        sx={(theme) => ({
                            '&:hover': {
                                backgroundColor: "#ffffff"
                            }
                        })}
                        styles={(theme) => ({
                            root: {
                                backgroundColor: theme.white,
                                fontSize: 16,
                                margin: 'auto',
                                width: 200,
                                height: 50,
                                fontSize: 20,
                                color: '#023047',
                                marginRight: '54vw'
                            }
                        })}
                        style={{ "boxShadow": "1px 1px 5px 2px rgba(0, 0, 0, 0.1)" }}
                        leftIcon={<BiChevronLeft />}
                        onClick={() => {
                            backBtnClick(willFlow?.steps[counter])
                        }}
                    >
                        Back
                    </Button>
                </Affix>
                {willFlow?.steps[counter]?.continueBtn?.visible &&
                    <Affix position={{ bottom: 70, right: 80 }}>
                        <Button sx={(theme) => ({
                            backgroundColor: '#023047',
                            fontSize: 16,
                            margin: 'auto',
                            width: 200,
                            height: 50,
                            fontSize: 20
                        })}
                            onClick={() => {
                                if (willFlow?.steps[counter].step === 2 || willFlow?.steps[counter].step === 3 || willFlow?.steps[counter].step === 5 || willFlow?.steps[counter].step === 8 || willFlow?.steps[counter].step === 10) {
                                    handleClick(willFlow?.steps[counter], "continue with api")
                                } else {
                                    handleClick(willFlow?.steps[counter], "continue without api")
                                }
                            }}
                        >
                            Continue
                        </Button>
                    </Affix>
                }
                <Affix position={{bottom: 20, left: "40vw"}}>
                    <Footer />
                </Affix>
            </Affix>}
        </div>
    )
}

export default HealthcareProxy