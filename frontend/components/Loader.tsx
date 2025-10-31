export default function Loader() {
    return (
      <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="w-[280px] h-[270px] bg-gray-200 rounded-xl shadow-inner"
          >
            <div className="h-[170px] bg-gray-300 rounded-t-xl"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  