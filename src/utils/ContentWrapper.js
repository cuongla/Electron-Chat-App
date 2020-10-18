import React from 'react';
import { useSelector } from 'react-redux';

const ContentWrapper = ({children}) => {
    const isDarkTheme  = useSelector(({settings}) => settings.isDarkTheme);
    return (
      <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>
    )
  }

export default ContentWrapper;