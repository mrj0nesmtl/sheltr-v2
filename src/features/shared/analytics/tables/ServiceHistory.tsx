import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui';

interface ServiceHistoryProps {
  limit?: number;
  className?: string;
}

export const ServiceHistory: React.FC<ServiceHistoryProps> = ({
  limit = 5,
  className
}) => {
  // Mock data - replace with real data fetching
  const data = [
    { date: '2024-01-05', service: 'Housing Support', provider: 'Main Shelter', status: 'Completed' },
    { date: '2024-01-03', service: 'Job Training', provider: 'Career Center', status: 'In Progress' },
    { date: '2024-01-01', service: 'Medical Check', provider: 'Health Clinic', status: 'Scheduled' },
  ];

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, limit).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.service}</TableCell>
              <TableCell>{row.provider}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 