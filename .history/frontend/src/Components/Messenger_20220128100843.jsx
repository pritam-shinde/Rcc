import React, { useEffect, useState, useRef } from 'react';
import { Container, Grid, Box, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import toast, {Toaster} from 'react-hot-toast'
import { Header, ChatList, ChatFeed, ChatSetting } from './Components';
import { getFriends, messageSend, getMessage, imageMessageSend } from '../store/action/MessengerAction';
import useSound from 'use-sound';
import sentNotification from '../Audio/sent.mp3';
import receiveNotification from '../Audio/receive.mp3';

const useStyles = makeStyles(theme => ({
    root: { height: "91.64vh", width: "100%", overflow: "hidden", padding: 0 },
    chatItems: { height: "91.64vh", overflow: "hidden", borderRight: "1px solid lightgrey" },
    bgSideBar: { backgroundColor: "#f9f9f9" }
}))

const Messenger = () => {
    const [sentSPlay] = useSound(sentNotification);
    const [receiveSPlay] = useSound(receiveNotification);
    const scrollRef = useRef();
    const socket = useRef();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { friends, message } = useSelector(state => state.messenger);
    const { myInfo } = useSelector(state => state.auth);
    const [currentFriend, setCurrentFriend] = useState("");
    const [activeUser, setActiveUser] = useState([]);
    const [socketMessage, setSocketMessage] = useState('');
    const [typingMessageStatus, setTypingMessageStatus] = useState("")

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
        }
        setSocketMessage("")
    }, [socketMessage, currentFriend, dispatch, myInfo.id])

    useEffect(()=>{
        if(socketMessage && socketMessage.senderId === currentFriend._id || socketMessage.receiverId === myInfo.id){

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
        dispatch(getFriends())
    }, [dispatch])

    useEffect(() => {
        if (friends && friends.length > 0) {
            setCurrentFriend(friends[0])
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

    return (
        <>
            <Header myInfo={myInfo} />
            <Container maxWidth="xl" className={classes.root}>
                <Toaster position={'top-right'} reverseOrder={false} toastOptions={{style:{fontSize: "1rem"}}} />
                <Grid container>
                    <Grid item xs={12} md={2}>
                        <Box className={`${classes.chatItems} ${classes.bgSideBar}`}>
                            <ChatList friends={friends} currentFriend={currentFriend} getCurrentFriend={getCurrentFriend} />
                        </Box>
                    </Grid>
                    {currentFriend ? <><Grid item xs={12} md={8}>
                        <Box className={classes.chatItems} >
                            <ChatFeed currentFriend={currentFriend} sendMessage={sendMessage} messages={message} scrollRef={scrollRef} imageSend={imageSend} activeUser={activeUser} isTyping={isTyping} typingMessageStatus={typingMessageStatus} />
                        </Box>
                    </Grid>
                        <Grid item xs={12} md={2}>
                            <Box className={`${classes.chatItems} ${classes.bgSideBar}`}>
                                <ChatSetting friends={friends} currentFriend={currentFriend} activeUser={activeUser} message={message} myInfo={myInfo} />
                            </Box>
                        </Grid></> : <>
                        <Grid item xs={12} md={10}>
                            <Box className={`${classes.chatItems} d-flex justify-content-center align-items-center flex-column`}>
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
