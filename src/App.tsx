
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ContatoOng from "./pages/ContatoOng";
import Historico from "./pages/Historico";
import Curtidas from "./pages/Curtidas";
import Ocultos from "./pages/Ocultos";
import Perfil from "./pages/Perfil";
import DadosUsuario from "./pages/DadosUsuario";
import NovaPostagem from "./pages/NovaPostagem";
import Notificacoes from "./pages/Notificacoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pata-amiga-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/mais-curtidos" element={<Layout><Home /></Layout>} />
              <Route path="/denunciados" element={<Layout><Home /></Layout>} />
              <Route path="/curtidas" element={<Layout><Curtidas /></Layout>} />
              <Route path="/historico" element={<Layout><Historico /></Layout>} />
              <Route path="/ocultos" element={<Layout><Ocultos /></Layout>} />
              <Route path="/contato-ong" element={<Layout><ContatoOng /></Layout>} />
              <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
              <Route path="/dados-usuario" element={<Layout><DadosUsuario /></Layout>} />
              <Route path="/notificacoes" element={<Layout><Notificacoes /></Layout>} />
              <Route path="/nova-postagem" element={<Layout><NovaPostagem /></Layout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
