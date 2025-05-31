
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ContatoOng from "./pages/ContatoOng";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pata-amiga-theme">
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
            <Route path="/curtidas" element={<Layout><Home /></Layout>} />
            <Route path="/historico" element={<Layout><Home /></Layout>} />
            <Route path="/ocultos" element={<Layout><Home /></Layout>} />
            <Route path="/contato-ong" element={<Layout><ContatoOng /></Layout>} />
            <Route path="/perfil" element={<Layout><Home /></Layout>} />
            <Route path="/dados-usuario" element={<Layout><Home /></Layout>} />
            <Route path="/notificacoes" element={<Layout><Home /></Layout>} />
            <Route path="/nova-postagem" element={<Layout><Home /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
