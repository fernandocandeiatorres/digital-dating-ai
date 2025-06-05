import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit3,
  Save,
  X,
  Heart,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || ""
  );

  const handleAuthClick = () => {
    navigate("/auth");
  };

  const handleSaveProfile = async () => {
    try {
      // Aqui você pode implementar a atualização do perfil no Supabase
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stats = [
    {
      icon: MessageSquare,
      label: "Conversas Iniciadas",
      value: "23",
      color: "text-blue-400",
    },
    {
      icon: Heart,
      label: "Matches Ajudados",
      value: "8",
      color: "text-red-400",
    },
    {
      icon: BarChart3,
      label: "Taxa de Sucesso",
      value: "85%",
      color: "text-green-400",
    },
  ];

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-gray-900/5 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <Header onAuthClick={handleAuthClick} />

      <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Header do Perfil */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-red-300 bg-clip-text text-transparent">
              Meu Perfil
            </h1>
            <p className="text-gray-300 text-lg">
              Gerencie suas informações e preferências
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card de Informações Pessoais */}
            <Card className="border-2 border-gradient-to-r from-red-500/30 via-pink-500/30 to-red-500/30 bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span>Informações Pessoais</span>
                  </div>

                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:bg-red-400/20"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSaveProfile}
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:bg-green-400/20"
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:bg-gray-400/20"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Nome */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Nome de exibição</Label>
                  {isEditing ? (
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  ) : (
                    <p className="text-white font-medium text-lg">
                      {displayName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  <p className="text-gray-400">{user.email}</p>
                </div>

                {/* Data de cadastro */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Membro desde</span>
                  </Label>
                  <p className="text-gray-400">
                    {user.created_at ? formatDate(user.created_at) : "N/A"}
                  </p>
                </div>

                {/* Verificação */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Status da conta</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.email_confirmed_at
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                    ></div>
                    <span
                      className={`text-sm ${
                        user.email_confirmed_at
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {user.email_confirmed_at
                        ? "Verificado"
                        : "Pendente verificação"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card de Estatísticas */}
            <Card className="border-2 border-gradient-to-r from-red-500/30 via-pink-500/30 to-red-500/30 bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <span>Suas Estatísticas</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                        <span className="text-gray-300">{stat.label}</span>
                      </div>
                      <span className={`font-bold text-xl ${stat.color}`}>
                        {stat.value}
                      </span>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-gray-700/30">
                  <p className="text-sm text-gray-400 text-center">
                    Continue usando o RizzGPT para melhorar suas estatísticas!
                    🚀
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl"
            >
              Voltar ao Chat
            </Button>

            <Button
              onClick={signOut}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3 rounded-xl"
            >
              Sair da Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
