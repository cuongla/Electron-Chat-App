import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function BackButton() {
    const history = useHistory();

    return (
        <Link
            to=""
            onClick={() => history.goBack()}
            className="icon"
            style={{ marginRight: '10px' }}
        >
            <i className="fa fa-arrow-circle-o-left"></i>
        </Link>
    )
}