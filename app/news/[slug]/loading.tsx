export default function ArticleLoading() {
  return (
    <div className="max-w-portal mx-auto px-4 py-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-4">
          {/* Kategori */}
          <div className="h-4 w-24 bg-gray-200 rounded" />
          {/* Judul */}
          <div className="h-8 w-full bg-gray-200 rounded" />
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          {/* Meta */}
          <div className="flex gap-3">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
          {/* Gambar */}
          <div className="h-64 w-full bg-gray-200 rounded-xl" />
          {/* Konten */}
          <div className="space-y-3 mt-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-4 bg-gray-200 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
            ))}
          </div>
        </div>
        {/* Sidebar skeleton */}
        <div className="space-y-4 hidden lg:block">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
