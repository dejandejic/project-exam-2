import React, { useMemo, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import classnames from "classnames";
import {
    all
} from "services/feedbackServices";
import NavigationActions from "redux/navigation/actions";
import { compose } from "redux";
import AuthActions from "redux/auth/actions";
import Pagination from "components/tables/Pagination";
import Datatable from "components/tables/Datatable";
import { Eye } from "react-feather";
import ModalData from "./ModalData";
import { Modal } from "reactstrap";

const { success, error, fetching } = NavigationActions;
const { setuser } = AuthActions;

const HeaderComponent = props => {
    let classes = {
        "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
        "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
    };
    return <div className={classnames(classes)}>{props.title}</div>;
};

const Feedbacks = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    const { token, success, error, fetching, user, isFetching } = props;
    const [Contacts, setContacts] = useState([]);
    const [totalRecords, setTotalRecords] = useState("0");

    const [isOpen, setIsOpen] = useState(false)
    const [ModelData, setModelData] = useState(null);


    const columns = useMemo(
        () => [
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="First Name"
                        />
                    );
                },
                placeholder: "First Name",
                disableFilters: true,
                accessor: 'firstname'
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Surname"
                        />
                    );
                },
                placeholder: "Surname",
                disableFilters: true,
                accessor: "surname"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Email"
                        />
                    );
                },
                placeholder: "Email",
                disableFilters: true,
                accessor: "email"
            },

            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Telephone"
                        />
                    );
                },
                placeholder: "Telephone",
                disableFilters: true,
                accessor: "telephone"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Rate"
                        />
                    );
                },
                placeholder: "Rate",
                disableFilters: true,
                accessor: "rate"
            },
            {
                Header: tableInstance => {
                    return (
                        <HeaderComponent
                            isSortedDesc={tableInstance.column.isSortedDesc}
                            title="Action"
                        />
                    );
                },
                accessor: "id",
                disableSortBy: true,
                disableFilters: true,
                Cell: tableInstance => {
                    return (
                        <div className="react-action-class">
                            <button
                                className="table-action action-download"

                                onClick={() => {
                                    setIsOpen(true);
                                    setModelData(tableInstance.row.original)
                                }}
                            >
                                <Eye />
                            </button>

                        </div>
                    );
                }
            }
        ],
        // eslint-disable-next-line
        [currentPage]
    );

    const callApi = async () => {
        const params = {
            page: currentPage,
            limit: rowsPerPage
        };


        await all(params).then(data => {
            if (!data.error) {
                setContacts(data.data.data);
                setTotalRecords(data.data.total_records);
            } else {
                error(data.message);
            }
        });
        // eslint - disable - next - line;
    };

    useEffect(() => {
        callApi();
    }, [currentPage]);


    return (
        <>
            <div className="container-fluid">
                <div className="row title-sec align-items-center">
                    <div className="col-sm headline">Contacts</div>
                    <div className="col-sm-auto ml-auto"></div>
                </div>

                <div className="div-container">
                    <ReactTableWrapper {...props}>
                        <div className="row title-sec align-items-center">
                            <div className="col-md-auto ml-auto mt-3 mt-md-0">

                            </div>
                        </div>

                        <div className="table-responsive common-table">
                            <Datatable
                                columns={columns}
                                data={Contacts}
                                isLoading={isFetching}
                            />

                            <Pagination
                                totalRows={totalRecords}
                                pageChangeHandler={setCurrentPage}
                                rowsPerPage={rowsPerPage}
                            />

                            <Modal centered isOpen={isOpen} backdrop={true}>
                                {isOpen && (
                                    <ModalData
                                        onClose={() => {
                                            setIsOpen(false);
                                            setModelData(false);
                                        }}
                                        row={ModelData}
                                    />
                                )}
                            </Modal>
                        </div>

                    </ReactTableWrapper>
                </div>
            </div>

        </>
    );
};

const mapStateToProps = state => {
    return {
        ...state.themeChanger,
        token: state.auth.accessToken,
        user: state.auth.user,
        isFetching: state.navigation.isFetching
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, { success, error, fetching, setuser })
)(Feedbacks);
