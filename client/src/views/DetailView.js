import React, { useState, useEffect }from 'react';
import DeleteButton from '../components/DeleteButton';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';

const DetailView = () => {
    const { id } = useParams();
    const history = useHistory();
    const [ pet, setPet ] = useState({});
    
    useEffect(() => {
        axios.get('/api/exam/' + id)
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
                <DeleteButton id={pet._id} name={pet.name}/>          
            </div>
            <div id="pet-info">
                <p>Pet type: {pet.type}</p>           
                <p>Description: {pet.description}</p>
                <p>Skills:</p>
                { pet.skill1 === ""?
                    <p>Nothing</p>:
                    <p>{pet.skill1}</p>
                }
                { pet.skill2 === ""?
                    <p>Nothing</p>:
                    <p>{pet.skill2}</p>
                }
                { pet.skill3 === ""?
                    <p>Nothing</p>:
                    <p>{pet.skill3}</p>
                }
            </div>
        </div>
    )
}

export default DetailView;