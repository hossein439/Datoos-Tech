import useCryptoStore from '@/store/crypto';

const PaginationButtons = () => {
  const { page, setPage, limit, setLimit, setEnabled } = useCryptoStore((state) => state);
  const handlePagination = (page: number) => {
    setPage(page);
    setEnabled(true);
  };

  const toggleMore = (limit: number) => {
    setLimit(limit);
    setEnabled(true);
  };
  return (
    <div className="flex gap-4 justify-center mt-4">
      <button
        className="px-4 cursor-pointer py-2 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => handlePagination(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      {limit === 10 ? (
        <button className="px-4 cursor-pointer py-2 bg-gray-200 rounded" onClick={() => toggleMore(50)}>
          Show More
        </button>
      ) : (
        <button className="px-4 cursor-pointer py-2 bg-gray-200 rounded" onClick={() => toggleMore(10)}>
          Show Less
        </button>
      )}

      <button className="px-4 cursor-pointer py-2 bg-gray-200 rounded" onClick={() => handlePagination(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
