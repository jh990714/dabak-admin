/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React from "react";
import Icon from "@mui/material/Icon";

import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useState } from "react";
import { ReviewResponseDialog } from "../dialog/reviewResponseDialog";

const expandedContent = (rowData) => {
  const handleEditNoteIconClick = () => {
    console.log("ggg");
  };
  return (
    <>
      <ul className="mb-4 p-2 overflow-y-auto max-h-60 gap-y-2">
        {rowData.response.map((res, index) => (
          <li key={index} className="flex mb-4 gap-4">
            ⤷
            <MDTypography width={"100%"} display="flex" flexDirection="column">
              <span className="text-sm">{new Date(res.responseDate).toLocaleString()} </span>
              <MDInput
                value={res.responseText}
                multiline
                rows={3}
                fullWidth
                maxWidth={"xl"}
                readOnly
              />
            </MDTypography>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 p-2 border-y">
        ⤷
        <MDInput label={"답변작성"} multiline rows={3} fullWidth={true} maxWidth={"xl"} />
        <IconButton aria-label="send response" onClick={handleEditNoteIconClick}>
          <EditNoteIcon />
        </IconButton>
      </div>
    </>
  );
};

export default function data({ customDatas }) {
  const [rowData, setRowData] = useState(customDatas[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(customDatas.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(customDatas.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(customDatas[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(customDatas.length).fill(null));
  };

  const handleDialog = (type) => {
    setDialogType(type);
    setDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogType(null);
    setDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const ExpandableText = ({ text, maxLength }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        <span className={`flex ${expanded ? "flex-wrap max-w-96" : ""} text-left`}>
          {expanded ? text : text.length > maxLength ? text.slice(0, maxLength) + "..." : text}
        </span>
        {text.length > maxLength && (
          <button className="text-blue-500" onClick={() => setExpanded(!expanded)}>
            {expanded ? "간략히 보기" : "더 보기"}
          </button>
        )}
      </div>
    );
  };
  const dataColumns = [
    { Header: "작성자", accessor: "memberName", align: "left" },
    { Header: "상품명", accessor: "productName", align: "left" },
    { Header: "옵션명", accessor: "optionName", align: "center" },
    {
      Header: "리뷰",
      accessor: "contents",
      align: "center",
      Cell: ({ cell: { value } }) => <ExpandableText text={value} maxLength={32} />,
    },
    { Header: "별점", accessor: "score", align: "center" },
    { Header: "작성일", accessor: "reviewDate", align: "center" },
    { Header: "Best", accessor: "isBest", align: "center" },
    { Header: "orderNumber", accessor: "orderNumber", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const transformDataForReview = (customDatas) => {
    return customDatas.map((data, index) => ({
      memberName: data.memberName,
      productName: data.productName,
      optionName: data.optionName,
      contents: data.contents,
      score: data.score,
      reviewDate: new Date(data.reviewDate).toLocaleString(),
      isBest: data.isBest,
      orderNumber: data.orderNumber,
      response: data.response,
      action: (
        <>
          <IconButton
            aria-label="more"
            onClick={(e) => {
              handleClick(e, index);
            }}
          >
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEls[index]} open={Boolean(anchorEls[index])} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleDialog("response");
              }}
            >
              답변 달기
            </MenuItem>
            <MenuItem onClick={handleClose}>상세 정보</MenuItem>
            <MenuItem onClick={handleClose}>
              {rowData.isBest ? "Best 리뷰 해제" : "Best 리뷰 등록"}
            </MenuItem>
          </Menu>
          <ReviewResponseDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={dialogs[index] && dialogType === "response"}
            onClose={handleDialogClose}
          />
        </>
      ),
    }));
  };

  return {
    columns: dataColumns,

    rows: transformDataForReview(customDatas),

    expanded: expandedContent,
  };
}
