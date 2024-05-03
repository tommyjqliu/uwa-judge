"use client"

// databse client for domjudge database
import { PrismaClient as DOMjudgeClient } from '@/lib/domjudge-db-client';
// databse client for uwajudge database
import { PrismaClient as UWAjudgeClient }  from '@prisma/client';

//import { auth } from "@/lib/auth";
import { MouseEvent, useState } from "react";

import Link from "next/link";




export default function Page() {

    const [files, setFiles] = useState<FileList | null>(null);
    function submitForm(e: MouseEvent) {
        e.preventDefault();

        const formData = new FormData();

        // test problemId id.
        var problemId:string = '1';  // Must be string for the form
        formData.set("problemId", problemId)

        var language:string = 'python3'
        formData.set("language", language)

        var entryPoint:string = ''
        formData.set("entryPoint", entryPoint)

        // Add files to form
        for (let i = 0; i < (files?.length || 0); i++) {
            formData.append("files", files?.[i]!);
        }

        // communicate with domjudge api
        fetch("/api/submissions", {
            method: 'POST',
            body: formData,
        })
            .then( (response) => {
                const status = response.status
                var user_message = ""
                if(status == 200){
                    var user_message = "Successful Upload"
                }
                if(status == 400){
                    var user_message = "Failed Upload: No files specified"
                }
                else{
                    var user_message = "Failed Upload: Unknown Error"
                }

                document.getElementById('submitResponse')!.value = user_message
            } )
    }


    return <div>
        <Link href="/..">Back to Main</Link>
        <form id='form'>
            <div>
                <h1>Test Upload Submit Page</h1>
            </div>
            <div>
                <label htmlFor='files'>Select files</label>
                <input id='files' type="file" multiple onChange={(e) => setFiles(e.target.files)} />
            </div>
            <button type='submit' onClick={(e) => submitForm(e)}>Upload</button>
            <div>
                <h3>Response:</h3>
                <textarea id="submitResponse" value="" rows="1" cols="30"> </textarea>
            </div>
        </form>
    </div>
}