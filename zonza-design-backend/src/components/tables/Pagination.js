import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";

const Pagination = ({ pageChangeHandler, totalRows, rowsPerPage }) => {
    // Calculating max number of pages
    const noOfPages = Math.ceil(totalRows / rowsPerPage);

    // Creating an array with length equal to no.of pages
    const pagesArr = [...new Array(noOfPages)];

    // State variable to hold the current page. This value is
    // passed to the callback provided by the parent
    const [currentPage, setCurrentPage] = useState(1);

    // Navigation arrows enable/disable state
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);

    // Onclick handlers for the butons
    const onNextPage = () => setCurrentPage(currentPage + 1);
    const onPrevPage = () => setCurrentPage(currentPage - 1);
    const onPageSelect = (pageNo) => setCurrentPage(pageNo);

    // Disable previous and next buttons in the first and last page
    // respectively
    useEffect(() => {
        if (noOfPages === currentPage) {
            setCanGoNext(false);
        } else {
            setCanGoNext(true);
        }
        if (currentPage === 1) {
            setCanGoBack(false);
        } else {
            setCanGoBack(true);
        }
    }, [noOfPages, currentPage]);

    // To set the starting index of the page
    useEffect(() => {
        const skipFactor = (currentPage - 1) * rowsPerPage;
        // Some APIs require skip for paginaiton. If needed use that instead
        // pageChangeHandler(skipFactor);
        pageChangeHandler(currentPage);
    }, [currentPage]);

    return (
        <>
            <div
                className="row align-items-center"
                style={{
                    padding: "16px",
                    justifyContent: "space-between",
                }}
            >
                <span className="total-entry">
                    Page{" "}
                    <strong>
                        {currentPage} of {noOfPages}
                    </strong>{" "}
                </span>
                {noOfPages > 1 ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "16px",
                        }}
                    >
                        <div className="Table__pagination">
                            <div className="Table__prevPageWrapper">
                                <button
                                    onClick={onPrevPage}
                                    disabled={!canGoBack}
                                    className="Table__pageButton"
                                >
                                    <ArrowLeft />
                                </button>
                            </div>
                            <div className="Table__visiblePagesWrapper">
                                {pagesArr.map((num, index) => (
                                    <button
                                        onClick={() => onPageSelect(index + 1)}
                                        className={
                                            index + 1 === currentPage
                                                ? "Table__pageButton Table__pageButton--active"
                                                : "Table__pageButton"
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="Table__nextPageWrapper">
                                <button
                                    onClick={onNextPage}
                                    disabled={!canGoNext}
                                    className="Table__pageButton"
                                >
                                    <ArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default Pagination;
