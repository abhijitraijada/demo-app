import { useState, useEffect } from "react";
import React from "react";
import { Button, LoadingOverlay } from '@mantine/core'
import { BiPencil, BiTrash } from 'react-icons/bi'
import Footer from "../Component/footer"
import { addTopic, getDocList, deleteTopic } from "../apis/docListApi"

const EssentialDocs = ({ navigate }) => {
    const essentialDocsJson = [
        {
            'name': 'Will',
            'content': 'Note where your will is kept. Uploading the document, entering your list of beneficiaries and executors is your choice.',
            'action': {'text': 'Start', 'clickAction':'Api call url'},
        },
        {
            'name': 'Power of attorney',
            'content': 'Note who can act for you in legal or financial matters.',
            'action': {'text': 'Start', 'clickAction':'Api call url'},
        },
        {
            'name': 'Trusts',
            'content': 'Appoint another party to hold assets on behalf of one or more beneficiaries.',
            'action': {'text': 'Start', 'clickAction':'Api call url'},
        },
        {
            'name': 'Living will',
            'content': 'Note what medical treatments you would and would not want.',
            'action': {'text': 'Add', 'clickAction':'Api call url'},
        },
        {
            'name': 'Healthcare directive',
            'content': 'Note who can make medical decisions for you.',
            'action': {'text': 'Add', 'clickAction':'Api call url'},
        },
        {
            'name': 'Add your own',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'action': {'text': 'Add', 'clickAction':'Api call url'},
        }
    ]
    const [loading, setLoading] = useState(true)
    const [docList, setDocList] = useState([
        {
            'name': 'Will',
            'content': 'Note where your will is kept. Uploading the document, entering your list of beneficiaries and executors is your choice.',
            'action': 'start',
        },
        {
            'name': 'Power of attorney',
            'content': 'Note who can act for you in legal or financial matters.',
            'action': 'start',
        },
        {
            'name': 'Trusts',
            'content': 'Appoint another party to hold assets on behalf of one or more beneficiaries.',
            'action': 'start',
        },
        {
            'name': 'Living will',
            'content': 'Note what medical treatments you would and would not want.',
            'action': 'add',
        },
        {
            'name': 'Healthcare directive',
            'content': 'Note who can make medical decisions for you.',
            'action': 'add',
        },
        {
            'name': 'Add your own',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'action': 'add',
        }
    ])
    const [myTopics, setMyTopics] = useState()
    const [otherTopics, setOtherTopics] = useState()

    useEffect(() => {
        console.log("Doc list changed ", docList)
        setLoading(true)
        getDocList().then((response) => {
            console.log("DocList Api response: ", response.data)
            setMyTopics(response.data.mytopics)
            setOtherTopics(response.data.othertopics)
            setLoading(false)
        }, (error) => {
            console.log("Error in get doc list: ", error)
        })
    },[])

    const addTopicBtn = (topicId) => {
        setLoading(true)
        addTopic(topicId).then((response) => {
            console.log("Add topic response: ",response.data)
            setMyTopics(response.data.mytopics)
            setOtherTopics(response.data.othertopics)
            setLoading(false)
        }, (error) => {
            console.log("Add topic response: ", error)
            setLoading(false)
        })
    }

    const deleteTopicBtn = (topicId) => {
        setLoading(true)
        deleteTopic(topicId).then((response) => {
            console.log("response data for delete topic: ", response.data)
            setMyTopics(response.data.mytopics)
            setOtherTopics(response.data.othertopics)
            setLoading(false)
        }, (error) => {
            console.log("Error in delete Topic: ", error)
            setLoading(false)
        })
    }

    if (loading) {
        return (
            <LoadingOverlay visible={loading} />
        )
    }
    return(
        <div style={{"display": 'flex', 'flexDirection': 'column', 'paddingRight': '2%'}}>
            <div style={{ "fontFamily":"'Source Sans Pro'", "fontStyle":"normal", "fontWeight":"700", "fontSize":"3.16vw", "display":"flex", "alignItems":"center", "color":"#023047"}}>
               Essential Documents
            </div>
            <div style={{ "fontFamily":"'Roboto'", "fontStyle":"normal", "fontWeight":"400", "fontSize":"1.3vw", "display":"flex", "alignItems":"center", "color":"#62697B", "paddingBottom": "1%"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit ultrices diam a nibh eget nibh massa. Tellus rhoncus volutpat libero sit in fusce augue id.
            </div>
            <div style={{"display":"flex", "flexDirection":"row", "alignItems":"center", "padding":"2%", "gap":"10px", "background":"#DEF1FD", "borderRadius":"3px 3px 0px 0px", "flex":"none", "order":"0", "flexGrow":"0", "paddingRight": "8%", "justifyContent": "space-between"}}>
                <div style={{"fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.3vw","display":"flex","alignItems":"center","color":"#505664", "flexGrow": "15"}}>
                    Name
                </div>
                <div style={{"fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.3vw","display":"flex","alignItems":"center","color":"#505664", "flexGrow": "1", "justifyContent": "center"}}>
                    Action
                </div>
            </div>
            {myTopics && myTopics.map(( item, index )=> {
                return(
                    <> 
                            <div style={{"display":"flex","flexDirection":"column","boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)","boxSizing":"border-box","background":"#FEFEFE","border":"1px solid #DEF1FD","borderRadius":"4px"}}>
                                <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"center", "padding": '1.5%'}}>
                                    <div style={{"display":"flex","flexDirection":"column","padding":"4px 0px", "flexGrow": "15" , "maxWidth": "80%"}}>
                                        <div style={{"fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.63vw","display":"flex","color":"#023047"}}>
                                            {item.name}
                                        </div>
                                        <div style={{"maxWidth":"70%","fontFamily":"'Roboto'","fontStyle":"normal","fontWeight":"400","fontSize":"1.05vw","display":"flex","alignItems":"center","color":"#505664", "wordBreak": "break-word"}}>
                                            {item.content}
                                        </div>
                                    </div>
                                    <div style={{"flexGrow": "1", "display":"flex", "justifyContent": "center", "maxWidth": "20%"}}>
                                        <Button 
                                            style={{'position': 'relative', 'right': '25%', "backgroundColor": "#023047", 'width': '142px', 'height': '57px', "fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.3vw","lineHeight":"100%" }}
                                            leftIcon={<BiPencil/>}
                                            onClick={(e) => {
                                                navigate('/essentialDocs/willFlow')
                                            }}
                                        >
                                            Start
                                        </Button>
                                        <Button 
                                            onClick={() => {
                                                let tempList = docList
                                                tempList[index].action = 'add'
                                                setLoading(true)
                                                setDocList([...tempList])
                                                setLoading(false)
                                                deleteTopicBtn(item.topic_id)
                                            }}
                                            style={{'position': 'relative', 'right': '15%', "backgroundColor": "#FFFFFF", "color": "#023047", 'width': '56px', 'height': '57px', "fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.3vw","lineHeight":"100%", "boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)","borderRadius":"4.62222px"}}
                                        >
                                            <BiTrash/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                    </>
                )
            })}
            <div style={{ 'marginTop': '3%', 'marginBottom': '3%', "fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"2.03vw","display":"flex","alignItems":"center","color":"#023047"}}>
                Choose more topics that may apply to you
            </div>
            <div style={{"display":"flex", "flexDirection":"row", "alignItems":"center", "padding":"2%", "gap":"10px", "background":"#DEF1FD", "borderRadius":"3px 3px 0px 0px", "flex":"none", "order":"0", "flexGrow":"0", "paddingRight": "8%", "justifyContent": "space-between"}}>
            <div style={{"fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.3vw","display":"flex","alignItems":"center","color":"#505664", "flexGrow": "15"}}>
                    Name
                </div>
                <div style={{"fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.3vw","display":"flex","alignItems":"center","color":"#505664", "flexGrow": "1", "justifyContent": "center"}}>
                    Action
                </div>
            </div>
            {otherTopics.map(( item, index )=> {
                return(
                    <>
                            <div style={{"display":"flex","flexDirection":"column","boxShadow":"1px 1px 5px 2px rgba(0, 0, 0, 0.1)","boxSizing":"border-box","background":"#FEFEFE","border":"1px solid #DEF1FD","borderRadius":"4px"}}>
                                <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"center", "padding": '1.5%'}}>
                                    <div style={{"display":"flex","flexDirection":"column","padding":"4px 0px", "flexGrow": "15" , "maxWidth": "80%"}}>
                                        <div style={{"fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.63vw","display":"flex","color":"#023047"}}>
                                            {item.name}
                                        </div>
                                        <div style={{"maxWidth":"70%","fontFamily":"'Roboto'","fontStyle":"normal","fontWeight":"400","fontSize":"1.05vw","display":"flex","alignItems":"center","color":"#505664", "wordBreak": "break-word"}}>
                                            {item.content}
                                        </div>
                                    </div>
                                    <div style={{"flexGrow": "5", "display":"flex", "justifyContent": "center", "maxWidth": "20%"}}>
                                        <Button 
                                            onClick={() => {
                                                let tempList = docList
                                                tempList[index].action = 'start'
                                                setLoading(true)
                                                setDocList([...tempList])
                                                setLoading(false)
                                                addTopicBtn(item.topic_id)
                                            }}
                                            leftIcon={<BiPencil/>}
                                            style={{'position': 'relative', 'right': '3%', "backgroundColor": "#023047", 'width': '142px', 'height': '57px', "fontFamily":"'Source Sans Pro'","fontStyle":"normal","fontWeight":"600","fontSize":"1.3vw","lineHeight":"100%"}}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                    </>
                )
            })}
            <Footer/>
        </div>
    )
}

export default EssentialDocs