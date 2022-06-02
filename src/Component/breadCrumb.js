import React from "react";
import { HiCheckCircle } from "react-icons/hi"
import { RiRadioButtonFill } from "react-icons/ri"
import { BiCircle } from "react-icons/bi"
import { Text } from '@mantine/core'

const BreadCrumbs = (status, text) => {
    if (status === "done") {
        return (
            <div style={{"display": 'flex', 'flexDirection': 'row', 'paddingRight': '2%'}}>
                <HiCheckCircle color="#023047" size="1.3vw"/>
                <Text>{text}</Text>
            </div>
        )
    } else if (status === "active") {
        return (
            <div style={{"display": 'flex', 'flexDirection': 'row', 'paddingRight': '2%'}}>
                <RiRadioButtonFill color="#38B9F9" size="1.3vw"/>
                <Text>{text}</Text>
            </div>
        )
    } else {
        return (
            <div style={{"display": 'flex', 'flexDirection': 'row', 'paddingRight': '2%'}}>
                <BiCircle color="#ACB0B9" size="1.3vw"/>
                <Text>{text}</Text>
            </div>
        )
    }
}

export default BreadCrumbs