import React, { useState, useEffect } from "react";
import FlowTitle from '../Component/flowTitle'
import InputControl from '../Component/inputControl'
import { BiChevronLeft } from 'react-icons/bi'
import { Button, Affix } from '@mantine/core'

const WillFlow1 = ({navigate, counter, setCounter}) => {
    const [context, setContext] = useState({})
    const step1 = {
        title: "Where have you placed the original hard copy of the Will?",
        discription: "U.S. courts only accept the original Will. Your Executor needs to know where your Will is and have access to the original Will after you have passed.",
        inputList: [
            {type: "textArea", placeholder: 'It is in the fire-proof safe in my bedroom closet. The code is 8999. In the safe there is a big brown envelope which says ‘Will - Original’', label: 'Notes for My Executor(s)'},
            {type: 'hint', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
            {type: 'hint', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
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
            <Affix position={{ bottom: 60, right: 80 }}>
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
            </Affix>
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

export default WillFlow1