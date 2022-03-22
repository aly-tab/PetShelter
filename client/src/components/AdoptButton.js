import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AdoptButton = props => {
    const { id } = props;
    const { name } = props
    const { owner_id } = props
    const history = useHistory();


    const onSubmitHandler = (e, owner_id) => {
        e.preventDefault();
        axios.put('/api/shelter/' + id, owner_id)
            .then(response => {
                console.log(response);
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <form id="adopt-form" onSubmit={e => onSubmitHandler(e, {owner_id})}>
            <input type="hidden" value={owner_id} name="owner_id"/>
            <input type="submit" value={"Adopt " + name} class="form-btn"/>
        </form>
    )
}

export default AdoptButton;