import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DeleteButton = props => {
    const { id } = props;
    const history = useHistory();

    const onClickHandler = e => {
        axios.delete('/api/shelter/' + id)
            .then(response => {
                console.log(response);
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div id="button-detail-delete">
            <button onClick={onClickHandler}>delete</button>
        </div>
    )
}

export default DeleteButton;