import React, {useState} from 'react'
import {Box, Button} from '@material-ui/core';

import './task.css'


export default function Task({task}) {
    const [visible, setVisible] = useState(false)

    const handleClick = () => {
        console.log(visible)
        setVisible(!visible)
        return
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
                    <Button>
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
