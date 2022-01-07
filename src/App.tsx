import './App.css';
import Table from "./components/Table/Table";
import {useEffect, useState} from "react";

function App() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState<Comment[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then((response) => response.json())
            .then((result) => {
                    setIsLoaded(true);
                    setData(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    }, [])

    if (error) {
        return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="app">
                <div className="container">
                    <h1>Table comments</h1>
                    <Table data={data}/>
                </div>
            </div>
        );
    }
}

export default App;

export interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
}

