import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
export default function App() {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    useEffect(() => {
        axios
            .get('https://restcountries.com/v2/all ')
            .then(response => setCountries(response.data))
            .catch(error => console.log({ error })) //olası hatayı yakalamak için kullanılır
    }, [])

    useEffect(() => {
        const tempArray = []
        countries.map(country => {
             if(country.capital.toLowerCase().includes(search.toLowerCase()))
            {
                 tempArray.push(country)
             }
        })
        setFilteredCountries(tempArray) 
    }, [search]) 



    return (
        <div className="App">
            <h1>React Countries App</h1>
            <input type="text" className="form-control" placeholder="Search" onChange={e => setSearch(e.target.value)} />


            {filteredCountries.map(country => {
                return <div key={country.numericCode}>

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Capital</th>
                                <th>Region</th>
                                <th>Flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{country.name}</td>
                                <td>{country.capital}</td>
                                <td>{country.region}</td>
                                <td><img src={country.flag} alt={country.name}
                                    style={{ width: "70px" }} className='rounded mx-auto d-block' /></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            })}

        </div>
    )
}