import React from 'react'
import '../Brands/Brand.css';
import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./RentalStatusTable";

type Props = {}

const RentalStatuses = (props: Props) => {
  return (
    <SideBar>
    <div className="full-screen">
      <MyMUIDataTable />
    </div>
  </SideBar>
  )
}

export default RentalStatuses