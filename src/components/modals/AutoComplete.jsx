import React, { useContext, useState, useRef } from 'react';
import AppContext from '../../Context';
import css from './AutoComplete.module.css';
import { useNavigate } from 'react-router-dom';

function AutoComplete({ category, subCategory }) {
    const context = useContext(AppContext);
    const [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedSearchResult, setSelectedSearchResult] = useState()
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceTimeout = useRef(null);
    const navigate = useNavigate()
    const keyWord = {
        'tournament': 'tournament_name',
        'match': '',
        'team': 'team_name',
        'player': 'player_name'
    }
    function handleOnChange(e) {
        const inputValue = e.target.value;
        setSearchInput(inputValue)
        setIsTyping(inputValue.length > 0);
        setSelectedSearchResult()
        if (debounceTimeout.current) { clearTimeout(debounceTimeout.current); }
        setLoading(true);
        debounceTimeout.current = setTimeout(() => {
            if (inputValue.trim() === "") {
                setSearchResult([]);
                setLoading(false);
                return;
            }
            context
                .autocomplete(inputValue, category)
                .then((res) => {
                    setSearchResult(res);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 1000);
    }

    function handleOnClick(e) {
        if (category === 'tournament' && subCategory === 1) {
            navigate(`./view/${e._id}`)
        }
        else if (category === 'player' && subCategory === 1) {
            navigate(`./view/${e._id}`)
        }
        else if (category === 'player' && subCategory === 1) {
            navigate(`./view/${e._id}`)
        }
        else if (category === 'player' && subCategory === 2){
            navigate(`./view/${e._id}`)
        }
        setSearchInput(e[keyWord[category]])
        setSelectedSearchResult(e[keyWord[category]])
        setSearchResult()
    }

    return (
        <div className={css.auto_complete_container}>
            <div className={css.input_container}>
                <input
                    type="text"
                    className={css.form_input}
                    placeholder={`Search ${category}...`}
                    onChange={handleOnChange}
                    value={searchInput}
                />
            </div>
            {isTyping && (
                <div className={css.result_container}>
                    {loading ? (
                        <div className={css.load_container}>Loading...</div>
                    ) : (
                        <div className={css.data_container}>
                            {searchResult?.data?.length > 0 || selectedSearchResult
                                ? searchResult?.data?.map((item, index) => (
                                    <div
                                        onClick={() => handleOnClick(item)}
                                        key={index}
                                        className={css.result_item}
                                    >
                                        {item[keyWord[category]]}
                                    </div>
                                ))
                                :
                                <div className={css.result_not_found}>No results found</div>
                            }
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AutoComplete;
