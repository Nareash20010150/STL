import React from "react";
import {Routes , Route} from "react-router-dom";
import BillPayment from "./BillPayment";
import Payment from "./Payment";
import PaymentHistory from "./paymnetHistory";
import CheckoutForm from "./CheckoutForm";
import Bills from "./Bills";

import "./App.css";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<BillPayment />} />
                <Route path="/Payment" element = {<Payment/>}/>
                <Route path="/paymnetHistory" element = {<PaymentHistory/>}/>
                <Route path="/CheckoutForm" element = {<CheckoutForm/>}/>
                <Route path="/Bills" element = {<Bills/>}/>

            </Routes>
        </div>
    );
};

export default App;






