import React, { useContext, useEffect, useState } from 'react'
import css from './OrganizationsPage.module.css'
import AutoComplete from '../components/modals/AutoComplete'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppContext from '../Context'

function OrganizationsPage() {
  const context=useContext(AppContext)
  const navigate=useNavigate()
  const location=useLocation()
  const [data,setData]=useState()

  useEffect(()=>{
    if(context?.userInfo?._id){
      context.fetchOrg({query:context?.userInfo?._id,fetchBy:"user"}).then((res)=>{setData(res[0]);})
    }
  },[])
  return (
    <div className={css.container_1}>
      <AutoComplete category={'organization'} subCategory={1}/>
      {
        context.userInfo.roles.includes('organizer')?
          <div className={css.container_2}>
            <button className={css.btn} onClick={() => data?._id && navigate(`./view/${data._id}`)}>My Organization</button>
            <button className={`${css.btn} ${css.green_btn}`}>Create Organization</button>
          </div>
          :<></>
      }
      <div className={css.container_2}>
        <Outlet key={location.key}/>
      </div>
    </div>
  )
}

export default OrganizationsPage
