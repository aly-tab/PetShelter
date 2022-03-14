import axios from 'axios';
import React , { useState } from 'react';
import AddForm from '../components/AddForm';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';

const CreateView = () => {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const onSubmitHandler = (e, data) => {
        e.preventDefault();
        axios.post('/api/exam', data)
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
            <AddForm 
                onSubmitHandler={onSubmitHandler}
                initialName=""
                initialType=""
                initialDescription=""
                initialSkill1=""
                initialSkill2=""
                initialSkill3=""
            />
        </div>
    )
}

export default CreateView;