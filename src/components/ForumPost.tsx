import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, AlertTriangle, Clock, HelpCircle, ChevronDown, ChevronUp, Bookmark, Trash2, Flag, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ReplyModal } from './ReplyModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from 'sonner@2.0.3';

interface Reply {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface ForumPostProps {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  category: 'pregunta' | 'alerta' | 'discusion';
  likes: number;
  replies: number;
  isLiked?: boolean;
  savedPosts: string[];
  onToggleSave: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onReport?: (postId: string) => void;
}

export function ForumPost({ 
  id,
  title, 
  content, 
  author, 
  timestamp, 
  category, 
  likes, 
  replies,
  isLiked = false,
  savedPosts,
  onToggleSave,
  onDelete,
  onReport
}: ForumPostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [postReplies, setPostReplies] = useState<Reply[]>([
    // Mock replies for demonstration
    {
      id: '1',
      content: 'Mi hijo también juega Minecraft y he notado que es bastante educativo. Lo que hago es supervisar con quién juega online y usar los servidores privados.',
      author: 'Luis Fernández',
      timestamp: 'hace 1 hora',
      likes: 5,
      isLiked: false
    },
    {
      id: '2', 
      content: 'Te recomiendo activar el modo multijugador solo para amigos conocidos. Así reduces el riesgo de interacciones con desconocidos.',
      author: 'Carmen Torres',
      timestamp: 'hace 30 minutos',
      likes: 3,
      isLiked: false
    }
  ]);
  const [replyCount, setReplyCount] = useState(replies);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState<string | null>(null);
  
  // Estados para edición
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editedReplyContent, setEditedReplyContent] = useState('');

  // Usuario actual (mock - en una app real vendría del contexto de autenticación)
  const currentUser = 'María González';
  const isOwnPost = author === currentUser;

  const getCategoryConfig = () => {
    switch (category) {
      case 'pregunta':
        return {
          label: 'Pregunta',
          color: 'bg-blue-100 text-blue-800',
          icon: HelpCircle
        };
      case 'alerta':
        return {
          label: 'Alerta',
          color: 'bg-red-100 text-red-800',
          icon: AlertTriangle
        };
      case 'discusion':
        return {
          label: 'Discusión',
          color: 'bg-green-100 text-green-800',
          icon: MessageCircle
        };
    }
  };

  const config = getCategoryConfig();
  const CategoryIcon = config.icon;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleReplyLike = (replyId: string) => {
    setPostReplies(prevReplies => 
      prevReplies.map(reply => 
        reply.id === replyId 
          ? { 
              ...reply, 
              isLiked: !reply.isLiked,
              likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
            }
          : reply
      )
    );
  };

  const handleSubmitReply = (newReply: Reply) => {
    setPostReplies(prev => [newReply, ...prev]);
    setReplyCount(prev => prev + 1);
    if (!showReplies) {
      setShowReplies(true);
    }
  };

  const handleDeletePost = () => {
    if (onDelete) {
      onDelete(id);
      toast.success('Publicación eliminada correctamente');
    }
    setShowDeleteDialog(false);
  };

  const handleDeleteReply = (replyId: string) => {
    setPostReplies(prev => prev.filter(reply => reply.id !== replyId));
    setReplyCount(prev => prev - 1);
    setReplyToDelete(null);
    toast.success('Comentario eliminado correctamente');
  };

  const handleReportPost = () => {
    if (onReport) {
      onReport(id);
      toast.success('Publicación denunciada. Nuestro equipo la revisará pronto.');
    }
    setShowReportDialog(false);
  };

  const handleEditPost = () => {
    setIsEditingPost(true);
  };

  const handleSavePost = () => {
    // En una app real, aquí se actualizaría el post en el backend
    setIsEditingPost(false);
    toast.success('Publicación actualizada correctamente');
  };

  const handleCancelEditPost = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditingPost(false);
  };

  const handleEditReply = (reply: Reply) => {
    setEditingReplyId(reply.id);
    setEditedReplyContent(reply.content);
  };

  const handleSaveReply = (replyId: string) => {
    setPostReplies(prevReplies => 
      prevReplies.map(reply => 
        reply.id === replyId 
          ? { ...reply, content: editedReplyContent }
          : reply
      )
    );
    setEditingReplyId(null);
    setEditedReplyContent('');
    toast.success('Comentario actualizado correctamente');
  };

  const handleCancelEditReply = () => {
    setEditingReplyId(null);
    setEditedReplyContent('');
  };

  const isSaved = savedPosts.includes(id);

  return (
    <>
      <Card className="mb-4 shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge className={config.color}>
              <CategoryIcon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm" style={{ color: '#606060' }}>
                <Clock className="w-4 h-4 mr-1" />
                {timestamp}
              </div>
              {/* Botones de acción directos */}
              {isOwnPost ? (
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-blue-400 hover:text-blue-600 hover:bg-blue-50"
                    onClick={handleEditPost}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-orange-400 hover:text-orange-600 hover:bg-orange-50"
                  onClick={() => setShowReportDialog(true)}
                >
                  <Flag className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          {isEditingPost ? (
            <div className="space-y-2">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="font-medium"
                style={{ color: '#5c509d' }}
              />
              <p className="text-sm" style={{ color: '#606060' }}>Por {author}</p>
            </div>
          ) : (
            <>
              <h3 className="text-lg leading-tight" style={{ color: '#5c509d' }}>{editedTitle}</h3>
              <p className="text-sm" style={{ color: '#606060' }}>Por {author}</p>
            </>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          {isEditingPost ? (
            <div className="space-y-3 mb-4">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="resize-none"
                rows={4}
                style={{ color: '#606060' }}
              />
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSavePost}
                  className="flex-1"
                  style={{ backgroundColor: '#5c509d', color: 'white' }}
                >
                  Guardar
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleCancelEditPost}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#606060' }}>
              {editedContent}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  liked ? 'text-green-600 hover:text-green-700' : 'text-gray-500 hover:text-green-600'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span className="text-sm">{likeCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
                onClick={() => setShowReplies(!showReplies)}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{replyCount}</span>
                {replyCount > 0 && (showReplies ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />)}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleSave(id)}
                className="text-gray-500 hover:text-purple-600"
              >
                <Bookmark 
                  className={`w-4 h-4 ${isSaved ? 'fill-current text-purple-600' : ''}`} 
                />
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-green-200 text-green-700 hover:bg-green-50"
              onClick={() => setIsReplyModalOpen(true)}
            >
              Responder
            </Button>
          </div>

          {/* Replies Section */}
          {showReplies && postReplies.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="space-y-3">
                {postReplies.map((reply) => {
                  const isOwnReply = reply.author === currentUser;
                  return (
                    <Card key={reply.id} className="bg-gray-50/80 border-0">
                      <CardContent className="p-3">
                        {editingReplyId === reply.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editedReplyContent}
                              onChange={(e) => setEditedReplyContent(e.target.value)}
                              className="resize-none text-sm"
                              rows={3}
                              style={{ color: '#606060' }}
                            />
                            <div className="flex space-x-2">
                              <Button 
                                onClick={() => handleSaveReply(reply.id)}
                                size="sm"
                                style={{ backgroundColor: '#5c509d', color: 'white' }}
                              >
                                Guardar
                              </Button>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={handleCancelEditReply}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm mb-2" style={{ color: '#606060' }}>{reply.content}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs" style={{ color: '#606060' }}>
                                {reply.author} • {reply.timestamp}
                              </p>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleReplyLike(reply.id)}
                                  className={`flex items-center space-x-1 text-xs transition-colors ${
                                    reply.isLiked ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-green-600'
                                  }`}
                                >
                                  <ThumbsUp className={`w-3 h-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                  <span>{reply.likes}</span>
                                </Button>
                                {isOwnReply && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditReply(reply)}
                                      className="h-6 w-6 p-0 text-blue-400 hover:text-blue-600"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setReplyToDelete(reply.id)}
                                      className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reply Modal */}
      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        postTitle={title}
        postAuthor={author}
        postId={id}
        onSubmitReply={handleSubmitReply}
        existingReplies={postReplies}
      />

      {/* Delete Post Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: '#5c509d' }}>¿Eliminar publicación?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La publicación se eliminará permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePost}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Report Post Dialog */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: '#5c509d' }}>¿Denunciar publicación?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta publicación será revisada por nuestro equipo de moderación. Gracias por ayudarnos a mantener la comunidad segura.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReportPost}
              style={{ backgroundColor: '#f8b786' }}
            >
              Denunciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Reply Dialog */}
      <AlertDialog open={!!replyToDelete} onOpenChange={(open) => !open && setReplyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: '#5c509d' }}>¿Eliminar comentario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El comentario se eliminará permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => replyToDelete && handleDeleteReply(replyToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}