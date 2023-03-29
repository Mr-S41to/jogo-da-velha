import { React, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const jogoInicial = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  const [jogo, setJogo] = useState(
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  )
  const [simboloAtual, setSimbuloAtual] = useState('X')
  const [jogando, setJogando] = useState(true)

  const tabuleiro = (j) => {
    return (
      <div className='tabuleiro'>
        <div className='tabuleiroLinha'>
          <div className='casa' data-pos='00' onClick={(e)=>joga(e)}>{j[0][0]}</div>
          <div className='casa' data-pos='01' onClick={(e)=>joga(e)}>{j[0][1]}</div>
          <div className='casa' data-pos='02' onClick={(e)=>joga(e)}>{j[0][2]}</div>
        </div>
        <div className='tabuleiroLinha'>
          <div className='casa' data-pos='10' onClick={(e)=>joga(e)}>{j[1][0]}</div>
          <div className='casa' data-pos='11' onClick={(e)=>joga(e)}>{j[1][1]}</div>
          <div className='casa' data-pos='12' onClick={(e)=>joga(e)}>{j[1][2]}</div>
        </div>
        <div className='tabuleiroLinha'>
          <div className='casa' data-pos='20' onClick={(e)=>joga(e)}>{j[2][0]}</div>
          <div className='casa' data-pos='21' onClick={(e)=>joga(e)}>{j[2][1]}</div>
          <div className='casa' data-pos='22' onClick={(e)=>joga(e)}>{j[2][2]}</div>
        </div>
      </div>
    );
  }

  const BtnJogarNovamente = () => {
    if (!jogando) {
      return <button className='button' onClick={() => reiniciar()}>Jogar Novamente</button>
    }
  }

  const verificarVitoria = () => {
    //linhas
    let pontos = 0
    let vitoria = false
    for (let l = 0; l < 3; l++) {
      pontos = 0
      for (let c = 0; c < 3; c++) {
        if (jogo[l][c] == simboloAtual) {
          pontos++
        }
      }
      if (pontos >= 3) {
        vitoria = true
        break
      }
    }

    //colunas
    for (let c = 0; c < 3; c++) {
      pontos = 0
      for (let l = 0; l < 3; l++) {
        if (jogo[l][c] == simboloAtual) {
          pontos++
        }
      }
      if (pontos >= 3) {
        vitoria = true
        break
      }
    }

    //diagonais
    pontos = 0
    for (let d = 0; d < 3; d++) {
      if (jogo[d][d] == simboloAtual) {
        pontos++
      }
    }
    if (pontos >= 3) {
      vitoria = true
    }
    pontos = 0
    let l = 0
    for (let c = 2; c >= 0; c--) {
      if (jogo[l][c] == simboloAtual) {
        pontos++
      }
      l++
    }
    if (pontos >= 3) {
      vitoria = true
    }
    return vitoria
  }

  const trocarJogador = () => {
    simboloAtual == 'X' ? setSimbuloAtual('O')
      : setSimbuloAtual('X')
  }

  const retPos = (e) => {
    const p = e.target.getAttribute('data-pos')
    const pos = [parseInt(p.substring(0, 1)), parseInt(p.substring(1, 2))]
    return pos
  }

  const verificarEspacoVazio = (e) => {
    if (jogo[retPos(e)[0]][retPos(e)[1]] == '') {
      return true
    } else {
      return false
    }
  }

  const joga = (e) => {
    if (jogando) {
      if (verificarEspacoVazio(e)) {
        jogo[retPos(e)[0]] [retPos(e)[1]] = simboloAtual
        trocarJogador()
        if (verificarVitoria()) {
          trocarJogador()
          alert('Jogador ' + simboloAtual + ' venceu!')
          setJogando(false)
        }
      } else{
        alert('Espaço indisponivel, selecione outra casa!')
      }
    }
  }

  const reiniciar = () => {
    setJogando(true)
    setJogo(jogoInicial)
    setSimbuloAtual('X')
  }





  return (
    <div className="container">
      <h1 className='titulo'>O JOGO DA VELHA</h1>
      <p className='jogador'>Quem joga: {simboloAtual}</p>
      <div>
        {tabuleiro(jogo)}
      </div>
      <div>
        {BtnJogarNovamente()}
      </div>
    </div>
  );

}

export default App;