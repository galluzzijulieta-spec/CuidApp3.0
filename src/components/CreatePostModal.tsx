import React, { useState } from 'react';
import { X, AlertTriangle, HelpCircle, MessageSquare, Image, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: any) => void;
}

export function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'pregunta',
    appName: '',
    appLink: '',
    urgency: 'normal'
  });

  const categories = [
    {
      id: 'pregunta',
      label: 'Pregunta',
      icon: HelpCircle,
      description: 'Hacer una consulta a la comunidad',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'alerta',
      label: 'Alerta de Seguridad',
      icon: AlertTriangle,
      description: 'Reportar contenido peligroso',
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'discusion',
      label: 'Discusión',
      icon: MessageSquare,
      description: 'Iniciar una conversación',
      color: 'bg-green-100 text-green-800'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      appName: formData.appName,
      appLink: formData.appLink,
      urgency: formData.urgency,
      author: 'María González', // En una app real vendría del usuario autenticado
      timestamp: 'hace unos segundos',
      replies: 0,
      likes: 0,
      solved: false
    };

    onSubmit(newPost);
    
    // Reset form
    setFormData({
      title: '',
      content: '',
      category: 'pregunta',
      appName: '',
      appLink: '',
      urgency: 'normal'
    });
    
    onClose();
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white/95 backdrop-blur border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            Nueva Publicación
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Comparte tu pregunta, alerta o inicia una discusión con la comunidad de padres
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Tipo de publicación
            </Label>
            <RadioGroup
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              className="space-y-3"
            >
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={category.id} id={category.id} />
                    <label
                      htmlFor={category.id}
                      className="flex items-center space-x-2 cursor-pointer flex-1 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <Icon className="w-4 h-4 text-purple-600" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {category.label}
                        </span>
                        <p className="text-xs text-gray-500">
                          {category.description}
                        </p>
                      </div>
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
              Título
            </Label>
            <Input
              id="title"
              placeholder="¿Cuál es tu consulta o tema?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/80"
              required
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content" className="text-sm font-medium text-gray-700 mb-2 block">
              Descripción
            </Label>
            <Textarea
              id="content"
              placeholder="Describe tu consulta o comparte tu experiencia..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-white/80 min-h-[100px]"
              required
            />
          </div>

          {/* App Info (conditional) */}
          {(formData.category === 'alerta' || formData.category === 'pregunta') && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="appName" className="text-sm font-medium text-gray-700 mb-2 block">
                  Nombre de la aplicación (opcional)
                </Label>
                <Input
                  id="appName"
                  placeholder="Ej: TikTok, YouTube, WhatsApp..."
                  value={formData.appName}
                  onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                  className="bg-white/80"
                />
              </div>

              <div>
                <Label htmlFor="appLink" className="text-sm font-medium text-gray-700 mb-2 block">
                  Enlace (opcional)
                </Label>
                <Input
                  id="appLink"
                  placeholder="https://..."
                  value={formData.appLink}
                  onChange={(e) => setFormData({ ...formData, appLink: e.target.value })}
                  className="bg-white/80"
                />
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={!formData.title.trim() || !formData.content.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}