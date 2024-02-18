import SideBar from '../../components/Sidebar/SideBar';
import MyMUIDataTable from "./EmployeeTable";
import '../Brands/Brand.css';

type Props = {}

const Employees = (props: Props) => {
  return (
    <SideBar>
      <div className="full-screen">
        <MyMUIDataTable />
      </div>
    </SideBar>
  )
}

export default Employees