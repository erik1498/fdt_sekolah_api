import { getSiswaRoute } from "../app/siswa/siswa.route.js";
import { getUserRoute } from "../app/user/user.route.js";

export const routerList = new Array().concat(
    getSiswaRoute(),
    getUserRoute()
)