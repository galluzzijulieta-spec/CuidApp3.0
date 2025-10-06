import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { NewsScreen } from './components/NewsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LoginScreen } from './components/LoginScreen';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [previousSection, setPreviousSection] = useState('home');
  
  // Estado compartido para posts y guardados
  const [savedPosts, setSavedPosts] = useState<string[]>(['1', '3']);
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: '¿Es seguro dejar que mi hijo de 10 años use Minecraft?',
      content: 'Mi hijo quiere jugar Minecraft con sus amigos de la escuela. He escuchado que es educativo, pero también me preocupan los chats online. ¿Alguien tiene experiencia con esto?',
      author: 'María González',
      timestamp: 'Hace 2 horas',
      category: 'pregunta' as const,
      likes: 12,
      replies: 8,
      isLiked: false
    },
    {
      id: '2',
      title: '⚠️ CUIDADO con la app "Chat Random"',
      content: 'Encontré esta aplicación en el teléfono de mi hija adolescente. Permite chatear con extraños aleatoriamente y tiene contenido muy inapropiado. Por favor revisen los teléfonos de sus hijos.',
      author: 'Carlos Ruiz',
      timestamp: 'Hace 5 horas',
      category: 'alerta' as const,
      likes: 45,
      replies: 23,
      isLiked: true
    },
    {
      id: '3',
      title: 'Excelentes apps educativas que he probado con mis hijos',
      content: 'Quería compartir algunas aplicaciones que han funcionado muy bien: Khan Academy Kids (gratis y sin anuncios), Duolingo Kids para idiomas, y ScratchJr para programación básica. Todas son seguras y educativas.',
      author: 'Ana Martínez',
      timestamp: 'Hace 1 día',
      category: 'discusion' as const,
      likes: 34,
      replies: 15,
      isLiked: false
    },
    {
      id: '4',
      title: '¿Cómo configurar controles parentales en el router de casa?',
      content: 'Estoy buscando maneras de controlar el acceso a internet desde casa durante ciertas horas. ¿Alguien sabe cómo configurar esto en el router? Mi proveedor es Movistar.',
      author: 'Roberto Silva',
      timestamp: 'Hace 2 días',
      category: 'pregunta' as const,
      likes: 18,
      replies: 12,
      isLiked: false
    },
    {
      id: '5',
      title: 'Mi experiencia con el tiempo de pantalla y reglas familiares',
      content: 'Después de muchos intentos, logramos establecer reglas claras sobre el tiempo de pantalla. Lo que funcionó fue crear un horario visual y premios por cumplirlo. Comparto nuestras estrategias...',
      author: 'Lucia Fernández',
      timestamp: 'Hace 3 días',
      category: 'discusion' as const,
      likes: 67,
      replies: 29,
      isLiked: false
    }
  ]);

  const handleLogin = (email: string, password: string) => {
    // En una app real, aquí verificarías las credenciales
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection('home');
  };

  const handleToggleSave = (postId: string) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleCreatePost = (newPost: any) => {
    const postWithId = {
      ...newPost,
      id: Date.now().toString(),
      likes: 0,
      replies: 0,
      isLiked: false
    };
    setPosts([postWithId, ...posts]);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const handleReportPost = (postId: string) => {
    // En una app real, aquí se enviaría la denuncia al backend
    console.log('Publicación denunciada:', postId);
  };

  const handleSectionChange = (section: string) => {
    if (section !== activeSection) {
      setPreviousSection(activeSection);
      setActiveSection(section);
    }
  };

  const handleBackToSection = (targetSection?: string) => {
    const sectionToNavigateTo = targetSection || previousSection;
    setActiveSection(sectionToNavigateTo);
    if (targetSection) {
      setPreviousSection('home');
    }
  };

  // Si no está logueado, mostrar pantalla de login
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderActiveScreen = () => {
    switch (activeSection) {
      case 'home':
        return <HomeScreen onSectionChange={handleSectionChange} onNewsClick={(article) => {
          setSelectedArticle(article);
          setPreviousSection('home');
          setActiveSection('news');
        }} />;
      case 'search':
        return <SearchScreen />;
      case 'community':
        return <CommunityScreen 
          onSectionChange={handleSectionChange}
          onNewsClick={(article) => {
            setSelectedArticle(article);
            setPreviousSection('community');
            setActiveSection('news');
          }}
          posts={posts}
          savedPosts={savedPosts}
          onToggleSave={handleToggleSave}
          onCreatePost={handleCreatePost}
          onDeletePost={handleDeletePost}
          onReportPost={handleReportPost}
        />;
      case 'profile':
        return <ProfileScreen 
          onBack={() => handleBackToSection('home')} 
          onLogout={handleLogout}
          posts={posts}
          savedPosts={savedPosts}
          onToggleSave={handleToggleSave}
          onDeletePost={handleDeletePost}
          onReportPost={handleReportPost}
        />;
      case 'news':
        return <NewsScreen 
          onBack={() => {
            setSelectedArticle(null);
            handleBackToSection();
          }} 
          selectedArticle={selectedArticle}
          onArticleSelect={(article) => setSelectedArticle(article)}
        />;
      default:
        return <HomeScreen onSectionChange={handleSectionChange} onNewsClick={(article) => {
          setSelectedArticle(article);
          setPreviousSection('home');
          setActiveSection('news');
        }} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-md mx-auto bg-white/40 backdrop-blur-sm min-h-screen shadow-2xl border-x border-white/20">
          {renderActiveScreen()}
          <Navigation 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange} 
          />
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}