import React from "react";

const NotFound = props => {
    return (
        <div className="d-flex justify-content-center align-items-center" id="page-404">
            <h1 className="ml-3 pl-3 align-top border-left inline-block align-content-center">404</h1>
            <div className="inline-block align-middle">
                <h2 className="font-weight-normal lead">لم يتم العثور على الصفحة المطلوبة</h2>
            </div>
        </div>
    );
};

export default NotFound;
