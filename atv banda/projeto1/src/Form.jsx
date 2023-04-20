// import { useState } from 'react'
import styles from './Form.module.css'
import React, { Component } from "react";

const Mensagem = () => {

    const agenda = {
        banda: "FJAFA",
        data: "xx/xx/xx",
        valor: "500",
        local: "Segunda"
    }


    return (
        <div className={styles.banda}>
            <h3>Banda:</h3>
            <p>{agenda.banda}</p>
            <h3>Data:</h3>
            <p>{agenda.data}</p>
            <h3>Valor:</h3>
            <p>{agenda.valor}</p>
            <h3>Local:</h3>
            <p>{agenda.local}</p>
        </div>
    )
}

const Usuario = () => {

    const user = {
        Nome: "Nicolas",
        CPF: "12345678910",
        Endereço: "90",
        Telefone: "+55 (31) 9999-9999"
    }


    return (
        <div className={styles.banda}>
            <h3>Nome:</h3>
            <p>{user.Nome}</p>
            <h3>CPF:</h3>
            <p>{user.CPF}</p>
            <h3>Endereço:</h3>
            <p>{user.Endereço}</p>
            <h3>Telefone:</h3>
            <p>{user.Telefone}</p>
        </div>
    )
}
// atividade de atealotio









class Form extends Component {

    constructor(props) {
        super(props);
        this.state = []

        this.valor = this.valor.bind(this);
        this.clique = this.clique.bind(this);

    }

    valor(e) {
        let valorDigitado = e.target.value;
    }

    clique = () => {
        let array = this.state

        array.push()
        console.log(array)
    }

    render() {
        // return (
        //     <div className={styles.box}>
        //         <div className={styles.all}>
        //             <h1>Agenda</h1>
        //             <Mensagem />

        //         </div>
        //         <div className={styles.all}>
        //             <h1>Usuário</h1>
        //             <Usuario />
        //         </div>
        //     </div>
        // )

        return (
            <div className={styles.box}>
                <input type="text" placeholder="Digite uma frase"
                    onChange={this.valor} />
                <button onClick={this.clique}>Aleatorio</button>
                {/* <div className={styles.load}></div> */}

            </div>

        );
    }
}

export default Form
