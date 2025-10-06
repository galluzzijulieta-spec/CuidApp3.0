import React, { useState } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';

interface Reply {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
  postAuthor: string;
  postId: string;
  onSubmitReply: (reply: Reply) => void;
  existingReplies?: Reply[];
}

export function ReplyModal({ 
  isOpen, 
  onClose, 
  postTitle, 
  postAuthor,
  postId,
  onSubmitReply,
  existingReplies = []
}: ReplyModalProps) {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newReply: Reply = {
        id: Date.now().toString(),
        content: replyContent.trim(),
        author: 'María González', // En una app real vendría del usuario autenticado
        timestamp: 'hace unos segundos',
        likes: 0,
        isLiked: false
      };
      
      onSubmitReply(newReply);
      setReplyContent('');
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white/95 backdrop-blur border-0 shadow-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-600" />
            Responder Publicación
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Responde a "{postTitle.length > 50 ? postTitle.slice(0, 50) + '...' : postTitle}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
          {/* Original Post Info */}
          <Card className="bg-gray-50/80">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Publicación original de:</p>
              <p className="font-medium text-gray-900">{postAuthor}</p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">{postTitle}</p>
            </CardContent>
          </Card>

          {/* Existing Replies */}
          {existingReplies.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Respuestas anteriores ({existingReplies.length})
              </h4>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {existingReplies.slice(0, 3).map((reply) => (
                  <Card key={reply.id} className="bg-white/60">
                    <CardContent className="p-3">
                      <p className="text-sm text-gray-700">{reply.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {reply.author} • {reply.timestamp}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                {existingReplies.length > 3 && (
                  <p className="text-xs text-gray-500 text-center">
                    ... y {existingReplies.length - 3} respuestas más
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Reply Form */}
          <form onSubmit={handleSubmitReply} className="space-y-4">
            <div>
              <Label htmlFor="reply" className="text-sm font-medium text-gray-700 mb-2 block">
                Tu respuesta
              </Label>
              <Textarea
                id="reply"
                placeholder="Escribe tu respuesta aquí..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="bg-white/80 min-h-[100px] resize-none"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Character count */}
            <div className="text-right">
              <span className={`text-xs ${replyContent.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                {replyContent.length}/500
              </span>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!replyContent.trim() || replyContent.length > 500 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Responder
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}