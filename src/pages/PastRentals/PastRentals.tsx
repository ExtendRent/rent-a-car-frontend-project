import React from 'react'
import MyMUIDataTable from "./PastRentalCarTable";
type Props = {}

const PastRentals = (props: Props) => {
  return (
      <div className="container-card">
        <div className="form">
          
          <MyMUIDataTable />
        </div>
      </div>
  )
}

export default PastRentals