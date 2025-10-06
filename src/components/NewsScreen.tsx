import React from 'react';
import { ArrowLeft, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NewsScreenProps {
  onBack: () => void;
  selectedArticle?: {
    title: string;
    summary: string;
    date: string;
    content?: string;
    category?: string;
    readTime?: string;
  };
  onArticleSelect?: (article: any) => void;
}

// Función para formatear el contenido markdown
function formatContent(content: string) {
  return content.split('\n').map((line, index) => {
    // Títulos con **
    if (line.match(/^\*\*(.+?)\*\*:?$/)) {
      const text = line.replace(/\*\*/g, '');
      return (
        <h3 key={index} className="font-bold mt-4 mb-2" style={{ color: '#5c509d' }}>
          {text}
        </h3>
      );
    }
    
    // Texto en negrita dentro de una línea
    if (line.includes('**')) {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="mb-2 leading-relaxed" style={{ color: '#606060' }}>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} style={{ color: '#5c509d' }}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    }
    
    // Listas con •
    if (line.trim().startsWith('•')) {
      return (
        <li key={index} className="ml-4 mb-1 leading-relaxed" style={{ color: '#606060' }}>
          {line.trim().substring(1).trim()}
        </li>
      );
    }
    
    // Listas con -
    if (line.trim().match(/^-\s/)) {
      return (
        <li key={index} className="ml-4 mb-1 leading-relaxed" style={{ color: '#606060' }}>
          {line.trim().substring(1).trim()}
        </li>
      );
    }
    
    // Líneas vacías
    if (line.trim() === '') {
      return <div key={index} className="h-2" />;
    }
    
    // Texto normal
    return (
      <p key={index} className="mb-2 leading-relaxed" style={{ color: '#606060' }}>
        {line}
      </p>
    );
  });
}

export function NewsScreen({ onBack, selectedArticle, onArticleSelect }: NewsScreenProps) {
  const allNews = [
    {
      title: "CuidApp detecta nuevas amenazas en apps populares",
      summary: "Nuestro sistema de análisis ha identificado contenido inapropiado en aplicaciones que han ganado popularidad recientemente entre los jóvenes.",
      date: "15 Sep 2025",
      category: "Seguridad",
      readTime: "3 min",
      content: `CuidApp ha identificado varias aplicaciones que han mostrado un aumento preocupante en contenido potencialmente dañino para menores. Nuestro sistema de análisis automático ha detectado patrones que incluyen:

• Contenido violento no etiquetado apropiadamente
• Interacciones sociales sin moderación adecuada  
• Publicidad dirigida a menores de manera inapropiada
• Funciones de chat sin controles parentales

Como padres, es importante estar al tanto de estas tendencias y usar herramientas como CuidApp para evaluar el contenido antes de permitir que sus hijos lo usen.

**Recomendaciones:**
- Revisa regularmente las aplicaciones instaladas en los dispositivos de tus hijos
- Usa la función de verificación de CuidApp antes de permitir nuevas descargas
- Mantén conversaciones abiertas sobre seguridad digital

La seguridad digital es una responsabilidad compartida entre padres, desarrolladores y plataformas.`
    },
    {
      title: "Aplicaciones educativas recomendadas para septiembre",
      summary: "Descubre las mejores apps educativas que combinan diversión y aprendizaje de forma segura, verificadas por CuidApp.",
      date: "12 Sep 2025",
      category: "Educación",
      readTime: "5 min",
      content: `Con el inicio del nuevo año escolar, es el momento perfecto para incorporar aplicaciones educativas que complementen el aprendizaje de tus hijos. CuidApp ha analizado y verificado estas excelentes opciones:

**Recomendadas para niños de 3-6 años:**
• Khan Academy Kids - Matemáticas y lectura básica
• Endless Alphabet - Desarrollo de vocabulario
• Toca Boca World - Creatividad y narrativa

**Para edades de 7-12 años:**
• Scratch Jr. - Introducción a la programación
• Duolingo Kids - Aprendizaje de idiomas
• BrainPOP Jr. - Ciencias y estudios sociales

**Adolescentes (13+ años):**
• Photomath - Ayuda con matemáticas avanzadas
• Coursera - Cursos universitarios
• Anki - Técnicas de memorización

Todas estas aplicaciones han pasado por nuestro sistema de verificación y han obtenido calificación verde (seguro) en nuestro semáforo de seguridad.`
    },
    {
      title: "Cómo hablar con tus hijos sobre seguridad digital",
      summary: "Consejos de expertos para mantener conversaciones abiertas sobre los riesgos en línea y usar CuidApp como herramienta educativa.",
      date: "10 Sep 2025",
      category: "Consejos",
      readTime: "4 min",
      content: `Hablar de seguridad digital con los hijos puede parecer desafiante, pero es una conversación esencial en la era digital. Aquí te compartimos estrategias efectivas:

**1. Comienza temprano y adapta el mensaje**
- Niños pequeños (3-7): Habla sobre "extraños" en línea
- Preadolescentes (8-12): Explica sobre privacidad y información personal
- Adolescentes (13+): Discute reputación digital y consecuencias

**2. Usa herramientas como apoyo**
CuidApp puede ser tu aliado en estas conversaciones:
- Muestra a tus hijos cómo funciona el semáforo de seguridad
- Revisen juntos aplicaciones usando CuidApp
- Explica por qué ciertas apps tienen diferentes niveles de riesgo

**3. Establece reglas claras pero flexibles**
- Horarios de uso de dispositivos
- Aplicaciones permitidas y prohibidas
- Consecuencias por romper las reglas

**4. Mantén la comunicación abierta**
- No castigues inmediatamente si reportan algo preocupante
- Agradece cuando vengan a ti con dudas
- Revisa regularmente las reglas según crezcan

Recuerda: el objetivo no es asustar, sino educar y empoderar a tus hijos para tomar decisiones seguras en línea.`
    }
  ];

  // Si hay un artículo seleccionado, mostrarlo
  if (selectedArticle) {
    const fullArticle = allNews.find(article => article.title === selectedArticle.title) || selectedArticle;
    
    return (
      <div className="pb-20 px-4 bg-gradient-to-b from-white to-orange-50/30">
        {/* Header */}
        <div className="py-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 p-2 hover:bg-orange-100"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a noticias
          </Button>
        </div>

        {/* Article */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="secondary" style={{ backgroundColor: '#f8b786', color: '#5c509d' }}>
                {fullArticle.category}
              </Badge>
              <div className="flex items-center text-sm" style={{ color: '#606060' }}>
                <Calendar className="w-4 h-4 mr-1" />
                {fullArticle.date}
              </div>
              <div className="flex items-center text-sm" style={{ color: '#606060' }}>
                <Clock className="w-4 h-4 mr-1" />
                {fullArticle.readTime}
              </div>
            </div>
            <CardTitle className="text-2xl leading-tight" style={{ color: '#5c509d' }}>
              {fullArticle.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed" style={{ color: '#606060', fontWeight: '500' }}>
              {fullArticle.summary}
            </p>
            
            <div className="pt-4 border-t-2" style={{ borderColor: '#f8b786' }}>
              <div className="space-y-2">
                {formatContent(fullArticle.content || '')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Vista principal de noticias
  return (
    <div className="pb-20 px-4 bg-gradient-to-b from-white to-orange-50/30">
      {/* Header */}
      <div className="py-6 mb-6 text-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 p-2 hover:bg-orange-100"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </Button>
        
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{ backgroundColor: '#f8b786' }}>
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#5c509d' }}>Noticias y Consejos</h1>
        <p className="max-w-sm mx-auto leading-relaxed" style={{ color: '#606060' }}>
          Mantente informado con las últimas noticias sobre seguridad digital
        </p>
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {allNews.map((article, index) => (
          <Card 
            key={index}
            className="cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl"
            onClick={() => onArticleSelect && onArticleSelect(article)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="text-xs" style={{ backgroundColor: '#f8b786', color: '#5c509d' }}>
                  {article.category}
                </Badge>
                <div className="flex items-center text-sm" style={{ color: '#606060' }}>
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
              </div>
              
              <h3 className="font-semibold mb-2 leading-tight" style={{ color: '#5c509d' }}>
                {article.title}
              </h3>
              
              <p className="text-sm mb-3 leading-relaxed" style={{ color: '#606060' }}>
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm" style={{ color: '#606060' }}>
                  <Calendar className="w-4 h-4 mr-1" />
                  {article.date}
                </div>
                <div className="flex items-center font-medium text-sm" style={{ color: '#f8b786' }}>
                  Leer más
                  <ExternalLink className="w-4 h-4 ml-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}