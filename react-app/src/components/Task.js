import React, {useState,useContext} from 'react'
import {Box, Button} from '@material-ui/core';

import {delete_task} from '../services/task'
import {ListContext} from "../context"
import './task.css'


export default function Task({task}) {
    const [visible, setVisible] = useState(false)
    const setLists = useContext(ListContext).setLists


    const handleClick = () => {
        console.log(visible)
        setVisible(!visible)
        return
    }

    const deleteTask = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        const res = await delete_task(task.id)
        setLists(res)
    }
    return (
        <div className="task_dropdown_container" onClick={handleClick}>
            <div className="task_container">
                <div>
                    {task.title}
                </div>
                <div className="task_button_container">
                    <div>
                        {task.status ? "completed": "not completed"}
                    </div>
                    <Button>
                        edit
                    </Button>
                    <Button onClick={deleteTask}>
                        delete
                    </Button>
                </div>
            </div>
            {visible && 
                <div>{task.description}</div>
            }
        </div>
    )
}
