"use client"
import axios from "axios";
import React, { useState } from "react";


export default function Page({ params: { problemId } }: { params: { problemId: string } }) {

    const [files, setFiles] = useState<FileList | null>(null);
    function submitForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        console.log(files)
        axios.postForm(`/api/problems/${problemId}/submission`, {
            files,
            language: 'python3',
        })
    }

    return <form id='form'>
        <div>
            <label htmlFor='files'>Select files</label>
            <input id='files' type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        </div>
        <button type='submit' onClick={(e) => submitForm(e)}>Upload</button>
    </form>
}