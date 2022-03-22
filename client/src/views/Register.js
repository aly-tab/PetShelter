import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [formInfo, setFormInfo] = useState({
        username:"",
        email:"",
        phonenumber:"",
        password:"",
        confirm:"",
    })
    const history = useHistory();

    const [errMsg, setErrMsg] = useState("");

    const changehandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault();
        axios.post("/api/register", formInfo, {withCredentials:true})
            .then(res => {
                console.log(res.data);
                if (res.data.index == 0) {
                    setErrMsg("One or more fields is invalid");
                } else {
                    history.push("/");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1>Register below</h1>
            <form onSubmit={register}>
                {errMsg?<p className="text-danger">{errMsg}</p>:""}
                <div className="form-group">
                    <p>Username</p>
                    <input type="text" className="form-control" name="username" onChange={changehandler}/>
                    {/*{errors.username? <p className="text-danger">{errors.username.message}</p>:""}*/}
                </div>
                <div className="form-group">
                    <p>Email</p>
                    <input type="email" className="form-control" name="email" onChange={changehandler}/>
                    {/*{errors.email? <p className="text-danger">{errors.email.message}</p>:""}*/}
                </div>
                <div className="form-group">
                    <p>Phone Number</p>
                    <input type="tel" className="form-control" name="phonenumber" placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12"  title="Ten digits code" required onChange={changehandler}/>
                    {/*{errors.phonenumber? <p className="text-danger">{errors.phonenumber.message}</p>:""}*/}
                </div>
                <div className="form-group">
                    <p>Password</p>
                    <input type="password" className="form-control" name="password" onChange={changehandler}/>
                    {/*{errors.password? <p className="text-danger">{errors.password.message}</p>:""}*/}
                </div>
                <div className="form-group">
                    <p>Confirm Password</p>
                    <input type="password" className="form-control" name="confirmPassword" onChange={changehandler}/>
                    {/*{errors.confirmPassword? <p className="text-danger">{errors.confirmPassword.message}</p>:""}*/}
                </div>
                <div id="logreg">
                    <input type="submit" value="sign up" className="btn-btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default Register;