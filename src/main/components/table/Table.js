import { Button, ButtonGroup } from "@material-ui/core";
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@material-ui/icons";
import React from "react";
import classes from "./Table.module.css";
import moment from "moment";
const Table = ({ tableData, isPagination }) => {
    // const getDateTime = async(date) =>{

    // }
    return (
        <div className={classes.TableMain}>
            <table>
                <thead>
                    <tr>
                        {tableData.thRow.map((th, index) => (
                            <th key={index}>{th}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.tdRow.map((td, index) => (
                        <tr key={index} >
                            {td.td1 && <td>{td.td1}</td>}
                            {td.td2 && <td >{td.td2}</td>}
                            {td.td3 && (
                                <td
                                    className={
                                        tableData.thRow.includes("Status") || tableData.thRow.includes("Change $") ? classes.green : null
                                    }
                                >
                                    {td.td3}
                                </td>
                            )}
                            {td.td4 && <td className={tableData.thRow.includes("Amount") ? classes.green : null}>{td.td4}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>

            {isPagination && (
                <ButtonGroup disableElevation className={classes.paginationBtns}>
                    <Button variant="contained">
                        <KeyboardArrowLeftOutlined />
                    </Button>

                    <Button variant="contained">
                        <KeyboardArrowRightOutlined />
                    </Button>
                </ButtonGroup>
            )}
        </div>
    );
};

export default Table;
