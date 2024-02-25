import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import MyMUIDataTable from "./CustomerTable";
import '../Brands/Brand.css';

type Props = {}

const Customers = (props: Props) => {
  return (
    <div >
  <SideBar>
    <div className="full-screen">
      <MyMUIDataTable />
    </div>
  </SideBar>
  </div>
  )
}

export default Customers