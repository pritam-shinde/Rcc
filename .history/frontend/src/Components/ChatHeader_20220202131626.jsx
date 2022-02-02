import React from 'react';
import { Box, Typography, IconButton, Avatar, Badge, makeStyles } from '@material-ui/core';
import { MoreOutlined } from '@ant-design/icons';

const useStyles = makeStyles(theme => ({
    root: { display: "flex", justifyContent: "space-between", boxShadow: "none", borderRadius: "none", borderBottom: "1px solid lightgrey", backgroundColor: localStorage.getItem('isDark') ? "#181d25" : "#fff" },
    head: { fontSize: "1.25rem", fontWeight: 600 }
}))

const ChatHeader = ({ currentFriend, activeUser }) => {

    const ActiveUser = activeUser.filter(user => {
        return user.userId !== null
    })

    let userActive = ActiveUser.filter(user => {
        return user.userId === currentFriend._id;
    })

    const classes = useStyles();
    return (
        <>
            <Box py={1} px={2} className={`${classes.root}`} >
                <Box className='d-flex'>
                    <Badge variant='dot' color="primary"><Avatar src={`./image/${currentFriend.image}`} style={{ marginRight: "0.5rem" }} /></Badge>
                    <Typography variant='h6' className={`${classes.head} ${localStorage.getItem('isDark') ? "text-white" : "text-dark"}`}>{currentFriend.username}</Typography>
                </Box>
                <IconButton>
                    <MoreOutlined />
                </IconButton>
            </Box>
        </>
    )
}

export default ChatHeader
