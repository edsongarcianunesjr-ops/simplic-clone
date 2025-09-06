import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  AlertTriangle,
  X,
  Menu
} from 'lucide-react'
import LoanApplicationForm from './components/LoanApplicationForm.jsx'
import './App.css'

function App() {
  const [loanAmount, setLoanAmount] = useState([2000])
  const [installments, setInstallments] = useState(12)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showCookieNotice, setShowCookieNotice] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoanForm, setShowLoanForm] = useState(false)

  const calculateMonthlyPayment = () => {
    // Simulação simples de cálculo de parcela
    const amount = loanAmount[0]
    const months = installments
    const interestRate = 0.15 // 15% ao ano
    const monthlyRate = interestRate / 12
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1)
    return payment.toFixed(2)
  }

  const handleLoanApplication = () => {
    setShowLoanForm(true)
  }

  const testimonials = [
    {
      name: "Maria S.",
      text: "Já estou no segundo empréstimo. Faço o cadastro num dia e o dinheiro entra na minha conta no dia seguinte."
    },
    {
      name: "Edison A.",
      text: "Funciona e funciona muito bem... Já estou no segundo empréstimo com a Simplic. Estão de parabéns, uma financeira sem burocracia..."
    },
    {
      name: "Luísa R.",
      text: "Estou muito feliz e satisfeita com a Simplic. Já tive meu empréstimo liberado duas vezes, sem burocracia e o dinheiro cai no mesmo dia."
    },
    {
      name: "Sandra S.",
      text: "Faz sim já fiz 3 vezes foi bem simples e rápido, direto na conta no meu caso! Recomento 😉😉😉"
    },
    {
      name: "Lenne O.",
      text: "Funciona mesmo, comigo foi super rápido e fácil em menos de 24 horas o dinheiro tava na conta... Obrigada simplic."
    },
    {
      name: "Ivcosta F.",
      text: "Me ajudou muito! Pagarei a última parcela e espero renovar logo!"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Cookie Notice */}
      {showCookieNotice && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-sm">
              Ao acessar nosso site, você concorda com o uso de cookies para melhorar a sua experiência, bem como para analisar e personalizar conteúdos e anúncios. Leia nossa{' '}
              <a href="#" className="underline">Política de Privacidade</a>.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowCookieNotice(false)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6"
              >
                PROSSEGUIR
              </Button>
              <button 
                onClick={() => setShowCookieNotice(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Fale Conosco!</h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Devido aos últimos acontecimentos relacionados ao COVID-19 contamos com sua compreensão caso o tempo de espera no seu atendimento seja maior do que o habitual. Nosso <strong>atendimento é das 8:00 às 20:00</strong> de seg à sex.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Deixe uma <strong>mensagem abaixo</strong> com a sua dúvida que retornaremos assim que possível!
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" />
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <textarea 
                    id="message"
                    className="w-full p-2 border rounded-md"
                    rows="4"
                    placeholder="Deixe aqui sua mensagem. caracteres máximos 350"
                    maxLength="350"
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Enviar Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Alert Bar */}
      <div className="bg-green-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center text-sm">
          <AlertTriangle className="w-4 h-4 mr-2" />
          <span><strong>Atenção!</strong> Nenhum valor é cobrado antecipadamente pelo seu empréstimo pessoal.</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">
                Simplic
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#como-funciona" className="text-gray-700 hover:text-green-600 transition-colors">
                COMO FUNCIONA
              </a>
              <a href="#quem-somos" className="text-gray-700 hover:text-green-600 transition-colors">
                QUEM SOMOS
              </a>
              <a href="#ajuda" className="text-gray-700 hover:text-green-600 transition-colors">
                AJUDA
              </a>
              <a href="#blog" className="text-gray-700 hover:text-green-600 transition-colors">
                BLOG
              </a>
              <Button 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                ENTRAR
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                <a href="#como-funciona" className="text-gray-700 hover:text-green-600 transition-colors">
                  COMO FUNCIONA
                </a>
                <a href="#quem-somos" className="text-gray-700 hover:text-green-600 transition-colors">
                  QUEM SOMOS
                </a>
                <a href="#ajuda" className="text-gray-700 hover:text-green-600 transition-colors">
                  AJUDA
                </a>
                <a href="#blog" className="text-gray-700 hover:text-green-600 transition-colors">
                  BLOG
                </a>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-fit"
                >
                  ENTRAR
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Image */}
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Imagem da pessoa sorrindo</span>
              </div>
            </div>

            {/* Right side - Loan Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Solicite aqui o seu empréstimo online sem burocracia
              </h1>

              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">1. Quer um empréstimo pessoal de quanto?</h3>
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      R$ {loanAmount[0].toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    max={3500}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>R$ 500</span>
                    <span>R$ 3500</span>
                  </div>
                </div>

                {/* Installments */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">2. Quer pagar em quantas parcelas?</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 9, 12].map((months) => (
                      <button
                        key={months}
                        onClick={() => setInstallments(months)}
                        className={`p-3 border-2 rounded-lg text-center font-semibold transition-colors ${
                          installments === months
                            ? 'border-green-600 bg-green-600 text-white'
                            : 'border-gray-300 hover:border-green-600'
                        }`}
                      >
                        {months}X
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Payment */}
                <div className="text-center">
                  <p className="text-lg">
                    Sua parcela mensal será de <strong>R$ {calculateMonthlyPayment()}</strong>
                  </p>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={handleLoanApplication}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-lg"
                >
                  SOLICITE JÁ!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="bg-green-600 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Como funciona o empréstimo Simplic?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Selecione",
                description: "O valor e a quantidade de parcelas do seu empréstimo pessoal online."
              },
              {
                step: "2", 
                title: "Informe",
                description: "Seus dados cadastrais de forma segura e rápida."
              },
              {
                step: "3",
                title: "Avaliação", 
                description: "Seu pedido de empréstimo pessoal é enviado para avaliação da instituição financeira."
              },
              {
                step: "4",
                title: "Depósito",
                description: "O dinheiro do seu crédito pessoal online é depositado diretamente na sua conta bancária em poucas horas após a aprovação."
              }
            ].map((item, index) => (
              <div key={index} className="text-center text-white">
                <div className="w-16 h-16 bg-white text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-green-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            O que nossos clientes dizem
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-green-600">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold mb-4">Simplic</div>
              <p className="text-green-100 text-sm mb-4">
                Somos um correspondente bancário. Simplic é uma empresa fundada em 2014 em São Paulo com o objetivo de proporcionar acesso a crédito pessoal online de forma flexível, inovadora e descomplicada.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-green-200" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-green-200" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-green-200" />
                <Youtube className="w-5 h-5 cursor-pointer hover:text-green-200" />
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold mb-4">NAVEGAÇÃO</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-green-100 hover:text-white">Quem Somos</a></li>
                <li><a href="#" className="text-green-100 hover:text-white">Como Funciona</a></li>
                <li><a href="#" className="text-green-100 hover:text-white">Ajuda</a></li>
                <li><a href="#" className="text-green-100 hover:text-white">Empréstimo Pessoal</a></li>
                <li><a href="#" className="text-green-100 hover:text-white">Mapa Do Site</a></li>
                <li><a href="#" className="text-green-100 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-green-100 hover:text-white">Termos e condições</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">ATENDIMENTO AO CLIENTE</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>WhatsApp: (11) 3335-2979</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Capitais e regiões metropolitanas: 3004-7242</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Demais localidades: 0800-200-7242</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>E-mail: contato@simplic.com.br</span>
                </div>
                <Button 
                  onClick={() => setShowContactModal(true)}
                  variant="outline" 
                  className="mt-4 border-white text-white hover:bg-white hover:text-green-600"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  TIRE SUAS DÚVIDAS
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <div className="bg-white text-black p-4 rounded-lg mb-4">
                <div className="text-xs">MEMBRO ASSOCIADO</div>
                <div className="font-bold">ABCD</div>
              </div>
              <p className="text-xs text-green-100">
                Somos membros da ABCD e seguimos as orientações de Conduta do Código de Ética e Autorregulação
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-green-500 mt-8 pt-8">
            <div className="text-xs text-green-100 space-y-2">
              <p>
                Simplic.com.br pertence e é operado pela Lendico Correspondente Bancário Ltda. ("Simplic"), uma sociedade limitada registrada sob o CNPJ/MF 17.103.297/0001-13, com sede à Avenida Engenheiro Luiz Carlos Berrini, 1748 – 22° andar - suite 2203 – Cidade Monções, Município de São Paulo, Estado de São Paulo, CEP 04571-000. A Simplic não é uma instituição financeira. Somos um correspondente bancário do Banco Afinz S/A Banco Múltiplo ("Afinz"), antiga Sorocred) registrado sob o CNPJ/MF 04.814.563/0001-74 e possuímos uma plataforma online que facilita o acesso de clientes a produtos e serviços oferecidos por instituições financeiras parceiras.
              </p>
              <p>
                A taxa de juros praticada no produto de crédito pessoal pode variar de 15,80% a 17,90% a.m. (481,44% a 621,38% a.a.). O Simplic tem o compromisso de total transparência com nossos clientes. Antes de iniciar o preenchimento de uma proposta, será exibido de forma clara: a taxa de juros utilizada, tarifas aplicáveis, impostos (IOF) e o custo efetivo total (CET). Nossa central de atendimento está disponível para esclarecimento de dúvidas sobre quaisquer dos valores apresentados.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Saiba mais +</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Loan Application Form */}
      <LoanApplicationForm
        isOpen={showLoanForm}
        onClose={() => setShowLoanForm(false)}
        loanData={{
          amount: loanAmount[0],
          installments: installments,
          monthlyPayment: calculateMonthlyPayment()
        }}
      />
    </div>
  )
}

export default App

