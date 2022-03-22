import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    const { username } = props;
    return (
        <div>
        {username? <div><Link to="/api/users/logout">Logout</Link></div> :
        <div><Link to="/register" class="link-tb">Register</Link> <Link to="/login" class="link-tb">Login</Link></div> }
        </div>
    )
}

export default Nav;