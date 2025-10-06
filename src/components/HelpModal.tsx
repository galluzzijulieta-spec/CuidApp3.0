import React, { useState } from 'react';
import { X, HelpCircle, MessageCircle, Mail, Phone, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState('faq');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const faqs = [
    {
      question: "¿Cómo funciona el sistema de verificación de Navi?",
      answer: "Navi utiliza una combinación de inteligencia artificial y revisión humana para evaluar aplicaciones, sitios web y contenido digital. Analizamos factores como contenido apropiado para la edad, privacidad, interacciones sociales y riesgos potenciales."
    },
    {
      question: "¿Qué significan los colores del semáforo de seguridad?",
      answer: "Verde 🟢 significa seguro para niños, Amarillo 🟡 indica precaución y supervisión recomendada, y Rojo 🔴 señala contenido potencialmente peligroso que debe evitarse."
    },
    {
      question: "¿Puedo reportar contenido peligroso que encontré?",
      answer: "¡Absolutamente! Puedes reportar contenido usando la función 'Reportar' en cualquier evaluación, o contactándonos directamente. Tu reporte ayuda a mejorar la seguridad de toda la comunidad."
    },
    {
      question: "¿Cómo configuro controles parentales en el dispositivo de mi hijo?",
      answer: "Cada dispositivo tiene diferentes opciones. En iOS, usa 'Tiempo en pantalla'. En Android, utiliza 'Family Link'. También recomendamos configurar controles en el router de casa para protección adicional."
    },
    {
      question: "¿Es gratis usar Navi?",
      answer: "Sí, las funciones básicas de Navi son completamente gratuitas. Esto incluye verificación de contenido, acceso a la comunidad y alertas de seguridad básicas."
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle style={{ color: '#5c509d' }}>Ayuda y Soporte</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tabs */}
          <div className="flex space-x-2">
            <Button
              variant={activeTab === 'faq' ? 'default' : 'outline'}
              onClick={() => setActiveTab('faq')}
              className="flex-1"
              style={activeTab === 'faq' 
                ? { backgroundColor: '#5c509d', color: 'white' }
                : { color: '#5c509d', borderColor: '#5c509d' }
              }
            >
              Preguntas frecuentes
            </Button>
            <Button
              variant={activeTab === 'contact' ? 'default' : 'outline'}
              onClick={() => setActiveTab('contact')}
              className="flex-1"
              style={activeTab === 'contact' 
                ? { backgroundColor: '#5c509d', color: 'white' }
                : { color: '#5c509d', borderColor: '#5c509d' }
              }
            >
              Contacto
            </Button>
          </div>

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="font-medium" style={{ color: '#5c509d' }}>Preguntas frecuentes</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger style={{ color: '#5c509d' }}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent style={{ color: '#606060' }}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Enlaces útiles */}
              <div className="space-y-3 mt-6">
                <h4 className="font-medium" style={{ color: '#5c509d' }}>Enlaces útiles</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    style={{ color: '#5c509d', borderColor: '#5c509d' }}
                  >
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Guía de controles parentales
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    style={{ color: '#5c509d', borderColor: '#5c509d' }}
                  >
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Términos y condiciones
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    style={{ color: '#5c509d', borderColor: '#5c509d' }}
                  >
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Política de privacidad
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="font-medium" style={{ color: '#5c509d' }}>Contáctanos</h3>
              
              {/* Opciones de contacto */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  style={{ color: '#5c509d', borderColor: '#5c509d' }}
                >
                  <MessageCircle className="w-4 h-4 mr-3" />
                  Chat en vivo (9:00 - 18:00)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  style={{ color: '#5c509d', borderColor: '#5c509d' }}
                >
                  <Mail className="w-4 h-4 mr-3" />
                  soporte@naviapp.com
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  style={{ color: '#5c509d', borderColor: '#5c509d' }}
                >
                  <Phone className="w-4 h-4 mr-3" />
                  +1 (555) 123-4567
                </Button>
              </div>

              {/* Formulario de contacto */}
              <div className="space-y-4">
                <h4 className="font-medium" style={{ color: '#5c509d' }}>Enviar mensaje</h4>
                <div>
                  <Input
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Describe tu problema o pregunta..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button 
                  className="w-full"
                  style={{ backgroundColor: '#5c509d', color: 'white' }}
                >
                  Enviar mensaje
                </Button>
              </div>

              {/* Tiempo de respuesta */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm" style={{ color: '#606060' }}>
                  📧 Respondemos a todos los mensajes en menos de 24 horas
                </p>
              </div>
            </div>
          )}

          {/* Botón de cerrar */}
          <div className="pt-4">
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full"
              style={{ color: '#5c509d', borderColor: '#5c509d' }}
            >
              Cerrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}