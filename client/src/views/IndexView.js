import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

const IndexView = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get('/api/exam')
            .then((response) => {
                console.log(response);

                response.data.sort(function (a, b) {
                    return a.type.toLowerCase().localeCompare(b.type.toLowerCase()) || a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });

                setPets(response.data);
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
                    <Link to="/pets/new" class="link">add a pet to the shelter</Link>
                </div>
            </div>
            <p id="top-desc">These pets are looking for a good home</p>
            <div id="front-page">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {pets.map((pet, index) => {
                    return (
                        <tr key={index}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td><Link to={"/pets/" + pet._id} class="link-tb">details</Link> <Link to={"/pets/" + pet._id + "/edit"} class="link-tb">edit</Link></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default IndexView;