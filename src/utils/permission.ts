export interface IPermission {
  [permission: string]: {
    [route: string]: boolean
  }
}
const rule: IPermission = {
  Admin: {
    '/dashboard': true,
    // '/password-edit': true,
    // '/dashboard-interview': true,
    '/user-register': true
  }
}
export default rule
