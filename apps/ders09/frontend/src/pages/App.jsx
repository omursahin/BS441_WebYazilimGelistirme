import '../assets/App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route, Link} from "react-router-dom";
import {NotFound} from "./NotFound";
import {Home} from "./Home";
import Match from "./Match";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="match" element={<Match/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
