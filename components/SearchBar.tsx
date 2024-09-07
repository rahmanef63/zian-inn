import { Search, Filter } from 'lucide-react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import FilterDialog from './FilterDialog'

// shadcn/ui components used:
// - Button
// - Input
// - Dialog
// - DialogContent
// - DialogHeader
// - DialogTitle
// - DialogTrigger

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="flex items-center justify-center max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Cari lokasi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-r-none"
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-l-none">
            <Filter className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Pencarian</DialogTitle>
          </DialogHeader>
          <FilterDialog />
        </DialogContent>
      </Dialog>
      <Button className="ml-2">
        <Search className="h-4 w-4 mr-2" />
        Cari
      </Button>
    </div>
  )
}