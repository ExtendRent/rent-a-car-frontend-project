import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, IconButton } from "@mui/material";
import MUIDataTable, {
    MUIDataTableColumn,
    FilterType,
    Responsive,
} from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteRental, fetchRentals, startRental } from "../../store/slices/rentalSlice";
import { fetchRentalStatuses } from "../../store/slices/rentalStatusSlice";
import { fetchCustomers } from "../../store/slices/customerSlice";
import { fetchDiscountCodes } from "../../store/slices/discountCodeSlice";
import { fetchCars } from "../../store/slices/carSlice";
import { Button } from "react-bootstrap";
import "../Color/ColorTable.css";

const RentalTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const rentalState = useSelector((state: any) => state.rental);
    const customerState = useSelector((state: any) => state.customer);
    const discountState = useSelector((state: any) => state.discountCode);
    const rentalStatusState = useSelector((state: any) => state.rentalStatus);
    const carState = useSelector((state: any) => state.car);

    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{
        name: string; direction: "asc" | "desc"
    }>({
        name: "", direction: "asc"
    });

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchRentals());
        dispatch(fetchRentalStatuses());
        dispatch(fetchCars());
        dispatch(fetchCustomers());
        dispatch(fetchDiscountCodes());

    }, [page, rowsPerPage]);

    useEffect(() => {
        if (rentalState.rentals && customerState.customers && carState.cars && rentalStatusState.rentalStatuses) {
            const tableData = rentalState.rentals.map((rental: any) => [
                rental.id,
                rental.customerEntityName,
                rental.customerEntitySurname,
                rental.carEntityBrandEntityName,
                rental.carEntityYear,
                rental.carEntityRentalPrice,
                rental.carEntityLicensePlate,
                rental.startDate,
                rental.endDate,
                rental.returnDate,
                rental.paymentDetailsEntityAmount,
                rental.paymentDetailsEntityPaymentTypeEntityPaymentTypeName,
                rental.rentalStatusEntityName,
                <IconButton onClick={() => handleUpdate(rental.id)}><EditIcon /></IconButton>,
                <IconButton onClick={() => handleDelete(rental.id)}><DeleteIcon /></IconButton>,
                <Button type="button" style={{backgroundColor:'rgba(140, 25, 25)'}} onClick={() => handleStartUpdate(rental.id)}>Start Rental</Button>,
                <Button type="button" style={{backgroundColor:'rgba(140, 25, 25)'}} onClick={() => handleReturnUpdate(rental.id)}>End Rental</Button>,
            ]);

            setData(tableData);
            setCount(rentalState.rentals.length);
        }
        console.log(carState);

    }, [rentalState, carState, customerState, rentalStatusState]);

    const handleStartUpdate = (id: number) => {
        console.log("Start Update:", id);
        dispatch(startRental({ rentalId: id }));
    };

    const handleReturnUpdate = (id: number) => {
        console.log("Return Update ID:", id);
        navigate(`/adminPanel/returnRental/${id}`);
    };

    const handleDelete = (id: number) => {
        console.log("Deleted ID:", id);
        dispatch(deleteRental({ id: id }));
    };
    const handleUpdate = (id: number) => {
        console.log("Deleted ID:", id);
        navigate(`/adminPanel/updateRental/${id}`);
    };
    const changePage = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
        setIsLoading(true);
        setPage(page);
        setIsLoading(false);
    };
    const changeRowsPerPage = (rowsPerPage: number, page: number) => { // Satır sayısını değiştiren fonksiyonu ekledik
        setRowsPerPage(rowsPerPage);
        setPage(page);
    };

    const sort = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
        setIsLoading(true);
        // Tıklanan sütuna göre sıralama işlemini belirle
        let columnName: string = "";
        switch (sortOrder.name) {
            case "id":
                columnName = "id";
                break;
            case "customerEntityName":
                columnName = "customerEntityName";
                break;
            case "customerEntitySurname":
                columnName = "customerEntitySurname";
                break;
            case "carEntityBrandEntityName":
                columnName = "carEntityBrandEntityName";
                break;
            case "carEntityYear":
                columnName = "carEntityYear";
                break;
            case "carEntityRentalPrice":
                columnName = "carEntityRentalPrice";
                break;
            case "carEntityLicensePlate":
                columnName = "carEntityLicensePlate";
                break;
            case "startDate":
                columnName = "startDate";
                break;
            case "endDate":
                columnName = "endDate";
                break;
            case "returnDate":
                columnName = "returnDate";
                break;
            case "paymentDetailsEntityAmount":
                columnName = "paymentDetailsEntityAmount";
                break;
            case "paymentDetailsEntityPaymentTypeEntityPaymentTypeName":
                columnName = "paymentDetailsEntityPaymentTypeEntityPaymentTypeName";
                break;
            case "rentalStatusEntityName":
                columnName = "rentalStatusEntityName";
                break;
                
            default:
                break;
        }


        const sortedData = rentalState.rentals.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        // Sıralanmış verileri güncelle
        setData(sortedData.map((rental: any) => [
            rental.id,
            rental.customerEntityName,
            rental.customerEntitySurname,
            rental.carEntityBrandEntityName,
            rental.carEntityYear,
            rental.carEntityRentalPrice,
            rental.carEntityLicensePlate,
            rental.startDate,
            rental.endDate,
            rental.returnDate,
            rental.paymentDetailsEntityAmount,
            rental.paymentDetailsEntityPaymentTypeEntityPaymentTypeName,
            rental.rentalStatusEntityName]));
        // isLoading durumunu false olarak ayarla
        console.log(rentalState);

        setIsLoading(false);
    };
    const handleRowSelectionChange = (currentRowsSelected: any[]) => {
        if (currentRowsSelected.length > 0) {
            const selectedRow = data[currentRowsSelected[0].index]; // Seçilen ilk satırın verilerini al
            const selectedId = selectedRow[0]; // ID, ilk sütunda olduğu varsayılarak alındı
            //console.log("Seçilen satır ID'si: ", selectedId);
            //dispatch(deleteBrand({ brandId: selectedId }))
        }
    };

    const options = {
        customTableBodyWidth: "100%",
        onRowSelectionChange: handleRowSelectionChange,
        filter: true,
        filterType: 'dropdown' as FilterType,
        responsive: 'vertical' as Responsive,
        serverSide: true,
        count: count,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: [2, 10, 15],
        page: page,
        sortOrder: sortOrder,
        search: true,
        filterList: [],
        onFilterReset: () => {
            const originalData = rentalState.map((rental: any) => [
                rental.id,
                rental.customerEntityName,
                rental.customerEntitySurname,
                rental.carEntityBrandEntityName,
                rental.carEntityYear,
                rental.carEntityRentalPrice,
                rental.carEntityLicensePlate,
                rental.startDate,
                rental.endDate,
                rental.returnDate,
                rental.paymentDetailsEntityAmount,
                rental.paymentDetailsEntityPaymentTypeEntityPaymentTypeName,
                rental.rentalStatusEntityName]);
            setData(originalData);
        },
        onTableChange: (action: string, tableState: any) => {
            switch (action) {
                case 'changePage':
                    changePage(tableState.page, tableState.sortOrder);
                    break;
                case 'changeRowsPerPage': // Yeni sayfa sayısını işlemek için case eklendi
                    changeRowsPerPage(tableState.rowsPerPage, tableState.page);
                    break;
                case 'sort':
                    sort(tableState.page, tableState.sortOrder);
                    break;
                case 'filterChange':
                    const { filterList } = tableState;
                    const filteredData = rentalState.rentals.filter((rental: any) => {
                        return (
                            rental.id.toString().includes(filterList[0][0] || "") &&
                            rental.customerEntityName.toLowerCase().includes(filterList[1][0] || "") &&
                            rental.customerEntitySurname.toLowerCase().includes(filterList[2][0] || "") &&
                            rental.carEntityBrandEntityName.toLowerCase().includes(filterList[3][0] || "") &&
                            rental.carEntityYear.toString().includes(filterList[4][0] || "") &&
                            rental.carEntityRentalPrice.toString().includes(filterList[5][0] || "") &&
                            rental.carEntityLicensePlate.toLowerCase().includes(filterList[6][0] || "") &&
                            rental.startDate.toString().includes(filterList[7][0] || "") &&
                            rental.endDate.toString().includes(filterList[8][0] || "") &&
                            rental.returnDate.toString().includes(filterList[9][0] || "") &&
                            rental.paymentDetailsEntityAmount.toString().includes(filterList[10][0] || "") &&
                            rental.paymentDetailsEntityPaymentTypeEntityPaymentTypeName.toLowerCase().includes(filterList[11][0] || "") &&
                            rental.rentalStatusEntityName.toLowerCase().includes(filterList[12][0] || ""))

                    }).map((rental: any) => [
                        rental.id,
                        rental.customerEntityName,
                        rental.customerEntitySurname,
                        rental.carEntityBrandEntityName,
                        rental.carEntityYear,
                        rental.carEntityRentalPrice,
                        rental.carEntityLicensePlate,
                        rental.startDate,
                        rental.endDate,
                        rental.returnDate,
                        rental.paymentDetailsEntityAmount,
                        rental.paymentDetailsEntityPaymentTypeEntityPaymentTypeName,
                        rental.rentalStatusEntityName,
                        rental.active,
                        rental.deleted,
                    ]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = rentalState.rentals.filter((rental: any) => {
                            return (
                                rental.customerEntityName.toLowerCase().includes(filterList[0][0] || "") &&
                                rental.customerEntitySurname.toLowerCase().includes(filterList[1][0] || "") &&
                                rental.carEntityBrandEntityName.toLowerCase().includes(filterList[2][0] || "") &&
                                rental.carEntityYear.toString().includes(filterList[3][0] || "") &&
                                rental.carEntityRentalPrice.toString().includes(filterList[4][0] || "") &&
                                rental.carEntityLicensePlate.toLowerCase().includes(filterList[5][0] || "") &&
                                rental.startDate.toString().includes(filterList[6][0] || "") &&
                                rental.endDate.toString().includes(filterList[7][0] || "") &&
                                rental.returnDate.toString().includes(filterList[8][0] || "") &&
                                rental.paymentDetailsEntityAmount.toString().includes(filterList[9][0] || "") &&
                                rental.paymentDetailsEntityPaymentTypeEntityPaymentTypeName.toLowerCase().includes(filterList[10][0] || "") &&
                                rental.rentalStatusEntityName.toLowerCase().includes(filterList[11][0] || ""))

                        }).map((rental: any) => [
                            rental.id,
                            rental.customerEntityName,
                            rental.customerEntitySurname,
                            rental.carEntityBrandEntityName,
                            rental.carEntityModelEntityName,
                            rental.carEntityYear,
                            rental.carEntityRentalPrice,
                            rental.carEntityLicensePlate,
                            rental.startDate,
                            rental.endDate,
                            rental.returnDate,
                            rental.paymentDetailsEntityAmount,
                            rental.paymentDetailsEntityPaymentTypeEntityPaymentTypeName,
                            rental.rentalStatusEntityName,
                        ]);
                        setData(searchData);
                    }
                    break;
                default:

                    console.log(rentalState);
                    console.log("Unhandled action:", action);
            }
        },
    };

    return (
        <div className="container-card">
        <div className="form">
        <h2 className="h2-card">KİRALAMA</h2>
            <MUIDataTable
                title={
                    <Typography variant="h6">
                        
                        {isLoading && (
                            <CircularProgress
                                size={24}
                                style={{ marginLeft: 15, position: "relative", top: 4 }}
                            />
                        )}
                    </Typography>
                }
                data={data}
                columns={[
                    {
                        name: "id",
                        label: "ID",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "customerEntityName",
                        label: "AD",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "customerEntitySurname",
                        label: "SOYAD",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "carEntityBrandEntityName",
                        label: "MARKA",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "carEntityYear",
                        label: "YEAR",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "carEntityRentalPrice",
                        label: "FİYAT",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "carEntityLicensePlate",
                        label: "PLAKA",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "startDate",
                        label: "BAŞL. TRH",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "endDate",
                        label: "BTŞ TRH",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "returnDate",
                        label: "DNŞ TRH",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "paymentDetailsEntityAmount",
                        label: "TOPLAM TUTAR",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "paymentDetailsEntityPaymentTypeEntityPaymentTypeName",
                        label: "ÖDEME TİPİ",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "rentalStatusEntityName",
                        label: "KİRALAMA DURUMU",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    
                    {
                        name: "",
                        label: "",
                        options: {
                            filter: false,
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any, tableMeta: { rowData: any[] }) => (
                                <div style={{ textAlign: "center", float: "inline-end" }}>
                                    {value}
                                </div>
                            ),
                        },
                    },
                    {
                        name: "",
                        label: "",
                        options: {
                            filter: false,
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any, tableMeta: { rowData: any[] }) => (
                                <div style={{ textAlign: "center", float: "inline-start" }}>
                                    {value}
                                </div>
                            ),
                        },
                    },
                    {
                        name: "StartRental",
                        label: "Start Rental",
                        options: {
                            filter: false,
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any, tableMeta: { rowData: any[] }) => (
                                <div style={{ textAlign: "center", float: "inline-end" }}>
                                    {value}
                                </div>
                            ),
                        },
                    },
                    {
                        name: "EndRental",
                        label: "End Rental",
                        options: {
                            filter: false,
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any, tableMeta: { rowData: any[] }) => (
                                <div style={{ textAlign: "center", float: "inline-end" }}>
                                    {value}
                                </div>
                            ),
                        },
                    },
                ]}
                options={{
                    ...options,
                    setRowProps: () => ({
                      className: 'custom-row'
                    }),
                    setTableProps: () => ({
                      style: {
                        className: 'custom-mui-table'
                      },
                    }),
                  }}
            />
            </div>
        </div>
    );
};

export default RentalTable;

