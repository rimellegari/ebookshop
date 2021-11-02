//função para verificar tipos de inputs diferentes

export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-wrap--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    }else {
        input.parentElement.classList.add('input-wrap--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMsgErro(tipoDeInput, input)
    }
}
 //criando array com tipo de erro para fazer check das mensagens - checkar com a propriedade validity dos inputs

const tiposErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
]

//objeto para alterar mensagem de erro nos spans

const mensagensErro ={
    nome: {
    valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio.',
        typeMismatch: 'O email não é válido.'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio.',
        patternMismatch: 'a senha deve ter entre 6 a 12 caracteres, ao menos uma letra maiuscula sem caracteres especiais'
    },
    dataNascimento: {
        valueMissing: 'O campo Data de Nascimento não pode estar vazio.',
        customError: 'Você deve ter mais de 18 anos para se cadastrar'   
    },
    cpf: {
        valueMissing: 'O campo senha não pode estar vazio',
        customError:'O CPF digitado não é valido'
    },
    cep: {
        valueMissing: 'O campo senha não pode estar vazio',
        patternMismatch: 'O CEP digitado não é válido.'
    },
    logradouro: {
        valueMissing: "O campo logradouro não pode estar vazio"
    },
    cidade: {
        valueMissing: "O campo cidade não pode estar vazio"
    },
    estado: {
        valueMissing: "O campo estado não pode estar vazio"
    }

}

//objeto para organizar erro por tipo de input

const validadores = {
    dataNascimento:input =>validaDataNascimento(input),
    cpf:input =>validaCPF(input),
    cep:input => RecuperarCEP(input)
}
/*função para mostrar msg d erro*/

function mostraMsgErro(tipoDeInput, input) {
    let mensagem = ''
    tiposErros.forEach(erro=> {
        if(input.validity[erro]) {
            mensagem = mensagensErro[tipoDeInput][erro]
        }
    })
    return mensagem 
}


/*determinando evento para chamar função*/

const dataNascimento = document.getElementById('dataNasc-input')

dataNascimento.addEventListener('blur', (evento)=> {
    validaDataNascimento(evento.target)
})


/*validação data nascimento */

function validaDataNascimento(input) {
    /* transformado input (string) em calendário*/

    const dataRecebida = new Date(input.value)
    let mensagem = '';
    //constante será argumento da funçao de maioridade
    if(!maioridade(dataRecebida)){
        mensagem = 'Você deve ter mais de 18 anos para realizar seu cadastro.'

    }
    //fazer span aparecer
    input.setCustomValidity(mensagem);
    

}

function maioridade(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())
    return dataMais18 <= dataAtual
    
}

//cpf

function validaCPF(input) {
    const cpfformatado = input.value.replace(/\D/g,'')
    let mensagem ='';

    if(!onzeDigCPF(cpfformatado) || !checaEstuturaCPF(cpfformatado)) {
        mensagem = 'O CPF digitado não é valido'
    }

    input.setCustomValidity(mensagem)
}

function onzeDigCPF(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true

    valoresRepetidos.forEach(valor => {
        if(valor ==cpf) {
            cpfValido = false
        }

    })
        return cpfValido
    
}

//Validação todos os numeros CPF

function checaEstuturaCPF(cpf) {
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador) 
    
}

function checaDigitoVerificador(cpf, multiplicador) {
    if(multiplicador>=12) {
        return true
    }

//constante para armazenar soma dos 9 primeiros digitos - função substring para cortar o cpf
    let multiplicadorInicial = multiplicador
    let soma = 0
    const cpfSemDigitos = cpf.substr(0,multiplicador-1).split('')
    const digitoVerificador = cpf.charAt(multiplicador-1)
    for(let contador = 0; multiplicadorInicial >1; multiplicadorInicial--) {
        soma = soma +cpfSemDigitos[contador]*multiplicadorInicial
        contador++
    }
    if(digitoVerificador ==confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador+1)
    }
    return false
}
function confirmaDigito(soma) {
    return 11 - (soma % 11)
}

//Validação CEP

function RecuperarCEP(input) {
    const cep = input.value.replace(/\D/g,'')
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type' : 'application/json;charset=utf-8'
        }
    }
}