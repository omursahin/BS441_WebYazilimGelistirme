import '../assets/App.css';
import Match from "../components/match";
import {BrowserRouter} from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import {NotFound} from "./NotFound";
import {Home} from "./Home";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="match" element={<Match />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
