import React, { useContext, useEffect, useState } from 'react'
import css from './OrganizationDetailsPage.module.css'
import AppContext from '../Context'
import { useNavigate, useParams } from 'react-router-dom'

function OrganizationDetailsPage() {
    const context = useContext(AppContext)
    const navigate = useNavigate()
    const { operation } = useParams()

    const [orgData, setOrgData] = useState({ organization_name: "", description: "" })
    const [torData, setTorData] = useState(null)

    useEffect(() => { setOrgData(context.selectedAutoCompleteData); }, [context.selectedAutoCompleteData])

    useEffect(() => {
        if (orgData?._id) { context.fetchTournament(orgData?._id, 'org').then((res) => { setTorData(res) }); }
    }, [orgData])

    function handleViewClick(e) { navigate(`../../tournaments/view/${torData[e]._id}`); }

    return (
        <div className={css.container_1}>
            {
                orgData ?
                    <>
                        <div className={css.container_2}>
                            <h3>Organization Name</h3>
                            <input type="text" defaultValue={orgData?.organization_name} className={css.input} readOnly={operation === 'view'} />
                            <h3>Description</h3>
                            <textarea name="description" id="description" defaultValue={orgData?.description} className={`${css.input} ${css.description}`} readOnly={operation === 'view'} />
                        </div>
                        <div className={css.container_3}>
                            <h3>Tournaments</h3>
                            {torData?.map((field, idx) => {
                                return (
                                    <div key={idx} className={css.container_4}>
                                        <div className={css.container_5_1} title={field.tournament_name}>{field.tournament_name}</div>
                                        <div className={css.container_5_2}>{field.sport_type}</div>
                                        <div className={css.container_5_3}>{new Date(field.start_date_time).toLocaleDateString()}</div>
                                        <button onClick={() => handleViewClick(idx)} className={css.viewBtn}>View</button>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                    : <></>
            }
        </div>
    )
}

export default OrganizationDetailsPage