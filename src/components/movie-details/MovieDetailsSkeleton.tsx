
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailsSkeleton = () => {
  return (
    <div className="container-fluid py-8 space-y-8">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-[500px] w-full rounded-lg" />
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
