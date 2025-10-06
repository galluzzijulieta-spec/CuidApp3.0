import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  url?: string;
  onClick?: () => void;
}

export function NewsCard({ title, summary, date, url, onClick }: NewsCardProps) {
  return (
    <Card 
      className={`mb-4 transition-all duration-300 shadow-lg border-0 bg-white/80 backdrop-blur ${
        onClick ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight text-gray-900">{title}</CardTitle>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {date}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          {summary}
        </p>
        <div className="flex items-center text-purple-600 font-medium text-sm">
          Leer más
          <ExternalLink className="w-4 h-4 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
}