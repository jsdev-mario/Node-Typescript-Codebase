import './pre-start';
import server from './server';
import logger from 'jet-logger';

const serverStartMsg = 'Express server started on port: ',
    port = process.env.PORT || 3000;

server.listen(port, () => {
    logger.info(serverStartMsg + port);
});
