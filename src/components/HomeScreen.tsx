import React from 'react';
import { Search, Users, Shield, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { NewsCard } from './NewsCard';


interface HomeScreenProps {
  onSectionChange: (section: string) => void;
  onNewsClick: (article: any) => void;
}

export function HomeScreen({ onSectionChange, onNewsClick }: HomeScreenProps) {
  const shortcuts = [
    {
      id: 'search',
      title: 'Verificar Contenido',
      description: 'Busca apps, videos y sitios web',
      icon: Search,
      gradient: '',
      backgroundColor: '#ffffff',
      textColor: '#af1575',
      iconColor: '#af1575'
    },
    {
      id: 'community',
      title: 'Comunidad de Padres',
      description: 'Comparte experiencias y consejos',
      icon: Users,
      gradient: '',
      backgroundColor: '#ffffff',
      textColor: '#af1575',
      iconColor: '#af1575'
    }
  ];

  const news = [
    {
      title: "CuidApp detecta nuevas amenazas en apps populares",
      summary: "Nuestro sistema de análisis ha identificado contenido inapropiado en aplicaciones que han ganado popularidad recientemente entre los jóvenes.",
      date: "15 Sep 2025"
    },
    {
      title: "Aplicaciones educativas recomendadas para septiembre",
      summary: "Descubre las mejores apps educativas que combinan diversión y aprendizaje de forma segura, verificadas por CuidApp.",
      date: "12 Sep 2025"
    },
    {
      title: "Cómo hablar con tus hijos sobre seguridad digital",
      summary: "Consejos de expertos para mantener conversaciones abiertas sobre los riesgos en línea y usar CuidApp como herramienta educativa.",
      date: "10 Sep 2025"
    }
  ];

  return (
    <div className="pb-20 px-4" style={{ backgroundColor: '#fdf9d7', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-8 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#5c509d' }}>CuidApp</h1>
        <p className="max-w-sm mx-auto leading-relaxed" style={{ color: '#606060' }}>
          Tu compañero inteligente para mantener a tus hijos seguros en el mundo digital
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <div className="flex items-center mb-6">
          <Sparkles className="w-5 h-5 mr-2" style={{ color: '#5c509d' }} />
          <h2 className="text-xl font-semibold" style={{ color: '#5c509d' }}>Accesos rápidos</h2>
        </div>
        <div className="space-y-3">
          {shortcuts.map((shortcut) => {
            const Icon = shortcut.icon;
            return (
              <Card
                key={shortcut.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg border-0"
                style={{ backgroundColor: shortcut.backgroundColor }}
                onClick={() => onSectionChange(shortcut.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl" style={{ backgroundColor: `${shortcut.iconColor}15` }}>
                        <Icon className="w-6 h-6" style={{ color: shortcut.iconColor }} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1" style={{ color: shortcut.textColor, fontWeight: 'bold' }}>
                        {shortcut.title}
                      </h3>
                      <p className="text-xs" style={{ color: '#606060' }}>
                        {shortcut.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* News Section */}
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-5 h-5 mr-2" style={{ color: '#5c509d' }} />
          <h2 className="text-xl font-semibold" style={{ color: '#5c509d' }}>Noticias y consejos</h2>
        </div>
        <div className="space-y-4">
          {news.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              summary={article.summary}
              date={article.date}
              onClick={() => onNewsClick(article)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}