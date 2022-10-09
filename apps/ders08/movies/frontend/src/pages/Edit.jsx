import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";

export const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetchMovie();
    }, []);

    const fetchMovie = async () => {
        const url = "http://localhost:8081/movies/" + id;

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
            setMovie(payload);
        } else {
            setError("HTTP Bağlantı problemi...")
        }
    }

    if(!movie){
        return <div>
            Loading...
        </div>
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const url = "http://localhost:8081/movies/"+id;
        let response;

        try{
            response = await fetch(url,{
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });
        }catch (err){
            setError(err);
        }

        if(response.status === 204){
            navigate('/');
        } else{
            setError("Hata...");
        }
    };

    return (
        <>
            {error && <div>{error}</div>}
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={movie.title} onChange={(e)=>setMovie(prevState => ({
                    ...prevState,
                    title: e.target.value
                }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDirector">
                <Form.Label>Director</Form.Label>
                <Form.Control type="text" placeholder="Enter director" value={movie.director} onChange={(e)=>setMovie(prevState => ({
                    ...prevState,
                    director: e.target.value
                }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupYear">
                <Form.Label>Year</Form.Label>
                <Form.Control type="number" placeholder="Enter year" value={movie.year} onChange={(e)=>setMovie(prevState => ({
                    ...prevState,
                    year: e.target.value
                }))} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="danger" onClick={()=>navigate('/')}>
                Go back
            </Button>
        </Form>
        </>
    )
}