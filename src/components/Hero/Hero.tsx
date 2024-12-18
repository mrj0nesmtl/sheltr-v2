import { Button } from '@/components/ui/Button';
import { Icon, IconName } from '@/components/ui/Icon';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Feature {
  title: string;
  description: string;
  icon: IconName;
  color: string;
}

export function Hero() {
  const { t } = useTranslation();


  return (
    <div className="bg-primary text-primary">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">
          {t('hero.title')}
        </h1>
        <Button
          variant="outline"
          size="lg"
          asChild
        >
          <Link to="/blockchain/whitepaper">
            <Icon name="file-text" className="mr-2 h-5 w-5" />
            {t('hero.readWhitepaper')}
          </Link>
        </Button>
        {/* Rest of hero content */}
      </div>
    </div>
  );
} 