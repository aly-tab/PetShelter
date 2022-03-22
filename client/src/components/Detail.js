import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Detail = props => {
    const { pet, poster_id, owner_id } = props;
    const [poster, setPoster] = useState({});
    const [owner, setOwner] = useState({});

    useEffect(() => {
        const id = poster_id;
        axios.get("/api/user/" + id)
            .then(res => {
                console.log(res);
                setPoster(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [poster_id])

    useEffect(() => {
        const id = owner_id;
        axios.get("/api/user/" + id)
            .then(res => {
                console.log(res);
                setOwner(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [owner_id])

    return (
        <div>
            <div id="pet-info">
                {pet.image !== "" ?
                <img src={pet.image} alt={pet.name} />
                : ""
                }
                <p class="bold">Pet type:</p>
                <p>{pet.type}</p>           
                <p class="bold">Description:</p>
                <p>{pet.description}</p>
                <p class="bold">Skills:</p>
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
                <p class="bold">Poster's Phone Number:</p>
                <p>{poster.phonenumber}</p>
                {poster._id !== owner._id? 
                <div>
                    <p class="bold">Owner's Phone Number:</p>
                    <p>{owner.phonenumber}</p> 
                </div>
                : ""
                }
            </div>
        </div>
    )
}

export default Detail;