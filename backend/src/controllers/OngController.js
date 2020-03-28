const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
	const ongs = await connection('ongs').select('*');
	return response.json(ongs);
    },
    async create (request, response) {
	const { name, email, whatsapp, city, uf } = request.body
	const id = crypto.randomBytes(4).toString('HEX');
	await connection('ongs').insert(
	    { id, name, email, whatsapp, city, uf, });
	return response.json({ id, });
    },
    async delete (request, response) {
	const { id } = request.params;
	const ong_id = request.headers.authorization;
	const incident = await connection('incidents').where('id', id).select('ong_id').first();
	if (incident.org_id != ong_id) {
	    return response.status(401).json(
		{ error: 'Operation not permitted.' });
	}
	await connection('incidents').where('id', id).delete();
	return response.status(204).send();
    },
};
