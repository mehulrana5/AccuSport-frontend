import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppContext from '../Context';
import AutoComplete from '../components/modals/AutoComplete'

function MatchesPage() {
    const context = useContext(AppContext)
    const [isPlayer, setIsPlayer] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (context.userInfo.roles.includes("player")) setIsPlayer(true);
        else setIsPlayer(false);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-1">
            <AutoComplete category={'match'} />
            <div>
                <button className='blue-btn' onClick={() => navigate(isPlayer ? './myMatches' : '../login')}>
                    Manage
                </button>
                <button className='blue-btn' onClick={() => navigate(isPlayer ? './createMatch' : '../login')} >
                    Play
                </button>
                <button className='green-btn' onClick={() => navigate(isPlayer ? './createMatch' : '../login')} >
                    Create
                </button>
            </div>
            <Outlet />
        </div>
    );
}

export default MatchesPage;
