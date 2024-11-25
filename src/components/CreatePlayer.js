import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

function CreatePlayer() {
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();
    const { fields, remove } = useFieldArray({ name: "teams_joined", control });
    const [data, setData] = useState();
    const onSubmit = (data) => { context.createPlayer(data).then(() => { navigate('/') }) }

    function isValidName(value) {
        if (value.length < 3) return "name should be more than 2 characters"
    }

    function isValidplayer_dob(value) {
        if (new Date() < new Date(value)) return "invalid date of birth"
    }

    let { playerId } = useParams();

    useEffect(() => {
        if (playerId) {
            context.fetchPlayers(playerId, "id").then((res) => { setData(res); })
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (data) {
            setValue("player_name", data.player_name)
            setValue("real_name", data.real_name)
            setValue("player_id", data._id)
            const formattedDate = new Date(data.player_dob).toLocaleDateString("en-CA");
            setValue("player_dob", formattedDate);
            setValue("teams_joined", data.teams_joined)
        }
        // eslint-disable-next-line
    }, [data])

    return (
        <div className='container-1'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {
                        data ? <></>
                            : <h2 className="form-heading">Create Player Profile</h2>
                    }
                    <h3>Player Name</h3>
                    <input
                        type="text"
                        className='form-input'
                        readOnly={playerId}
                        {...register('player_name', {
                            required: true,
                            validate: isValidName
                        })}
                    />
                    <h3>Real Name</h3>
                    <input
                        type="text"
                        className='form-input'
                        readOnly={playerId}
                        {...register('real_name', {
                            required: true,
                            validate: isValidName
                        })}
                    />
                    {errors.player_name && <p style={{ color: "red" }}>{errors.player_name.message}</p>}
                    {
                        data ?
                            <div>
                                <h3>Player ID</h3>
                                <input
                                    type='string'
                                    className='form-input'
                                    readOnly={playerId}
                                    {...register('player_id', {
                                        required: true,
                                    })}
                                />
                            </div>
                            : <></>
                    }
                    <h3>Date of Birth</h3>
                    <input
                        type='date'
                        className='form-input'
                        readOnly={playerId}
                        {...register('player_dob', {
                            required: true,
                            validate: isValidplayer_dob
                        })}
                    />
                    {errors.player_dob && <p style={{ color: "red" }}>{errors.player_dob.message}</p>}
                    {
                        !playerId ? <></>
                            : <h3>Teams</h3>
                    }
                    <div>
                        {fields.map((field, idx) => {
                            return (
                                <div key={field.id}>
                                    <input
                                        type="text"
                                        className='form-input'
                                        style={{ margin: "5px 5px 0 0", width: "40%" }}
                                        readOnly={1}
                                        {...register(`teams_joined[${idx}]`, {
                                            required: true,
                                        })}

                                    />
                                    {
                                        !data ? <></>
                                            : (idx >= 0 && (
                                                <>
                                                    <button type="button" className='green-btn' onClick={() => navigate(`../teams/view/${data.teams_joined[idx]}`)}>View</button>
                                                    <button type='button' className='red-btn' onClick={() => remove(idx)}>Leave</button>
                                                </>
                                            ))
                                    }
                                    {errors.teams_joined && errors.teams_joined[idx] && (
                                        <p style={{ color: "red" }}>Invalid Object ID format.</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {
                    data ? <>
                        <button className='blue-btn' type="button" onClick={() => navigate("../teams/myTeams")}>My Teams</button>
                        <button className='green-btn' type="button" onClick={() => navigate("../teams/myTeams")}>Join team</button>
                        <button className='green-btn' type="button" onClick={() => navigate("../teams/createTeam")}>Create team</button>
                    </>
                        : <button type="submit" className='blue-btn'>Submit</button>
                }
            </form>
        </div>
    );
}

export default CreatePlayer;
