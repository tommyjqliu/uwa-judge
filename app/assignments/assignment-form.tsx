"use client"
import ClientContext from '@/lib/components/client-context';
import EntitySelector from '@/lib/components/entity-selector';
import { Input, Select, TextField, TextareaAutosize } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Assignment, Prisma } from '@prisma/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';


export default function Form() {
    const { control, register, handleSubmit } = useForm({
        defaultValues: {
            user: []
        }
    })
    const onSubmit: SubmitHandler<Assignment> = (data) => {
        console.log(data)
    }

    return (
        <ClientContext>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => <TextField label="Title" {...field} />}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <TextField multiline label="Description" {...field} />}
                />
                <Controller
                    name="publishDate"
                    control={control}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                {...field}
                            />
                        </LocalizationProvider>
                    )}
                />
                <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                {...field}
                            />
                        </LocalizationProvider>
                    )}
                />
                <Controller
                    name="user"
                    control={control}
                    render={({ field }) => {
                        console.log(field)
                        return <EntitySelector entityQuery={{ entity: 'user' }} {...field} multiple />
                    }}
                />
                <input type="submit" />
            </form>
        </ClientContext>
    )
}