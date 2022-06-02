import React from "react";
import { Button, Modal, Title } from '@mantine/core'
import ReactPlayer from 'react-player/lazy'

const TipModal = ({modalMessage, status, setStatus}) => {
    return(
        <Modal 
            opened={status} 
            onClose={() => {setStatus(false)}} 
            title={modalMessage.title}
            overlayOpacity={0.55}
            overlayBlur={3}
            styles={{
                body:{'color':'#505664', 'fontSize':'1.3vw', 'padding':'0px'},
                title:{'color':'#023047', 'fontSize':'2.03vw', 'padding':'0px'},
                header:{'padding':'1.05vw'},
                modal:{'width':'50vw', 'padding':'0px'},
                close:{'fontSize':'2.03vw'}
            }}
            centered   
        >
            {modalMessage.content && 
                <div style={{'padding':'1.05vw'}}>
                    {modalMessage.content}
                </div>
            }
            {modalMessage.url &&
                <div style={{'padding':'1.05vw'}}>
                    <ReactPlayer url = {modalMessage.url} width='100%'/>
                </div>
            }
            <div style={{'padding': '1vw', 'marginTop': '4vw', 'display':'flex', 'justifyContent':'flex-end'}}>
                <Button 
                    sx={ (theme) => ({
                        backgroundColor: '#023047',
                        fontSize: 16,
                        width: 200,
                        height: 50,
                        fontSize: 20
                    }) }
                    onClick={() => {setStatus(false)}}
                >
                    Close
                </Button>
            </div>
        </Modal>
    )
}

export default TipModal