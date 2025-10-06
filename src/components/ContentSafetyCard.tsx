import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SafetyMeter } from './SafetyMeter';

interface ContentSafetyCardProps {
  title: string;
  description: string;
  riskLevel: 'safe' | 'caution' | 'danger';
  contentType: string;
  url?: string;
  reasons: string[];
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export function ContentSafetyCard({
  title,
  description,
  riskLevel,
  contentType,
  url,
  reasons,
  isExpanded = false,
  onToggleExpand
}: ContentSafetyCardProps) {
  
  // Map titles to banner images
  const getBannerImage = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('tiktok')) {
      return 'https://images.unsplash.com/photo-1597075095386-87bdd1ee195c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWt0b2slMjBhcHAlMjBtb2JpbGUlMjBwaG9uZXxlbnwxfHx8fDE3NTgzNDMxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (titleLower.includes('youtube')) {
      return 'https://images.unsplash.com/photo-1679094837433-32484a621c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwa2lkcyUyMGNoaWxkcmVuJTIwYXBwfGVufDF8fHx8MTc1ODM0MzIwMnww&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (titleLower.includes('minecraft')) {
      return 'https://images.unsplash.com/photo-1741151749309-8bb17563c701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBnYW1lJTIwYmxvY2tzfGVufDF8fHx8MTc1ODM0MzIwNnww&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (titleLower.includes('roblox')) {
      return 'https://images.unsplash.com/photo-1690233644210-b4687715a6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2Jsb3glMjBnYW1pbmclMjBwbGF0Zm9ybXxlbnwxfHx8fDE3NTgzNDMyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (titleLower.includes('discord')) {
      return 'https://images.unsplash.com/photo-1644035525230-61eae56969da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNjb3JkJTIwZ2FtaW5nJTIwY2hhdCUyMGFwcHxlbnwxfHx8fDE3NTgzNDMyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (titleLower.includes('duolingo')) {
      return 'https://images.unsplash.com/photo-1673515335018-161c1708676c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW9saW5nbyUyMGxhbmd1YWdlJTIwbGVhcm5pbmclMjBhcHB8ZW58MXx8fHwxNzU4MzQzMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (titleLower.includes('khan academy')) {
      return 'https://images.unsplash.com/photo-1623863568368-69e4cbe6cc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGFuJTIwYWNhZGVteSUyMGVkdWNhdGlvbiUyMGFwcHxlbnwxfHx8fDE3NTgzNDMyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (titleLower.includes('among us')) {
      return 'https://images.unsplash.com/photo-1640187128454-1d7c462ede26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbW9uZyUyMHVzJTIwZ2FtZSUyMG1vYmlsZXxlbnwxfHx8fDE3NTgzNDMyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (titleLower.includes('instagram')) {
      return 'https://images.unsplash.com/photo-1611262588024-d12430b98920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
    } else if (titleLower.includes('google')) {
      return 'https://images.unsplash.com/photo-1573804633927-7aca2f2b7f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
    }
    // Default banner for unknown content
    return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
  };

  const bannerImage = getBannerImage(title);

  return (
    <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src={bannerImage}
          alt={`Banner de ${title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <Badge variant="secondary" className="bg-white/90" style={{ color: '#606060' }}>
            {contentType}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3 px-5 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl leading-tight" style={{ color: '#5c509d' }}>{title}</CardTitle>
          {url && (
            <Button variant="ghost" size="sm" style={{ color: '#5c509d' }} className="hover:bg-blue-50">
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 px-5 pb-7">
        {/* Safety Meter - Alineado a la izquierda con separación del borde */}
        <div className="mb-7 pl-2">
          <SafetyMeter level={riskLevel} size="md" />
        </div>
        
        {/* Descripción general */}
        <p className="mb-7 leading-relaxed" style={{ color: '#606060' }}>
          {description}
        </p>
        
        {/* Detalles de seguridad - Siempre visible */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center">
            <Info className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#5c509d' }} />
            <span className="font-medium" style={{ color: '#5c509d' }}>Detalles de seguridad:</span>
          </div>
          
          <ul className="space-y-3.5 pl-1">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="leading-relaxed text-sm" style={{ color: '#606060' }}>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}