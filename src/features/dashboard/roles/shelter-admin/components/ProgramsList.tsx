import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/Table'
import { Plus } from 'lucide-react'

interface Program {
  id: string
  name: string
  type: string
  participants: number
  status: 'active' | 'inactive'
}

export const ProgramsList = () => {
  const [programs, setPrograms] = useState<Program[]>([])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">Active Programs</h3>
          <p className="text-sm text-gray-400">Track and manage assistance programs</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Program
        </Button>
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableCell className="text-slate-300">Program Name</TableCell>
              <TableCell className="text-slate-300">Type</TableCell>
              <TableCell className="text-slate-300">Participants</TableCell>
              <TableCell className="text-slate-300">Status</TableCell>
              <TableCell className="text-slate-300">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-slate-700">
              <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                No active programs
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 