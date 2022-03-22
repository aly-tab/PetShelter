import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Link, useParams } from 'react-router-dom';

const PetsOwned = () => {
    const [pets, setPets] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/shelter/owner/${id}`)
            .then((response) => {
                console.log(response.data);

                const res = [];

                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].poster_id !== response.data[i].owner_id) {
                        console.log(response.data[i]);
                        res.push(response.data[i]);
                    }
                }
                console.log("RES" + res);
                setPets(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


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
                                    <td>{pet.name}</td>
                                    <td>
                                        <div id="flex-1">
                                            <Link to={"/pets/" + pet._id} className="link-tb">details</Link> 
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

export default PetsOwned;