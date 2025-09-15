import SkeletonLoading from '@/components/common/card-skeleton-loading';

const CardView = ({ cryptoList, loading }) => {
  return loading ? (
    <SkeletonLoading />
  ) : (
    <div className="flex gap-5 flex-col">
      {cryptoList.map((c, index) => (
        <div key={index} className="bg-zinc-8 00 text-white text-xl rounded-2xl shadow-md p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{c.name}</h2>
              <span className="text-gray-400">{c.symbol}</span>
            </div>
            <p>
              <span className="font-semibold pr-2">Market Cap:</span> {c.quotes[0].marketCap}
            </p>
            <p>
              <span className="font-semibold pr-2">Volume(24h):</span> {c.high24h}
            </p>
            <p>
              <span className="font-semibold pr-2">Circulating Supply:</span> {c.circulatingSupply}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
