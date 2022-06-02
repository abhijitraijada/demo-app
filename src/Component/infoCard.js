import React from "react";
import {ReactComponent as UserRole} from '../assets/Icons/userRole.svg' 

const InfoCard = ({title, description, Icon}) => {
    return(
        <div style={{ "maxWidth": "25%","width": "25%","display":"flex", "flexDirection":"column", "padding":"3%", "gap":"16px", "background":"#FEFEFE", "boxShadow":"1px 1px 13px 12px rgba(2, 48, 71, 0.1)", "borderRadius":"4px", "order":"0", "flexGrow":"1", 'margin': '1%'}}>
            <div>
                {Icon}
            </div>
            <div style={{ "maxWidth": "90%","fontFamily":"'Source Sans Pro'", "fontStyle":"normal", "fontWeight":"600", "fontSize":"1.63vw", "lineHeight":"120%", "display":"flex", "alignItems":"center", "color":"#023047", "flex":"none", "flexGrow":"1"}}>
                {title}
            </div>
            <div style={{ "maxWidth": "90%", "fontFamily":"'Roboto'", "fontStyle":"normal", "fontWeight":"400", "fontSize":"1.05vw", "lineHeight":"120%", "color":"#505664", "flexGrow":"1"}}>
                {description}
            </div>
            <div style={{ "maxWidth": "90%", 'display': 'flex','flexDirection': 'row',"fontFamily":"'Roboto'", "fontStyle":"normal", "fontWeight":"400", "fontSize":"1vw", "lineHeight":"120%", "color":"#023047", "order":"0", "flexGrow":"1"}}>
                Take me there 
            </div>
        </div>
    )
}

export default InfoCard