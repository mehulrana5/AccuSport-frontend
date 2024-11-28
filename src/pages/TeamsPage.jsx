import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../Context';
import AutoComplete from '../components/modals/AutoComplete';

function TeamsPage() {
    const context = useContext(AppContext)
    const location = useLocation();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(false);
    useEffect(() => {
        setPlayer(context.userInfo.roles.includes("player"));
    }, [context.userInfo, context.playerInfo])

    return (
        <div className='container-1'>
            <div>
                <AutoComplete category={'team'}/>
                <div>
                    <button className='green-btn' onClick={()=>navigate(player?'./createTeam':'../login')}>Create team</button>
                    <button className='blue-btn' onClick={()=>navigate(player?'./myTeams':'../login')}>My team</button>
                </div>
            </div>
            <Outlet key={location.key}/>
        </div>
    );
}

export default TeamsPage;