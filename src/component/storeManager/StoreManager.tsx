import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AgGridReact } from "ag-grid-react";
import { MdDelete, MdEdit } from "react-icons/md";
import { removeStores } from "../../redux/reducers/storeSlice";
import AddStoreModal from "./addStoreData";
import { ColDef } from "ag-grid-community";
import {storeDetailsType} from '../../types/Types'




const StoreManager: React.FC = () => {
  const storeDetails = useSelector((state: RootState) => state.stores.storeDetails);
  const [gridData, setGridData] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [storeToEdit, setStoreToEdit] = useState<storeDetailsType | null | undefined>(null);

  useEffect(() => {
    if (storeDetails.length > 0) {
      console.log(storeDetails,"****")
      setGridData([...storeDetails]);
    }
  }, [storeDetails]);

  const handleDelete = (id: number) => {
    dispatch(removeStores(id));
  };

  const handleEdit = (id: number) => {
    const selectedStore = storeDetails.find((store) => store.id === id);
    if (selectedStore) {
      setStoreToEdit(selectedStore); 
    }
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Delete",
      field: "",
      width: 50,
      cellRenderer: (params: any) => (
        <button onClick={() => handleDelete(params.data.id)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
          <MdDelete color="red" size={20} />
        </button>
      ),
      filter: false,
      sortable: false,
    },
    {
      headerName: "Edit",
      field: "",
      width: 50,
      cellRenderer: (params: any) => (
        <button onClick={() => handleEdit(params.data.id)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
          <MdEdit color="blue" size={20} />
        </button>
      ),
      filter: false,
      sortable: false,
    },
    { headerName: "ID", field: "id", width: 90, filter: "agNumberColumnFilter" },
    { headerName: "Store Name", field: "storeName", width: 250, filter: "agTextColumnFilter" },
    { headerName: "City", field: "city", width: 150, filter: "agTextColumnFilter" },
    { headerName: "State", field: "state", width: 150, filter: "agSetColumnFilter" },
  ];

  return (
    <div className="storeManager">
      <AddStoreModal storeToEdit={storeToEdit} setStoreToEdit={setStoreToEdit} />

      <div className="ag-theme-quartz" style={{ height: "75%", width: "100vw" }}>
        <AgGridReact
          rowData={gridData}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, sortable: true, filter: true }}
          rowModelType="clientSide"
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default StoreManager;
