import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.com/v2/all ')
            .then(response => setCountries(response.data))
            .catch(error => console.log({ error })) //olası hatayı yakalamak için kullanılır
    }, [])


    return (
        <div className="App">
            <h1>React Countries App</h1>
            {countries.map(country => {
                return <div key={country.name}>
                    <h2>{country.name}</h2>
                    <h3>{country.capital}</h3>
                    <h4>{country.region}</h4>
                    <p><img src={country.flag} alt={country.name}
                        style={{ width: "100px" }} /></p>
                </div>
            })}
        </div>
    )
}