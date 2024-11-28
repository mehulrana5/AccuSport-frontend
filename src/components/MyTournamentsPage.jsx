import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context';
import { useNavigate } from 'react-router-dom';

function MyTournamentsPage() {
    const context = useContext(AppContext);
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function handelDelete(tn, tid) {
        const flag = window.confirm(`Do you want to permanantly delete ${tn} tournament`);
        if (!flag) return
        try {
            await context.deleteTournament(tid);
            getTournaments();
        } catch (error) {
            console.log(error);
        }
    }
    async function getTournaments() {
        try {
            const data = await context.fetchTournament(context.userInfo._id, "org");
            setTournaments(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getTournaments();
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <h1>My Tournaments</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="container-2">
                    {tournaments && tournaments.map((t, idx) => (
                        <div className="card" key={idx}>
                            <div>
                                <h3>{t.tournament_name}</h3>
                            </div>
                            <div>
                                <button className='green-btn' onClick={() => navigate(`../view/${t._id}`)}>View</button>
                                <button className='blue-btn' onClick={() => navigate(`../update/${t._id}`)}>Update</button>
                                <button className='red-btn' onClick={() => handelDelete(t.tournament_name, t._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyTournamentsPage;
