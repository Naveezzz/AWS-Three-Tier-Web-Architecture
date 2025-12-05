module.exports = {
  host: 'my-rds-demo.c3sc2y2iq0tr.ap-south-1.rds.amazonaws.com',  // Replace with your RDS endpoint
  user: 'admin',                                        // Replace with your RDS username
  password: 'Naveen2003jn',                            // Replace with your RDS password
  database: 'webappdb',                                 // Database name
  port: 3306,                                           // MySQL default port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};