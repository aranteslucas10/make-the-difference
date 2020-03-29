import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../service/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident () {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function hanldeNewIncident (e) {
	e.preventDefault();
	const data = {
	    title,
	    description,
	    value,
	}
	try {
	    await api.post('incidents', data, {
		headers: {
		    Authorization: ongId,
		}
	    });
	    history.push('/profile');
	} catch (err) {
	    alert('Error ao cadastrar caso, tente novamente.');
	}
    }

    return (
	<div className="new-incident-container">
	    <div className="content">
		<section>
		    <img className="img-logo" alt="Make The Difference" src={logoImg}/> 
		    <h1>Cadastrar novo caso</h1>
		    <p>Descreva o caso detalhadamente para que alguém possa fazer a <strong>D1ferENç4</strong>.</p>
		    <Link className="back-link" to="/profile">
			<FiArrowLeft size={16} color="#e02041"/>
			Voltar para home
		    </Link>
		</section>
		<form onSubmit={hanldeNewIncident}>
		    <input name="" type="text" value={title} onChange={e => setTitle(e.target.value)}  placeholder="Título do caso"/>
		    <textarea name="" type="" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
		    <input name="" type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Valor em reais"/> 
		    <button className="button" type="submit">Cadastrar</button>
		</form>
	    </div>
	</div>
    );
}
