import React from "react";

const FlowTitle = ({title, discription}) => {
    return(
        <div style={{"marginBottom": '4vw', "minWidth": '100%'}}>
            <div style={{ "fontFamily":"'Source Sans Pro'", "fontStyle":"normal", "fontWeight":"700", "fontSize":"3.16vw", "display":"flex", "alignItems":"center", "color":"#023047"}}>
               {title}
            </div>
            <div style={{ "fontFamily":"'Roboto'", "fontStyle":"normal", "fontWeight":"400", "fontSize":"1.3vw", "display":"flex", "alignItems":"center", "color":"#62697B", "paddingBottom": "1%"}}>
                {discription}
            </div>
        </div>
    )
}

export default FlowTitle