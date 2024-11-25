import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context';
import css from './AutoComplete.module.css';

function AutoComplete({ clickSearch,category }) {
    const context=useContext(AppContext)
    const [searchResult,setSearchResult]=useState([])
    // const [loading,setLoading]=useState(false)    

    function handelOnChange(e) {
        context.autocomplete(e.target.value,category)
        .then((res)=>{setSearchResult(res)})
    }
    
    useEffect(()=>{
        console.log(searchResult);
    },[searchResult])

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    className={css.form_input}
                    placeholder="Search..."
                    onChange={handelOnChange}
                />
                <button className={css.search_btn} onClick={clickSearch}>Search</button>
            </div>
            <div className="load-container">Loading...</div>
        </div>
    );
}

export default AutoComplete;
