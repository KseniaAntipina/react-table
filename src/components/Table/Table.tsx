import './table.css';
import {Comment} from "../../App";
import {useState} from "react";
import Pagination from "../Pagination/Pagination";

const Table = ({data}: tableProps): JSX.Element => {

    const headers: { name: string, field: string, sortable: boolean }[] = [
        {name: "Id", field: "id", sortable: false},
        {name: "Name", field: "name", sortable: true},
        {name: "Email", field: "email", sortable: true},
        {name: "Comment", field: "body", sortable: false}
    ];
    const rows = [...data];

    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage: number = 10; // количество строк на страницу
    const count: number = rows.length; // количество строк во всей таблице
    const totalPages: number = Math.ceil(count / rowsPerPage);  // количество страниц
    const currentRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);// текущие строки для отображения

    return (
        <>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
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
                    currentRows.map((row: Comment, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.body}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </>
    )
}

export default Table;

interface tableProps {
    data: Comment[]
}