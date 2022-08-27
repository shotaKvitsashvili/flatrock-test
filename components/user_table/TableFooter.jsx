import React from 'react'

function TableFooter({ dispatch, state }) {
    return (
        <div className="mt-6 flex justify-between font-light">
            <div className="flex items-center">
                <span>Records on page</span>
                <select
                    onChange={e => dispatch({ type: 'PERPAGE_CHANGE', payload: e.target.value })}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </div>

            <div className="flex items-center gap-3">
                <button
                    disabled={state.currentPage === 1}
                    onClick={() => dispatch({ type: 'GO_TO_PREV', payload: state.currentPage })}
                >Prev</button>
                {
                    state.paginationCount.map(count => (
                        <div
                            onClick={() => dispatch({ type: 'GO_TO_PAGE', payload: count + 1 })}
                            className={`
                            table-footer-pagination-btn
                            ${state.currentPage === count + 1 ? 'active pointer-events-none' : ''}
                            text-black
                            font-semibold
                            `}
                        >
                            {count + 1}
                        </div>
                    ))
                }
                <button
                    disabled={state.currentPage === state.paginationCount.length}
                    onClick={() => dispatch({ type: 'GO_TO_NEXT', payload: state.currentPage })}
                >next</button>
            </div>
        </div>
    )
}

export default TableFooter