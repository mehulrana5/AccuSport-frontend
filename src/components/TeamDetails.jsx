import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import AutoComplete from './modals/AutoComplete';
import AppContext from '../Context';
import css from './TeamDetails.module.css'

function TeamDetails() {
    const { operation1, teamId } = useParams();
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm();
    const { fields, append, remove } = useFieldArray({
        name: "team_players",
        control
    });

    const [data, setData] = useState()
    const [players, setPlayers] = useState();

    const isView = operation1 === 'view'

    async function fetchTeam() {
        try {
            const res = await context.fetchTeam(teamId, "id")
            setData(res);
            const data = await context.fetchPlayers(teamId, "team");
            setPlayers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTeam();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (data) {
            setValue("team_id", data._id)
            setValue("team_name", data.team_name)
            setValue("team_leader", data.team_leader)
        }
        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        if (players) {
            setValue("team_players", data.team_players_ids)
        }
        // eslint-disable-next-line
    }, [players])

    const onSubmit = async (data) => {
        try {
            await context.updateTeamPlayers(data.team_leader, data.team_players, teamId);
            navigate("../myTeams");
        } catch (error) {
            alert(error);
        }
    };

    const validateObjectId = (value) => {
        return /^[0-9a-fA-F]{24}$/.test(value);
    };

    return (
        <div className={css.container_1}>
            <div className={css.container_2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Team ID</h3>
                    <input
                        type="text"
                        className='form-input'
                        readOnly={1}
                        {...register("team_id")}
                    />
                    <h3>Team Name</h3>
                    <input
                        type="text"
                        className='form-input'
                        readOnly={1}
                        {
                        ...register("team_name")
                        }
                    />
                    <h3>Leader ID</h3>
                    <input
                        type="text"
                        className='form-input'
                        readOnly={isView}
                        {
                        ...register("team_leader")
                        }
                    />
                    <h3>Players</h3>
                    <div>
                        {fields.map((field, idx) => {
                            return (
                                <div key={field.id}>
                                    <h4>
                                        {players[idx].player_name} {players[idx]._id===data.team_leader?<>(Leader)</>:<></>}
                                    </h4>
                                    <input
                                        type="text"
                                        className='form-input'
                                        readOnly={isView}
                                        {...register(`team_players[${idx}]`, {
                                            required: true,
                                            validate: validateObjectId,
                                        })}
                                        placeholder='Enter Player ID'
                                    />
                                    {
                                        isView ? <></>
                                            : (idx >= 0 && (
                                                <button className='red-btn' onClick={() => remove(idx)}>Remove</button>
                                            ))
                                    }
                                    {errors.team_players && errors.team_players[idx] && (
                                        <p style={{ color: "red" }}>Invalid Object ID format.</p>
                                    )}
                                </div>
                            )
                        })}
                        {
                            isView ? <></>
                                : <button className='green-btn' type="button" onClick={() => append("")}>Add</button>
                        }
                    </div>
                    {
                        isView ? <></>
                            : <button className='blue-btn' type="submit">Update</button>
                    }
                </form>
            </div>
            <div className={css.container_2}>
                <div className={css.container_4}>
                    {operation1 === 'view' ? <></> :
                    <div className={css.container_3}>
                        <h3>Search</h3>
                        <AutoComplete category={'player'} subCategory={2} />
                    </div>
                    }
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default TeamDetails;
