import { useState } from "react"

function TableHeader({ firstItem, lastItem, heading, sortBy, headings, id }) {
    const [sortOrder, setSortOrder] = useState('asc')

    return (
        <th className={`${firstItem ? 'pb-6 text-left' : 'pb-6 opacity-[.3]'} ${lastItem ? 'text-right' : ''}`}>
            <div
                className={`flex items-center gap-2 ${lastItem ? 'justify-end ml-auto' : (firstItem ? '' : 'justify-center mx-auto')} w-fit cursor-pointer`}
                onClick={() => {
                    const key = heading === 'user' ? 'first_name' : heading
                    !lastItem && sortBy(key, sortOrder)
                    setSortOrder(
                        sortOrder === 'asc' ? 'desc' : 'asc'
                    )
                }}
            >
                {heading}
                {
                    !lastItem &&
                    <img
                        src="/icons/arrow_down.svg"
                        alt="arrow"
                        className={(sortOrder === 'asc' && headings[id] === heading) ? 'rotate-0' : 'rotate-180'}
                    />
                }
            </div>
        </th>
    )
}

export default TableHeader