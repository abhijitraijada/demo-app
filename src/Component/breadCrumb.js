import React from "react";
import { HiCheckCircle } from "react-icons/hi"
import { RiRadioButtonFill } from "react-icons/ri"
import { BiCircle } from "react-icons/bi"
import { Text } from '@mantine/core'

const BreadCrumbs = (color, text) => {
    return (
        <div style={{"display": 'flex', 'flexDirection': 'row', 'paddingRight': '2%'}}>
            <RiRadioButtonFill color={color} size="1.3vw"/>
            <Text>{text}</Text>
        </div>
    )
}

export default BreadCrumbs