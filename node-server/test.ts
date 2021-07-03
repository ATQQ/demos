import { DelRoute,PutRoute,GetRoute, Route, Router } from "./decorators";
import { iRouter } from './decorators'

@Router('user')
class User extends iRouter {
    
    @Route('get','/login')
    login() {

    }

    @GetRoute('register')
    register(){

    }

    @PutRoute('reset/pwd')
    resetpwd(){

    }

    @DelRoute('logout')
    logOut(){

    }
}

const u = new User()

console.log(u.getRoutes());