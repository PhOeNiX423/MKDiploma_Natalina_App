import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse h-full rounded-3xl shadow-md bg-white p-4 flex flex-col">
      <div className="h-[250px] mb-4 bg-gray-200 rounded-xl" />
      <div className="flex-grow space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 bg-gray-200 w-1/3 rounded" />
        <div className="h-10 w-10 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
