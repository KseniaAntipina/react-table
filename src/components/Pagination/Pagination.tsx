import './pagination.css';
import {useMemo, useState} from "react";

const Pagination = ({currentPage, totalPages, setCurrentPage}: paginationProps) => {

    const [portionNumber, setPortionNumber] = useState(1);

    let portionSize = 10 // количество отображаемой нумерации страниц
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // крайняя левая цифра в отображаемой нумерации
    let rightPortionPageNumber = portionNumber * portionSize; // крайняя правая цифра в отображаемой нумерации
    let portionCount = Math.ceil(totalPages / portionSize); // текущая "порция" нумерации

    const paginationNumbers = useMemo(() => {
        let numeration = [];
        for (let i = 1; i <= totalPages; i++) {
            numeration.push(i);
        }
        return numeration
            .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span
                    className={currentPage === p ? 'selectedPage' : 'pageNumber'}
                    key={p}
                    onClick={(e) => {
                        setCurrentPage(p);
                    }}>{p}</span>
            })
    }, [currentPage, totalPages])

    const goToNextPage = () => {
        setCurrentPage(currentPage+1)
        if (rightPortionPageNumber === currentPage) {
            setPortionNumber(portionNumber + 1)
        }
    }

    const goToPrevPage = () => {
        setCurrentPage(currentPage-1)
        if (leftPortionPageNumber === currentPage) {
            setPortionNumber(portionNumber - 1)
        }
    }


    return (
        <>
            <div className="pagination">


                <>
                    <button className="btnDefault" disabled={currentPage === 1} onClick={() => {
                        setCurrentPage(1)
                        setPortionNumber(1)

                    }}>
                        « First
                    </button>

                        <button className="btnDefault" disabled={currentPage === 1} onClick={goToPrevPage}>
                            ‹ Previous
                        </button>

                </>

                <div>
                    {paginationNumbers}
                </div>

                        <>
                            <button className="btnDefault" disabled={currentPage === totalPages} onClick={goToNextPage}>
                                Next ›
                            </button>
                            <button className="btnDefault" disabled={currentPage === totalPages} onClick={() => {
                                setCurrentPage(totalPages)
                                setPortionNumber(portionCount)
                            }}>
                                Last »
                            </button>
                        </>

            </div>
            <p>
                Page {currentPage} of {totalPages}
            </p>
        </>
    )
}

export default Pagination;

interface paginationProps {
    currentPage: number,
    totalPages: number,
    setCurrentPage: Function
}