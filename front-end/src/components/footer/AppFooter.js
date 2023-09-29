import React from "react";

import { CFooter, CLink } from "@coreui/react";

function AppFooter() {
    return (
        <CFooter>
            <div>
                <CLink href="https://coreui.io">Middleware Assignment 2</CLink>
                <span>&copy; 2023 UCSC</span>
            </div>
            <div>
                <span>Powered by </span>
                <CLink href="https://coreui.io">React & Spring boot & node Js</CLink>
            </div>
        </CFooter>
    );
}

export default AppFooter;
