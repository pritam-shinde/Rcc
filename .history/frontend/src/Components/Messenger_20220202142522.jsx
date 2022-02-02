import React, { useEffect, useState, useRef } from 'react';
import { Container, Grid, Box, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast'
import { Header, ChatList, ChatFeed, ChatSetting } from './Components';
import { getFriends, messageSend, getMessage, imageMessageSend, } from '../store/action/MessengerAction';
import { userLogout } from '../store/action/authAction'
import useSound from 'use-sound';
import sentNotification from '../Audio/sent.mp3';
import receiveNotification from '../Audio/receive.mp3';
import { UPDATE_FRIEND_MESSAGE, MESSAGE_SEND_SUCCESS_CLEAR } from '../store/types/messengerType';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: { height: "91.64vh", width: "100%", overflow: "hidden", padding: 0 },
    chatItems: { height: "91.64vh", overflow: "hidden",},
    bgSideBar: { backgroundColor: "#f9f9f9" },
    darkModeBgRightSidebar : {backgroundColor:"#181d25"},
    darkModeChatFeed:{backgroundColor:"#181d25"},
    lightModeChatFeed:{backgroundColor:"eee"},
    darkModeLeftSidebar: {backgroundColor:"#121212e6"}
}))

const Messenger = () => {
    const [sentSPlay] = useSound(sentNotification);
    const [receiveSPlay] = useSound(receiveNotification);
    const scrollRef = useRef();
    const socket = useRef();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { friends, message, messageSendSuccess } = useSelector(state => state.messenger);
    const { loading, successMessage, error, authenticate, myInfo } = useSelector(state => state.auth);
    const [currentFriend, setCurrentFriend] = useState("");
    const [activeUser, setActiveUser] = useState([]);
    const [socketMessage, setSocketMessage] = useState('');
    const [typingMessageStatus, setTypingMessageStatus] = useState("")
    const [darkMode, setDarkMode] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticate) {
            navigate("/messenger/login")
        }
    }, [authenticate, navigate])

    const getCurrentFriend = (friend) => {
        setCurrentFriend(friend)
    }

    useEffect(() => {
        socket.current = io('ws://localhost:8000')
        socket.current.on('getMessage', (data) => {
            setSocketMessage(data)
        })
        socket.current.on("typingMessageGet", (data) => {
            setTypingMessageStatus(data)
        })
    }, [typingMessageStatus])

    useEffect(() => {
        socket.current.emit('addUser', myInfo.id, myInfo)
    }, [myInfo])

    useEffect(() => {
        socket.current.on('getUser', (users) => {
            const filterUser = users.filter(u => (u.userId !== myInfo.id))
            setActiveUser(filterUser)
        })
    }, [myInfo.id])

    useEffect(() => {
        if (socketMessage && currentFriend) {
            if (socketMessage.senderId === currentFriend._id && socketMessage.receiverId === myInfo.id) {
                dispatch({
                    type: "SOCKET_MESSAGE",
                    payload: {
                        message: socketMessage
                    }
                })
            }
            dispatch({
                type: "UPDATE_FRIEND_MESSAGE",
                payload: {
                    msgInfo: socketMessage
                }
            })
        }
        setSocketMessage("")
    }, [socketMessage, currentFriend, dispatch, myInfo.id])

    useEffect(() => {
        if (socketMessage && socketMessage.senderId === currentFriend._id && socketMessage.receiverId === myInfo.id) {
            toast.success(`${socketMessage.senderName} sent you a new message...`)
            receiveSPlay()
        }
    })

    const isTyping = (typing, msg) => {
        console.log(typing, msg)
        if (typing) {
            socket.current.emit("typingMessage", {
                senderId: myInfo.id,
                senderName: myInfo.username,
                receiverId: currentFriend._id,
                msg: msg
            })
        }
    }


    const sendMessage = (message) => {
        if (message) {
            const data = {
                senderId: myInfo.id,
                senderName: myInfo.username,
                senderImage: myInfo.image,
                receiverId: currentFriend._id,
                message: message,
                sentAt: new Date()
            }
            socket.current.emit('sendMessage', {
                senderId: myInfo.id,
                senderName: myInfo.username,
                senderImage: myInfo.image,
                receiverId: currentFriend._id,
                message: {
                    text: message,
                    image: "",
                    file: ""
                },
                sentAt: new Date()
            })
            dispatch(messageSend(data))
            sentSPlay()
        }
    }

    const imageSend = (image) => {
        if (image) {
            const imageName = image.name;
            const newImageName = Date.now() + imageName;
            const imageFormData = new FormData()
            imageFormData.append('senderName', myInfo.username);
            imageFormData.append('senderImage', myInfo.image);
            imageFormData.append('receiverId', currentFriend._id);
            imageFormData.append('image', image);
            imageFormData.append('sentAt', new Date())
            imageFormData.append('imageName', newImageName);
            dispatch(imageMessageSend(imageFormData))
            sentSPlay()
        }
    }

    useEffect(() => {
        if (messageSendSuccess) {
            socket.current.on('sendMessage', message[message.length - 1])
            dispatch({
                type: UPDATE_FRIEND_MESSAGE,
                payload: {
                    msgInfo: message[message.length - 1]
                }
            })
            dispatch({
                type: MESSAGE_SEND_SUCCESS_CLEAR,

            })
        }
    })

    const logout = () => {
        dispatch(userLogout())
    }

    useEffect(() => {
        dispatch(getFriends())
    }, [dispatch])

    useEffect(() => {
        if (friends && friends.length > 0) {
            setCurrentFriend(friends[0].friendInfo)
        }
    }, [friends])

    useEffect(() => {
        if (currentFriend._id) {
            dispatch(getMessage(currentFriend._id));
        }
    }, [currentFriend._id, dispatch])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    const handleDarkMode = (isDark) => {
        if (isDark) {
            setDarkMode(isDark);
            localStorage.setItem('isDark', isDark)
        } else {
            setDarkMode(isDark);
            localStorage.removeItem('isDark')
        }
    }

    return (
        <>
            <Header myInfo={myInfo} logout={logout} handleDarkMode={handleDarkMode}  />
            <Container maxWidth="xl" className={classes.root}>
                <Toaster position={'top-right'} reverseOrder={false} toastOptions={{ style: { fontSize: "1rem" } }} />
                <Grid container>
                    <Grid item xs={12} md={2}>
                        <Box className={`${classes.chatItems} ${localStorage.getItem('isDark') ? classes.darkModeLeftSidebar : classes.bgSideBar}`} style={{border: localStorage.getItem('isDark') ? "1px solid #222" : "1px solid lightgrey",borderTop:"none", borderBottom:"none"}} >
                            <ChatList friends={friends} currentFriend={currentFriend} getCurrentFriend={getCurrentFriend} myId={myInfo} />
                        </Box>
                    </Grid>
                    {currentFriend ? <><Grid item xs={12} md={8}>
                        <Box className={`${classes.chatItems} ${localStorage.getItem('isDark') ? classes.darkModeChatFeed : classes.lightModeChatFeed}`} style={{border: localStorage.getItem('isDark') ? "1px solid #555" : "1px solid lightgrey",borderCollapse:"collapse",borderTop:"none", borderBottom:"none"}} >
                            <ChatFeed currentFriend={currentFriend} sendMessage={sendMessage} messages={message} scrollRef={scrollRef} imageSend={imageSend} activeUser={activeUser} isTyping={isTyping} typingMessageStatus={typingMessageStatus} />
                        </Box>
                    </Grid>
                        <Grid item xs={12} md={2}>
                            <Box className={`${classes.chatItems} ${localStorage.isDark ? classes.darkModeBgRightSidebar : classes.bgSideBar}`} style={{border: localStorage.getItem('isDark') ? "1px solid #555" : "1px solid lightgrey", borderCollapse:"collapse", borderTop:"none", borderBottom:"none"}}>
                                <ChatSetting friends={friends} currentFriend={currentFriend} activeUser={activeUser} message={message} myInfo={myInfo} />
                            </Box>
                        </Grid></> : <>
                        <Grid item xs={12} md={10}>
                            <Box className={`${classes.chatItems} d-flex justify-content-center align-items-center flex-column`} >
                                <h1>Hello, {myInfo.username}</h1>
                                <p className='text-secondary'>Please click any of your teammate  to chat with them...!</p>
                            </Box>
                        </Grid>
                    </>}
                </Grid>
            </Container >
        </>
    )
}

export default Messenger