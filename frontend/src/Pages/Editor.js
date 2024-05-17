import { useState } from "react";
import Header from "../Components/Header";
import './Editor.css';
import Editor from "@monaco-editor/react"
import axios from "axios";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router";

export default function Home() {
    const template = `#include <bits/stdc++.h>`
                    + `\nusing namespace std;`
                    + `\n`
                    + `\nint main() {`
                    + `\n\t`
                    + `\n}`;
                    
    const state = useLocation();
    const [code, setCode] = useState(state?.state?.fill ? state.state.fill : template);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [disabled, setDisabled] = useState(false);

    const options = {
        fontSize: 22,
        minimap: {
            enabled: false
        }
    };

    function getText(html) {
        var d = document.createElement("div");
        d.innerHTML = html;
        return d.textContent || d.innerText || "";
    }

    const execute = async () => {
        setDisabled(true);
        axios.post('http://localhost:3002/api/exec/execute', {
            "program": code,
            "input": input.trim(),
            "lang": "C++",
        }).then(res => {
            setOutput(getText(res.data.output));
            setDisabled(false);
        }).catch(err => {
            if (err.response.status === 408)
                setOutput("TIME LIMIT EXCEEDED");
            setDisabled(false);
        });
    }

    return (
        <div className = "home-parent">
            <Header/>
            <div className = "home-body">
                <Button className = "exec-btn" onClick = {() => execute()} disabled={disabled}>RUN</Button>
                <Editor
                    height="100%"
                    width="70%"
                    theme="vs-dark"
                    defaultLanguage="cpp"
                    options={options}
                    value={code}
                    onChange={(newVal, e) => setCode(newVal)}
                />
                <div className = "IO">
                    <textarea className = "txt-io" placeholder = "Input" value = {input} onChange = {e => setInput(e.target.value)} autoComplete="false"/>
                    <textarea className = "txt-io" placeholder = "Output" value = {output} readOnly/>
                </div>
            </div>
        </div>
    );
}