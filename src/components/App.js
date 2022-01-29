import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import ReactLoading from 'react-loading';
import Tables from './Tables';

export default function App() {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const[filteredGeneral,setFilteredGeneral]=useState('');
    const[dataSource,setDataSource]=useState(countries);
    const[tableFilter,setTableFilter]=([]);
    useEffect(() => {
        axios
            .get('https://restcountries.com/v2/all ')
            .then(response => {
                if (response.status == 200) { //eğer başarılı dönerse (status 200)
                    setCountries(response.data)
                    setFilteredCountries(response.data)
                    setLoaded(false);
                    setFilteredGeneral(response.data)
                    setTableFilter(response.data)
                }
            })
            .catch(error => console.log({error})) //olası hatayı yakalamak için kullanılır
    }, [])

    const filteredCapitalizeSetter = (searchTerm) => {
        //bazı ülkelerin capital verisi yok ondan => capital?
        setFilteredCountries(countries.filter(country => country.capital?.toLocaleLowerCase('tr').includes(searchTerm.toLocaleLowerCase('tr'))))
    }
    const filteredData=(e)=>{
        if(e.target.value!=""){
            setFilteredGeneral(e.target.value);
            const filterTable=dataSource.filter(o=>Object.keys(o).some(k=>
                String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
                setTableFilter([...filterTable])
    }else{
        setFilteredGeneral(e.target.value);
        setDataSource([...dataSource]);
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
                               onChange={e=>setFilteredGeneral(e.target.value)}/>
                    </div>
                </div>

                {loaded ?
                    (
                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <ReactLoading type="spin" color="#BC409D" height={400} width={140}/>
                        </div>
                    )
                    :
                    (
                        // tablo yapısı
                        <Table striped responsive="sm" bordered hover className="text-center">
                            <thead>
                            <tr>
                                <th className="w-25">Country</th>
                                <th className="w-25">Capital</th>
                                <th className="w-25">Region</th>
                                <th className="w-25">Flag</th>
                            </tr>
                            </thead>
                            <tbody className="shadow shadow-lg">
                            {filteredCountries.map(country => (
                                <tr key={country.numericCode}>
                                    <td>{country.name}</td>
                                    <td>{country.capital}</td>
                                    <td>{country.region}</td>
                                    <td><img src={country.flag} alt={country.name}
                                             style={{width: "60px", height: "40px"}}
                                             className='rounded mx-auto d-block'/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}


            </div>


        </div>
        

    )
}

