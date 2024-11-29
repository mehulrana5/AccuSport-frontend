import React from 'react'
import css from './OrganizationsPage.module.css'
import AutoComplete from '../components/modals/AutoComplete'
import { Outlet } from 'react-router-dom'

function OrganizationsPage() {
  return (
    <div className={css.container_1}>
      <AutoComplete category={'organization'} subCategory={1}/>
      <div className={css.container_2}>
        <button className={css.btn}>Create Tournament</button>
        <button className={css.btn}>Edit Admins</button>
        <button className={css.btn}>Edit Organization</button>
      </div>
      <div className={css.container_2}>
        <Outlet/>
      </div>
    </div>
  )
}

export default OrganizationsPage
