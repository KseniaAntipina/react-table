import './Table.css';
import {Comment} from "../../App";
import {useState} from "react";

const Table = ({data}: tableProps): JSX.Element => {

    const headers: { name: string, field: string, sortable: boolean }[] = [
        {name: "Id", field: "id", sortable: false},
        {name: "Post id", field: "postId", sortable: false},
        {name: "Name", field: "name", sortable: true},
        {name: "Email", field: "email", sortable: true},
        {name: "Comment", field: "body", sortable: false}
    ];
    const rows = [...data]

    const [activePage, setActivePage] = useState(1)
    const rowsPerPage = 50
    const count = rows.length
    const totalPages = Math.ceil(count / rowsPerPage)
    const currentRows = rows.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)

    return (
        <table>
            <thead>
            <tr>
                {
                    headers.map((item, index: number) => {
                        return (
                            <th key={index}>
                                {item.name}
                            </th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                 rows.map((row) => {
                     return (
                         <tr>
                             <td>{row.id}</td>
                             <td>{row.postId}</td>
                             <td>{row.name}</td>
                             <td>{row.email}</td>
                             <td>{row.body}</td>
                         </tr>
                     )
                 })
            }
            </tbody>
        </table>
    )
}

export default Table;

interface tableProps {
    data: Comment[]
}