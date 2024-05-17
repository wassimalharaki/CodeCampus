import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentUser } from '../Store/UserSlice';
import './Problem.css';
import Header from '../Components/Header';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Editor } from '@monaco-editor/react';

export default function Problem() {
    const user = useSelector(currentUser);
    const template = `#include <bits/stdc++.h>`
                    + `\nusing namespace std;`
                    + `\n`
                    + `\nint main() {`
                    + `\n\t`
                    + `\n}`;
    const options = {
        fontSize: 22,
        minimap: {
            enabled: false
        }
    };
    const [p, setProblem] = useState({});
    const [result, setResult] = useState([]);
    const [code, setCode] = useState(template);
    const [disabled, setDisabled] = useState(false);
    const id = location.pathname.split("/")[2];
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/problem/' + id)
        .then(res => {
            setProblem(res.data);
        });
    }, []);

    function resultDiv(passed, i) {
        return (
            <div key={i} style={{color: (passed ? "green" : "red"), marginRight: "10px"}}>
                {i}{i == p.tcs.length ? "" : ","}
            </div>
        );
    }

    function getText(html) {
        var d = document.createElement("div");
        d.innerHTML = html;
        return d.textContent || d.innerText || "";
    }

    const execute = async (input) => {
        setDisabled(true);
        let resp= "";
        await axios.post('http://localhost:3002/api/exec/execute', {
            "program": code,
            "input": input.trim(),
            "lang": "C++",
        }).then(res => {
            setDisabled(false);
            resp = getText(res.data.output);
        }).catch(err => {
            setDisabled(false);
            resp = "TIME LIMIT EXCEEDED";
        });
        return resp;
    }
    
    const handleSubmit = async () => {
        let passed = 0;
        let results = [];
        results.push((
            <div style={{marginRight: "10px"}}>
                Testcases:
            </div>
        ));
        for await (const tc of p.tcs) {
            const output = (await execute(tc.input)).trim();
            if (output == tc.output) {
                passed++;
                results.push(resultDiv(true, results.length));
            }
            else {
                results.push(resultDiv(false, results.length));
            }
        }
        await axios.post('http://localhost:3001/api/submission/', {
            "user_email": user.user.email,
            "problem_name": p.name,
            "problem_id": id,
            "passed": passed,
            "total": p.tcs.length,
            "source": code
        });
        setResult(results);
    }

    return (
        <div className='problem-parent'>
            <Header/>
            <div className='problem-body'>
                <div className = "split">
                    <div className='ll'>
                        <p className='p-name'>{p.name}</p>
                        <p className='p-statement'>{p.statement}</p>
                        <p className='p-io-title'>Sample input:</p>
                        <p className='p-io'>{p.tcs ? p.tcs[0].input : ""}</p>
                        <p className='p-io-title'>Sample output:</p>
                        <p className='p-io'>{p.tcs ? p.tcs[0].output : ""}</p>
                        <div className = 'btn-container'>
                            <Button className='btn-submit' onClick = {() => handleSubmit()} disabled={disabled}>SUBMIT</Button>
                        </div>
                        <div className = 'result-container'>
                        {result.map(r => {
                            return r;
                        })}
                        </div>
                    </div>
                    <div className = "rr">
                        <Editor
                            height="100%"
                            width="100%"
                            theme="vs-dark"
                            defaultLanguage="cpp"
                            options={options}
                            value={code}
                            onChange={(newVal, e) => setCode(newVal)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}