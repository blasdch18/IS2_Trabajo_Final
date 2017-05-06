/**
 * Created by fabalcu97 on 13/04/17.
 */

import { ExpressRouter } from '../../core/classes/ExpressRouter';
import { MongoModel } from '../../core/classes/MongoModel';
import { config } from '../../settings/index';
import * as dbModels from '../../core/db-models/models'
import * as Order from '../../core/db-transactions/order';
import * as Bill from '../../core/db-transactions/bill';
import * as Guide from '../../core/db-transactions/guide';
import * as Detail from '../../core/db-transactions/detail';
import * as Product from '../../core/db-transactions/Product';

export let apiRoutes: ExpressRouter;

apiRoutes = new ExpressRouter();

apiRoutes.addRoute('POST', '/add/order', (req, res) => {
    Order.registerOrder(req.body).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('POST', '/add/bill', (req, res) => {
    Bill.registerBill(req.body).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('POST', '/add/guide', (req, res) => {
    Guide.registerGuide(req.body).then( (data) => {
			res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('POST', '/updateBulkControl/order', (req, res) => {
	
	Order.updateBulkControlOrder(req.body.orderId, req.body.OrderBulkControl)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('POST', '/updateArrivalDate/order', (req, res) => {
	
	Order.updateArrivalDateOrder(req.body.orderId,req.body.OrderArrivalDate)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		console.log(err);
		res.status(404);
		res.end();
	})
});

apiRoutes.addRoute('POST', '/updateReceived/order', (req, res) => {
	
	Order.updateReceivedOrder(req.body.orderId,req.body.OrderReceived)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		console.log(err);
		res.status(404);
		res.end();
	})
});

apiRoutes.addRoute('POST', '/updateLater/order', (req, res) => {
	
	Order.updateLateOrder(req.body.orderId,req.body.OrderLate)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		console.log(err);
		res.status(404);
		res.end();
	})
});

apiRoutes.addRoute('POST', '/add/detail', (req, res) => {
    Detail.registerDetail(req.body).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('POST', '/add/product', (req, res) => {
    Product.registerProduct(req.body).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('GET', '/get/detail/:billId', (req, res) => {
	Detail.getDetailByBillId(req.params.billId).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('GET', '/get/guide/:remissionGuideId', (req, res) => {
	Guide.getGuideById(req.params.remissionGuideId)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		console.log(err);
		res.status(404);
		res.end();
	})
});

apiRoutes.addRoute('GET', '/get/bill/:billId', (req, res) => {
	Bill.getBillById(req.params.billId)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		console.log(err);
		res.status(404);
		res.end();
	})
});

apiRoutes.addRoute('GET', '/get/order/:billId', (req, res) => {
	Order.getOrderByBillId(req.params.billId)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		console.log(err);
		res.status(404);
		res.end();
	})
});

apiRoutes.addRoute('GET', '/get/product/:productId', (req, res) => {
	Product.getProductById(req.params.productId).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('GET', '/get/product', (req, res) => {
	Product.getProductByName(req.query.productName).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

