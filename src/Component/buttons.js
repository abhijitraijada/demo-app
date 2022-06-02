import React from "react";
import { Button } from "@mantine/core";

export function IconButton({size}) {
    switch(size) {
        case 'small':
        case 'large':
        default :
    }
}

export function SimpleButton({size, type, label}) {
    switch(size) {
        case 'small':
            if( type === 'primary' ) {
                return (
                    <Button variant="filled" styles={{ 
                        inner: {color: 'white', fontSize: 25},
                        root: {height: 57, width: 106, borderRadius: 4, top: 107, left: 273, padding: 16}
                    }}>
                        {label}
                    </Button>
                )
            }
            else if (type === 'secondry'){
                return (
                    <Button variant="filled" color="#38B9F9" styles={{ 
                        inner: {color: 'white', fontSize: 25},
                        root: {height: 57, width: 106, borderRadius: 4, top: 107, left: 273, padding: 16}
                    }}>
                        {label}
                    </Button>
                )
            }
            else {
                return (
                    <Button variant="filled" color="#FFFFFF" styles={{ 
                        inner: {color: 'white', fontSize: 25},
                        root: {height: 57, width: 106, borderRadius: 4, top: 107, left: 273, padding: 16}
                    }}>
                        {label}
                    </Button>
                )
            }
        case 'large':
            if( type === 'primary' ) {
                return (
                    <Button variant="filled" styles={{ 
                        inner: {color: 'white', fontSize: 25},
                        root: {height: 103, width: 331, borderRadius: 4, top: 84, left: 2236, paddingTop: 28, paddingBottom: 28, paddingLeft: 128, paddingRight: 128}
                    }}>
                        {label}
                    </Button>
                )
            }
            else if (type === 'secondry'){
                return (
                    <Button variant="filled" color="#38B9F9" styles={{ 
                        inner: {color: 'white', fontSize: 25},
                        root: {height: 103, width: 331, borderRadius: 4, top: 84, left: 2236, paddingTop: 28, paddingBottom: 28, paddingLeft: 128, paddingRight: 128}
                    }}>
                        {label}
                    </Button>
                )
            }
            else {
                return (
                    <Button variant="filled" color="#FFFFFF" styles={{ 
                        inner: {color: 'white', fontSize: 25},
                        root: {height: 103, width: 331, borderRadius: 4, top: 84, left: 2236, paddingTop: 28, paddingBottom: 28, paddingLeft: 128, paddingRight: 128}
                    }}>
                        {label}
                    </Button>
                )
            }
        default :
        if( type === 'primary' ) {
            return (
                <Button variant="filled" styles={{ 
                    inner: {color: 'white', fontSize: 31},
                    root: {height: 69, width: 220, borderRadius: 4, top: 101, left: 1473, paddingTop: 16, paddingBottom: 16, paddingLeft: 64, paddingRight: 64}
                }}>
                    {label}
                </Button>
            )
        }
        else if (type === 'secondry'){
            return (
                <Button variant="filled" color="#38B9F9" styles={{ 
                    inner: {color: 'white', fontSize: 31},
                    root: {height: 69, width: 220, borderRadius: 4, top: 101, left: 1473, paddingTop: 16, paddingBottom: 16, paddingLeft: 64, paddingRight: 64}
                }}>
                    {label}
                </Button>
            )
        }
        else {
            return (
                <Button variant="filled" color="#FFFFFF" styles={{ 
                    inner: {color: 'white', fontSize: 31},
                    root: {height: 69, width: 220, borderRadius: 4, top: 101, left: 1473, paddingTop: 16, paddingBottom: 16, paddingLeft: 64, paddingRight: 64}
                }}>
                    {label}
                </Button>
            )
        }
    }
}

export function LabelButton({ label, icon }) {
    if (icon != null) {
        return (
            <div>
                
            </div>
        )
    } else {
        return(
            <Button variant="subtle" styles={{
                inner: {fontSize: 31, top: 16, left: 16, height: 92, width: 37}
            }}>
                {label}
            </Button>
        )
    }
}