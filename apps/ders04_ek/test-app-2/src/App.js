import {MyProgressBar} from "./components/MyProgressBar";
import {Alert} from "react-bootstrap";
import {useState} from "react";

function App() {
    const [totalCount, setTotalCount] = useState(0);
    return (
        <div className="App">
            <Alert variant="success">
                Total count: {totalCount}!
            </Alert>
            <MyProgressBar changeCount={setTotalCount} variant="info"/>
            <MyProgressBar changeCount={setTotalCount} variant="warning"/>
            <MyProgressBar changeCount={setTotalCount} variant="danger"/>
            <MyProgressBar changeCount={setTotalCount} variant="dark"/>
            <MyProgressBar changeCount={setTotalCount} variant="light"/>
        </div>
    );
}

export default App;
