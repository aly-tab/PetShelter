import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';
import DeleteAccount from '../components/DeleteAccount';


const Account = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [pets1, setPets1] = useState(null);
    const [pets2, setPets2] = useState(null);
    const [pets1length, setPets1length] = useState(null);
    const [pets2length, setPets2length] = useState(null);
    const { id } = useParams();
    const history = useHistory();
    const [change, setChange] = useState(false);

    useEffect(() => {
        axios.get("/api/users/loggedIn", {withCredentials:true})
            .then(res => {
                console.log(res.data);
                if (res.data._id !== id) {
                    history.push("/");     
                }
                setLoggedInUser(res.data);
            })
            .catch(err => {
                console.log(err);
                history.push("/");
            })
    }, [])

    useEffect(() => {
        axios.get(`/api/shelter/owner/limit/${id}`)
            .then((response) => {
                console.log("OWNED limit " + response.data.length);

                const res = [];

                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].poster_id !== response.data[i].owner_id) {
                        console.log(response.data[i]);
                        res.push(response.data[i])
                    }
                }
                
                const res1 = res.slice(0, 10);
                console.log("HOW MANY " + res1.length);
                setPets1(res1);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`/api/shelter/poster/limit/${id}`)
            .then((response) => {
                console.log(response.data);

                response.data.sort(function (a, b) {
                    return b.updatedAt - a.updatedAt;
                });
                setPets2(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [change])

    useEffect(() => {
        axios.get(`/api/shelter/owner/${id}`)
            .then((response) => {
                console.log("OWNED no limit " + response.data.length);

                const res = [];

                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].poster_id !== response.data[i].owner_id) {
                        console.log(response.data[i]);
                        res.push(response.data[i])
                    }
                }

                console.log("length 1 " + res.length);
                console.log(res);
                console.log("HOW MANY " + res.length);
                setPets1length(res.length);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        axios.get(`/api/shelter/poster/${id}`)
            .then((response) => {
                console.log(response.data);
                console.log("length 2 " + response.data.length);
                setPets2length(response.data.length);
            })
            .catch(err => {
                console.log(err);
            })
    }, [change])

    const removeFromDom = petId => {
        setPets2(pets2.filter(pet => pet._id !== petId))
        setChange(!change);
    }

    return (
        <div id="account">
            <div id="header">
                <div id="banner">
                    <h1>Pet Shelter</h1>
                </div>
                <div id="top-link">
                    <Link to="/" class="link">back to home</Link>
                </div>
            </div>
            {loggedInUser && pets1 && pets2 ?
            <div>
                <h1 id="hello">Hello {loggedInUser.username}</h1>
                <div id="account-page">
                    <div className="container">
                        <div>
                        <h2>Pets You Own</h2>
                        <div className="cont-1">
                            <table class="table" id="diff">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {pets1.map((pet1, index1) => {
                                    return (
                                        <tr key={index1}>
                                            {loggedInUser._id === pet1.owner_id  && pet1.poster_id !== pet1.owner_id?<td>{pet1.type}</td>: ""}
                                            {loggedInUser._id === pet1.owner_id  && pet1.poster_id !== pet1.owner_id?<td>{pet1.name}</td>: ""}
                                            {loggedInUser._id === pet1.owner_id  && pet1.poster_id !== pet1.owner_id?
                                            <td>
                                                <div id="flex-1">
                                                    <Link to={"/pets/" + pet1._id} className="link-tb">details </Link>
                                                </div>
                                            </td>:""}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            {pets1length > 10?
                            <Link to={"/pets/owned/" + id} className="link-tb">More</Link>: ""}
                        </div>
                        </div>
                    </div>
                    <div class="container">
                        <div>
                        <h2>Pets You Posted</h2>
                        <div className="cont-2">
                            <table class="table" id="diff">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {pets2.map((pet2, index2) => {
                                    return (
                                        <tr key={index2}>
                                            {loggedInUser._id === pet2.poster_id?<td>{pet2.type}</td>:""}
                                            {loggedInUser._id === pet2.poster_id?<td>{pet2.name}{pet2.owner_id !== pet2.poster_id? <span>(Adopted)</span>:""}</td>:""}
                                            {loggedInUser._id === pet2.poster_id?
                                            <td>
                                                <div id="flex-1">
                                                    <Link to={"/pets/" + pet2._id} class="link-tb">details </Link>{pet2.poster_id === pet2.owner_id? <span id="flex-1"><Link to={"/pets/" + pet2._id + "/edit"} class="link-tb"> edit </Link> <DeleteButton id={pet2._id} removeFromDom={removeFromDom} class="link-tb"/></span>:""}
                                                </div>
                                            </td>:""}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            {pets2length > 10?
                            <Link to={"/pets/posted/" + id} className="link-tb">More</Link>: ""}
                        </div>
                        </div>
                    </div>
                </div>
                <DeleteAccount id={loggedInUser._id}/>                
            </div>
            :
            <p>error</p>
            }         
        </div>
    )
}

export default Account;