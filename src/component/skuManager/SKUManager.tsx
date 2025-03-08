import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AgGridReact } from "ag-grid-react";
import { MdDelete, MdEdit } from "react-icons/md";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import {removeSKU} from "../../redux/reducers/skuSlice";
import {skuDetailsType} from '../../types/Types';
import AddSkuModal from './addSkuData'


import { ColDef, ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule, // ✅ Fixes Pagination Error #200
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]); 

const SKUManager: React.FC = () => {
  const skuDetails = useSelector((state: RootState) => state.skus.skuDetails);
  const [gridData, setGridData] = useState<any[]>([]);
  const dispatch = useDispatch();
   const [skuToEdit, setSkuToEdit] = useState<skuDetailsType | null | undefined>(null);

  useEffect(() => {
    if (skuDetails.length > 0) {
      setGridData([...skuDetails]);
    }
  }, [skuDetails]);


   const handleDelete = (id: string) => {
      dispatch(removeSKU(id));
    };
  
    const handleEdit = (id: string) => {
      const selectedStore = skuDetails.find((store) => store.id === id);
      if (selectedStore) {
        setSkuToEdit(selectedStore); 
      }
    };

  console.log("Redux Data:", skuDetails);

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
    { headerName: "Sku", field: "label",width: 250, filter: "agTextColumnFilter" },
    { headerName: "Price", field: "price", width: 150, filter: "agTextColumnFilter" },
    { headerName: "Cost", field: "cost", width: 150, filter: "agSetColumnFilter" },
  ];
  

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  return (
    <div className="skuManager">  {/* ✅ Full page width & height */}
      <AddSkuModal skuToEdit={skuToEdit} setSkuToEdit={setSkuToEdit} />
     <div className="ag-theme-quartz" style={{ height: "75%", width: "100vw" }}>
        {skuDetails.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          <AgGridReact
            rowData={gridData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowModelType="clientSide"
            animateRows={true}
            pagination={true}
            paginationPageSize={10}
          />
        )}
      </div>
    </div>
  );
  
};

export default SKUManager;
