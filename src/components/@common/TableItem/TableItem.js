import React from "react";
import styles from "./TableItem.module.css";

const tableExample = [{
    "purpose": "create schedule",
    "sdate": "2023-06-30",
    "edate": "2023-06-30",
    "stime": "14:00:00",
    "etime": "16:00:00",
    "whom": "팀장님",
    "why": "jobvis 회의",
    "final": false
    }]

const tableExample2 = [
    {
        "summary": "주간 업무 보고",
        "description": "create schedule",
        "start": {
            "dateTime": "2023-09-04T14:00:00:00",
            "timeZone": "Asia/Seoul"
        },
        "end": {
            "dateTime": "2023-09-04T16:00:00:00",
            "timeZone": "Asia/Seoul"
        }
    }
]

const TableItem = ({headers, items, styles}) => {
    if (!headers || !headers.length){
        throw new Error(`<DataTable /> headers is required.`)
    }

    const headerKey = headers.map((header)=> header.value);

    return (
        <table style={styles}>
            <thead>
                <tr>
                {headers.map((header) => 
                    <th key={header.text}>
                        {header.text}
                    </th>)}
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item, index) =>{
                        console.log(item);
                        return (<tr key={index}>
                            {
                                headerKey.map((key)=>
                                    <td key={key + index}>
                                        {item[key]}
                                    </td>
                                )
                            }
                        </tr>);
                    })
                }
            </tbody>
        </table>
    );
};

export default TableItem;
