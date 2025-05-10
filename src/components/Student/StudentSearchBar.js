import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search className="h-5 w-5" />
      </div>
    </div>
  )
}
