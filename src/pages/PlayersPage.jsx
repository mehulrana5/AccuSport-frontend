import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../Context';
import AutoComplete from '../components/modals/AutoComplete';

function PlayersPage() {
    const context = useContext(AppContext)
    const location=useLocation()
    const [guest, setGuest] = useState(false);
    const [player, setPlayer] = useState(false);

    useEffect(() => {
        setGuest(context.userInfo.roles.includes("guest"));
        setPlayer(context.userInfo.roles.includes("player"));
    }, [context.userInfo, context.playerInfo])

    const navigate = useNavigate();

    return (
        <div className="container-1">
            <AutoComplete category={'player'} subCategory={1}/>
            <div>
                {
                    player ? <div>
                        <button type="button" className='green-btn' onClick={() => navigate(`../player/${context.playerInfo._id}/view`)}>My Profile</button>
                    </div>
                        :
                        <div>
                            <button type="button" className='green-btn' onClick={() => navigate(guest ? "../createPlayer" : "../login")}>Create Player</button>
                        </div>
                }
            </div>
            <Outlet key={location.key} />
        </div>
    );
}

export default PlayersPage;