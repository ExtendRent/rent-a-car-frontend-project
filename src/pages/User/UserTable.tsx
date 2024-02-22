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
import { fetchUsers } from "../../store/slices/userSlice";


const UserTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: any) => state.user);
    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
    //const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers({page, size, sort: [sortOrder.direction] }));
        console.log(userState.users);
    }, [page, size]);

    useEffect(() => {
        const tableData = userState.users.content.map((user: any) => [
            user.id,
            user.name,
            user.surname,
            user.email,
            user.userImageEntityUrl,
            user.authority,
            user.status,
            user.deleted,
            <IconButton onClick={() => handleUpdate(user.id)}><EditIcon /></IconButton>,
        ]);

        setData(tableData);
        setCount(userState.users.content.length);

        console.log(userState);
    }, [userState]);
 
    const handleUpdate = (id: number) => {
        navigate(`/adminPanel/users/block/${id}`);
    };

    const changePage = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
        setIsLoading(true);
        setPage(page);
        setIsLoading(false);
    };
    const changeSize = (page: number, size: number, ) => { // Satır sayısını değiştiren fonksiyonu ekledik
        setPage(page);
        setSize(size);
    };


    const sort = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
        setIsLoading(true);
        let columnName: string = "";
        switch (sortOrder.name) {
            case "id":
                columnName = "id";
                break;
            case "name":
                columnName = "name";
                break;
            case "surname":
                columnName = "surname";
                break;
            case "email":
                columnName = "email";
                break;
            case "userImageEntityUrl":
                columnName = "userImageEntityUrl";
                break;
            case "authority":
                columnName = "authority";
                break;
            case "status":
                columnName = "status";
                break;
            case "deleted":
                columnName = "deleted";
                break;
            default:

                break;
        }

        const sortedData = userState.users.content.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        // Sıralanmış verileri güncelle
        setData(sortedData.map((user: any) => [user.id, user.name, user.surname, user.email, user.userImageEntityUrl,
        user.authority, user.status, user.deleted]));
        // isLoading durumunu false olarak ayarla
        setIsLoading(false);
    };
    
    const handleRowSelectionChange = (currentRowsSelected: any[]) => {
        if (currentRowsSelected.length > 0) {
            const selectedRow = data[currentRowsSelected[0].index];
            const selectedId = selectedRow[0];
            console.log(selectedRow);
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
        size: [5, 10, 15],
        //rowsPerPageOptions: [5, 10, 15],
        page: page,
        sortOrder: sortOrder,
        search: true,
        filterList: [],
        onFilterReset: () => {
            const originalData = userState.users.content.map((user: any) => [user.id, user.name, user.surname, user.email,
                user.authority, user.status, user.deleted]);
            setData(originalData);
        },

        onTableChange: (action: string, tableState: any) => {
            switch (action) {
                 case 'changePage':
                    changePage(tableState.page, tableState.sortOrder);
                    break;
                case 'changeSize': // Yeni sayfa sayısını işlemek için case eklendi
                    changeSize(tableState.page, tableState.size);
                    break; 
                case 'sort':
                    sort(tableState.page, tableState.sortOrder);
                    break;
                case 'filterChange':
                    const { filterList } = tableState;
                    const filteredData = userState.users.content.filter((user: any) => {
                        return (
                            user.id.toString().includes(filterList[0][0] || "") &&
                            user.name.toLowerCase().includes(filterList[1][0] || "") &&
                            user.surname.toLowerCase().includes(filterList[2][0] || "") &&
                            user.email.toLowerCase().includes(filterList[3][0] || "") &&
                            user.authority.toLowerCase().includes(filterList[4][0] || "") &&
                            user.status.toLowerCase().includes(filterList[5][0] || "") &&
                            (filterList[6][0] === "" || user.deleted === (filterList[6][0] === "true"))
                        );
                    }).map((user: any) => [user.id, user.name, user.surname, user.email,
                    user.authority, user.status, user.deleted]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = userState.users.content.filter((user: any) => {
                            return (
                                user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                user.surname.toLowerCase().includes(searchText.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                                user.authority.toLowerCase().includes(searchText.toLowerCase()) ||
                                user.status.toLowerCase().includes(searchText.toLowerCase()) ||
                                user.deleted.toString().includes(searchText.toLowerCase())
                            );
                        }).map((user: any) => [user.id, user.name, user.surname, user.email, user.authority, user.status, user.deleted]);
                        setData(searchData);
                        
                    }
                    break;
                default:
                    console.log("Unhandled action:", action);
            }
        },
    };

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <MUIDataTable
                title={
                    <Typography variant="h6">
                        KULLANICILAR
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
                        name: "name",
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
                        name: "surname",
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
                        name: "email",
                        label: "EMAIL",
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
                        name: "userImageEntityUrl",
                        label: "FOTO",
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
                        name: "authority",
                        label: "YETKİ",
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
                        name: "status",
                        label: "KULLANICI DURUMU",
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
                        name: "deleted",
                        label: "SİLİNMİŞ",
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
                ]}
                
            /> 
        </div>
    );
};

export default UserTable;

