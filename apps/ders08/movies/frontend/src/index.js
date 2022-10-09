import React from 'react';
import ReactDOM from 'react-dom/client';
import './assests/index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Create} from "./pages/Create";
import {Edit} from "./pages/Edit";
import {Col, Container, Row, ThemeProvider} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <Container>
                <Row className="justify-content-md-center">

                    <Col md="auto">
                        <BrowserRouter>
                            <Routes>
                                <Route exact path="/" element={<Home/>}/>
                                <Route exact path="/create" element={<Create/>}/>
                                <Route exact path="/:id/edit" element={<Edit/>}/>
                            </Routes>
                        </BrowserRouter>
                    </Col>
                </Row>
            </Container>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
