import React, { useState } from 'react';
import { AppBar, Toolbar, Link, Box, IconButton, Avatar, Popover, Divider, Button, Card, CardHeader, CardContent, CardActions, Badge, makeStyles } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa'
import { AiOutlinePoweroff } from 'react-icons/ai';
import { BsBriefcaseFill } from 'react-icons/bs'
import {FiMail} from 'react-icons/fi'

const useStyles = makeStyles(theme => ({
    header: { backgroundImage: `linear-gradient(to right, #017eaa, #0096b7, #00adbc, #00c3b7, #47d7ac);`, }
}))

const Header = ({ myInfo, logout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles()
    return (
        <>
            <AppBar position='static' style={{ boxShadow: "none" }}>
                <Toolbar className={classes.header}>
                    <Link href='https://nonstopcorp.com/' className="navbar-brand text-decoration-none text-white" style={{ letterSpacing: "0.5px", fontSize: "1.5rem" }}>NONSTOPCORP</Link>
                    <Box style={{ flexGrow: 1 }} />
                    <Avatar src={`./image/${myInfo.image}`} alt={myInfo.username} onClick={handleClick} />
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                        <Box py={2} style={{ width: "12rem" }} >
                            <Box px={2} className="d-flex justify-content-between align-items-center py-2">
                                <Box><Avatar src={`./image/${myInfo.image}`} alt={myInfo.username} sx={{ width: 24, height: 24 }} /></Box>
                                <Box>
                                    <h5 style={{ fontSize: "1rem" }}>{myInfo.username}</h5>
                                    <Button onClick={() => { setAnchorEl(null); setIsModalVisible(!isModalVisible) }}>View Profile</Button>
                                    <Popover open={isModalVisible} anchorOrigin={{ vertical: 'center', horizontal: 'center', }}>
                                        <div className="card" style={{ width: "35rem" }}>
                                            <div className="card-header">
                                                <h5>Profile</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="media">
                                                    <Badge variant='dot'>
                                                        <Avatar src={`./image/${myInfo.image}`} alt={myInfo.username} style={{ height: "5rem", width: "5rem" }} />
                                                    </Badge>
                                                    <div className="media-body">
                                                        <h6>{myInfo.username}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className='media'>
                                                            <BsBriefcaseFill style={{ marginRight: "1rem" }} />
                                                            <div className="media-body">
                                                                <h6>Company</h6>
                                                                <h5>Nonstop</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div className="media">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Popover>
                                </Box>
                            </Box>
                            <Divider />
                            <Box px={2}>
                                <Button variant="contained" color="primary" size='large' className='mb-2'>Upgrade Now</Button>
                                <Button onClick={() => logout()}><AiOutlinePoweroff style={{ marginRight: '0.5rem', color: "red" }} />Sign Out</Button>
                            </Box>
                        </Box>
                    </Popover>
                    <IconButton>
                        <FaSearch fontSize="medium" />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
