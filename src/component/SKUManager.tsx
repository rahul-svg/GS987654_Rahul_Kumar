import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css"; 


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

  useEffect(() => {
    if (skuDetails.length > 0) {
      setGridData([...skuDetails]);
      console.log("Updated gridData:", skuDetails);
    }
  }, [skuDetails]);

  console.log("Redux Data:", skuDetails);

  const columnDefs: ColDef[] = [
    { headerName: "ID", field: "id", width: 90, filter: "agNumberColumnFilter" },
    { headerName: "Store Name", field: "sku",width: 90, filter: "agTextColumnFilter" },
    { headerName: "City", field: "price", width: 90, filter: "agTextColumnFilter" },
    { headerName: "State", field: "cost", width: 100, filter: "agSetColumnFilter" },
  ];
  

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  return (
    <div style={{ height: "100vh", width: "80vw" }}>  {/* ✅ Full page width & height */}
      <div className="ag-theme-quartz" style={{ height: "70vh", width: "100%" }}>
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
