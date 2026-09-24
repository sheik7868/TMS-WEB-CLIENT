import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function TopBar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Card sx={{ mt: 2, ml: 2, mr: 2, mb: 2, borderRadius: '15px' }}>
                <span style={{ marginLeft: '15px', marginTop: '8px' }}><b>File-TopBar.tsx</b></span>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={12} lg={11} xl={11} sx={{ pl: 2, display: 'flex', mt: 0, fontWeight: 800, justifyContent: 'center' }}>
                        <span className="material-icons" style={{ fontSize: '20px', marginRight: "20px", fontWeight: 800 }}>task_alt</span>
                        Task Management System
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={1} xl={1} sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 2, sm: 2, md: 2, lg: 0, xl: 0 }, pb:{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 } }}>
                        <Avatar
                            sx={{ background: 'green', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                            onClick={handleClick}
                        >
                            S
                        </Avatar>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Switch User</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}
