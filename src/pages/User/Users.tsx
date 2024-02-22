import SideBar from '../../components/Sidebar/SideBar'
import MyMUIDataTable from "./UserTable";
import '../Brands/Brand.css';

type Props = {}

const Users = (props: Props) => {
  return (
    <SideBar>
      <div className="full-screen">
        <MyMUIDataTable />
      </div>
    </SideBar>
  )
}

export default Users