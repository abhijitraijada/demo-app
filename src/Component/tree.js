import React, { useState } from 'react'

const Tree = ({data}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: 30}}>
            
            {data.map((item, index) => {
                return (
                    <TreeNode data = {item} key = {index}/>
                )
            })}
        </div>
    )
}



const TreeNode = ({data}) => {
    const [btnState, setBtnState] = useState(false)
    console.log("Data from treenoe: ", data)
    const hasChildren = data?.children?.length > 0 ? true : false
    return(
        <>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onClick = {() => {setBtnState(!btnState)}}>
                {hasChildren && <Icon iconName = {!btnState ? 'BsPlus' : 'BsDash'} size={30} iconType = 'bs'/>}
                <Icon iconName = {!btnState && hasChildren ? 'FcFolder' : 'FcOpenedFolder'} size={30} iconType = 'fc'/> {data.title}
            </div>
            {hasChildren && btnState && 
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Tree data={data.children}/>
                </div>
            }
        </>

    )
}

export default Tree