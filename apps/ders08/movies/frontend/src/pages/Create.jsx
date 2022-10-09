import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Create = () => {
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        year: ""
    });
    const [error, setError] = useState();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const url = "http://localhost:8081/movies";
        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });
        } catch (err) {
            setError(err);
        }

        if (response.status === 201) {
            navigate('/');
        } else {
            setError("Hata...");
        }
    };

    return (
        <>
            {error && <div>{error}</div>}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formGroupTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={movie.title}
                                  onChange={(e) => setMovie(prevState => ({
                                      ...prevState,
                                      title: e.target.value
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupDirector">
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" placeholder="Enter director" value={movie.director}
                                  onChange={(e) => setMovie(prevState => ({
                                      ...prevState,
                                      director: e.target.value
                                  }))}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" placeholder="Enter year" value={movie.year}
                                  onChange={(e) => setMovie(prevState => ({
                                      ...prevState,
                                      year: e.target.value
                                  }))}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="danger" onClick={() => navigate('/')}>
                    Go back
                </Button>
            </Form>
        </>
    )
}