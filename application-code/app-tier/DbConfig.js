module.exports = {
  host: 'Your rds end point',  // Replace with your RDS endpoint
  user: 'RDS User Name',                                        // Replace with your RDS username
  password: 'RDS password',                            // Replace with your RDS password
  database: 'RDS DB Name',                                 // Database name
  port: 3306,                                           // MySQL default port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
