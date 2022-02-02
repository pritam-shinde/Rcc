import React, { useState } from 'react';
import { Box, IconButton, Collapse, Divider, List, ListItem, Badge, Avatar, makeStyles } from '@material-ui/core';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
// import { GroupMembers } from './Components'

const useStyles = makeStyles(theme => ({
    root: { height: "91.64vh", overflowY: "scroll" },
    darkIcon: { color: "#fff" },
    icon: { color: "#000" }
}))

const ChatSetting = ({ friends, currentFriend, activeUser, message, myInfo }) => {
    const [Open, setOpen] = useState(false);
    const [state, setState] = useState(false);
    const [on, setOn] = useState(false);

    let activeUsers = activeUser.filter(user => {
        return user.userInfo !== ""
    });

    let imageMessage = message.filter(message => {
        return ((message.message.text === "" && message.message.image !== "") && ((message.senderId === myInfo.id && message.receiverId === currentFriend._id) || (message.senderId === currentFriend._id && message.receiverId === myInfo.id)))
    })

    const classes = useStyles()
    return (
        <>
            <Box px={1} py={2} className={classes.root}>
                <Box>
                    <Box className='d-flex justify-content-between align-items-center'>
                        <h5 style={{ fontSize: "0.9375rem", color: localStorage.getItem('isDark') ? "#fff" : "#000" }} >Individual Member or Group participant</h5>
                        <IconButton onClick={() => setOpen(!Open)}>{!Open ? <RiArrowDropDownLine className={localStorage.getItem('isDark') ? classes.darkIcon : classes.icon} /> : <RiArrowDropUpLine className={localStorage.getItem('isDark') ? classes.darkIcon : classes.icon} />}</IconButton>
                    </Box>
                    <Divider style={{ backgroundColor: "darkgrey" }} />
                    <Collapse in={Open}>
                        <Box className='d-flex overflow-scroll mb-3 py-3'>
                            <Badge variant='dot'><Avatar src={`./image/${currentFriend.image}`} /></Badge>
                        </Box>
                    </Collapse>
                </Box>
                <Box mt={2}>
                    <Box className='d-flex justify-content-between align-items-center'>
                        <h5 style={{ fontSize: "0.9375rem", color: localStorage.getItem('isDark') ? "#fff" : "#000" }}>Media</h5>
                        <IconButton onClick={() => setState(!state)}>{!state ? <RiArrowDropDownLine className={localStorage.getItem('isDark') ? classes.darkIcon : classes.icon} /> : <RiArrowDropUpLine className={localStorage.getItem('isDark') ? classes.darkIcon : classes.icon} />}</IconButton>
                    </Box>
                    <Divider />
                    <Collapse in={state}>
                        <Box style={{ height: "62vh", overflowY: "scroll", overflowX: "hidden" }}>
                            <List>
                                {
                                    imageMessage.map(msg => {
                                        return <> <ListItem >
                                            <Box className='d-flex justify-content-between' key={msg._id}>
                                                <Box style={{ marginRight: "0.5rem" }}>
                                                    <img src={`./image/${msg.message.image}`} alt='attachment' className='img-fluid rounded' />
                                                </Box>
                                                <Box>
                                                    <h6 style={{ wordWrap: "break-word", fontSize: "0.7rem", fontWeight: 400, margin: 0, color: localStorage.getItem('isDark') ? "#fff" : "#000" }}>{msg.message.image}</h6>
                                                    <small style={{ fontSize: "0.6rem", color: localStorage.getItem('isDark') ? "#fff" : "#000" }} >{msg.senderName}</small>
                                                </Box>
                                            </Box>
                                        </ListItem>
                                            <Divider />
                                        </>
                                    })
                                }
                            </List>
                        </Box>
                    </Collapse>
                </Box>
                <Box mt={2}>
                    <Box className='d-flex justify-content-between align-items-center'>
                        <h5 style={{ fontSize: "0.9375rem", color: localStorage.getItem('isDark') ? "#fff" : "#000" }}>Active Users</h5>
                        <IconButton onClick={() => setOn(!on)}>{!on ? <RiArrowDropDownLine style={{color: localStorage.getItem('isDark') ? classes.darkIcon : classes.icon}} /> : <RiArrowDropUpLine style={{color: localStorage.getItem('isDark') ? classes.darkIcon : classes.icon}} />}</IconButton>
                    </Box>
                    <Divider />
                    <Collapse in={on}>
                        <Box className='d-flex overflow-scroll mb-3 py-3'>
                            {
                                activeUsers.map(user => {
                                    return <Badge variant='dot' key={user.userInfo.id}><Avatar src={`./image/${user.userInfo.image}`} /></Badge>
                                })
                            }
                        </Box>
                    </Collapse>
                </Box>
            </Box>
        </>
    )
}

export default ChatSetting
