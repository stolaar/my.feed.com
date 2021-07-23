import MaterialPagination from '@material-ui/lab/Pagination'

function Pagination({page,count, onChange}) {
    return <MaterialPagination page={page} count={count} color="primary" onChange={onChange} />
}

export default Pagination
