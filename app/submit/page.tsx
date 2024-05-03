"use client"

// databse client for domjudge database
import { PrismaClient as DOMjudgeClient } from '@/lib/domjudge-db-client';
// databse client for uwajudge database
import { PrismaClient as UWAjudgeClient }  from '@prisma/client';

//import { auth } from "@/lib/auth";
import { MouseEvent, useState } from "react";

import Link from "next/link";

export default function Page() {

    var [DJResponseVal, setDjResponse] = useState('');
    var [UWAResponseVal, setUWAResponse] = useState('');

    const [files, setFiles] = useState<FileList | null>(null);
    function submitForm(e: MouseEvent) {
        e.preventDefault();
        

        // ---------- Variable setup ----------

        var problemId:string = '1';  // Must be string for the form
        var assignmentID:number = 1;
        var language:string = 'python3' // These values are pre-defined by domjudge
        var entryPoint:string = ''  // This value doesn't seem to matter
        // File name added by loop

        // ---------- DomJudge Database Upload ----------

        const DJformData = new FormData();

        // test problemId id.
        
        DJformData.set("problemId", problemId)
        DJformData.set("language", language)
        DJformData.set("entryPoint", entryPoint)

        // Add files to form
        for (let i = 0; i < (files?.length || 0); i++) {
            DJformData.append("files", files?.[i]!);
        }

        // communicate with domjudge api
        fetch("/api/submissions/domjudge", {
            method: 'POST',
            body: DJformData,
        })
            .then( (response) => {
                const status = response.status
                var DJ_user_message = ""
                if(status == 200){
                    var DJ_user_message = "Successful Upload"
                }
                if(status == 400){
                    var DJ_user_message = "Failed Upload: No files specified"
                }
                else{
                    var DJ_user_message = "Failed Upload: Unknown Error"
                }

                setDjResponse(DJ_user_message)
            } )
        
        // --------------------


        // ---------- Private Database Upload ----------

       const UWAformData = new FormData();
        
        UWAformData.set("problemId", problemId)
        UWAformData.set("assignmentID", assignmentID)
        UWAformData.set("language", language)

        for (let i = 0; i < (files?.length || 0); i++) {
            UWAformData.append("filename", files?.[i]!);
        }


        fetch("/api/submissions/uwa", {
            method: 'POST',
            body: UWAformData,
        })
            .then( (response) => {
                const status = response.status
                var UWA_user_message = ""
                if(status == 200){
                    var UWA_user_message = "Successful Upload"
                }
                if(status == 400){
                    var UWA_user_message = "Failed Upload: No files specified"
                }
                else{
                    var UWA_user_message = "Failed Upload: Unknown Error"
                }

                setDjResponse(UWA_user_message)
            } )


    }


    // Return website structure

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
                <h3>DJResponse:</h3>
                <textarea id="DJResponse"
                    value={DJResponseVal}
                    onChange={e => setDjResponse(e.target.value)}
                    rows="1" cols="30"
                ></textarea>
                <h3>UWAResponse:</h3>
                <textarea id="DJResponse"
                    value={DJResponseVal}
                    onChange={e => setDjResponse(e.target.value)}
                    rows="1" cols="30"
                ></textarea>
            </div>
        </form>
        <Link href="/viewAll"></Link>
    </div>
}