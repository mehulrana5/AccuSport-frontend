import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from '../Context';
import { useLocation, useParams } from 'react-router-dom';
import Performance from './Performance';

function CreateMatchPage() {

  const { handleSubmit, register, watch, getValues, setValue, formState: { errors } } = useForm();

  const { operation } = useParams();

  const { state } = useLocation();

  const [showMapModal, setShowMapModal] = useState(false);
  const [geoData, setGeoData] = useState([])
  const [performanceModal, setPerformanceModal] = useState(false);
  const [team1PlayerNames, setTeam1PlayerNames] = useState();
  const [team2PlayerNames, setTeam2PlayerNames] = useState();

  const context = useContext(AppContext);
  const loc = watch("locationId")

  const onSubmit = (data) => {
    console.log(data);
    // context.createMatch(data).then((response) => { alert(response.data.error) })
  };

  function toggleModal() { setShowMapModal((prevState) => !prevState); };

  function formatLocalDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function togglePerformanceModal() { setPerformanceModal(!performanceModal); }

  function isValidObjectId(value) { return /^[0-9a-fA-F]{24}$/.test(value); }

  function isValidStartDateTime(value) {
    if (new Date() >= new Date(value)) {
      return "Match start date-time must be set in the future.";
    }
  }
  function isValidEndDateTime(value) {
    if (new Date(getValues("matchStartDateTime")) >= new Date(value)) {
      return "Match end date-time must be set in the after start date-time.";
    }
  }
  function isValidLocation(value) {
    if (!geoData.includes(value)) return "Invalid Open Location Code"
  }
  function handelUpdate() {
    const newMatchStartDateTime = watch("matchStartDateTime");
    const newMatchEndDateTime = watch("matchEndDateTime");
    const newMatchDescription = watch("matchDescription");
    const matchId = state?.match._id;
    const newDoc = { matchId, match_start_date_time: newMatchStartDateTime, match_end_date_time: newMatchEndDateTime, description: newMatchDescription, match_status: state?.match.match_status }
    context.updateMatch(newDoc).then((res) => {
      alert(res.error)
    });
  }
  function handelStatus(stage) {
    const check = window.confirm("Do you wanna update the status of the match?")
    if (!check) return;
    const newMatchStartDateTime = watch("matchStartDateTime");
    const newMatchEndDateTime = watch("matchEndDateTime");
    const newMatchDescription = watch("matchDescription");
    const matchId = state?.match._id;
    let newDoc = { matchId, match_start_date_time: newMatchStartDateTime, match_end_date_time: newMatchEndDateTime, description: newMatchDescription }
    if (stage === 1) {
      newDoc = { ...newDoc, match_status: "ongoing" }
      context.updateMatch(newDoc).then((res) => {
        alert(res.error);
      });
    }
    if (stage === 2) {
      newDoc = { ...newDoc, match_status: "old" }
      context.updateMatch(newDoc).then((res) => {
        alert(res.error);
      });
    }
  }

  useEffect(() => {
    context.getVenues().then((responce) => { setGeoData(responce) })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (state) {
      const { match, teams: { team1, team2 } } = state;
      const matchStart = match ? formatLocalDateTime(new Date(match.match_start_date_time)) : undefined;
      const matchEnd = match ? formatLocalDateTime(new Date(match.match_end_date_time)) : undefined;
      setValue("tournamentId", match?.tournament_id);
      setValue("team1", team1?._id);
      setValue("team2", team2?._id);
      setValue("locationId", match?.OLC || "");
      setValue("matchStartDateTime", matchStart);
      setValue("matchEndDateTime", matchEnd);
      setValue("matchDescription", match?.description);

      context.fetchPlayers(team1?._id, "teamPlayersNameOnly").then((res) => {
        setTeam1PlayerNames(res.map((player) => player.player_name));
      });

      context.fetchPlayers(team2?._id, "teamPlayersNameOnly").then((res) => {
        setTeam2PlayerNames(res.map((player) => player.player_name));
      });
    }
  }, [state, setValue, context, setTeam1PlayerNames, setTeam2PlayerNames]);

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "space-between",
        overflow: "auto",
        flexWrap: "wrap"
      }}
    >
      <div>
        <h1>Create Match</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <h3>Tournament</h3>
            <input
              readOnly={operation}
              type="text"
              id="tournamentId"
              className='form-input'
              {...register('tournamentId', {
                required: true,
                validate: isValidObjectId
              })}
            />
            {errors.tournamentId && <p style={{ color: "red" }}>Invalid MongoDB ObjectId format.</p>}
          </div>
          <div className="form-group">
            <h3>Team 1</h3>
            <input
              readOnly={operation === 'view'}
              type="text"
              id="team1"
              className='form-input'
              {...register('team1', {
                required: true,
                validate: isValidObjectId,
              })}
            />
            {errors.team1 && <p style={{ color: "red" }}>Invalid MongoDB ObjectId format.</p>}
          </div>
          <div className="form-group">
            <h3>Team 2</h3>
            <input
              readOnly={operation === 'view'}
              type="text"
              id="team2"
              className='form-input'
              {...register('team2', {
                required: true,
                validate: isValidObjectId,
              })}
            />
            {errors.team2 && <p style={{ color: "red" }}>Invalid MongoDB ObjectId format.</p>}
          </div>
          <div className="form-group">
            <h3>Venue Location Code</h3>
            {
              operation === 'view' || state?.match.match_status === '' ? <></>
                :
                <button type="button" className='blue-btn' onClick={toggleModal}>
                  {showMapModal ? "Close map" : "Open map"}
                </button>
            }
            <input
              type="text"
              readOnly={operation === 'view'}
              id="locationId"
              className='form-input'
              {...register('locationId', {
                required: true,
                validate: isValidLocation
              })}
              autoComplete='off'
            />
            {errors.locationId && <p style={{ color: "red" }}>{errors.locationId.message}</p>}
            {geoData &&
              geoData.filter(item => {
                const searchTerm = loc.toUpperCase();
                return searchTerm && item.startsWith(searchTerm) && searchTerm !== item;
              }).slice(0, 3).map((data, idx) => (
                  <div
                    onClick={() => setValue("locationId", data)}
                    className="drop-down-row"
                    key={idx}>
                    {data}
                  </div>
                ))}
          </div>
          <div className="form-group">
            <h3>Start Date and Time</h3>
            <input
              type="datetime-local"
              readOnly={operation === 'view'}
              id="matchStartDateTime"
              className='form-input'
              {...register('matchStartDateTime', {
                required: true,
                validate: isValidStartDateTime
              })}
            />
            {errors.matchStartDateTime && <p style={{ color: "red" }}>{errors.matchStartDateTime.message}</p>}
          </div>
          <div className="form-group">
            <h3>End Date and Time</h3>
            <input
              type="datetime-local"
              readOnly={operation === 'view'}
              id="matchEndDateTime"
              className='form-input'
              {...register('matchEndDateTime', {
                required: true,
                validate: isValidEndDateTime
              })}
            />
            {errors.matchEndDateTime && <p style={{ color: "red" }}>{errors.matchEndDateTime.message}</p>}
          </div>
          <div className="form-group">
            <h3>Description</h3>
            <textarea
              id="matchDescription"
              readOnly={operation === 'view'}
              cols="50"
              rows="3"
              className='form-input'
              {...register('matchDescription', {
                required: true,
              })}
            />
            {errors.matchDescription && <p style={{ color: "red" }}>Match Description is required.</p>}
          </div>
          <div>
            {
              operation === 'update' ?
                <>
                  {
                    state?.match.match_status === 'upcoming' ?
                      <>
                        <button onClick={() => handelStatus(1)} type="button" className='blue-btn'>
                          Start Match
                        </button>
                        <button onClick={handelUpdate} type="button" className='blue-btn'>
                          Update
                        </button>
                      </>
                      :
                      state?.match.match_status === 'ongoing' ?
                        <button onClick={() => handelStatus(2)} type="button" className='red-btn'>
                          End Match
                        </button>
                        : <></>
                  }
                  {
                    state?.match.match_status === 'ongoing' ?
                      <button onClick={togglePerformanceModal} type="button" className='blue-btn'>
                        Performance
                      </button>
                      : <></>
                  }
                </>
                : operation !== 'view' ?
                  <button type="submit" className='green-btn'>
                    Create
                  </button>
                  : <></>
            }
          </div>
        </form>
      </div>
      <div>
        {
          state ?
            <div
              style={{
                display: "flex",
                width: "100%",
              }}>
              <table className='details-table'>
                <th className='table-head'>
                  {state.teams.team1.team_name}
                </th>
                <tbody>
                  {team1PlayerNames && team1PlayerNames.map((e, idx) => (
                    <tr key={idx}>
                      <td className='details-value'>
                        {e}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className='details-table'>
                <th className='table-head'>
                  {state.teams.team2.team_name}
                </th>
                <tbody>
                  {team2PlayerNames && team2PlayerNames.map((e, idx) => (
                    <tr key={idx}>
                      <td className='details-value'>
                        {e}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            : <></>
        }
      </div>
      <div>
        {showMapModal && (
          <div>
            <iframe
              title='1'
              id='frame1'
              width="700"
              height="400"
              src="https://widgets.scribblemaps.com/sm/?d&dv&cv&z&l&gc&af&mc&svc&ssvce&lat=28.57281325&lng=77.36313779&vz=14&type=hybrid&ti&s&width=550&height=400&id=frenotoE09"
              style={{ border: 0, maxWidth: "100%" }}
              allowFullScreen
              allow="geolocation"
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
      {
        performanceModal ?
          <Performance togglePerformanceModal={togglePerformanceModal} tournamentId={state?.match.tournament_id} state={state} />
          : <></>
      }
    </div >
  );
}

export default CreateMatchPage;