import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { User, Filter } from 'lucide-react'

export const ParticipantList = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">Registered Participants</h3>
          <p className="text-sm text-gray-400">Manage participant records and disbursements</p>
        </div>
        <Button variant="outline" className="bg-slate-800 text-white border-slate-700">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableCell className="text-slate-300">Name</TableCell>
              <TableCell className="text-slate-300">Status</TableCell>
              <TableCell className="text-slate-300">Programs</TableCell>
              <TableCell className="text-slate-300">Last Disbursement</TableCell>
              <TableCell className="text-slate-300">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-slate-700">
              <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                No participants registered yet
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-auto">
          <User className="w-4 h-4 mr-2" />
          Onboard New Participant
        </Button>
      </div>
    </div>
  )
}