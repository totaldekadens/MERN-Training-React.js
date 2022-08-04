import React from 'react';
import { useState } from "react";
import validateForm from "./ValidateForm";

const PlayerForm = () => {

    const defaultPlayer = {
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    }

    const [newPlayer, setNewPlayer] = useState(defaultPlayer)
    const [errors, setErrors] = useState(defaultPlayer)
    
    const submitPlayer = async (event) => {
        
        try {
            event.preventDefault();

            const checkError = validateForm(newPlayer);
            
            if(Object.keys(checkError).length > 0) {
                setErrors(checkError)
                return
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPlayer)
            };

            let response = await fetch('http://localhost:4000/players', requestOptions)

            let result = await response.json();

            if(result) {
                alert("Player added to the list" ); // Module will be added later
                setNewPlayer(defaultPlayer);

            } else {
                alert("Player NOT added to the list"); // Module will be added later
            }

        }catch(err) {
            console.error(err);
        }
    }

    return ( 
        <div className="row">
            <h1 className='center'>Add a new player</h1>
            <form className="col s12" onSubmit={submitPlayer}>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="firstName" onChange={(event) => {setNewPlayer(currentState => ({ ...currentState, firstName: event.target.value}))}} value={newPlayer.firstName} type="text" required />
                        <label htmlFor="firstName">* First Name</label><p>{errors.firstName ? errors.firstName : ""}</p>
                    </div>
                    <div className="input-field col s6">
                        <input id="lastName" onChange={(event) => {setNewPlayer(currentState => ({ ...currentState, lastName: event.target.value}))}} value={newPlayer.lastName} type="text" required />
                        <label htmlFor="lastName">* Last Name</label><p>{errors.lastName ? errors.lastName : ""}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="phone" onChange={(event) => {setNewPlayer(currentState => ({ ...currentState, phone: event.target.value}))}} value={newPlayer.phone}  type="number" />
                        <label htmlFor="phone">Phone</label><p>{errors.phone ? errors.phone : ""}</p>
                    </div>
                    <div className="input-field col s6">
                        <input id="email" onChange={(event) => {setNewPlayer(currentState => ({ ...currentState, email: event.target.value}))}} value={newPlayer.email}  type="email" />
                        <label htmlFor="email">Email</label><p>{errors.email ? errors.email : ""}</p>
                    </div>
                </div>
                <button className='btn waves-effect waves-light' type='submit' name='action'>Add player</button>
            </form>
        </div>      
    );
}

export default PlayerForm;