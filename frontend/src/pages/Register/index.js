import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../service/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
    
    async function handleRegister (e) {
	e.preventDefault();
	const data = {name, email, whatsapp, city, uf, };
	try {
	    const response = await api.post('ongs', data);
	    alert(`Seu ID de acesso: ${response.data.id}`);
	    history.push('/');
	} catch (err) {
	    alert('Erro no cadastro, tente novamente.');
	}
    }
    
    return (
	<div className="register-container">
	    <div className="content">
		<section>
		    <img className="img-logo" alt="Make The Difference" src={logoImg}/> 
		    <h1>Cadastro</h1>
		    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
		    <Link className="back-link" to="/">
			<FiArrowLeft size={16} color="#e02041"/>
			Já tenho cadastro
		    </Link>
		</section>
		<form onSubmit={handleRegister}>
		    <input name="" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome da ONG"/>
		    <input name="" type="email" value={email}  onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
		    <input name="" type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp"/> 
		    <div className="input-group">
			<input name="" type="text" value={city} onChange={e => setCity(e.target.value)}  placeholder="Cidade"/>
			<input name="" type="text" value={uf}  onChange={e => setUf(e.target.value)} placeholder="UF" style={{ width: 80 }}/>
		    </div>
		    <button className="button" type="submit">Cadastrar</button>
		</form>
	    </div>
	</div>
    );
}
