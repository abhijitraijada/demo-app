import React from "react";
import { Box, Text, Button, Affix } from '@mantine/core'
import { BiChevronLeft } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={(theme) => (
                {
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    zIndex: 200,
                }
            )}>
                <div style={{ paddingTop: 30, display: 'flex', flexDirection: 'row' }}>
                    <Text style={{color: '#62697B', fontSize: 15, paddingLeft: 10}}> License Agreement  |  Privacy  |  Security  |  Give Feedback  </Text>
                </div>
                <div>
                    <Text style={{color: '#ACB0B9', fontSize: 10, paddingLeft: 10}}> 2022 Project Whitney Inc. All Rights reserved </Text>
                </div>
            </Box>
        </>
    )
}

export default Footer