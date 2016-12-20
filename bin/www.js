const debug = require('debug')('app:bin:www');
const ip = require('internal-ip');
const server = require('../build/server');

const port = process.env.PORT || 3000;
const host = ip.v4();

server.listen(port, (err) => {
  if (err) throw err;
  debug(`Server is now running at :
  =====================================
      Local: http://${host}:${port}.       
   External: http://localhost:${port}.     
  =====================================`);
});
