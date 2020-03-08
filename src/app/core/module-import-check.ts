export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    const msg = `${moduleName} has already been loaded. Import Core modules in the AppModule only.`;
    throw new Error(msg);
  }
}

// @NgModule({
// export class CoreModule {
//   constructor(
//     @Optional()
//     @SkipSelf()
//     parentModule: CoreModule
//   ) {
//     throwIfAlreadyLoaded(parentModule, 'CoreModule');
//   }
// }
