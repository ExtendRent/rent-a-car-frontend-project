import React from 'react'
import MyMUIDataTable from "./PastRentalCarTable";
type Props = {}

const PastRentals = (props: Props) => {
  return (
      <div className="container-card">
        <div className="form">
          <h2 className="h2-card">Kiralama Geçmişim</h2>
          <MyMUIDataTable />
        </div>
      </div>
  )
}

export default PastRentals