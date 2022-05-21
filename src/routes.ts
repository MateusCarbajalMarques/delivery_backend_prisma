import { Router } from "express";
import { ensureAuthenticatedDeliveryman } from "./middlewares/ensureAutenticateDeliveryman";
import { ensureAuthenticatedClient } from "./middlewares/ensureAuthenticateClient";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryMan/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/deliveries/FindAllDeliveriesController";
import { CraeteDeliveryController } from "./modules/delivery/useCases/createDelivery/CreateDeliveryController";
import { FindAllWithoutEndDateController } from "./modules/delivery/useCases/findAllWithoutEndDate/FindAllWithoutEndDateController";
import { UpdateDeliverymanController } from "./modules/delivery/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const craeteDeliveryController = new CraeteDeliveryController();
const findAllWithoutEndDateController = new FindAllWithoutEndDateController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController()

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman/", createDeliverymanController.handle);

routes.post("/authenticate", authenticateClientController.handle);
routes.post("/authenticate/deliveryman/", authenticateDeliverymanController.handle);

routes.post("/deliveries", ensureAuthenticatedClient, craeteDeliveryController.handle);


routes.get("/deliveries/available", ensureAuthenticatedDeliveryman, findAllWithoutEndDateController.handle)

routes.put("/delivery/updatedDeliveryman/:id", ensureAuthenticatedDeliveryman, updateDeliverymanController.handle)
routes.get("/client/deliveries", ensureAuthenticatedClient, findAllDeliveriesController.handle)
export { routes }
