import React from 'react';
import { useSelector } from 'react-redux';

const ContentWrapper = ({children}) => {
    return(
    <div className="content-wrapper">{children}</div>
    )
}

export default ContentWrapper;