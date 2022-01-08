import './table.css';
import {Comment} from "../../App";
import {useMemo, useState} from "react";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";

const Table = ({data}: tableProps): JSX.Element => {

    const rows = useMemo(() => {return [...data]}, [data])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [totalRows, setTotalRows] = useState<number>(rows.length);


    const headers: { name: string, field: string, sortable: boolean }[] = [
        {name: "Id", field: "id", sortable: false},
        {name: "Name", field: "name", sortable: true},
        {name: "Email", field: "email", sortable: true},
        {name: "Comment", field: "body", sortable: false}
    ];


    const rowsPerPage: number = 10; // количество строк на страницу
    const totalPages: number = Math.ceil(totalRows / rowsPerPage);  // количество страниц

    const currentData = useMemo(() => {

        let currentRows = [...rows];

        if(query) {
            currentRows = currentRows.filter(
                (row:Comment) =>
                    row.name.toLowerCase().includes(query.toLowerCase()) ||
                    row.email.toLowerCase().includes(query.toLowerCase())
            )
        }

        setTotalRows(currentRows.length);

        return currentRows.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        ); // текущие строки для отображения
    }, [rows, currentPage, query]);


    return (
        <>

            <SearchBar
                query={query}
                onInputChange={((value:string) => {
                    setQuery(value);
                    setCurrentPage(1);
                })}
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
                    currentData.map((row: Comment, index: number) => {
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
            {
                totalRows > 0 ?
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                    : <div>Not found :(</div>
            }
        </>
    )
}

export default Table;

interface tableProps {
    data: Comment[]
}