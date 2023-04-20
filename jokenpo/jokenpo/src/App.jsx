import { useState } from 'react'
import React, { Component } from "react";
import styles from './App.module.scss'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      texto: '',
      textoComputer: '',
      points: 0,
      pointsComputer: 0,
      empates: 0,
      ganhou: '',
      perdeu: '',
      empate: '',
      html: ``
    }

    // 1 = pedra
    // 2 = papel
    // 3 = tesoura
    this.array = [1, 2, 3]


  }

  pedra = () => {
    let txt = 'Pedra'
    this.setState({ texto: txt })

    let array = this.array
    const aleatorio = array[Math.floor(Math.random() * array.length)];

    this.setState({ ganhou: '' })
    this.setState({ perdeu: '' })
    this.setState({ empate: '' })
    if (aleatorio == 3) {
      // alert('computer: tesoura')
      // alert('Voce ganhou 1pts')
      this.setState({ textoComputer: 'Tesoura' })

      var point = this.state.points
      point++;
      this.setState({ points: point })

      this.setState({ ganhou: '+1 PTS' })
    } else if (aleatorio == 2) {
      // alert('computer: papel')
      // alert('Voce perdeu')
      this.setState({ textoComputer: 'Papel' })

      var point = this.state.pointsComputer
      point++;
      this.setState({ pointsComputer: point })

      this.setState({ perdeu: 'Perdeu' })
    } else if (aleatorio == 1) {
      // alert('computer: pedra')
      this.setState({ textoComputer: 'Pedra' })

      var point = this.state.empates
      point++;
      this.setState({ empates: point })

      this.setState({ empate: 'Empate' })
    }
  }

  papel = () => {
    let txt = 'Papel'
    this.setState({ texto: txt })

    let array = this.array
    const aleatorio = array[Math.floor(Math.random() * array.length)];

    this.setState({ ganhou: '' })
    this.setState({ perdeu: '' })
    this.setState({ empate: '' })
    if (aleatorio == 3) {
      this.setState({ textoComputer: 'Tesoura' })

      var point = this.state.pointsComputer
      point++;
      this.setState({ pointsComputer: point })

      this.setState({ perdeu: 'Perdeu' })
    } else if (aleatorio == 2) {
      this.setState({ textoComputer: 'Papel' })

      var point = this.state.empates
      point++;
      this.setState({ empates: point })

      this.setState({ empate: 'Empate' })
    } else if (aleatorio == 1) {
      this.setState({ textoComputer: 'Pedra' })

      var point = this.state.points
      point++;
      this.setState({ points: point })

      this.setState({ ganhou: '+1 PTS' })
    }
  }

  tesoura = () => {
    let txt = 'Tesoura'
    this.setState({ texto: txt })

    let array = this.array
    const aleatorio = array[Math.floor(Math.random() * array.length)];

    this.setState({ ganhou: '' })
    this.setState({ perdeu: '' })
    this.setState({ empate: '' })
    if (aleatorio == 3) {
      this.setState({ textoComputer: 'Tesoura' })

      var point = this.state.empates
      point++;
      this.setState({ empates: point })

      this.setState({ empate: 'Empate' })
    } else if (aleatorio == 2) {
      this.setState({ textoComputer: 'Papel' })

      var point = this.state.points
      point++;
      this.setState({ points: point })

      this.setState({ ganhou: '+1 PTS' })
    } else if (aleatorio == 1) {
      this.setState({ textoComputer: 'Pedra' })

      var point = this.state.pointsComputer
      point++;
      this.setState({ pointsComputer: point })

      this.setState({ perdeu: 'Perdeu' })
    }
  }


  encerrar = () => {
    let playerPoints = this.state.points
    let computerPoints = this.state.pointsComputer


    if (playerPoints == computerPoints) {
      var resultado = 'Empate!'
    } else if (playerPoints > computerPoints) {
      var resultado = 'Você Ganhou!'
    } else {
      var resultado = 'Você Perdeu!'
    }

    this.setState({
      html: `
      <div class='blur'>
        <div class='border'>
          <div class='countTela2'>
            <img src="person.svg" />
            <h1>${playerPoints}</h1>
            <img src="computer.svg" />
            <h1>${computerPoints}</h1>
          </div>
        </div>
        
        <div class='slide'>
          <h1>${resultado}</h1>
          <form action="/">
          <button>Jogar Novamente</button>
          </form>
        </div>
        
        
      </div>
    `})
    
  }

  jogarNovamente = () => {
    this.setState({
      texto: '',
      textoComputer: '',
      points: 0,
      pointsComputer: 0,
      empates: 0,
      ganhou: '',
      perdeu: '',
      empate: '',
      html: ``,
      resultadoFinal: ''
    })
  }

  render() {
    return (
      <div className={styles.all}>
        <h2>Jokenpo</h2>


        <div className={styles.all2}>
          <div className={styles.count}>
            <img src="person.svg" />
            <h1>{this.state.points}</h1>
            <img src="computer.svg" />
            <h1>{this.state.pointsComputer}</h1>
            <h1>Empates: </h1>
            <h1>{this.state.empates}</h1>
          </div>
          <button onClick={this.encerrar}>Encerrar</button>

          <div className={styles.joken}>
            <div className={styles.pedra} onClick={this.pedra}><img src="pedra.svg" /></div>
            <div className={styles.papel} onClick={this.papel}><img src="papel.svg" /></div>
            <div className={styles.tesoura} onClick={this.tesoura}><img src="tesoura.svg" /></div>
          </div>


          <div className={styles.results}>
            <img src="person.svg" />
            <h1>{this.state.texto}</h1>
            <img src="computer.svg" />
            <h1>{this.state.textoComputer}</h1>
          </div>

          <div className={styles.alertRsult}>
            <h1 className={styles.ganhou}>{this.state.ganhou}</h1>
            <h1 className={styles.perdeu}>{this.state.perdeu}</h1>
            <h1 className={styles.empate}>{this.state.empate}</h1>
          </div>

        </div>

        <div className={styles.animationwrapper}>
          <div className={styles.particle1}></div>
          <div className={styles.particle2}></div>
          <div className={styles.particle3}></div>
          <div className={styles.particle4}></div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: this.state.html }}>{}</div>
      </div>
    )
  }
}

export default App
