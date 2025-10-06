import React, { useState } from 'react';
import { X, Bell, Shield, AlertTriangle, MessageSquare, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(true);
  const [appUpdates, setAppUpdates] = useState(true);
  const [contentAlerts, setContentAlerts] = useState(true);
  const [quietHours, setQuietHours] = useState(true);
  const [frequency, setFrequency] = useState('immediate');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle style={{ color: '#5c509d' }}>Notificaciones</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tipos de notificaciones */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Tipos de notificaciones</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Alertas de seguridad</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Nuevos riesgos detectados</p>
                </div>
              </div>
              <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Actualizaciones de comunidad</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Nuevos posts y respuestas</p>
                </div>
              </div>
              <Switch checked={communityUpdates} onCheckedChange={setCommunityUpdates} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Actualizaciones de la app</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Nuevas funciones y mejoras</p>
                </div>
              </div>
              <Switch checked={appUpdates} onCheckedChange={setAppUpdates} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Alertas de contenido</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Contenido peligroso detectado</p>
                </div>
              </div>
              <Switch checked={contentAlerts} onCheckedChange={setContentAlerts} />
            </div>
          </div>

          {/* Frecuencia */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Frecuencia de notificaciones</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Frecuencia</p>
                  <p className="text-sm" style={{ color: '#606060' }}>¿Con qué frecuencia recibir notificaciones?</p>
                </div>
              </div>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Inmediato</SelectItem>
                  <SelectItem value="hourly">Cada hora</SelectItem>
                  <SelectItem value="daily">Diario</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Horas silenciosas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Horas silenciosas</p>
                  <p className="text-sm" style={{ color: '#606060' }}>No molestar de 22:00 a 8:00</p>
                </div>
              </div>
              <Switch checked={quietHours} onCheckedChange={setQuietHours} />
            </div>
          </div>

          {/* Vista previa */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Vista previa</h3>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Nueva alerta de seguridad</p>
                  <p className="text-sm text-blue-600">Se detectó contenido potencialmente peligroso en TikTok.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={onClose}
              className="flex-1"
              style={{ backgroundColor: '#5c509d', color: 'white' }}
            >
              Guardar cambios
            </Button>
            <Button 
              variant="outline"
              onClick={onClose}
              className="flex-1"
              style={{ color: '#5c509d', borderColor: '#5c509d' }}
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}