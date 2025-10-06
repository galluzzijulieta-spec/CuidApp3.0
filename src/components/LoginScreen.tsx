import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#b9b1d9' }}>
      <div className="w-full max-w-md">
        {/* Logo/App Name */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4 shadow-2xl" style={{ backgroundColor: '#5c509d' }}>
            <Lock className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl mb-3" style={{ color: '#5c509d' }}>CuidApp</h1>
          <p className="leading-relaxed" style={{ color: '#606060' }}>
            Mantén a tus hijos seguros en el mundo digital
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-2xl" style={{ color: '#5c509d' }}>
              Iniciar Sesión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" style={{ color: '#5c509d' }}>
                  Correo electrónico
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#606060' }} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white/80 border-2"
                    style={{ borderColor: '#e0d4f7' }}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" style={{ color: '#5c509d' }}>
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#606060' }} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-white/80 border-2"
                    style={{ borderColor: '#e0d4f7' }}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" style={{ color: '#606060' }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: '#606060' }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-white shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#5c509d' }}
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            {/* Demo Info */}
            <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: '#fdf9d7' }}>
              <p className="text-sm text-center mb-2" style={{ color: '#606060' }}>
                <strong>Para demostración:</strong>
              </p>
              <p className="text-xs text-center" style={{ color: '#606060' }}>
                Usa cualquier correo y contraseña para iniciar sesión
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center mt-6 text-sm" style={{ color: '#606060' }}>
          ¿Necesitas ayuda? Contacta con soporte
        </p>
      </div>
    </div>
  );
}