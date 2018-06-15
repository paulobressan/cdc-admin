import React, { Component } from 'react';
import './App.css';
import './pure/css/pure-min.css';
import './pure/css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  constructor() {
    //passar construtor para construtor pai(Component)
    super();
    //definir o estado da aplicação
    this.state = {
      lista: [],
      nome:"",
      email:"",
      senha:""
    };
    //Atribuir o react no escopo do metodo enviaForm
    this.enviaForm = this.enviaForm.bind(this);
    this.teste = this.teste.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  //Função executada após o componente ser montado
  componentDidMount() {
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      dataType: "json",
      success: (res) => {
        this.setState({ lista: res });
      }
    })
  }


  //Adicionando evento submit no form
  enviaForm(evento){
    evento.preventDefault();
    $.ajax({
      url:"http://cdc-react.herokuapp.com/api/autores",
      contentType: "application/json",
      dataType:"json",
      type:"post",
      data: JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
      success: (res)=>{
        this.setState({lista: res});
        console.log("Adicionado com sucesso");
      },
      error: (erro)=>{
        alert(`Erro ocorrido ${erro}`);
      }
    });
  }

  //teste de eventos
  teste(){
    console.log("Interceptado");
  }

  //metodos de atualização de inputs
  setNome(evento){
    this.setState({nome:evento.target.value});
  }
  setEmail(evento){
    this.setState({email:evento.target.value});
  }
  setSenha(evento){
    this.setState({senha:evento.target.value});
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                
                <div className="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value={this.state.email}  onChange={this.setEmail}/>
                </div>
                <div className="pure-control-group">
                  <label htmlFor="senha">Senha</label>
                  <input id="senha" onInput={this.teste} type="password" name="senha"/*Torna o input com escuta n estado >>>>*/ value={this.state.senha}  onChange={this.setSenha} />
                </div>
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map((autor, index) =>
                    {
                      return index > 8650
                        ? <tr key={autor.id}>
                        <td>{autor.nome}</td>
                        <td>{autor.email}</td>
                      </tr>
                      : null
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
