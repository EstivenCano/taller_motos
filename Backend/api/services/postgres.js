const { Pool } = require('pg');

class servicioPG {
	constructor() {
		this.pool = new Pool({
            user: "dllo_web_udem",
            host: "saurmo.com",
            database: "el-taller",
            password: "bf5e722cc518fce3c4a57fdb1b6647b0434138370eb1c30f9293ec8e03062b78",
            port: 5432
		});

		//console.log('Conectado a la base de datos');
	}

	async ejecutarSql(sql, data) {
		let res = this.pool.query(sql, data);
		return res;
	}
}

module.exports = servicioPG;