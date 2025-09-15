'use client';
import useCryptoStore from '@/store/crypto';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptos } from '@/lib/module/crypto';
import Loading from '@/components/ui/loading';

const Home = () => {
  const { cryptos, setCryptos, page, setPage, limit, setLimit, _hydrated } = useCryptoStore((state) => state);
  const [enabled, setEnabled] = useState(false);

  const { refetch, data, isLoading, isError } = useQuery({
    enabled: enabled,
    queryKey: ['cryptos', page, limit],
    queryFn: () => fetchCryptos({ start: page, limit: limit }),
  });

  useEffect(() => {
    if (data) {
      setCryptos(data?.data?.data?.cryptoCurrencyList);
    }
  }, [data, page, limit]);

  useEffect(() => {
    if (_hydrated && cryptos.length === 0) {
      setEnabled(true);
      refetch();
    }
  }, [_hydrated]);

  const handlePagination = (page: number) => {
    setPage(page);
    setEnabled(true);
  };

  const toggleMore = (limit: number) => {
    setLimit(limit);
    setEnabled(true);
  };

  if (isLoading && cryptos.length === 0) return <Loading />;
  if (isError) return <p>Error loading data</p>;

  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cryptos.map((c) => (
        <div key={c.id} className="p-4 rounded-xl shadow bg-white">
          <h2 className="font-bold">
            {c.id} {c.name} ({c.symbol})
          </h2>
          <p>Price: ${c.price}</p>
        </div>
      ))}

      <div className="col-span-full flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        {limit === 10 ? (
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => toggleMore(50)}>
            Show More
          </button>
        ) : (
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => toggleMore(10)}>
            Show Less
          </button>
        )}

        <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => handlePagination(page + 1)}>
          Next
        </button>
      </div>
    </main>
  );
};

export default Home;
