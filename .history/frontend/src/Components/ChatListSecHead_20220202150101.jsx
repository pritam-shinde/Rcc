import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    head: { fontSize: "1.25rem", fontWeight: 600, },
}))

const ChatListSecHead = ({ head, icon }) => {
    const classes = useStyles();

    return (
        <>
            <Box py={2} px={2} style={{backgroundColor: localStorage.getItem('isDark') ? "#13191f" :"#fff", borderBottom: localStorage.getItem('isDark') ? "1px solid #222": "1px solid lightGrey", }} >
                <Typography variant='h6' style={{color: localStorage.getItem('isDark') ? "#fff" : "#000"}} className={classes.head}>{head}</Typography>
            </Box>
        </>
    )
}

export default ChatListSecHead
