import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart, Sparkles } from "lucide-react";

export const AuthComponent = () => {
  return (
    <div className="max-w-md mx-auto">
      <Card className="border-2 border-gradient-to-r from-red-500/30 via-pink-500/30 to-red-500/30 bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-12 h-12 text-red-400" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-red-300 bg-clip-text text-transparent">
            Entre no RizzGPT
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Faça login para começar sua jornada amorosa
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#ef4444",
                    brandAccent: "#ec4899",
                    brandButtonText: "white",
                    defaultButtonBackground: "#374151",
                    defaultButtonBackgroundHover: "#4b5563",
                    inputBackground: "#374151",
                    inputBorder: "#6b7280",
                    inputBorderHover: "#ef4444",
                    inputBorderFocus: "#ec4899",
                    inputText: "white",
                    inputLabelText: "#d1d5db",
                    inputPlaceholder: "#9ca3af",
                  },
                  space: {
                    spaceSmall: "4px",
                    spaceMedium: "8px",
                    spaceLarge: "16px",
                    labelBottomMargin: "8px",
                    anchorBottomMargin: "4px",
                    emailInputSpacing: "4px",
                    socialAuthSpacing: "4px",
                    buttonPadding: "10px 15px",
                    inputPadding: "10px 15px",
                  },
                  fontSizes: {
                    baseBodySize: "14px",
                    baseInputSize: "14px",
                    baseLabelSize: "14px",
                    baseButtonSize: "14px",
                  },
                  borderWidths: {
                    buttonBorderWidth: "1px",
                    inputBorderWidth: "1px",
                  },
                  radii: {
                    borderRadiusButton: "8px",
                    buttonBorderRadius: "8px",
                    inputBorderRadius: "8px",
                  },
                },
              },
              className: {
                container: "auth-container",
                button: "auth-button",
                input: "auth-input",
              },
            }}
            providers={["google", "github"]}
            redirectTo={window.location.origin}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email",
                  password_label: "Senha",
                  email_input_placeholder: "Seu email",
                  password_input_placeholder: "Sua senha",
                  button_label: "Entrar",
                  loading_button_label: "Entrando...",
                  social_provider_text: "Entrar com {{provider}}",
                  link_text: "Já tem uma conta? Entre aqui",
                },
                sign_up: {
                  email_label: "Email",
                  password_label: "Senha",
                  email_input_placeholder: "Seu email",
                  password_input_placeholder: "Sua senha",
                  button_label: "Criar conta",
                  loading_button_label: "Criando conta...",
                  social_provider_text: "Cadastrar com {{provider}}",
                  link_text: "Não tem uma conta? Cadastre-se",
                  confirmation_text:
                    "Verifique seu email para confirmar a conta",
                },
                magic_link: {
                  email_input_label: "Email",
                  email_input_placeholder: "Seu email",
                  button_label: "Enviar link mágico",
                  loading_button_label: "Enviando link...",
                  link_text: "Enviar um link mágico por email",
                  confirmation_text: "Verifique seu email para o link de login",
                },
                forgotten_password: {
                  email_label: "Email",
                  password_label: "Senha",
                  email_input_placeholder: "Seu email",
                  button_label: "Enviar instruções",
                  loading_button_label: "Enviando...",
                  link_text: "Esqueceu sua senha?",
                  confirmation_text:
                    "Verifique seu email para redefinir a senha",
                },
                update_password: {
                  password_label: "Nova senha",
                  password_input_placeholder: "Sua nova senha",
                  button_label: "Atualizar senha",
                  loading_button_label: "Atualizando...",
                  confirmation_text: "Sua senha foi atualizada",
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
