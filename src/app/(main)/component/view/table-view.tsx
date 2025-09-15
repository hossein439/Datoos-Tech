import SkeletonLoading from '@/components/common/skeletion-loading';

const TableView = ({ cryptoList, loading }) => {
  return loading ? (
    <SkeletonLoading />
  ) : (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-12 items-center gap-5 p-6 text-white border-b border-zinc-600 capitalize">
          <span className="col-span-1 text-xl">#</span>
          <span className="col-span-3 text-2xl font-semibold">Name</span>
          <span className="col-span-3 text-2xl font-semibold">market cap</span>
          <span className="col-span-3 text-2xl font-semibold">Volume(24h)</span>
          <span className="col-span-2 text-2xl font-semibold">Circulating Supply</span>
        </div>
        {cryptoList.map((c, index) => (
          <div key={c.id} className="grid grid-cols-12 items-center gap-5 p-6 text-white text-2xl border-b border-zinc-600">
            <div className="col-span-1 text-xl">{index + 1}</div>
            <h2 className="col-span-3 flex items-center gap-4 font-semibold">
              <span className="capitalize">{c.name}</span>
              <span className="uppercase font-normal text-gray-500">{c.symbol}</span>
            </h2>
            <p className="col-span-3"> ${c.quotes[0].marketCap}</p>
            <div className="col-span-3">{c.high24h}</div>
            <div className="col-span-2">{c.circulatingSupply}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TableView;
