import React, { useState, useEffect } from 'react';
import EditForm from '../components/EditForm';
import axios from 'axios';
import '../App.css';
import { Link, useHistory, useParams } from 'react-router-dom';


const EditView = () => {
    const { id } = useParams();
    const history = useHistory();
    const [pet, setPet] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedIn", {withCredentials:true})
            .then(res => {
                console.log(res.data);
                setLoggedInUser(res.data);
            })
            .catch(err => {
                console.log(err);
                if (loggedInUser === null) {
                    history.push("/"); 
                }
            })
    }, [])

    useEffect(() => {
        axios.get('/api/shelter/' + id)
            .then(response => {
                console.log(response);
                if (response.data.name === "CastError") {
                    history.push("/");
                } else if (response.data.poster_id !== response.data.owner_id) {
                    history.push("/"); 
                } else if (loggedInUser._id !== response.data.poster_id) {
                    history.push("/"); 
                }
                setPet(response.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    const onSubmitHandler = (e, data) => {
        e.preventDefault();
        axios.put('/api/shelter/' + id, data)
            .then(response => {
                console.log(response);
                history.push("/");
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors; 
                const errorArr = []; 
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }

                setErrors(errorArr);
            })
    }

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
            <h3>Edit {pet.name}</h3>
            {errors.map((err, index) => <p key={index}>{err}</p>)}

            {loaded &&
                <EditForm 
                    onSubmitHandler={onSubmitHandler}
                    initialName={pet.name}
                    initialType={pet.type}
                    initialDescription={pet.description}
                    initialSkill1={pet.skill1}
                    initialSkill2={pet.skill2}
                    initialSkill3={pet.skill3}
                />
            }
        </div>
    )
}

export default EditView;