"use client"
import { TextareaAutosize } from '@mui/material'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { DatePickerElement } from 'react-hook-form-mui/esm/DatePickerElement'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
export default function Form() {
    return (
        <FormContainer
            defaultValues={{ name: '' }}
            onSuccess={data => console.log(data)}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextFieldElement name="name" label="Name" required />
                <TextareaAutosize name="description" placeholder="Description" />
                <DateTimePickerElement name="publishDate" label="Publish Date" />
                <DatePickerElement name="dueDate" label="Due Date" />
            </LocalizationProvider>
        </FormContainer>
    )
}