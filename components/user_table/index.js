import { useSelector } from "react-redux";

import TableRow from "./TableRow.jsx";
import LoaderDots from "../LoaderDots";

import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import useTableData from "../useTableData.js";

function UserTable() {
    const { startIndex, endIndex, dataLength } = useSelector(state => state.pagination)

    const {
        filterData,
        isPending,
        tablePaginationState,
        sortBy,
        reducerDispatch,
        headings
    } = useTableData()
    
    return (
        <div className="w-full pl-0 lg:pl-[calc(theme(side-gap)+20px)]">
            {isPending && <LoaderDots />}

            {
                (dataLength > 0 && !isPending)
                    ?
                    <>
                        <table className="w-full text-[12px] lg:text-base">
                            <thead className="border-b-[#D8D8D8] border-b-2 uppercase">
                                <tr>
                                    {
                                        headings.map((heading, index, arr) => {
                                            const firstItem = index === 0;
                                            const lastItem = index + 1 === headings.length;

                                            return <TableHeader
                                                id={index}
                                                firstItem={firstItem}
                                                lastItem={lastItem}
                                                heading={heading}
                                                sortBy={sortBy}
                                                headings={arr}
                                                key={heading}
                                            />
                                        })
                                    }
                                </tr>
                            </thead>

                            <tbody className="text-center relative">
                                {
                                    filterData?.slice(startIndex, endIndex).map(user => (
                                        user && <>
                                            <tr className={`static lg:absolute -left-[calc(theme(side-gap)-12px)] ${user.status === 'active' ? '' : 'opacity-[.35]'}`}>
                                                <img
                                                    src={user.img}
                                                    alt={user.first_name + ' ' + user.last_name}
                                                    className="mt-[22px] w-[40px] h-[40px] object-cover rounded-full"
                                                />
                                            </tr>
                                            <TableRow user={user} />
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>

                        <TableFooter
                            dispatch={reducerDispatch}
                            state={tablePaginationState}
                        />
                    </>
                    :
                    <div className="text-center text-2xl font-bold">
                        {!isPending && 'No records found'}
                    </div>
            }
        </div>
    )
}

export default UserTable