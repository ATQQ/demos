import { Fw, FwController, FWRequest, FWResponse, GetMapping, RouterController } from 'flash-wolves'

const app = new Fw()

@RouterController()
class User extends FwController {

    @GetMapping('/user/login')
    login(req: FWRequest, res: FWResponse) {
        res.success()
    }
}

app.addRoutes(new User().getRoutes())
app.listen()