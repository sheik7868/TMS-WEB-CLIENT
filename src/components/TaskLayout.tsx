import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { TaskLayoutInterface } from '../interfaces/components/TaskLayout.Interface';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

export default function TaskLayout({ data, configs, callbacks }: TaskLayoutInterface) {
    const [totalCount, setTotalCount] = useState<any>();
    const [searchKeyWord, setSearchKeyWord] = useState<any>('');

    useEffect(() => {
        setTotalCount(`Total Task Count : ${data?.totalCount ? data?.totalCount : 0}`);
    }, [configs, data, callbacks])

    return (
        <>
            <Card sx={{ mt: 2, ml: 2, mr: 2, mb: 2, height: 'fit-content', borderRadius: '15px' }}>
                <span style={{ marginLeft: '15px', marginTop: '8px' }}><b>File-TaskLayout.tsx</b></span>
                <Grid container spacing={0} sx={{ mb: 2 }}>
                    <Grid xs={12} sm={12} md={3} lg={3} xl={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', mt: 2 }}>
                        <Chip data-testid={configs?.datatestID + 'count'} label={totalCount} sx={{ background: '#1976d2', color: 'white' }} />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', mt: 2, pl: 1, pr: 1 }}>
                        <TextField
                            placeholder="Search Task by Code...!"
                            data-testid={configs?.datatestID + 'searchbar'}
                            type='search'
                            fullWidth
                            size='small'
                            InputProps={{
                                sx: { borderRadius: 5 },
                                endAdornment: <Button variant='contained' size='small' sx={{ borderRadius: 5 }} onClick={() => callbacks.handleSearch(searchKeyWord)}><SearchIcon /></Button>,
                            }}
                            value={searchKeyWord}
                            onChange={(e: any) => setSearchKeyWord(e?.target?.value)}
                        />
                    </Grid>
                    <Grid xs={12} sm={12} md={3} lg={3} xl={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', mt: 2 }}>
                        <Button
                            variant="contained"
                            size='small'
                            data-testid={configs?.datatestID + 'create-btn'}
                            sx={{
                                borderRadius: "20px",
                                textTransform: 'none',
                                background: 'green',
                                fontSize: '15px',
                                fontWeight: 500,
                                color: 'white',
                                cursor: "pointer",
                                ':hover': {
                                    background: 'green',
                                    color: 'white'
                                }
                            }}
                            onClick={() => callbacks.handleCreate('create')}
                        >
                            <span className="material-icons" style={{ fontSize: '20px', marginRight: '5px' }}>
                                add_task
                            </span>Create Task</Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}