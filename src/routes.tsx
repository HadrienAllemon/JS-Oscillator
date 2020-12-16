import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import IntroPage from "./pages/IntroPage";



function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products/1">First Product</Link>
                        </li>
                        <li>
                            <Link to="/products/2">Second Product</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/" exact component={IntroPage} />
                {/* <Route path="/products/:id" component={Product} /> */}
            </div>
        </Router>
    );
}

export default AppRouter;
