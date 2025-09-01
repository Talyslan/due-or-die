import app from './app';
import { env } from './env';
import { User } from './types';

const port = env.PORT;

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

app.listen(port, () => {
    console.log(`=== Server listening on port ${port}! ===`);
    console.log(`- Docs swagger listening on route /docs!`);
});
