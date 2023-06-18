import "./Pagination.css";

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }: { totalPosts: number; postsPerPage: number; setCurrentPage:any; currentPage:number;}): JSX.Element {
    let pages = [];

    for(let i = 1; i<= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className="Pagination">
            {pages.map((page, index) => {
                return<button key={index} onClick={() => setCurrentPage(page)} className=
                {page == currentPage ? 'active' : ''}>
                    {page}
                </button>
            })}

            </div>
    )

           

        }


export default Pagination;





