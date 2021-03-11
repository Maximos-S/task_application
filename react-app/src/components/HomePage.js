import React, {useContext, useEffect} from 'react';
import {Tab, Tabs, Box, Typography, AppBar, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import {ListContext} from '../context'
import Task from './Task'
import CreateTask from './CreateTask'



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const HomePage = () => {
    const lists = useContext(ListContext).lists.lists
    const [value, setValue] = React.useState(0);
    const classes = useStyles();

    console.log("lists", lists)

    useEffect(() => {
        return () => {
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Container maxWidth="md">
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} centered>
                {lists && lists.map(list => {
                    return <Tab key={list.id} label={list.title} />
                })}
                <Tab label="Create Task" />
            </Tabs>
            {lists && lists.map((list, index) => {
                return <TabPanel value={value} index={index}>
                    {list.tasks.map(task => {
                        return <Task task={task} />
                    })}
                </TabPanel>
            })}
            <TabPanel value={value} index={3}>
                <CreateTask />
            </TabPanel>
        </AppBar>
    </Container>
    );
};


export default HomePage;