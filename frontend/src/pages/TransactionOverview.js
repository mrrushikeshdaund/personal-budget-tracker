import { Card } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { getAllTransaction } from "../api";
import { useParams } from "react-router-dom";
import { themeAlpine } from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/userSlice";
import PopUp from "../components/PopUp";
ModuleRegistry.registerModules([AllCommunityModule]);

const TransactionOverview = () => {
  const [rowData, setRowData] = useState([]);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.user);
  const [data, setDate] = useState({});
  const columDef = [
    { field: "category", filter: "agTextColumnFilter" },
    { field: "type", filter: "agTextColumnFilter" },
    { field: "description", filter: "agTextColumnFilter" },
    {
      headerName: "Date",
      field: "date",
      filter: "agDateColumnFilter",
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString(); // e.g., "5/4/2025"
      },
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const cellDate = new Date(cellValue);

          // Compare only the date part
          if (cellDate < filterLocalDateAtMidnight) return -1;
          if (cellDate > filterLocalDateAtMidnight) return 1;
          return 0;
        },
        browserDatePicker: true, // Optional: shows native date picker
      },
    },
    { field: "amount", filter: "agNumberColumnFilter" },
  ];
  const defaultColDef = {
    editable: false,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
  };

  useEffect(() => {
    getAllTransactions();
  }, [open]);

  const handleCellClicked = (event) => {
    console.log(event.data);
    setDate(event.data);
    dispatch(setOpen(true));
  };

  const getAllTransactions = async () => {
    const transactionRecords = await getAllTransaction({ userId });
    setRowData(transactionRecords.data.data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Transactions Overview</h2>
      <Card className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
        <div className="h-[65vh]">
          <AgGridReact
            theme={themeAlpine}
            rowData={rowData}
            columnDefs={columDef}
            defaultColDef={defaultColDef}
            pagination={true}
            onCellClicked={handleCellClicked}
            paginationPageSize={10}
            paginationPageSizeSelector={[5, 10, 20, 50, 100]}
          />
        </div>
      </Card>
      <PopUp data={data} />
    </div>
  );
};

export default TransactionOverview;
