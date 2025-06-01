import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { PostsProvider } from "@/contexts/PostsContext";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha";
import AdminLogin from "./pages/AdminLogin";
import ContatoOng from "./pages/ContatoOng";
import Historico from "./pages/Historico";
import Curtidas from "./pages/Curtidas";
import Ocultos from "./pages/Ocultos";
import Perfil from "./pages/Perfil";
import DadosUsuario from "./pages/DadosUsuario";
import NovaPostagem from "./pages/NovaPostagem";
import Notificacoes from "./pages/Notificacoes";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pata-amiga-theme">
      <AuthProvider>
        <PostsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/esqueci-senha" element={<EsqueciSenha />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/curtidas" element={<Layout><Curtidas /></Layout>} />
                <Route path="/historico" element={<Layout><Historico /></Layout>} />
                <Route path="/ocultos" element={<Layout><Ocultos /></Layout>} />
                <Route path="/contato-ong" element={<Layout><ContatoOng /></Layout>} />
                <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
                <Route path="/perfil/:username" element={<Layout><Perfil /></Layout>} />
                <Route path="/dados-usuario" element={<Layout><DadosUsuario /></Layout>} />
                <Route path="/notificacoes" element={<Layout><Notificacoes /></Layout>} />
                <Route path="/nova-postagem" element={<Layout><NovaPostagem /></Layout>} />
                <Route path="/post/:postId" element={<Layout><PostDetail /></Layout>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PostsProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
