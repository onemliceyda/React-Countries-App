import React from 'react'; //Uygulamayı modüler hale getirmek için ayrıca bir component oluşturuyorum.

const Tables=(props)=>{
    return(
        <thead>
                            <tr>
                                <th className="w-25">Country</th>
                                <th className="w-25">Capital</th>
                                <th className="w-25">Region</th>
                                <th className="w-25">Flag</th>
                            </tr>
                            </thead>
    );
};
export default Tables;