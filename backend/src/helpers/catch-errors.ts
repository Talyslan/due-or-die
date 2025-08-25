import { Router, RequestHandler } from 'express';
/* 
função criada com chatgpt para percorrer as rotas 
e evitar verbosidade com try/catch, pegando os erros
lançados e jogando no middleware de erro.
*/
export function wrapRouter(router: Router) {
    const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;

    for (const method of methods) {
        const original = router[method] as any;

        router[method] = function (
            this: Router,
            path: string,
            ...handlers: RequestHandler[]
        ) {
            const wrappedHandlers = handlers.map(
                h => (req, res, next) =>
                    Promise.resolve(h(req, res, next)).catch(next),
            ) as RequestHandler[];

            return original.call(this, path, ...wrappedHandlers);
        } as any;
    }

    return router;
}
