import style from "./Pagination.module.css";

export const Pagination = ({
    totalItems,
    itemsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className={style.pagination}>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? style.active : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};
