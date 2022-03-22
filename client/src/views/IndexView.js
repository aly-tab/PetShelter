import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Link, useHistory } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';

const IndexView = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [pets, setPets] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get("/api/users/loggedIn", {withCredentials:true})
            .then(res => {
                console.log(res.data);
                setLoggedInUser(res.data);
            })
            .catch(err => {
                console.log(err);;
            })
    }, [])

    const logout = (e) => {
        axios.get("/api/users/logout", {withCredentials:true})
            .then(res => {
                console.log(res);
                setLoggedInUser(null);
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get('/api/shelter')
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

    const removeFromDom = petId => {
        setPets(pets.filter(pet => pet._id !== petId))
    }

    return (
        <div>
            <div id="header">
                <div id="banner">
                    <h1>Pet Shelter</h1>
                </div>
                {loggedInUser? 
                    <div>
                        <div id="nav">
                            <Link to={"/account/" + loggedInUser._id} class="link">Account</Link>
                            <button className="link link-btn" onClick={logout}>Log Out</button> 
                        </div> 
                        <div id="loggedin-link">
                            <Link to="/pets/new" class="link">add a pet to the shelter</Link>
                        </div>
                    </div> :
                    <div id="nav">
                        <Link to="/register" class="link">Register</Link> <Link to="/login" class="link">Login</Link>
                    </div> 
                }
            </div>
            <div>
                <p id="top-desc">These pets are looking for a good home</p>
                <div id="front-page">
                    <table class="table" id="table">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {pets.map((pet, index) => {
                            return (
                                <tr key={index}>
                                    {pet.poster_id === pet.owner_id?<td>{pet.type}</td>:""}
                                    {pet.poster_id === pet.owner_id?<td>{pet.name}</td>:""}
                                    {pet.poster_id === pet.owner_id?
                                    <td>
                                        <div id="flex-1">
                                            <Link to={"/pets/" + pet._id} class="link-tb">details </Link> 
                                            {loggedInUser && loggedInUser._id === pet.poster_id? 
                                            <span id="flex-2">
                                                <Link to={"/pets/" + pet._id + "/edit"} class="link-tb"> edit </Link> <DeleteButton id={pet._id} removeFromDom={removeFromDom} class="link-tb"/>
                                            </span>
                                            :""}
                                        </div>
                                    </td>:""}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default IndexView;