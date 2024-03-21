import Pagination from "react-bootstrap/esm/Pagination";
interface Props {
  totalPages:number;
  currentPage:number;
  handler: Function;
}
const CatalogPagination = ({totalPages, currentPage = 1, handler}: Props) => {
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => currentPage != number ? handler(number): null}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <>
      <Pagination size="sm" className="justify-content-center">{items}</Pagination>
    </>
  )
}

export default CatalogPagination;