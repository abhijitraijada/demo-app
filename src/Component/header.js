import React, { useState } from "react";
import { Box, TextInput } from '@mantine/core'
import {ReactComponent as SearchIcon} from '../assets/Icons/searchIcon.svg'
import {ReactComponent as NotificationBell} from '../assets/Icons/notificationBell.svg'
import {ReactComponent as EditIcon} from '../assets/Icons/editIcon.svg'
import {ReactComponent as HelpIcon} from '../assets/Icons/helpIcon.svg'

export default function Header() {

    const [searchBarVisible, setSearchBarVisible] = useState(false)

    return (
        <div>
            <Box sx={(theme) => (
                {
                    backgroundColor: '#F6FBFD',
                    height: 128,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 200
                }
            )}>
                <h1 style={{fontFamily: "Source Sans Pro", width: 139, paddingLeft: 64, color: '#023047'}}>Project Whitney</h1>
                { searchBarVisible && 
                    <TextInput placeholder="Search" required 
                        onClick={(e) => { setSearchBarVisible(false) }}
                        style = {{
                            width: 600
                        }}
                    />
                }
                <div style={{alignItems: 'center', justifyContent: 'space-between', width: 260, display: 'flex', padding: 66, color: '#023047'}}>
                    {!searchBarVisible && <SearchIcon onClick={(e) => { setSearchBarVisible(true) }}></SearchIcon>}
                    {/* <ThemeIcon style={{background: "#F6FBFD", color: '#023047', height: 27, width: 27}}>
                        <FiSearch />
                    </ThemeIcon> */}
                    <EditIcon></EditIcon>
                    <NotificationBell></NotificationBell>
                    <HelpIcon></HelpIcon>
                </div>
            </Box>
        </div>
    )
}