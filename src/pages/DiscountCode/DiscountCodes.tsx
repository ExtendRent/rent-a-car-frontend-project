import MyMUIDataTable from "./DiscountCodeTable";
import '../Brands/Brand.css';
import SideBar from '../../components/Sidebar/SideBar';

type Props = {}

const DiscountCodes = (props: Props) => {

  return (
    
    <SideBar>
      <div className="full-screen">
        <MyMUIDataTable />
      </div>
    </SideBar>
  
  )

}

export default DiscountCodes