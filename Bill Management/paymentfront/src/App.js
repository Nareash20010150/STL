import React from "react";
import {Routes , Route} from "react-router-dom";
import BillPayment from "./BillPayment";
import Payment from "./Payment";

import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/billPayment" element={<BillPayment />} />
                <Route path="/Payment" element = {<Payment/>}/>
            </Routes>
        </div>
    );
};

export default App;






