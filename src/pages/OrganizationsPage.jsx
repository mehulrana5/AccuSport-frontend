import React, { useContext } from 'react'
import css from './OrganizationsPage.module.css'
import AutoComplete from '../components/modals/AutoComplete'
import { Outlet } from 'react-router-dom'
import AppContext from '../Context'

function OrganizationsPage() {
  const context=useContext(AppContext)
  return (
    <div className={css.container_1}>
      <AutoComplete category={'organization'} subCategory={1}/>
      {
        context.userInfo.roles.includes('organizer')?
          <div className={css.container_2}>
            <button className={css.btn}>My Organization</button>
          </div>
          :<></>
      }
      <div className={css.container_2}>
        <Outlet/>
      </div>
    </div>
  )
}

export default OrganizationsPage
