import Skeleton from '../ui/skeleton';

const CardSkeletonLoading = () => {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 11 }).map((c, index) => (
        <div key={index} className="">
          <Skeleton className="w-full h-[117px] rounded-2xl" />
        </div>
      ))}
    </div>
  );
};

export default CardSkeletonLoading;
