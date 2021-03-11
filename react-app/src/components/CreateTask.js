import React, {useContext} from 'react'
import {Container, TextField, RadioGroup, FormControlLabel, FormLabel, FormControl, Radio, InputLabel, Select, MenuItem} from '@material-ui/core'

import {ListContext} from '../context'
import './form.css'

export default function CreateTask() {
    const lists = useContext(ListContext).lists.lists

    const [value, setValue] = React.useState('false');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Container>
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    New Task
                </FormLabel>
                <TextField id="standard-basic" label="Task Title" />
                <TextField id="outlined-basic" label="Description" variant="outlined" />
                <RadioGroup aria-label="status" name="status1" value={value} onChange={handleChange}>
                    <FormControlLabel value={true} control={<Radio />} label="Completed" />
                    <FormControlLabel value={false} control={<Radio />} label="Not Completed" />
                </RadioGroup>
                <InputLabel>List</InputLabel>
                <Select>
                    {lists && lists.map(list => {
                        return <MenuItem key={list.id} value={list.id}>{list.title}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Container>
    )
}
