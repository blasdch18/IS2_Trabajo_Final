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
import * as StorageLocation from '../../core/db-transactions/storagelocation';

export let apiRoutes: ExpressRouter;

apiRoutes = new ExpressRouter();

apiRoutes.addRoute('POST', '/add/order', (req, res) => {
	let respData = {
		orderData: {},
		billData: {},
		guideData: {},
		detailData: []
	};
    Order.registerOrder(req.body.order).then( (orderData) => {
		respData.orderData = orderData;
		Bill.registerBill(req.body.bill).then( (billData) => {
			respData.billData = billData;
			Guide.registerGuide(req.body.guide).then( (guideData) => {
				respData.guideData = guideData;
				let arrDetail: dbModels.Detail[] = req.body.details;
				arrDetail.forEach((element) => {
					Detail.registerDetail(element).then( (detailData) => {
						respData.detailData.push(detailData);
					}).catch((err) => {
						res.status(err.httpStatus);
						res.send(err.description);
						res.end();
					});
				});
			}).catch( (err) => {
				res.status(err.httpStatus);
				res.send(err.description);
				res.end();
			});

		}).catch( (err) => {
			res.status(err.httpStatus);
			res.send(err.description);
			res.end();
		});
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});

	res.status(200);
	res.send(respData);
	res.end();
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
	
	Order.updateBulkControlOrder(req.body.orderId, req.body.orderBulkControl)
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
	
	Order.updateArrivalDateOrder(req.body.orderId,req.body.orderArrivalDate)
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
	Order.updateReceivedOrder(req.body.orderId, req.body.orderReceived)
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

apiRoutes.addRoute('POST', '/updateLate/order', (req, res) => {
	
	Order.updateLateOrder(req.body.orderId,req.body.orderLate)
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

apiRoutes.addRoute('POST', '/add/storagelocation', (req, res) => {
    StorageLocation.registerStorageLocation(req.body).then( (data) => {
			res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('GET', '/get/storagelocation/:category', (req, res) => {
	StorageLocation.getStorageLocationByCategory(req.params.category).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('POST', '/updateAvailable/storagelocation', (req, res) => {
	
	StorageLocation.updateAvailableStorageLocation(req.body.storageLocationId, req.body.available)
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
