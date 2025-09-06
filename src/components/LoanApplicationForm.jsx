import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { X, User, Mail, Phone, MapPin, Calendar, CreditCard, Eye, EyeOff } from 'lucide-react'

const LoanApplicationForm = ({ isOpen, onClose, loanData }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    // Endereço
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    // Dados de Acesso
    email: '',
    senha: '',
    confirmarSenha: '',
    // Dados Financeiros
    renda: '',
    profissao: '',
    // Dados Bancários
    banco: '',
    agencia: '',
    conta: '',
    tipoConta: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  const bancos = [
    'Banco do Brasil', 'Bradesco', 'Caixa Econômica Federal', 'Itaú',
    'Santander', 'Nubank', 'Inter', 'C6 Bank', 'BTG Pactual', 'Sicoob',
    'Sicredi', 'Banco Original', 'Banco Pan', 'Banco Safra', 'Outros'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  const formatTelefone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  const formatCurrency = (value) => {
    const numbers = value.replace(/\D/g, '')
    const amount = parseFloat(numbers) / 100
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const buscarCEP = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '')
    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        const data = await response.json()
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            rua: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }))
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório'
      if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório'
      if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória'
      if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório'
    }

    if (step === 2) {
      if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório'
      if (!formData.rua.trim()) newErrors.rua = 'Rua é obrigatória'
      if (!formData.numero.trim()) newErrors.numero = 'Número é obrigatório'
      if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório'
      if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória'
      if (!formData.estado) newErrors.estado = 'Estado é obrigatório'
    }

    if (step === 3) {
      if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório'
      if (!formData.senha.trim()) newErrors.senha = 'Senha é obrigatória'
      if (formData.senha !== formData.confirmarSenha) {
        newErrors.confirmarSenha = 'Senhas não conferem'
      }
    }

    if (step === 4) {
      if (!formData.renda.trim()) newErrors.renda = 'Renda é obrigatória'
      if (!formData.profissao.trim()) newErrors.profissao = 'Profissão é obrigatória'
    }

    if (step === 5) {
      if (!formData.banco) newErrors.banco = 'Banco é obrigatório'
      if (!formData.agencia.trim()) newErrors.agencia = 'Agência é obrigatória'
      if (!formData.conta.trim()) newErrors.conta = 'Conta é obrigatória'
      if (!formData.tipoConta) newErrors.tipoConta = 'Tipo de conta é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsLoading(true)
    
    // Simular envio do formulário
    setTimeout(() => {
      setIsLoading(false)
      alert('Solicitação enviada com sucesso! Você receberá uma resposta em até 24 horas.')
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Dados Pessoais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className={errors.nome ? 'border-red-500' : ''}
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>
              
              <div>
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={errors.cpf ? 'border-red-500' : ''}
                />
                {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                  className={errors.dataNascimento ? 'border-red-500' : ''}
                />
                {errors.dataNascimento && <p className="text-red-500 text-sm mt-1">{errors.dataNascimento}</p>}
              </div>
              
              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  type="text"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', formatTelefone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className={errors.telefone ? 'border-red-500' : ''}
                />
                {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Endereço
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  type="text"
                  value={formData.cep}
                  onChange={(e) => {
                    const cepFormatado = formatCEP(e.target.value)
                    handleInputChange('cep', cepFormatado)
                    if (cepFormatado.replace(/\D/g, '').length === 8) {
                      buscarCEP(cepFormatado)
                    }
                  }}
                  placeholder="00000-000"
                  maxLength={9}
                  className={errors.cep ? 'border-red-500' : ''}
                />
                {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="rua">Rua/Avenida *</Label>
                <Input
                  id="rua"
                  type="text"
                  value={formData.rua}
                  onChange={(e) => handleInputChange('rua', e.target.value)}
                  placeholder="Nome da rua"
                  className={errors.rua ? 'border-red-500' : ''}
                />
                {errors.rua && <p className="text-red-500 text-sm mt-1">{errors.rua}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="numero">Número *</Label>
                <Input
                  id="numero"
                  type="text"
                  value={formData.numero}
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  placeholder="123"
                  className={errors.numero ? 'border-red-500' : ''}
                />
                {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
              </div>
              
              <div>
                <Label htmlFor="bairro">Bairro *</Label>
                <Input
                  id="bairro"
                  type="text"
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  placeholder="Nome do bairro"
                  className={errors.bairro ? 'border-red-500' : ''}
                />
                {errors.bairro && <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>}
              </div>
              
              <div>
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  type="text"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  placeholder="Nome da cidade"
                  className={errors.cidade ? 'border-red-500' : ''}
                />
                {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>}
              </div>
              
              <div>
                <Label htmlFor="estado">Estado *</Label>
                <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value)}>
                  <SelectTrigger className={errors.estado ? 'border-red-500' : ''}>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Dados de Acesso
            </h3>
            
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="seu@email.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senha">Senha *</Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    value={formData.senha}
                    onChange={(e) => handleInputChange('senha', e.target.value)}
                    placeholder="Digite sua senha"
                    className={errors.senha ? 'border-red-500' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
              </div>
              
              <div>
                <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmarSenha}
                    onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                    placeholder="Confirme sua senha"
                    className={errors.confirmarSenha ? 'border-red-500' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmarSenha && <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Dados Financeiros
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="renda">Renda Mensal *</Label>
                <Input
                  id="renda"
                  type="text"
                  value={formData.renda}
                  onChange={(e) => handleInputChange('renda', formatCurrency(e.target.value))}
                  placeholder="R$ 0,00"
                  className={errors.renda ? 'border-red-500' : ''}
                />
                {errors.renda && <p className="text-red-500 text-sm mt-1">{errors.renda}</p>}
              </div>
              
              <div>
                <Label htmlFor="profissao">Profissão *</Label>
                <Input
                  id="profissao"
                  type="text"
                  value={formData.profissao}
                  onChange={(e) => handleInputChange('profissao', e.target.value)}
                  placeholder="Sua profissão"
                  className={errors.profissao ? 'border-red-500' : ''}
                />
                {errors.profissao && <p className="text-red-500 text-sm mt-1">{errors.profissao}</p>}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Dados Bancários
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="banco">Banco *</Label>
                <Select value={formData.banco} onValueChange={(value) => handleInputChange('banco', value)}>
                  <SelectTrigger className={errors.banco ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione seu banco" />
                  </SelectTrigger>
                  <SelectContent>
                    {bancos.map((banco) => (
                      <SelectItem key={banco} value={banco}>
                        {banco}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.banco && <p className="text-red-500 text-sm mt-1">{errors.banco}</p>}
              </div>
              
              <div>
                <Label htmlFor="tipoConta">Tipo de Conta *</Label>
                <Select value={formData.tipoConta} onValueChange={(value) => handleInputChange('tipoConta', value)}>
                  <SelectTrigger className={errors.tipoConta ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Tipo de conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Conta Corrente</SelectItem>
                    <SelectItem value="poupanca">Conta Poupança</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tipoConta && <p className="text-red-500 text-sm mt-1">{errors.tipoConta}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agencia">Agência *</Label>
                <Input
                  id="agencia"
                  type="text"
                  value={formData.agencia}
                  onChange={(e) => handleInputChange('agencia', e.target.value)}
                  placeholder="0000"
                  className={errors.agencia ? 'border-red-500' : ''}
                />
                {errors.agencia && <p className="text-red-500 text-sm mt-1">{errors.agencia}</p>}
              </div>
              
              <div>
                <Label htmlFor="conta">Conta *</Label>
                <Input
                  id="conta"
                  type="text"
                  value={formData.conta}
                  onChange={(e) => handleInputChange('conta', e.target.value)}
                  placeholder="00000-0"
                  className={errors.conta ? 'border-red-500' : ''}
                />
                {errors.conta && <p className="text-red-500 text-sm mt-1">{errors.conta}</p>}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <CardTitle className="text-2xl font-bold text-center text-green-600">
            Solicitação de Empréstimo
          </CardTitle>
          <div className="text-center text-gray-600">
            <p>Valor: <strong>R$ {loanData?.amount?.toLocaleString('pt-BR')}</strong></p>
            <p>Parcelas: <strong>{loanData?.installments}x</strong></p>
            <p>Parcela mensal: <strong>R$ {loanData?.monthlyPayment}</strong></p>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Etapa {currentStep} de 5</span>
              <span>{Math.round((currentStep / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handlePrevious}
                  className="px-6"
                >
                  Voltar
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < 5 ? (
                  <Button 
                    type="button" 
                    onClick={handleNext}
                    className="bg-green-600 hover:bg-green-700 px-6"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 px-6"
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner mr-2" />
                        Enviando...
                      </>
                    ) : (
                      'Finalizar Solicitação'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoanApplicationForm

