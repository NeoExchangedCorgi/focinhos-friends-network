
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Layout } from "@/components/layout/Layout"
import { AuthProvider } from "@/contexts/AuthContext"
import { PostsProvider } from "@/contexts/PostsContext"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Index from "@/pages/Index"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Cadastro from "@/pages/Cadastro"
import NovaPostagem from "@/pages/NovaPostagem"
import Perfil from "@/pages/Perfil"
import PostDetail from "@/pages/PostDetail"
import Curtidas from "@/pages/Curtidas"
import Historico from "@/pages/Historico"
import Ocultos from "@/pages/Ocultos"
import Tutorial from "@/pages/Tutorial"
import ContatoOng from "@/pages/ContatoOng"
import Notificacoes from "@/pages/Notificacoes"
import DadosUsuario from "@/pages/DadosUsuario"
import EsqueciSenha from "@/pages/EsqueciSenha"
import AdminLogin from "@/pages/AdminLogin"
import NotFound from "@/pages/NotFound"
import "./App.css"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="pata-amiga-theme">
        <AuthProvider>
          <PostsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/index" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/esqueci-senha" element={<EsqueciSenha />} />
                <Route path="/nova-postagem" element={<Layout><NovaPostagem /></Layout>} />
                <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
                <Route path="/perfil/:username" element={<Layout><Perfil /></Layout>} />
                <Route path="/post/:id" element={<Layout><PostDetail /></Layout>} />
                <Route path="/curtidas" element={<Layout><Curtidas /></Layout>} />
                <Route path="/historico" element={<Layout><Historico /></Layout>} />
                <Route path="/ocultos" element={<Layout><Ocultos /></Layout>} />
                <Route path="/tutorial" element={<Layout><Tutorial /></Layout>} />
                <Route path="/contato-ong" element={<Layout><ContatoOng /></Layout>} />
                <Route path="/notificacoes" element={<Layout><Notificacoes /></Layout>} />
                <Route path="/dados-usuario" element={<Layout><DadosUsuario /></Layout>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </Router>
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
