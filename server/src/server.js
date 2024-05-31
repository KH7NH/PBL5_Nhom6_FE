const app = require('./app');
const PORT = process.env.PORT || 3000;
const {pool, testConnection } = require('./config/db.config');

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server is running on port ${PORT}`);
});