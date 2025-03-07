import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css"; // ✅ Use NEW Theming API
// ❌ Remove "ag-grid.css" to avoid conflicts

import { ColDef, ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
} from "ag-grid-community";

// ✅ Register Required Modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule, // ✅ Fixes Pagination Error #200
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]);

const StoreManager: React.FC = () => {
  const storeDetails = useSelector((state: RootState) => state.stores.storeDetails);
  const [gridData, setGridData] = useState<any[]>([]);

  useEffect(() => {
    if (storeDetails.length > 0) {
      setGridData([...storeDetails]);
      console.log("Updated gridData:", storeDetails);
    }
  }, [storeDetails]);

  console.log("Redux Data:", storeDetails);

  const columnDefs: ColDef[] = [
    { headerName: "ID", field: "id", width: 90, filter: "agNumberColumnFilter" },
    { headerName: "Store Name", field: "name",width: 90, filter: "agTextColumnFilter" },
    { headerName: "City", field: "city", width: 90, filter: "agTextColumnFilter" },
    { headerName: "State", field: "state", width: 100, filter: "agSetColumnFilter" },
  ];
  

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  return (
    <div style={{ height: "100vh", width: "80vw" }}>  {/* ✅ Full page width & height */}
      <div className="ag-theme-quartz" style={{ height: "70vh", width: "100%" }}>
        {storeDetails.length === 0 ? (
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

export default StoreManager;
