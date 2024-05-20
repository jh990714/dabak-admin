import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";

import { format, parseISO } from "date-fns";
import { fetchUpdateDealProducts } from "reducers/slices/dealProductSlice";

export const ProductDealsEditDialog = ({ rowData, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const dataColumns = [
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "추가 할인", accessor: "dealPrice", align: "center" },
    { Header: "시작 시간", accessor: "startDate", align: "center" },
    { Header: "종료 시간", accessor: "endDate", align: "center" },
  ];

  const [data, setData] = useState(rowData);
  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  const handleSubmit = () => {
    dispatch(fetchUpdateDealProducts(data))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogTitle>행 수정</DialogTitle>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="error"
          >
            <MDTypography variant="h6" color="white">
              타임 특가 상품
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{
                columns: dataColumns,
                rows: [
                  {
                    product: (
                      <MDTypography
                        display="block"
                        variant="button"
                        fontWeight="medium"
                        ml={1}
                        lineHeight={1}
                      >
                        {data?.product.name}
                      </MDTypography>
                    ),
                    dealPrice: (
                      <MDInput
                        type="number"
                        label="추가할인"
                        value={data?.dealPrice}
                        onChange={(e) => {
                          const newData = { ...data, dealPrice: e.target.value };
                          setData(newData);
                        }}
                      />
                    ),
                    startDate: (
                      <MDInput
                        type="datetime-local" // datetime 형식을 사용
                        label="시작 시간"
                        value={format(parseISO(data.startDate), "yyyy-MM-dd'T'HH:mm")}
                        onChange={(e) => {
                          const newData = { ...data, startDate: e.target.value };
                          setData(newData);
                        }}
                      />
                    ),
                    endDate: (
                      <MDInput
                        type="datetime-local" // datetime 형식을 사용
                        label="종료 시간"
                        value={format(parseISO(data.endDate), "yyyy-MM-dd'T'HH:mm")}
                        onChange={(e) => {
                          const newData = { ...data, endDate: e.target.value };
                          setData(newData);
                        }}
                      />
                    ),
                  },
                ],
              }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
            />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

ProductDealsEditDialog.propTypes = {
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      dealPrice: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ),
  setRowData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};