import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const [movies, setMovies] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const url = "http://localhost:8081/movies";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            setError("Liste çekerken hata meydana geldi: " + err);
            return;
        }

        if (response.status === 200) {
            setMovies(payload)
        } else {
            setError("HTTP Bağlantı problemi...")
        }
    }

    const deleteMovie = async (id) => {
        const url = "http://localhost:8081/movies/" + id;

        let response;
        try {
            response = await fetch(url, {method: "delete"});
        } catch (err) {
            setError("Delete hata ile karşılaştı" + err);
        }
        if (response.status !== 204) {
            setError("Delete hata ile karşılaştı, durum kodu:" + response.status);
        }
        await fetchMovies();
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    }

    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Director</th>
                <th>Year</th>
                <th>Edit</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {
                movies?.map(
                    m => <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.title}</td>
                        <td>{m.director}</td>
                        <td>{m.year}</td>
                        <td><Button onClick={() => navigate(m.id + '/edit')}>Edit</Button></td>
                        <td><Button variant="danger" onClick={() => deleteMovie(m.id)}>Remove</Button></td>
                    </tr>
                )
            }
            </tbody>
            <Button variant="success" onClick={() => navigate('/create')}>
                Create
            </Button>
        </Table>
    )
}