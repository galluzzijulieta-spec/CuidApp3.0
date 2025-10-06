import React, { useState } from 'react';
import { ArrowLeft, User, Settings, Shield, Bell, HelpCircle, LogOut, Edit3, Plus, FileText, Bookmark, Trash2, Edit } from 'lucide-react';
import { SettingsModal } from './SettingsModal';
import { SecurityModal } from './SecurityModal';
import { NotificationsModal } from './NotificationsModal';
import { HelpModal } from './HelpModal';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ForumPost } from './ForumPost';
import perfilIconoImage from 'figma:asset/a587c54542c9a6f5723946a8f2a810b03a6f61e7.png';
import iconoHijoImage from 'figma:asset/1253d6093a6f08f629415f19b0d741ca2eaecbe3.png';
import iconoHijaImage from 'figma:asset/ecd0e7a17e35b9df5046ecd4236ed902604e582f.png';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
  posts: any[];
  savedPosts: string[];
  onToggleSave: (postId: string) => void;
  onDeletePost: (postId: string) => void;
  onReportPost: (postId: string) => void;
}

export function ProfileScreen({ onBack, onLogout, posts, savedPosts, onToggleSave, onDeletePost, onReportPost }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('María González');
  const [email, setEmail] = useState('maria.gonzalez@email.com');
  const [description, setDescription] = useState('Madre de dos hijos, profesora de primaria. Me preocupo por mantener a mis hijos seguros en el mundo digital.');
  const [familyMembers, setFamilyMembers] = useState([
    { id: '1', name: 'Felipe', relation: 'hijo', age: '5', status: 'Protegido', description: 'Le encantan los dinosaurios y los juegos de memoria.' },
    { id: '2', name: 'Cleo', relation: 'hija', age: '10', status: 'Supervisado', description: 'Está aprendiendo a programar y ama los gatos.' }
  ]);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [newMember, setNewMember] = useState({ name: '', relation: 'hijo', age: '', status: 'Protegido', description: '' });
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'posts', 'saved'
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Filtrar posts del usuario actual
  const currentUser = 'María González';
  const userPosts = posts.filter(post => post.author === currentUser);



  const menuItems = [
    {
      icon: Settings,
      label: 'Configuración',
      description: 'Ajustes de la aplicación',
      action: () => setSettingsOpen(true)
    },
    {
      icon: Shield,
      label: 'Configuración de Seguridad',
      description: 'Controles parentales y privacidad',
      action: () => setSecurityOpen(true)
    },
    {
      icon: Bell,
      label: 'Notificaciones',
      description: 'Alertas y avisos importantes',
      action: () => setNotificationsOpen(true)
    },
    {
      icon: HelpCircle,
      label: 'Ayuda y Soporte',
      description: 'Preguntas frecuentes y contacto',
      action: () => setHelpOpen(true)
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.relation && newMember.age && newMember.status) {
      if (editingMemberId) {
        // Editar miembro existente
        setFamilyMembers(familyMembers.map(member => 
          member.id === editingMemberId ? { ...member, ...newMember } : member
        ));
        setEditingMemberId(null);
      } else {
        // Agregar nuevo miembro
        setFamilyMembers([...familyMembers, {
          id: Date.now().toString(),
          ...newMember
        }]);
      }
      setNewMember({ name: '', relation: 'hijo', age: '', status: 'Protegido', description: '' });
      setIsAddingMember(false);
    }
  };

  const handleEditMember = (member: any) => {
    setNewMember({
      name: member.name,
      relation: member.relation,
      age: member.age,
      status: member.status,
      description: member.description || ''
    });
    setEditingMemberId(member.id);
    setIsAddingMember(true);
  };

  const handleDeleteMember = (memberId: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== memberId));
  };

  const handleCancelEdit = () => {
    setNewMember({ name: '', relation: 'hijo', age: '', status: 'Protegido', description: '' });
    setEditingMemberId(null);
    setIsAddingMember(false);
  };



  return (
    <div className="pb-20 px-4" style={{ backgroundColor: '#b9b1d9', minHeight: '100vh' }}>
      {/* Header */}
      <div className="flex items-center justify-between py-6 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
        <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
        <div className="w-16"></div> {/* Spacer for center alignment */}
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex space-x-2">
        <Button
          variant={activeTab === 'profile' ? 'default' : 'outline'}
          onClick={() => setActiveTab('profile')}
          className="flex-1"
          style={activeTab === 'profile' 
            ? { backgroundColor: '#5c509d', color: 'white' }
            : { color: '#5c509d', borderColor: '#5c509d', backgroundColor: 'white' }
          }
        >
          <User className="w-4 h-4 mr-2" strokeWidth={2.5} />
          Perfil
        </Button>
        <Button
          variant={activeTab === 'posts' ? 'default' : 'outline'}
          onClick={() => setActiveTab('posts')}
          className="flex-1"
          style={activeTab === 'posts' 
            ? { backgroundColor: '#5c509d', color: 'white' }
            : { color: '#5c509d', borderColor: '#5c509d', backgroundColor: 'white' }
          }
        >
          <FileText className="w-4 h-4 mr-2" strokeWidth={2.5} />
          Mis publicaciones
        </Button>
        <Button
          variant={activeTab === 'saved' ? 'default' : 'outline'}
          onClick={() => setActiveTab('saved')}
          className="flex-1"
          style={activeTab === 'saved' 
            ? { backgroundColor: '#5c509d', color: 'white' }
            : { color: '#5c509d', borderColor: '#5c509d', backgroundColor: 'white' }
          }
        >
          <Bookmark className="w-4 h-4 mr-2" strokeWidth={2.5} />
          Mis guardados
        </Button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <>
          {/* Profile Card */}
          <Card className="mb-8 shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden">
                  <img 
                    src={perfilIconoImage}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-xl font-bold"
                        style={{ color: '#5c509d' }}
                      />
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ color: '#606060' }}
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-1" style={{ color: '#5c509d' }}>{name}</h2>
                      <p className="mb-2" style={{ color: '#606060' }}>{email}</p>
                    </>
                  )}
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Padre verificado
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Guardar' : 'Editar'}
                </Button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-medium mb-2" style={{ color: '#5c509d' }}>Descripción</h4>
                {isEditing ? (
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Escribe algo sobre ti..."
                    className="w-full"
                    style={{ color: '#606060' }}
                  />
                ) : (
                  <p style={{ color: '#606060' }}>{description}</p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50/80 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
                  <div className="text-sm" style={{ color: '#606060' }}>Apps verificadas</div>
                </div>
                <div className="text-center p-4 bg-gray-50/80 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">{userPosts.length}</div>
                  <div className="text-sm" style={{ color: '#606060' }}>Posts creados</div>
                </div>
                <div className="text-center p-4 bg-gray-50/80 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{savedPosts.length}</div>
                  <div className="text-sm" style={{ color: '#606060' }}>Posts guardados</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Members */}
          <Card className="mb-8 shadow-lg border-0 bg-white/90 backdrop-blur" style={{ backgroundColor: '#fdf9d7' }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center" style={{ color: '#5c509d' }}>
                <User className="w-5 h-5 mr-2" style={{ color: '#5c509d' }} />
                Miembros de la Familia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <div key={member.id} className="p-3 bg-white/50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={member.relation === 'hijo' ? iconoHijoImage : iconoHijaImage}
                            alt={member.relation === 'hijo' ? 'Icono hijo' : 'Icono hija'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium" style={{ color: '#5c509d' }}>
                            {member.name} ({member.relation})
                          </p>
                          <p className="text-sm" style={{ color: '#606060' }}>{member.age} años</p>
                          {member.description && (
                            <p className="text-sm mt-1 italic" style={{ color: '#606060' }}>
                              "{member.description}"
                            </p>
                          )}
                          <div className="mt-2">
                            <Badge variant="outline" className="text-green-700 border-green-300 text-xs">
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMember(member)}
                          className="h-8 w-8 p-0 text-blue-400 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMember(member.id)}
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add/Edit Member Form */}
                {isAddingMember && (
                  <div className="p-3 bg-white/50 rounded-lg space-y-3">
                    {/* Vista previa del icono según el género seleccionado */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img 
                          src={newMember.relation === 'hijo' ? iconoHijoImage : iconoHijaImage}
                          alt={newMember.relation === 'hijo' ? 'Icono hijo' : 'Icono hija'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm mb-2 block" style={{ color: '#5c509d' }}>Nombre:</label>
                      <Input
                        placeholder="Nombre"
                        value={newMember.name}
                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm mb-2 block" style={{ color: '#5c509d' }}>Relación:</label>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant={newMember.relation === 'hijo' ? 'default' : 'outline'}
                          onClick={() => setNewMember({...newMember, relation: 'hijo'})}
                          className="flex-1"
                          style={newMember.relation === 'hijo' 
                            ? { backgroundColor: '#5c509d', color: 'white' }
                            : { color: '#5c509d', borderColor: '#5c509d' }
                          }
                        >
                          Hijo
                        </Button>
                        <Button
                          type="button"
                          variant={newMember.relation === 'hija' ? 'default' : 'outline'}
                          onClick={() => setNewMember({...newMember, relation: 'hija'})}
                          className="flex-1"
                          style={newMember.relation === 'hija' 
                            ? { backgroundColor: '#5c509d', color: 'white' }
                            : { color: '#5c509d', borderColor: '#5c509d' }
                          }
                        >
                          Hija
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm mb-2 block" style={{ color: '#5c509d' }}>Edad:</label>
                      <Input
                        placeholder="Edad"
                        value={newMember.age}
                        onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block" style={{ color: '#5c509d' }}>Descripción:</label>
                      <Textarea
                        placeholder="Ej: Le encantan los dinosaurios y los juegos de memoria."
                        value={newMember.description}
                        onChange={(e) => setNewMember({...newMember, description: e.target.value})}
                        className="resize-none"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm mb-2 block" style={{ color: '#5c509d' }}>Estado:</label>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant={newMember.status === 'Protegido' ? 'default' : 'outline'}
                          onClick={() => setNewMember({...newMember, status: 'Protegido'})}
                          className="flex-1"
                          style={newMember.status === 'Protegido' 
                            ? { backgroundColor: '#5c509d', color: 'white' }
                            : { color: '#5c509d', borderColor: '#5c509d' }
                          }
                        >
                          Protegido
                        </Button>
                        <Button
                          type="button"
                          variant={newMember.status === 'Supervisado' ? 'default' : 'outline'}
                          onClick={() => setNewMember({...newMember, status: 'Supervisado'})}
                          className="flex-1"
                          style={newMember.status === 'Supervisado' 
                            ? { backgroundColor: '#5c509d', color: 'white' }
                            : { color: '#5c509d', borderColor: '#5c509d' }
                          }
                        >
                          Supervisado
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleAddMember}
                        className="flex-1"
                        style={{ backgroundColor: '#5c509d', color: 'white' }}
                      >
                        {editingMemberId ? 'Guardar cambios' : 'Agregar'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {!isAddingMember && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => setIsAddingMember(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar miembro
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Menu Options */}
          <div className="space-y-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="shadow-lg border-0 bg-white/90 backdrop-blur cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={item.action}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium" style={{ color: '#5c509d' }}>{item.label}</h3>
                        <p className="text-sm" style={{ color: '#606060' }}>{item.description}</p>
                      </div>
                      <div className="text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Logout Button */}
          <Card 
            className="mt-6 shadow-lg border-0 bg-red-50/90 backdrop-blur cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={onLogout}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-3">
                <LogOut className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-600">Cerrar Sesión</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* My Posts Tab */}
      {activeTab === 'posts' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Mis Publicaciones</h2>
          {userPosts.map((post) => (
            <ForumPost
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              timestamp={post.timestamp}
              category={post.category}
              likes={post.likes}
              replies={post.replies}
              isLiked={post.isLiked}
              savedPosts={savedPosts}
              onToggleSave={onToggleSave}
              onDelete={onDeletePost}
              onReport={onReportPost}
            />
          ))}
        </div>
      )}

      {/* Saved Posts Tab */}
      {activeTab === 'saved' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Mis Posts Guardados</h2>
          {posts.filter(post => savedPosts.includes(post.id)).map((post) => (
            <ForumPost
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              timestamp={post.timestamp}
              category={post.category}
              likes={post.likes}
              replies={post.replies}
              isLiked={post.isLiked}
              savedPosts={savedPosts}
              onToggleSave={onToggleSave}
              onDelete={onDeletePost}
              onReport={onReportPost}
            />
          ))}
        </div>
      )}

      {/* Modales */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <SecurityModal isOpen={securityOpen} onClose={() => setSecurityOpen(false)} />
      <NotificationsModal isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}