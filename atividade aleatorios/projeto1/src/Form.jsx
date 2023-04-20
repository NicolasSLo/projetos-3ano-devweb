// import { useState } from 'react'
import styles from './Form.module.css'
import React, { Component } from "react";

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            frase: '',
            aleatorio: ''
        }


        this.array = []

        this.valor = this.valor.bind(this);
        this.adicionar = this.adicionar.bind(this);
        this.aleatorio = this.aleatorio.bind(this);
        this.limpar = this.limpar.bind(this);
    }

    valor(e) {
        let valorDigitado = e.target.value
        this.setState({ frase: valorDigitado })
    }

    adicionar() {
        if (this.state.frase == '') {

            alert('Adicione uma frase!')

        } else {

            let array = this.array
            let frase = this.state.frase

            array.push(frase)
            console.log(array)

            this.setState({ frase: '' })

        }

    }

    aleatorio() {
        let array = this.array

        const aleatorio = array[Math.floor(Math.random() * array.length)];
        console.log(aleatorio)

        this.setState({ aleatorio: aleatorio })
    }

    limpar(){
        this.array = []
        console.log(this.array)
    }

    render() {
        return (
            <div className={styles.all2}>
                <div className={styles.form}>

                    <input type="text" placeholder="Digite uma frase" onChange={this.valor} value={this.state.frase} />

                    <button onClick={this.adicionar}>Adicionar</button>

                    <button onClick={this.aleatorio}>Aleatorio</button>

                    <button onClick={this.limpar}>Limpar</button>


                </div>
                <div className={styles.result}>
                    <h1>{this.state.aleatorio}</h1>
                </div>
            </div>
        );
    }
}

export default Form
