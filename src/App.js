import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import TableComponent from "./components/TableComponent";

export default function App() {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        axios
            .get('https://restcountries.com/v2/all ')
            .then(response => {
                if (response.status == 200) { //eğer başarılı dönerse (status 200)
                    setCountries(response.data)
                    setFilteredCountries(response.data)
                    setLoaded(false);


                }
            })
            .catch(error => console.log({error})) //olası hatayı yakalamak için kullanılır
    }, [])

    const filteredCapitalizeSetter = (searchTerm) => {
        //bazı ülkelerin capital verisi yok ondan => capital?
        setFilteredCountries(countries.filter(country => country.capital?.toLocaleLowerCase('tr').includes(searchTerm.toLocaleLowerCase('tr'))))
    }

    const filteredGeneralSetter = (value) => {
        setSearch(value);
        const lowercasedValue = value.toLocaleLowerCase('tr').trim();
        if (lowercasedValue === "") setCountries(countries);
        else {
            const filteredData = countries.filter(item => {
                return Object.keys(item).some(key =>
                    item[key].toString().toLocaleLowerCase('tr').includes(lowercasedValue)
                );
            });
            setFilteredCountries(filteredData);
        }
    }

    return (

        <div className="App">
            <h1 className="text-center my-4">
                <u> React <span className="text-primary">Countries</span> <span className="text-danger">App</span></u>
            </h1>
            <div className="container my-2">
                <div className="row my-4">
                    <div className="col">
                        {/* burası capitale göre arar */}
                        <input type="text" className="form-control shadow border-2 py-3"
                               placeholder="Capital Search...  "
                               onChange={e => filteredCapitalizeSetter(e.target.value)}/>
                    </div>
                    <div className="col">
                        {/* burası generale göre arar */}
                        <input type="text" className="form-control shadow border-2 py-3" placeholder="General Search..."
                               onChange={e => filteredGeneralSetter(e.target.value)/*e =>arama(e.target.value)*/}/>
                    </div>
                </div>

                {loaded ?
                    //yükleniyorsa yüklenme efekti gösterilsin
                    (
                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <ReactLoading type="spin" color="#BC409D" height={400} width={140}/>
                        </div>
                    )
                    //yüklendiğinde tablo gösterilsin
                    :
                    (
                        <TableComponent filteredCountries={filteredCountries}/>
                    )}
            </div>
        </div>


    )
}
