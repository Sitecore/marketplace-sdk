type ErrInterceptor<Err, Res, Req, Options> = (
  error: Err,
  response: Res,
  request: Req,
  options: Options,
) => Err | Promise<Err>;

type ReqInterceptor<Req, Options> = (request: Req, options: Options) => Req | Promise<Req>;

type ResInterceptor<Res, Req, Options> = (
  response: Res,
  request: Req,
  options: Options,
) => Res | Promise<Res>;

class Interceptors<Interceptor> {
  _fns: Interceptor[];

  constructor() {
    this._fns = [];
  }

  clear() {
    this._fns = [];
  }

  exists(fn: Interceptor) {
    return this._fns.indexOf(fn) !== -1;
  }

  eject(fn: Interceptor) {
    const index = this._fns.indexOf(fn);
    if (index !== -1) {
      this._fns = [...this._fns.slice(0, index), ...this._fns.slice(index + 1)];
    }
  }

  use(fn: Interceptor) {
    this._fns = [...this._fns, fn];
  }
}

/**
 * Public view of the interceptors returned by `createInterceptors()`; it does
 * not expose the internal function lists.
 */
export interface Middleware<Req, Res, Err, Options> {
  error: Pick<Interceptors<ErrInterceptor<Err, Res, Req, Options>>, 'eject' | 'use'>;
  request: Pick<Interceptors<ReqInterceptor<Req, Options>>, 'eject' | 'use'>;
  response: Pick<Interceptors<ResInterceptor<Res, Req, Options>>, 'eject' | 'use'>;
}

// The return type is not declared as `Middleware` so the client can read `_fns`.
export const createInterceptors = <Req, Res, Err, Options>() => ({
  error: new Interceptors<ErrInterceptor<Err, Res, Req, Options>>(),
  request: new Interceptors<ReqInterceptor<Req, Options>>(),
  response: new Interceptors<ResInterceptor<Res, Req, Options>>(),
});
