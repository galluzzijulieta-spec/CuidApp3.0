import React, { useState } from 'react';
import { X, Shield, Lock, Eye, EyeOff, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timeRestrictions, setTimeRestrictions] = useState(true);
  const [parentalLock, setParentalLock] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle style={{ color: '#5c509d' }}>Configuración de Seguridad</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Autenticación biométrica */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Autenticación</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Autenticación biométrica</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Usar huella digital o Face ID</p>
                </div>
              </div>
              <Switch checked={biometric} onCheckedChange={setBiometric} />
            </div>
          </div>

          {/* Autenticación de dos factores */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Autenticación de dos factores</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Seguridad adicional para tu cuenta</p>
                </div>
              </div>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>
          </div>

          {/* Cambiar contraseña */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Cambiar contraseña</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="current" style={{ color: '#606060' }}>Contraseña actual</Label>
                <div className="relative">
                  <Input
                    id="current"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="new" style={{ color: '#606060' }}>Nueva contraseña</Label>
                <Input
                  id="new"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ingresa nueva contraseña"
                />
              </div>
              <div>
                <Label htmlFor="confirm" style={{ color: '#606060' }}>Confirmar contraseña</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirma nueva contraseña"
                />
              </div>
            </div>
          </div>

          {/* Controles parentales */}
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: '#5c509d' }}>Controles parentales</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Restricciones de tiempo</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Limitar horarios de uso</p>
                </div>
              </div>
              <Switch checked={timeRestrictions} onCheckedChange={setTimeRestrictions} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5" style={{ color: '#606060' }} />
                <div>
                  <p className="font-medium" style={{ color: '#5c509d' }}>Bloqueo parental</p>
                  <p className="text-sm" style={{ color: '#606060' }}>Requiere autorización para cambios</p>
                </div>
              </div>
              <Switch checked={parentalLock} onCheckedChange={setParentalLock} />
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