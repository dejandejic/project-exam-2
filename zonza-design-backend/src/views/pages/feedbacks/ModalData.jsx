import React, { useEffect, useState } from "react";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { ModalHeader, ModalBody, Button } from "reactstrap";
import ModalLoader from "components/common/ModalLoader";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const ModalData = (props) => {
    const {
        token,
        success,
        error,
        isEdit,
        onClose,
        values,
        handleChange,
        handleSubmit,
        setValues,
        isValid,
        handleBlur,
        errors,
        touched,
        submitCount,
        toggleRefresh,
        ailseData,
        aisle_id,
        parent,
        bay_id,
        user,
        setFieldValue,
        type,
        row,
    } = props;


    return (
        <>
            <ModalHeader toggle={() => onClose()}>
                View Details
            </ModalHeader>
            <ModalBody>

                <>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{row.firstname}</td>
                            </tr>
                            <tr>
                                <th>Surname</th>
                                <td>{row.firstname}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{row.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{row.telephone}</td>
                            </tr>
                            <tr>
                                <th>Improve</th>
                                <td>{row.improve}</td>
                            </tr>
                            <tr>
                                <th>Rate</th>
                                <td>{row.rate}</td>
                            </tr>
                        </tbody>
                    </table>
                </>

            </ModalBody>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        ...state.themeChanger,
        token: state.auth.accessToken,
        user: state.auth.user,
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, { success, error, fetching, setuser })
)(ModalData);
