import { useState } from 'react';
import './MiniTable.css';
import { Table } from 'react-bootstrap';

export default function MiniTable({name, fill}) {
    return (
        <div className = "mt-cont">
            <Table striped bordered hover variant="light" className = "mt-t">
                <thead>
                    <tr>
                        <th className="col-1">{name}</th>
                    </tr>
                </thead>
                <tbody>
                    {fill.map(x => {
                        return (
                            <tr>
                                <td>{x}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}