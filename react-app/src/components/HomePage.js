import React, {useContext, useEffect} from 'react';
import {Tab, Tabs, AppBar} from '@material-ui/core'

import {ListContext} from '../context'


const HomePage = () => {
    const lists = useContext(ListContext)

    useEffect(() => {
        console.log(lists)
        return () => {
        }
    }, [])

    return (
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} >
                {lists && lists.map(list => {
                    <Tab key={list.title} label={list.title} />
                })}
            </Tabs>
        </AppBar>
    );
};


export default HomePage;