import React, { useState, useEffect } from "react";
import FlowTitle from '../Component/flowTitle'
import InputControl from '../Component/inputControl'
import { BiChevronLeft } from 'react-icons/bi'
import { Button, Affix } from '@mantine/core'

const WillFlow4 = ({navigate, counter, setCounter}) => {
    const [context, setContext] = useState({})
    const step1 = {
        title: "Enter beneficiary information",
        discription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit ultrices diam a nibh eget nibh massa. Tellus rhoncus volutpat libero sit in fusce augue id.",
        inputList: [
            {type: "dropDown", options: ['Mother', 'Father', 'Brother', 'Sister', 'Son', 'Daughter'], label: 'Relationship', placeholder: 'placeholder'},
            {type: "textInput", label: 'First name', placeholder: 'placeholder'},
            {type: "textInput", label: 'Middle name', placeholder: 'placeholder'},
            {type: "textInput", label: 'Last name', placeholder: 'placeholder'},
            {type: "smallTextInput", label: 'Suffix', placeholder: 'XXX'},
            {type: "textInput", label: 'Email', placeholder: 'placeholder'},
            {type: "dateInput", label: 'Relationship', placeholder: 'placeholder'},
            {type: "textInput", label: 'Address 1', placeholder: 'placeholder'},
            {type: "textInput", label: 'Address 2', placeholder: 'placeholder'},
            {type: "textInput", label: 'City', placeholder: 'placeholder'},
            {type: "textInput", label: 'State', placeholder: 'placeholder'},
            {type: "textInput", label: 'Country', placeholder: 'placeholder'},
            {type: "textInput", label: 'Zip/postal code', placeholder: 'placeholder'},
            {type: "phoneNumber", label: 'Relationship', placeholder: 'placeholder'},
            {type: "dropDown", options: ['Mother', 'Father', 'Brother', 'Sister', 'Son', 'Daughter'], label: 'Relationship', placeholder: 'placeholder'},
            {type: 'fileUploader', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
            {type: "textArea", placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus augue vulputate quis vitae. Semper aliquet tortor sed mattis. Nibh nec arcu mattis consectetur mauris id interdum turpis pharetra. Vitae orci eu massa ut nunc congue tempor.', label: 'Notes'},
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

export default WillFlow4