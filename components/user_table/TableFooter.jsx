import { useDispatch, useSelector } from 'react-redux';

import { perpageChange, goToPrev, goToPage, goToNext } from '../redux/reducers/paginationSlice'

function TableFooter() {
    const dispatch = useDispatch()

    const { currentPage, paginationCount } = useSelector(state => state.pagination)

    return (
        <div className="my-6 flex justify-between font-light">
            <div className="flex items-center">
                <span>Records on page</span>
                <select
                    className='bg-transparent appearance-none bg-[url(/icons/arrow_down.svg)] bg-no-repeat min-w-[30px] outline-none ml-4'
                    style={{ backgroundPosition: 'right center' }}
                    onChange={e => dispatch(perpageChange(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </div>

            <div className="flex items-center gap-3">
                <button
                    disabled={currentPage === 1}
                    onClick={() => dispatch(goToPrev())}
                >Prev</button>
                {
                    paginationCount.map(count => (
                        <div
                            onClick={() => dispatch(goToPage(count + 1))}
                            className={`
                            table-footer-pagination-btn
                            ${currentPage === count + 1 ? 'active pointer-events-none' : ''}
                            text-black
                            font-semibold
                            `}
                            key={count}
                        >
                            {count + 1}
                        </div>
                    ))
                }
                <button
                    disabled={currentPage === paginationCount.length}
                    onClick={() => dispatch(goToNext())}
                >next</button>
            </div>
        </div>
    )
}

export default TableFooter