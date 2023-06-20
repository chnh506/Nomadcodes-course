interface Config {
  url: string;
}

declare module "mypackage" {
  function init(config: Config): boolean;
  function exit(code: number): number;
}
