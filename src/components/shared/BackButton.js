import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function BackButton() {
    const history = useHistory();

    return (
        <button
            onClick={() => history.goBack()}
            className="btn btn-link icon"
            style={{ marginRight: '10px' }}
        >
            <i className="fa fa-arrow-circle-o-left"></i>
        </button>
    )
}