import { ExpressRouter } from '../../core/classes/ExpressRouter';
import * as dbModels from '../../core/db-models/models'
import * as Bill from '../../core/db-transactions/bill';
import * as Order from '../../core/db-transactions/order';
import * as Guide from '../../core/db-transactions/guide';
import * as Detail from '../../core/db-transactions/detail';
import * as Product from '../../core/db-transactions/Product';
import * as Lot from  '../../core/db-transactions/lot';
import * as StorageLocation from '../../core/db-transactions/storagelocation';

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

apiRoutes.addRoute('GET', '/get/validDetail/:billId', (req, res) => {
	Detail.getValidDetail(req.params.billId).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('POST', '/updateStored/detail', (req, res) => {
	
	Detail.updateStoredDetail(req.body.detailId, req.body.detailStored)
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

apiRoutes.addRoute('GET', '/get/guide/:remissionGuideId', (req, res) => {
	Guide.getGuideById(req.params.remissionGuideId)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
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
		res.status(err.httpStatus);
		res.send(err.description);
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
		res.status(err.httpStatus);
		res.send(err.description);
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

apiRoutes.addRoute('GET', '/get/productByName/:productName', (req, res) => {
	Product.getProductByName(req.params.productName).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('GET', '/get/products', (req, res) => {
	Product.getAllProduct(req.query.productName).then( (data) => {
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
	
	Order.updateArrivalDateOrder(req.body.orderId, req.body.orderArrivalDate)
	.then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
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
		res.status(err.httpStatus);
		res.send(err.description);
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

apiRoutes.addRoute('GET', '/get/slocation/:storageLocationId', (req, res) => {
	StorageLocation.getStorageLocationById(req.params.storageLocationId).then( (data) => {
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
	})
});

apiRoutes.addRoute('POST', '/add/lot', (req, res) => {
	Lot.registerLot(req.body.Lot).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});

apiRoutes.addRoute('GET', '/get/lot/:productId', (req, res) => {
	Lot.getLotByProductId(req.params.productId).then( (data) => {
		res.status(200);
		res.send(data);
		res.end();
	}).catch( (err) => {
		res.status(err.httpStatus);
		res.send(err.description);
		res.end();
	});
});
