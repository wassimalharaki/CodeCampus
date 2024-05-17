import { useState } from 'react';
import './Testcase.css';

export default function Testcase({id, i, o}) {
    const [input, setInput] = useState((i ? i : ""));
    const [output, setOutput] = useState((o ? o : ""));
    return (
        <>
            <textarea id = {id + "i"} className = "txt-tc tc-left" placeholder="Input" value = {input} onChange = {e => setInput(e.target.val)}/>
            <textarea id = {id + "o"} className = "txt-tc" placeholder="Output" value = {output} onChange = {e => setOutput(e.target.val)}/>
        </>
    )
}