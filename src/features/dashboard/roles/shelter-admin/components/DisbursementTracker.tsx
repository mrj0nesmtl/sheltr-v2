import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Calendar, DollarSign, User } from 'lucide-react'

interface Disbursement {
  id: string
  participant: string
  amount: number
  purpose: string
  status: 'completed' | 'pending' | 'failed'
  date: string
}

const mockDisbursements: Disbursement[] = [
  {
    id: '1',
    participant: 'John Doe',
    amount: 250,
    purpose: 'Housing Assistance',
    status: 'completed',
    date: '2024-01-15'
  },
  {
    id: '2',
    participant: 'Jane Smith',
    amount: 150,
    purpose: 'Food Voucher',
    status: 'pending',
    date: '2024-01-20'
  },
  // Add more mock data
]

export const DisbursementTracker = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-white">Recent Disbursements</h3>
          <p className="text-sm text-gray-400">Track and manage participant disbursements</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <DollarSign className="w-4 h-4 mr-2" />
          New Disbursement
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Participant</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockDisbursements.map((disbursement) => (
            <TableRow key={disbursement.id}>
              <TableCell className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                {disbursement.participant}
              </TableCell>
              <TableCell>${disbursement.amount}</TableCell>
              <TableCell>{disbursement.purpose}</TableCell>
              <TableCell>
                <Badge variant={
                  disbursement.status === 'completed' ? 'success' :
                  disbursement.status === 'pending' ? 'warning' : 'destructive'
                }>
                  {disbursement.status}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(disbursement.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 