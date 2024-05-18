import React from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

import DataTable from "examples/Tables/DataTable";
export const ProductEditDialog = ({
  rowData,
  setRowData,
  isOpen,
  handleEditDialogClose,
  handleEditDialogSubmit,
}) => {
  const dataColumns = [
    { Header: "이미지", accessor: "image", align: "left" },
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "정상가", accessor: "regularPrice", align: "center" },
    { Header: "할인", accessor: "salePrice", align: "center" },
    { Header: "최종가", accessor: "finalPrice", align: "center" },
    { Header: "설명", accessor: "description", align: "center" },
    { Header: "재고", accessor: "stockQuantity", align: "center" },
    { Header: "배송비 당 최대 허용 수", accessor: "maxQuantityPerDelivery", align: "center" },
  ];

  return (
    <Dialog open={isOpen} onClose={handleEditDialogClose} fullWidth={true} maxWidth={"xl"}>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              상품 상세 정보
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{
                columns: dataColumns,
                rows: [
                  {
                    image: (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const newData = { ...rowData, image: event.target.result };
                                setRowData(newData);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {rowData?.image && (
                          <img
                            src={rowData.image}
                            alt="Selected Image"
                            className="w-[150px] h-auto object-cover rounded-md mt-2"
                          />
                        )}
                      </>
                    ),
                    product: (
                      <MDInput
                        type="text"
                        label="상품명"
                        value={rowData?.name}
                        onChange={(e) => {
                          const newData = { ...rowData, name: e.target.value };
                          setRowData(newData);
                        }}
                      />
                    ),
                    regularPrice: (
                      <MDInput
                        type="number"
                        label="정상가"
                        value={rowData?.regularPrice}
                        onChange={(e) => {
                          const newData = { ...rowData, regularPrice: e.target.value };
                          setRowData(newData);
                        }}
                      />
                    ),
                    salePrice: (
                      <MDInput
                        type="number"
                        label="할인"
                        value={rowData?.salePrice}
                        onChange={(e) => {
                          const newData = { ...rowData, salePrice: e.target.value };
                          setRowData(newData);
                        }}
                      />
                    ),
                    finalPrice: [rowData?.regularPrice] - [rowData?.salePrice],
                    description: (
                      <MDInput
                        type="text"
                        label="설명"
                        value={rowData?.description}
                        onChange={(e) => {
                          const newData = { ...rowData, description: e.target.value };
                          setRowData(newData);
                        }}
                      />
                    ),
                    stockQuantity: (
                      <MDInput
                        type="number"
                        label="재고"
                        value={rowData?.stockQuantity}
                        onChange={(e) => {
                          const newData = { ...rowData, stockQuantity: e.target.value };
                          setRowData(newData);
                        }}
                      />
                    ),
                    maxQuantityPerDelivery: (
                      <MDInput
                        type="number"
                        label="배송비 당 최대 허용 수"
                        value={rowData?.maxQuantityPerDelivery}
                        onChange={(e) => {
                          const newData = {
                            ...rowData,
                            maxQuantityPerDelivery: e.target.value,
                          };
                          setRowData(newData);
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
        <Button onClick={handleEditDialogClose}>취소</Button>
        <Button onClick={handleEditDialogSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

ProductEditDialog.propTypes = {
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      regularPrice: PropTypes.number.isRequired,
      salePrice: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      stockQuantity: PropTypes.number.isRequired,
      recommended: PropTypes.number.isRequired,
      maxQuantityPerDelivery: PropTypes.number.isRequired,
    })
  ),
  setRowData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleEditDialogClose: PropTypes.func.isRequired,
  handleEditDialogSubmit: PropTypes.func.isRequired,
};