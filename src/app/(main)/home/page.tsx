'use client';
import useCryptoStore from '@/store/crypto';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptos } from '@/lib/module/crypto';
import TableView from '@/app/(main)/component/view/table-view';
import PaginationButtons from '@/components/common/pagination-buttons';
import useMediaQuery from '@/hooks/useMediaQuery';
import CardView from '@/app/(main)/component/view/card-view';

const Home = () => {
  const { cryptos, setCryptos, page, limit, enabled, setEnabled, _hydrated } = useCryptoStore((state) => state);

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

  const isDesktop = useMediaQuery('(min-width: 840px)');
  const isLoadingData = useMemo(() => isLoading || cryptos.length === 0, [isLoading, cryptos]);
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="py-12 px-4">
      {isDesktop ? <TableView loading={isLoadingData} cryptoList={cryptos} /> : <CardView loading={isLoadingData} cryptoList={cryptos} />}

      <PaginationButtons />
    </div>
  );
};

export default Home;
