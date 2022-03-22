import React, { useState, useEffect }from 'react';
import AdoptButton from '../components/AdoptButton';
import DetailDeleteButton from '../components/DetailDeleteButton';
import Detail from '../components/Detail';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import '../App.css';

const DetailView = () => {
    const { id } = useParams();
    const history = useHistory();
    const [ pet, setPet ] = useState({});
    const [loggedInUser, setLoggedInUser] = useState(null);

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
    
    useEffect(() => {
        axios.get('/api/shelter/' + id)
            .then(response => {
                console.log(response);
                if (response.data.name === "CastError") {
                    history.push("/");
                }
                setPet(response.data);
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
                    <Link to="/" class="link">back to home</Link>
                </div>
            </div>
            <div>
                <h3>Details about {pet.name}</h3>                       
            </div>
            <Detail pet={pet} poster_id={pet.poster_id} owner_id={pet.owner_id} />
            {loggedInUser && pet.poster_id === pet.owner_id && loggedInUser._id !== pet.poster_id?
                <AdoptButton id={pet._id} name={pet.name} owner_id={loggedInUser._id} />  
                : loggedInUser && pet.poster_id === pet.owner_id && loggedInUser._id === pet.poster_id?<DetailDeleteButton id={pet._id} class="link-tb"/>
                : ""
            }   
        </div>
    )
}

export default DetailView;