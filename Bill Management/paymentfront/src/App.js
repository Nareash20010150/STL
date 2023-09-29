import React from "react";
import {Routes , Route} from "react-router-dom";
import BillPayment from "./BillPayment";
import Bill from "./Bills";

import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/billPayment" element={<BillPayment />} />
                <Route path="/bills" element={<Bill />} />
            </Routes>
        </div>
    );
};

export default App;






