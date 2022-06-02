import React, { useState, useEffect } from "react";
import FlowTitle from '../Component/flowTitle'
import InputControl from '../Component/inputControl'
import { BiChevronLeft } from 'react-icons/bi'
import { Button, Affix } from '@mantine/core'

const WillFlow2 = ({navigate, counter, setCounter}) => {
    const [context, setContext] = useState({})
    const step1 = {
        title: "Do you want to add beneficiaries at this point?",
        discription: "Your Will may list your beneficiaries, without their contact info. Some users find it useful to provide the latest contact info of their beneficiaries here. In case you don’t want to identify your beneficiaries, you can still provide contact info of friends and family in the ‘Key Contacts’ category.",
        inputList: [
            {type: "yesNoButton", text1: 'Yes', text2: 'No, I’ll add them later'},
        ]
    }

    const handleClick = () => {
        setCounter(counter+1)
        console.log("Handle Click called: ")
    }

    useEffect(() => {
        if(counter !== 0) {
            console.log("Counter changed: ", counter)
            navigate(`/essentialDocs/willFlow/${counter}`)
        }
    },[counter])

    return (
        <div style={{"display": 'flex', 'flexDirection': 'column', 'paddingRight': '2%', 'height': window.innerHeight - 148}}>
            <FlowTitle title={step1.title} discription={step1.discription}/>
            {step1.inputList.map((item, index) => {
                return(
                    <InputControl data={item} key={index} handleButtonClick={handleClick}/>
                )
            })}
            {/* <Affix position={{ bottom: 60, right: 80 }}>
                <Button sx={ (theme) => ({
                    backgroundColor: '#023047',
                    fontSize: 16,
                    margin: 'auto',
                    width: 200,
                    height: 50,
                    fontSize: 20
                }) }
                onClick = {() => {
                    handleClick()
                }}
                >
                    Continue
                </Button>
            </Affix> */}
            <Affix position={{ bottom: 60, left: 380 }}>
                <Button 
                    styles={(theme) => ({
                        '&:hover': {
                            backgroundColor: "#ffffff"
                        },
                        root: {
                            backgroundColor: theme.white,
                            fontSize: 16,
                            margin: 'auto',
                            width: 200,
                            height: 50,
                            fontSize: 20,
                            color: '#023047'
                        }
                    })}
                    leftIcon = {<BiChevronLeft/>}
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    Back
                </Button>
            </Affix>
        </div>
    )
}

export default WillFlow2