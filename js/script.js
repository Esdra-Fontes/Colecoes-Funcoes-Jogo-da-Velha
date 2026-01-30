let tabuleiro
let board
let aviso
let jogador
let jogoAtivo

function iniciar() {
    tabuleiro = []
    board = document.getElementById('board')
    aviso = document.getElementById('aviso')
    jogador = 1
    jogoAtivo = true

    for (let i = 0; i < 3; i++) {
        tabuleiro[i] = []
        for (let j = 0; j < 3; j++) {
            tabuleiro[i][j] = 0
        }
    }

    aviso.innerHTML = 'Vez do jogador: 1'
    exibir()
}

function exibir() {
    let tabela = '<table cellpadding="10" border="1">'

    for (let i = 0; i < 3; i++) {
        tabela += '<tr>'
        for (let j = 0; j < 3; j++) {
            let marcador
            switch (tabuleiro[i][j]) {
                case -1: marcador = 'X'; break
                case 1: marcador = 'O'; break
                default: marcador = '_'
            }
            tabela += `<td>${marcador}</td>`
        }
        tabela += '</tr>'
    }

    tabela += '</table>'
    board.innerHTML = tabela
}

function jogar() {
    if (!jogoAtivo) return

    const l = Number(document.getElementById('linha').value) - 1
    const c = Number(document.getElementById('coluna').value) - 1

    if (Number.isNaN(l) || Number.isNaN(c)) {
        aviso.innerHTML = 'Informe linha e coluna!'
        return
    }

    if (l < 0 || l > 2 || c < 0 || c > 2) {
        aviso.innerHTML = 'Linha e coluna devem ser entre 1 e 3!'
        return
    }

    if (tabuleiro[l][c] !== 0) {
        aviso.innerHTML = 'Esse campo já foi marcado!'
        return
    }

    const jogadorAtual = numeroJogador()
    tabuleiro[l][c] = jogadorAtual === 1 ? 1 : -1

    exibir()

    if (checar(jogadorAtual)) {
        aviso.innerHTML = 'O jogador ' + jogadorAtual + ' ganhou!'
        jogoAtivo = false
        return
    }

    if (tabuleiro.flat().every(v => v !== 0)) {
        aviso.innerHTML = 'Empate!'
        jogoAtivo = false
        return
    }

    jogador++
    aviso.innerHTML = 'Vez do jogador: ' + numeroJogador()
}

function checar(vencedor) {
    let soma

    // Linhas
    for (let i = 0; i < 3; i++) {
        soma = tabuleiro[i][0] + tabuleiro[i][1] + tabuleiro[i][2]
        if (Math.abs(soma) === 3) return true
    }

    // Colunas
    for (let i = 0; i < 3; i++) {
        soma = tabuleiro[0][i] + tabuleiro[1][i] + tabuleiro[2][i]
        if (Math.abs(soma) === 3) return true
    }

    // Diagonais
    soma = tabuleiro[0][0] + tabuleiro[1][1] + tabuleiro[2][2]
    if (Math.abs(soma) === 3) return true

    soma = tabuleiro[0][2] + tabuleiro[1][1] + tabuleiro[2][0]
    if (Math.abs(soma) === 3) return true

    return false
}

function numeroJogador() {
    return jogador % 2 + 1
}

function reiniciar() {
    iniciar()
}