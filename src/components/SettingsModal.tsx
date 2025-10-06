import React, { useState } from 'react';
import { X, Moon, Sun, Volume2, VolumeX, Globe, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [language, setLanguage] = useState('spanish');
  const [autoUpdate, setAutoUpdate] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle style={{ color: '#5c509d' }}>Configuración</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tema */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Apariencia</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="w-5 h-5" style={{ color: '#606060' }} /> : <Sun className="w-5 h-5" style={{ color: '#606060' }} />}
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Modo oscuro</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Cambia el tema de la aplicación</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>

          {/* Idioma */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Idioma</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Idioma de la aplicación</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Cambia el idioma de la interfaz</p>
                </div>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="portuguese">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Notificaciones</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Notificaciones push</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Recibe alertas importantes</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>

          {/* Sonidos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {sounds ? <Volume2 className="w-5 h-5" style={{ color: '#606060' }} /> : <VolumeX className="w-5 h-5" style={{ color: '#606060' }} />}
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Sonidos</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Sonidos de la aplicación</p>
                </div>
              </div>
              <Switch checked={sounds} onCheckedChange={setSounds} />
            </div>
          </div>

          {/* Actualizaciones automáticas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Actualizaciones automáticas</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Mantener la app actualizada</p>
                </div>
              </div>
              <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
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