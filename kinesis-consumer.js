 const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    debug: true
  });

exports.handler = async (event) => {
  
  let payloadColumns;
  try {
  const payload = Buffer.from(event.Records[0].kinesis.data, 'base64').toString('ascii');
  const payloadLines = payload.split('\r\n');
  payloadColumns = payloadLines.map(line => {
    columns = line.split(',');
    return {
      arrivalTime: columns[0],
      cost: columns[1],
      departureTime: columns[2],
      seatsAvailable: columns[3],
      destinationAirport: columns[4],
      sourceAirport: columns[5],
      arrivalDate: columns[6],
      departureDate: columns[7]
    }
  });
} catch (err) {
  console.log(err);
}
  try {
      await knex.batchInsert('Flight', payloadColumns)
  } catch(err) {
    console.log(err);
  }
};
