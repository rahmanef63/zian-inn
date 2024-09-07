import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

// shadcn/ui components used:
// - Button
// - Input
// - Label
// - DropdownMenu
// - DropdownMenuContent
// - DropdownMenuItem
// - DropdownMenuTrigger

export default function FilterDialog() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="harga">Harga</Label>
        <Input id="harga" type="range" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tipe">Tipe</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Pilih Tipe</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rumah</DropdownMenuItem>
            <DropdownMenuItem>Apartemen</DropdownMenuItem>
            <DropdownMenuItem>Kost</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button>Terapkan Filter</Button>
    </div>
  )
}