import React from 'react';

export default function Table({countries}){
    const columns=countries[0]&&Object.keys(countries[0]);
    return <table cellPadding={0} cellSpacing={0}>
        <thead>
    <tr>{countries[0]&& columns.map((heading)=><th>{heading}</th>)}</tr>
        </thead>
        <tbody>
    {countries.map(row=><tr>
        {
            columns.map(column=> <td>{row[column]}</td>)
        }
    </tr>)}
        </tbody>
    </table>
}
//  <Tables countries={countries}/> burasını app.js içine koymaya çalıştım