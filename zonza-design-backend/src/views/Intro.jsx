import React, { useEffect, useMemo, useState } from "react";
import NavigationActions from "redux/navigation/actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";
import { Modal } from "reactstrap";
import AddDocumentsModal from "./AddDocumentsModal";
import ReactTableWrapper from "components/reacttable/reacttbl.style";
import classNames from "classnames";
import {
  getDocsByCustomerId,
  deleteDocById
} from "services/customerDocsService";
import ConformationModalUser from "components/common/ConformationModalUser";
import { Plus, Trash, Download } from "react-feather";
import Pagination from "components/tables/Pagination";
import Datatable from "components/tables/Datatable";
import moment from "moment";
import { saveAs } from "file-saver";

const { success, error, fetching, getNotificationData } = NavigationActions;
const { setuser } = AuthActions;

const Intro = props => {
  const { token, success, error, fetching, user, isFetching } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const [totalRecords, setTotalRecords] = useState("0");

  const [isOpen, setOpenModal] = useState();
  const [refresh, toggleRefresh] = useState(true);
  const [docsList, setDocsList] = useState([]);
  const [openDeleteModal, toggleDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteID] = useState("");

  const HeaderComponent = props => {
    let classes = {
      "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
      "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc
    };
    return <div className={classNames(classes)}>{props.title}</div>;
  };

  const callApi = async () => {
    fetching();
    await getDocsByCustomerId({
      page: currentPage,
      limit: rowsPerPage
    }).then(data => {
      if (data.success) {
        setDocsList(data.data.data);
        setTotalRecords(data.data.total_records);
        success();
      } else {
        error();
      }
    });

    // eslint-disable-next-line
  };

  const columns = useMemo(
    () => [
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Sr No."
            />
          );
        },
        placeholder: "Serial Number",
        disableFilters: true,
        accessor: "no",
        Cell: tableInstance => (
          <span className="text-capitalize">
            {parseInt(tableInstance.row.id) + 1}
          </span>
        )
      },
      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Document/Image"
            />
          );
        },
        placeholder: "document/image",
        disableFilters: true,
        accessor: "filename",
        Cell: tableInstance => {
          let fileExt = tableInstance.value
            .split(".")
            .pop()
            .toLowerCase();
          let showFile = (fileIcon, fileName) => {
            return (
              <div className="row">
                <div className="col-12">
                  <img
                    className="customer_image"
                    src={fileIcon}
                    alt="pdf-icon"
                  />
                </div>
                <div className="col-12 mt-2">
                  <span>{fileName}</span>
                </div>
              </div>
            );
          };
          let src = `${process.env.REACT_APP_BACKEND_URI_UPLOAD}/${tableInstance.value}`;
          return showFile(src, tableInstance.row.original.original_name);
        }
      },

      {
        Header: tableInstance => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Date"
            />
          );
        },
        placeholder: "Date",
        disableFilters: true,
        accessor: "created_at",
        Cell: tableInstance => (
          <span className="text-capitalize">
            {moment(tableInstance.value).format("DD MMM YYYY, h:mm A")}
          </span>
        )
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
                  saveAs(
                    `${process.env.REACT_APP_BACKEND_URI_UPLOAD}/${tableInstance.row.original.filename}`,
                    tableInstance.row.original.original_name
                  );
                }}
              >
                <Download />
              </button>
              <button
                className="table-action action-delete"
                onClick={() => {
                  toggleDeleteModalOpen(true);
                  setDeleteID(tableInstance.row.original.id);
                }}
              >
                <Trash className="table-icon-edit" />
              </button>
            </div>
          );
        }
      }
    ],
    // eslint-disable-next-line
    [currentPage]
  );

  const deleteClick = () => {
    fetching();
    deleteDocById(token, deleteId).then(res => {
      if (res.success) {
        toggleRefresh(true);
        toggleDeleteModalOpen(false);
        success(res.message);
      } else {
        error(res.message);
      }
    });
  };

  useEffect(() => {
    callApi();
  }, [currentPage]);

  return (
    <div className="container-fluid">
      <div className="row title-sec align-items-center">
        <div className="col-sm headline">Documents</div>
      </div>
      <div className="div-container">
        <div className="row title-sec align-items-center">
          <div className="col-sm-auto ml-auto">
            <button className="btn btn-blue" onClick={() => setOpenModal(true)}>
              <Plus className="mr-2" /> Upload
            </button>
          </div>
        </div>
        <ReactTableWrapper {...props}>
          {/* <h4 class="box-title">User Subscription History</h4> */}
          <div className="table-responsive common-table">
            <Datatable
              columns={columns}
              data={docsList}
              isLoading={isFetching}
            />

            <Pagination
              totalRows={totalRecords}
              pageChangeHandler={setCurrentPage}
              rowsPerPage={rowsPerPage}
            />
          </div>
        </ReactTableWrapper>
      </div>
      <Modal centered isOpen={isOpen} backdrop={true}>
        {isOpen && (
          <AddDocumentsModal
            onClose={() => {
              setOpenModal(false);
            }}
            toggleRefresh={e => toggleRefresh(e)}
            user={user}
          />
        )}
      </Modal>
      <Modal centered isOpen={openDeleteModal} backdrop={true}>
        {openDeleteModal && (
          <ConformationModalUser
            isOpen={openDeleteModal}
            onClose={() => toggleDeleteModalOpen(false)}
            message={"Are you sure you want to delete the file ?"}
            handleConfirm={() => deleteClick()}
          />
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger,
    token: state.auth.accessToken,
    user: state.auth.user,
    workflowData: state.navigation.workflowData,
    isFetching: state.navigation.isFetching
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    success,
    error,
    fetching,
    setuser,
    getNotificationData
  })
)(Intro);
