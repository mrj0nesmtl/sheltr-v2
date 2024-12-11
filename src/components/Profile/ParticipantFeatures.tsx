import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { QRCode } from '@/components/ui/QRCode';

interface ParticipantData {
  qrCode: string;
  services?: Array<{
    id: string;
    name: string;
    progress: number;
    startDate: string;
  }>;
  appointments?: Array<{
    id: string;
    title: string;
    type: string;
    date: string;
    location: string;
  }>;
}

export function ParticipantFeatures({ participant }: { participant: ParticipantData }) {
  const handleDownloadQR = () => {
    const svg = document.querySelector('.qr-code svg') as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      // Download PNG
      const downloadLink = document.createElement('a');
      downloadLink.download = 'SHELTR-QRCode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="space-y-6">
      {/* QR Code Card */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Your QR Code</h3>
        </Card.Header>
        <Card.Content className="flex flex-col items-center">
          <div className="qr-code">
            <QRCode
              value={participant.qrCode}
              size={200}
              className="mb-4"
              bgColor="transparent"
              fgColor="#fff"
            />
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleDownloadQR}
          >
            <Icon name="download" className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </Card.Content>
      </Card>

      {/* Service Progress */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Service Progress</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {participant.services?.map((service: any) => (
              <div key={service.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{service.name}</span>
                  <span className="text-white">{service.progress}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${service.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium text-white">Upcoming Appointments</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {participant.appointments?.map((appointment: any) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={appointment.type} className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-white">{appointment.title}</p>
                    <p className="text-sm text-gray-400">{appointment.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white">
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(appointment.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
} 