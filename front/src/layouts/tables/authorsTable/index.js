import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import authorsTableData from "layouts/tables/authorsTable/data/authorsTableData";
import { AddCouponDialog } from "./dialog/addCouponDialog";
import { AddPointsDialog } from "./dialog/addPointsDialog";
import DataTable from "examples/Tables/DataTable";
import { useSelector } from "react-redux";

function AuthorsTable() {
  const { dataColumns: columns, dataRows: rows } = authorsTableData();
  const [addPointsSelectRows, setAddPointsSelectRows] = useState(false);
  const [addCouponSelectRows, setAddCouponSelectRows] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const { status } = useSelector((state) => state.members);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleShowAddPointsDialog = () => {
    setAddPointsSelectRows(!addPointsSelectRows);
  };

  const handleShowAddCouponDialog = () => {
    setAddCouponSelectRows(!addCouponSelectRows);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Grid item xs={12}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
        >
          <MDTypography variant="h5" color="white">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>사용자</span>
              <div>
                <MDButton variant="h2" color="white" onClick={handleShowAddPointsDialog}>
                  적립금 추가
                </MDButton>
                <MDButton variant="h2" color="white" onClick={handleShowAddCouponDialog}>
                  쿠폰 추가
                </MDButton>
              </div>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox p={3}>
          <DataTable
            table={{ columns: columns, rows: rows }}
            isSorted={true}
            entriesPerPage={true}
            pagination={{ variant: "gradient", color: "info" }}
            showTotalEntries={true}
            canSearch={true}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
          />
        </MDBox>
      </Card>
      <AddCouponDialog
        isOpen={addCouponSelectRows}
        onClose={() => setAddCouponSelectRows(!addCouponSelectRows)}
      />
      <AddPointsDialog
        isOpen={addPointsSelectRows}
        onClose={() => setAddPointsSelectRows(!addPointsSelectRows)}
      />
    </Grid>
  );
}

export default AuthorsTable;