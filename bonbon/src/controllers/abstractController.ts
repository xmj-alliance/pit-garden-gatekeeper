import { Router } from "oak";

export abstract class AbstractController {
  protected _router = new Router();
  public get router(): Router {
    return this._router;
  }

  constructor() {
    this.setupRouting();
  }

  protected abstract setupRouting(): void;
}
