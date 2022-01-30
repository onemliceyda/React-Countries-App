import React from 'react';
import Table from "react-bootstrap/Table";

const TableComponent = ({filteredCountries}) => {
    return (
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
    );
};

export default TableComponent;
