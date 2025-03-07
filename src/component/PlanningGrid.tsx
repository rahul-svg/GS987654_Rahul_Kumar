import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import planningData from "../mockData/planningData.json"; // Mock data path

import { ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]);

const PlanningGrid: React.FC = () => {
  const [sellData, setSellData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  useEffect(() => {
    // Flatten the data based on weeks and prepare it for the grid
    const flattenedData = planningData
      .map((monthData) =>
        monthData.storesDetails.map((storesData) => {
          // Base object with store, sku, and month
          let rowObj: any = {
            store: storesData.store_name,
            sku: storesData.sku,
            month: monthData.month,
          };

          // Add week-wise data dynamically
          Object.entries(storesData.paymentDetailsWeakWise).forEach(
            ([week, weekWiseData]) => {
              Object.entries(weekWiseData).forEach(([metric, value]) => {
                rowObj[`${week}_${metric}`] = value;
              });
            }
          );

          return rowObj;
        })
      )
      .flat();

    setSellData(flattenedData);

    // Dynamically create column definitions
    const dynamicColumnDefs: any[] = [
      { headerName: "Store", field: "store", sortable: true, filter: true },
      { headerName: "SKU", field: "sku", sortable: true, filter: true },
    ];

    planningData.forEach((monthData) => {
      let monthColumn: any = {
        headerName: monthData.month,
        children: [],
      };

      let weeksColumnList: any[] = [];

      // Loop through weeks dynamically
      Object.keys(monthData.storesDetails[0].paymentDetailsWeakWise).forEach(
        (week) => {
          const weeksColumn: any = {
            headerName: week,
            children: [
              {
                headerName: "Sales Units",
                field: `${week}_sales_units`,
                sortable: true,
              },
              {
                headerName: "Sales Dollars",
                field: `${week}_sales_dollar`,
                sortable: true,
              },
              {
                headerName: "GM Dollars",
                field: `${week}_gm_dollar`,
                sortable: true,
              },
              {
                headerName: "GM Percent",
                field: `${week}_gm_percent`,
                sortable: true,
              },
            ],
          };
          weeksColumnList.push(weeksColumn);
        }
      );

      // Add week columns under the month
      monthColumn.children.push(...weeksColumnList);

      // Add the month column with its week children to the dynamic column definitions
      dynamicColumnDefs.push(monthColumn);
    });

    setColumnDefs(dynamicColumnDefs);
  }, []);

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  return (
    <div style={{ height: "100vh", width: "80vw" }}>
      <div className="ag-theme-quartz" style={{ height: "70vh", width: "100%" }}>
        {sellData.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          <AgGridReact
            rowData={sellData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowModelType="clientSide"
            animateRows={true}
          />
        )}
      </div>
    </div>
  );
};

export default PlanningGrid;
