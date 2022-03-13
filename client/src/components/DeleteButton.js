import axios from 'axios';
import React from 'react';
import { useHistory} from 'react-router-dom';

const DeleteButton = props => {
    const { id } = props;
    const { name } = props
    const history = useHistory();

    const onClickHandler = e => {
        axios.delete('/api/exam/' + id)
            .then(response => {
                console.log(response);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div id="button">
            <button onClick={onClickHandler}>Adopt {name}</button>
        </div>
    )
}

export default DeleteButton;