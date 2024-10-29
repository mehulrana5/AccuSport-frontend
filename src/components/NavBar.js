import React, { useContext, useEffect, useState } from 'react';
import '../css/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../Context';
import Notifications from './Notifications';

const NavBar = () => {
    const context = useContext(AppContext)
    const navigate=useNavigate();
    const [guest,setGuest] =useState(false);
    const [player,setPlayer] =useState(false);
    const [showNotifications,setShowNotifications]=useState(false)
    const [showBurgerMenu,setShowBurgerMenu]=useState(false)

    useEffect(()=>{
        setGuest(context.userInfo.user_role.includes("guest"));
        setPlayer(context.userInfo.user_role.includes("player"));
    },[context.userInfo,context.playerInfo])
    const handleLogout = () => {
        navigate('/')
        context.logout()
    }
    const toggleNotificationModal=()=>{
        setShowNotifications(!showNotifications)
    }
    const toggleBurgerMenu=()=>{
        document.querySelector(".nav-links").style.left=showBurgerMenu?'-100%':0
        setShowBurgerMenu(!showBurgerMenu)
    }
    return (
        <nav className="nav-bar">
            <div className="logo">
                <Link className="logo-link" to="/">
                    <svg width="152" height="38" viewBox="0 0 152 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#0000" d="M0 0h152v38H0z"/><path d="M9 15.5h5v19H9zm10-24h5v43h-5zm10 29h6v14h-6zm24.807 5h-2.39l4.352-12.364h2.765L62.893 25.5h-2.39L57.2 15.672h-.097zm.079-4.848h6.52v1.8h-6.52zm14.301 5.03q-1.388 0-2.384-.61a4.07 4.07 0 0 1-1.528-1.685q-.531-1.08-.531-2.487 0-1.413.543-2.493a4.05 4.05 0 0 1 1.534-1.69q.995-.61 2.354-.61 1.13 0 1.998.416a3.4 3.4 0 0 1 1.395 1.165q.519.75.591 1.75h-2.088a2 2 0 0 0-.604-1.116q-.47-.453-1.262-.453-.67 0-1.177.363-.507.356-.79 1.026-.279.67-.278 1.606 0 .947.277 1.63.278.676.779 1.044.506.362 1.19.362.482 0 .862-.18.386-.189.647-.538.258-.35.356-.851h2.088a3.64 3.64 0 0 1-.58 1.744 3.43 3.43 0 0 1-1.363 1.184q-.864.422-2.029.422m9.812 0q-1.388 0-2.385-.61a4.07 4.07 0 0 1-1.527-1.685q-.531-1.08-.532-2.487 0-1.413.544-2.493a4.06 4.06 0 0 1 1.533-1.69q.997-.61 2.355-.61 1.128 0 1.998.416a3.4 3.4 0 0 1 1.394 1.165q.52.75.592 1.75h-2.089a2 2 0 0 0-.604-1.116q-.47-.453-1.261-.453-.671 0-1.177.363-.508.356-.791 1.026-.278.67-.278 1.606 0 .947.278 1.63.277.676.778 1.044.508.362 1.19.362.483 0 .863-.18.387-.189.646-.538.26-.35.356-.851h2.089a3.64 3.64 0 0 1-.58 1.744 3.43 3.43 0 0 1-1.364 1.184q-.863.422-2.028.422m11.677-4.08v-5.373h2.185V25.5h-2.119v-1.648h-.097q-.314.78-1.032 1.274-.712.495-1.757.495-.911 0-1.611-.405a2.8 2.8 0 0 1-1.087-1.189q-.393-.785-.393-1.896v-5.904h2.186v5.566q0 .882.483 1.4.483.52 1.267.52.484 0 .936-.235t.743-.7q.296-.472.296-1.178m15.465-5.065q-.085-.791-.713-1.231-.62-.441-1.618-.441-.7 0-1.201.211-.5.211-.767.574a1.4 1.4 0 0 0-.271.827q0 .385.175.67.182.284.489.483.307.193.682.326.374.133.755.223l1.159.29q.7.164 1.346.44.652.28 1.165.701.52.423.821 1.02.302.599.302 1.4 0 1.087-.555 1.915-.556.82-1.606 1.285-1.045.46-2.53.46-1.443 0-2.505-.448-1.056-.446-1.654-1.304-.592-.856-.64-2.088h2.203q.049.646.399 1.074.35.43.911.64.568.211 1.268.211.73 0 1.28-.217.555-.223.869-.616.314-.398.32-.93-.006-.482-.284-.796-.277-.32-.778-.531a7.5 7.5 0 0 0-1.159-.387l-1.407-.362q-1.527-.393-2.415-1.19-.88-.803-.881-2.13 0-1.094.591-1.914.598-.82 1.624-1.274 1.027-.459 2.325-.459 1.316 0 2.306.46.996.452 1.563 1.26.568.804.586 1.848zm4.224 12.442v-12.75h2.149v1.534h.127q.17-.338.477-.719.308-.386.833-.658.525-.277 1.34-.277 1.076 0 1.938.549.87.543 1.376 1.612.514 1.062.514 2.608 0 1.527-.501 2.596-.502 1.068-1.365 1.63a3.5 3.5 0 0 1-1.956.561q-.797 0-1.322-.266a2.7 2.7 0 0 1-.845-.64 4.2 4.2 0 0 1-.489-.718h-.091v4.938zm2.143-8.113q0 .9.254 1.575.26.676.742 1.057.49.375 1.184.374.724 0 1.213-.386.489-.393.736-1.069.254-.683.254-1.551 0-.864-.248-1.534-.247-.67-.736-1.05-.49-.38-1.219-.38-.7 0-1.19.368-.489.368-.742 1.032-.248.664-.248 1.564m12.527 4.817q-1.359 0-2.355-.598a4.06 4.06 0 0 1-1.545-1.672q-.543-1.074-.543-2.511t.543-2.517q.549-1.081 1.545-1.679t2.355-.598 2.354.598a4 4 0 0 1 1.54 1.678q.549 1.08.549 2.518t-.549 2.511a4.03 4.03 0 0 1-1.54 1.672q-.996.598-2.354.598m.012-1.75q.736 0 1.231-.405.495-.41.737-1.099.247-.688.247-1.533 0-.851-.247-1.54-.242-.693-.737-1.104-.495-.41-1.231-.41-.755 0-1.256.41-.495.41-.742 1.104a4.6 4.6 0 0 0-.242 1.54q0 .845.242 1.533.247.688.742 1.099.501.404 1.256.404m6.286 1.569v-9.273h2.119v1.546h.096q.254-.803.87-1.238a2.4 2.4 0 0 1 1.418-.44q.182 0 .405.018.23.012.38.042v2.01a2.3 2.3 0 0 0-.441-.084 4 4 0 0 0-.573-.043q-.598 0-1.075.26-.47.253-.742.706t-.272 1.045V25.5zm11.868-9.273v1.69h-5.33v-1.69zm-4.014-2.221h2.185v8.705q0 .442.133.676a.72.72 0 0 0 .362.314q.224.084.495.084.206 0 .375-.03.175-.03.265-.054l.368 1.708q-.174.06-.501.133a4 4 0 0 1-.784.085 3.6 3.6 0 0 1-1.479-.248 2.3 2.3 0 0 1-1.045-.857q-.38-.58-.374-1.449z" fill="#fff"/></svg>
                </Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link className="nav-link" to="/tournaments">
                        Tournaments
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/matches">
                        Matches
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/teams">
                        Teams
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/players">
                        Players
                    </Link>
                </li>
                {
                    guest && !player ?
                        <li>
                            <Link className="nav-link" to={`/createPlayer`}>
                                Create player
                            </Link>
                        </li>
                        : <></>
                }
                {
                    player ?
                        <>
                            <li>
                                <Link className="nav-link" to={`/player/${context.playerInfo._id}/view`}>
                                    My profile
                                </Link>
                            </li>
                            <li>
                                <Link className="nav-link" onClick={toggleNotificationModal}>
                                    Notifications
                                </Link>
                            </li>
                        </>
                        : <></>
                }
                {
                    !guest ?
                        <li>
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>
                        :
                        <li>
                            <Link onClick={handleLogout} className="nav-link" to="/">
                                Logout
                            </Link>
                        </li>
                }
                {
                    !guest ?
                        <li>
                            <Link className="nav-link" to="/signup">
                                Signup
                            </Link>
                        </li>
                        : <></>
                }
                {
                    showNotifications?<Notifications toggleNotificationModal={toggleNotificationModal}/>:<></>
                }
            </ul>
            <div className='burger' onClick={toggleBurgerMenu}>
                <div className='lines' id='l1'></div>
                <div className='lines' id='l2'></div>
                <div className='lines' id='l3'></div>
            </div>
        </nav>
    );
};

export default NavBar;
