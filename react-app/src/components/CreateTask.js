import React, {useState, useContext} from 'react'
import {Container, Button, TextField, RadioGroup, FormControlLabel, FormLabel, FormControl, Radio, InputLabel, Select, MenuItem} from '@material-ui/core'

import {ListContext} from '../context'
import {create_task} from '../services/task'
import {get_lists} from '../services/list'
import './form.css'

export default function CreateTask() {
    const [status, setStatus] = useState('false');
    const lists = useContext(ListContext).lists.lists
    const setLists = useContext(ListContext).setLists
    const [listTitle, setListTitle] = useState(1)
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [errors, setErrors] = useState([])

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleListChange= (e) => {
        setListTitle(e.target.value)
    }

    const handleTitleChange = (e) => {
        setTaskTitle(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setTaskDescription(e.target.value)
    }

    const sendForm = async (e) => {
        e.preventDefault();

        if (taskTitle && listTitle && taskDescription) {
            const data = new FormData();
            let taskStatus;
            if (status === "true") {
                taskStatus = true;
            } else {
                taskStatus = false;
            }
            data.append("title", taskTitle)
            data.append("description", taskDescription)
            data.append("status", taskStatus)
            data.append("list_id", listTitle)
            setTaskTitle("")
            setTaskDescription("")
            setStatus("false")
            setListTitle(1)
            setErrors([])
            const res = await create_task(data)
            if (res.error) {
                setErrors([...errors,res.error])
            }
            let newLists = await get_lists()
            setLists(newLists)

        } else {
            setErrors([...errors, "you must fill out all required fields"])
        }
    }
  return (
      <div className="form_container">
        {errors.map((error) => (
                <div>{error}</div>
                ))}
        <FormControl component="fieldset">
            <div className="input-container">
                <FormLabel component="legend">
                    New Task
                </FormLabel>
            </div>
            <div className="input-container">
                <TextField id="standard-basic" label="Task Title" value={taskTitle} onChange={handleTitleChange}/>
            </div>
            <div className="input-container">
                
                <TextField id="outlined-basic" multiline label="Description" variant="outlined" value={taskDescription} onChange={handleDescriptionChange}/>
            </div>
            <div className="input-container">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={status} onChange={handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="Done" />
                    <FormControlLabel value="false" control={<Radio />} label="In Progress" />
                </RadioGroup>
            </div>
                <Select
                    value={listTitle}
                    onChange={handleListChange}
                >
                    {lists && lists.map(list => {
                            return <MenuItem key={list.id} value={list.id}>{list.title}</MenuItem>
                    })}
                </Select>
            <div className="button-container">
                <Button onClick={sendForm}>Submit</Button>
            </div>
        </FormControl>
      </div>
  );
}
