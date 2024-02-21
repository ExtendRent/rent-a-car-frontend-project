import SideBar from "../../components/Sidebar/SideBar";
import MyMUIDataTable from "./RentalTable";
import '../Brands/Brand.css';
type Props = {};

const Rentals = (props: Props) => {
  return (
    <div >
  <SideBar>
    <div className="full-screen">
      <MyMUIDataTable />
    </div>
  </SideBar>
   
</div>
  );
};

export default Rentals;
