import React from "react";
import './errorIndicator.css'
const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <span> Sorry! Something went wrong</span>
            <span>(but we're working on it)</span>
        </div>
    )
}
export default ErrorIndicator;