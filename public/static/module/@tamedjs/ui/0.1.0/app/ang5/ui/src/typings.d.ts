/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Fix error about webpack public path not found.
// ref: https://stackoverflow.com/a/37200416
declare var  __webpack_public_path__:string; 