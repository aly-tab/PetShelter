import axios from 'axios';
import React , { useState, useEffect } from 'react';
import '../App.css';
import AddForm from '../components/AddForm';
import { Link, useHistory } from 'react-router-dom';

const CreateView = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("/api/users/loggedIn", {withCredentials:true})
            .then(res => {
                console.log(res.data);
                setLoggedInUser(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const onSubmitHandler = (e, data) => {
        e.preventDefault();
        console.log("poster id " + data.poster_id);
        axios.post('/api/shelter', data)
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
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            {loaded &&
            <AddForm 
                onSubmitHandler={onSubmitHandler}
                initialImage=""
                initialName=""
                initialType=""
                initialDescription=""
                initialSkill1=""
                initialSkill2=""
                initialSkill3=""
                poster_id={loggedInUser._id}
                owner_id={loggedInUser._id}
            />
        }
        </div>
    )
}

export default CreateView;