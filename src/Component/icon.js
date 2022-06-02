import React, { useState } from 'react'
import * as BiIcon from 'react-icons/bi'

const Icon = (props) => {
    const { iconName, iconType, size, color, classes} = props;
    const icon = React.createElement(BiIcon[iconName]);
    return <div style={{ fontSize: size, color: color }} className={classes}>{icon}</div>;
}

export default Icon