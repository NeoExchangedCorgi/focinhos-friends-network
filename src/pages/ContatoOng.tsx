
import { Phone, Mail, Facebook, Instagram, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ContatoOng() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">Paraíso dos Focinhos</h1>
        <p className="text-lg text-muted-foreground">
          Conecte-se conosco e faça parte da nossa missão de proteção animal
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Contatos</span>
            </CardTitle>
            <CardDescription>
              Entre em contato conosco através dos canais oficiais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
                <a href="https://wa.me/5521976090612" target="_blank" rel="noopener noreferrer">
                  <Phone className="h-5 w-5 mr-3 text-green-600" />
                  <div className="text-left">
                    <div className="font-semibold">(21) 97609-0612</div>
                    <div className="text-sm text-muted-foreground">WhatsApp</div>
                  </div>
                </a>
              </Button>

              <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
                <a href="mailto:contato@paraisodosfocinhos.com.br">
                  <Mail className="h-5 w-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold">contato@paraisodosfocinhos.com.br</div>
                    <div className="text-sm text-muted-foreground">E-mail institucional</div>
                  </div>
                </a>
              </Button>

              <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
                <a href="https://www.facebook.com/ongparaisodosfocinhos/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 mr-3 text-blue-700" />
                  <div className="text-left">
                    <div className="font-semibold">@ongparaisodosfocinhos</div>
                    <div className="text-sm text-muted-foreground">Facebook</div>
                  </div>
                </a>
              </Button>

              <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
                <a href="https://www.instagram.com/ongparaisodosfocinhos/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 mr-3 text-pink-600" />
                  <div className="text-left">
                    <div className="font-semibold">@ongparaisodosfocinhos</div>
                    <div className="text-sm text-muted-foreground">Instagram</div>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* About ONG */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Sobre a ONG</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">
                <Clock className="h-3 w-3 mr-1" />
                14 anos de atuação
              </Badge>
              <p className="text-sm text-muted-foreground">
                ONG sem fins lucrativos, fundada em 2011 no bairro de Campo Grande, 
                cidade do Rio de Janeiro. Atuamos no resgate, reabilitação e cuidado 
                de animais de rua ou em situação de risco.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Nossa Infraestrutura:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• +500 animais sob cuidados</li>
                <li>• 3 sítios com 7.000m² cada</li>
                <li>• 120 baias com até 50m²</li>
                <li>• 4 gatis e 3 enfermarias equipadas</li>
                <li>• 1 haras para cavalos resgatados</li>
                <li>• Centro médico veterinário completo</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="text-xl font-bold">Faça Parte da Nossa Missão</h3>
          <p>
            Ajude-nos a proteger e cuidar dos animais em situação de vulnerabilidade. 
            Sua contribuição faz toda a diferença!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary" asChild>
              <a href="https://wa.me/5521976090612" target="_blank" rel="noopener noreferrer">
                Quero Ajudar
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="mailto:contato@paraisodosfocinhos.com.br">
                Entrar em Contato
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
