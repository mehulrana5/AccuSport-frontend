import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../Context';
import AutoComplete from '../components/modals/AutoComplete';

const TournamentsPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AppContext)
  const [isPlayer, setIsPlayer] = useState(false);

  useEffect(() => {
    setIsPlayer(context.userInfo.roles.includes("player"))
  }, [context.userInfo.roles])

  function handelBtn(path) { navigate(`${path}`) }

  return (
    <div className="container-1">
      <AutoComplete category={'tournament'} subCategory={1}/>
      <div className="tournament-buttons">
        <button className="blue-btn" onClick={() => handelBtn('/tournaments/ongoing')}>Ongoing</button>
        <button className="blue-btn" onClick={() => handelBtn('/tournaments/upcoming')}>Upcoming</button>
        <button className="blue-btn" onClick={() => handelBtn('/tournaments/old')}>Old</button>
        {/* <button className='blue-btn' onClick={() => handelBtn(isPlayer ? './myTournaments' : '../login')}>My tournaments</button> */}
        {/* <button className='green-btn' onClick={() => handelBtn(isPlayer ? './createTournament' : '../login')}>Create</button> */}
      </div>
      <Outlet key={location.key}/>
    </div>
  );
};

export default TournamentsPage;
