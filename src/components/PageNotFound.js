import React from "react";

const PageNotFound = () => (

    
    <div>
        <div className="App-logo-center">
            Whoopsie! Page not Found. Please select from available pages.
        </div>
        <div className="App-logo">
            {/* image should be in public folder */}
        <img alt="Oops..." src="/images/mypic.jpg" width={200} height={200} />
        </div>
        
    </div>
);


export default PageNotFound;