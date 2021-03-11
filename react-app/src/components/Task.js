import React, {useState,useContext} from 'react'
import {Box, TextField, Button} from '@material-ui/core';

import {delete_task, create_comment,delete_comment} from '../services/task'
import {get_lists} from '../services/list'
import {ListContext} from "../context"
import './task.css'
import EditForm from './EditForm';


export default function Task({task}) {
    const [visible, setVisible] = useState(false)
    const setLists = useContext(ListContext).setLists
    const [commentText, setCommentText] = useState("")
    const [editForm, setEditForm] = useState(false)


    const handleClick = () => {
        console.log(visible)
        setVisible(!visible)
        return
    }

    const editTask = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        setVisible(true)
        setEditForm(true)
    }

    const commentPropagation = (e) => {
        e.stopPropagation()
    }

    const deleteTask = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        const res = await delete_task(task.id)
        setLists(res)
    }

    const handleCommentSubmit = async (e) => {
        e.stopPropagation()
        e.preventDefault()

        if (commentText) {
            const data = new FormData()
            setCommentText("")
            data.append("content", commentText)
            data.append("taskId", task.id)

            const res = await create_comment(data, task.id)
            const newLists = await get_lists()
            setLists(newLists)
        }
    } 
    const handleDeleteComment = async(e, id) => {
        e.stopPropagation()
        e.preventDefault()
        console.log(id)
        const res = await delete_comment(id)

        const newLists = await get_lists()
        setLists(newLists)

    }

    return (
        <div className="task_dropdown_container" onClick={handleClick}>
            <div className="task_container">
                <div className="task_title">
                    {task.title}
                </div>
                <div className="task_button_container">
                    {visible && <div className="task_status">
                        {task.status ? "done": "in progress"}
                    </div>}
                    <Button onClick={editTask}>
                        edit
                    </Button>
                    <Button onClick={deleteTask}>
                        delete
                    </Button>
                </div>
            </div>
            {visible && 
                <div className="task_details_container" onClick={commentPropagation}>
                    {editForm ? 
                        <EditForm task={task} setEditForm={setEditForm}/>
                    :
                        <div className="task_details">
                        <div style={{"fontSize": "1.25em", "color": "#1f1115"}}>Description</div>
                        {task.description}
                        </div>
                    }
                    <div className="task_comments_container" onClick={commentPropagation}>
                        <div style={{"fontSize": "1.25em", "color": "#1f1115"}}>Comments</div>
                        <div className="comment_container">
                            {task.comments && task.comments.map(comment => (
                                <div className="comment">
                                    <div className="comment_text">{comment.content}</div>
                                    <Button onClick={e => (handleDeleteComment(e, comment.id))}>Delete</Button>
                                </div>
                            ))}
                        </div>
                            <form onSubmit={handleCommentSubmit}>
                        <div className="comment_input">
                                <TextField 
                                    value={commentText} fullWidth id="standard-basic" 
                                    label="Comment" 
                                    onChange={e=>setCommentText(e.target.value)}
                                    // onSubmit={handleCommentSubmit}
                                />
                                <Button onClick={handleCommentSubmit}>Submit</Button>
                        </div>
                            </form>
                    </div>
                </div>
            }
        </div>
    )
}
