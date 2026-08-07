import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FeedSkeleton() {
  return (
    <SkeletonTheme baseColor="#1f2937" highlightColor="#374151">
      <div className="bg-[#0f0f0f] border border-gray-700 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton circle width={40} height={40} />

          <div className="flex flex-col gap-2">
            <Skeleton width={120} height={14} />
            <Skeleton width={80} height={10} />
          </div>
        </div>

        <Skeleton height={15} className="mb-2" />
        <Skeleton height={15} className="mb-2" />
        <Skeleton height={15} width="80%" />

        <div className="flex gap-10 mt-5">
          <div className="flex flex-col items-center gap-2">
            <Skeleton circle width={22} height={22} />
            <Skeleton width={50} height={10} />
          </div>

          <div className="flex flex-col items-center gap-2">
            <Skeleton circle width={22} height={22} />
            <Skeleton width={70} height={10} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
