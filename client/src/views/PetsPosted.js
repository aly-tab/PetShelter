import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Link, useParams } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';

const PetsPosted = () => {
    const [pets, setPets] = useState(null);
    const { id } = useParams();
    const [change, setChange] = useState(false);

    useEffect(() => {
        axios.get(`/api/shelter/poster/${id}`)
            .then((response) => {
                console.log(response.data);
                setPets(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [change])

    const removeFromDom = petId => {
        setPets(pets.filter(pet => pet._id !== petId))
        setChange(!change);
    }

    return (
        <div>
            <div id="header">
                <div id="banner">
                    <h1>Pet Shelter</h1>
                </div>
                <div id="top-link">
                    <Link to={"/account/" + id} class="link">back to account</Link>
                </div>
            </div>
            <div>
                <h1 id="acct">Pet You Own</h1>
                <div id="front-page">
                    <table class="table" id="table">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {pets? 
                        <tbody>
                        {pets.map((pet, index) => {
                            return (
                                <tr key={index}>
                                    <td>{pet.type}</td>
                                    <td>{pet.name} {pet.owner_id !== pet.poster_id? <span> (Adopted)</span>:""}</td>
                                    <td>
                                        <div id="flex-1">
                                            <Link to={"/pets/" + pet._id} className="link-tb">details</Link>{pet.poster_id === pet.owner_id?<span id="flex-1"><Link to={"/pets/" + pet._id + "/edit"} class="link-tb"> edit </Link> <DeleteButton id={pet._id} removeFromDom={removeFromDom} class="link-tb"/></span>: ""}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                        :""}
                    </table>
                </div>
            </div>
        </div>

    )
}

export default PetsPosted;