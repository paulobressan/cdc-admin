import React, { Component } from 'react';

class InputCustomizado extends Component {
    render() {
        <div className="pure-control-group">
            <label htmlFor="nome">Nome</label>
            <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
        </div>
    }
}