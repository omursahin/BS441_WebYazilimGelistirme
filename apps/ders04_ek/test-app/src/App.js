import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Badge, Button, Col, Container, ProgressBar, Row} from "react-bootstrap";
import {useState} from "react";
import {MyProgress} from "./components/MyProgress";

function App() {
    const [total, setTotal] = useState(0);
    return (
        <div className="App">
            <Alert variant="success">
                Total count: {total}!
            </Alert>
            <MyProgress variant="success" increaseFunc={setTotal}/>
            <MyProgress variant="warning" increaseFunc={setTotal}/>
            <MyProgress variant="danger" increaseFunc={setTotal}/>
        </div>
    );
}

export default App;
