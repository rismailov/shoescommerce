import {
    IconChevronLeft,
    IconChevronRight,
    IconDots,
} from '@tabler/icons-react'
import ReactPaginate from 'react-paginate'
import classes from './Pagination.module.css'

export const Pagination = ({
    total,
    page,
    onPageChange,
}: {
    total: number
    page: number
    onPageChange: (page: number) => void
}) => {
    // a wrapper to simplify things
    const handlePage = ({ selected }: { selected: number }) =>
        // workaround to make page index start from 1 instead of 0
        // https://github.com/AdeleD/react-paginate/issues/35
        onPageChange(selected + 1)

    return (
        <ReactPaginate
            // workaround to make page index start from 1 instead of 0
            // https://github.com/AdeleD/react-paginate/issues/35
            forcePage={page - 1}
            onPageChange={handlePage}
            pageCount={total}
            pageRangeDisplayed={1}
            marginPagesDisplayed={3}
            breakLabel={<IconDots className="sprite sprite-sm opacity-70" />}
            previousLabel={<IconChevronLeft className="sprite sprite-md" />}
            nextLabel={<IconChevronRight className="sprite sprite-md" />}
            renderOnZeroPageCount={null}
            className="flex items-center space-x-2"
            previousLinkClassName={classes.button}
            nextLinkClassName={classes.button}
            pageLinkClassName={classes.button}
            activeLinkClassName="!bg-primary text-primary-foreground border-primary"
            breakClassName="px-2"
        />
    )
}
