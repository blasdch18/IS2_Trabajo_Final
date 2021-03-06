import {Component, OnInit} from '@angular/core';
import { ResourcesService } from "../../shared/services/Resources";
import * as dbModels from "../../../../../../../core/db-models/models";


@Component({
    styles: [require('./styles.styl').toString()],
    template: require('./template.pug')()
})
export class RegisterOutputOrderComponent implements OnInit {

    // Attributes
      resources: ResourcesService;
      products: dbModels.Product[];
      lots: dbModels.Lot[][];
      locationStorages: dbModels.StorageLocation[][];
      detailList: dbModels.Detail[];
      bill: dbModels.Bill;
      order: dbModels.Order;
      guide: dbModels.RemissionGuide;

    // Methods
      constructor (resources: ResourcesService) {
        this.resources = resources;
        this.bill = {
          iva: 19,
          subtotal: 0,
          total: 0
        };
        this.order = {
          arrivalDate: 0,
          guideId: '0',
          billId: '0',
          bulkControl: false,
          late: false,
          received: false,
          output: true
        };
        this.guide = {
          addressee: '',
          arrivalDate: 0,
          departureDate: 0,
          reason: '',
          totalWeight: 0,
          transportCompany: '',
          vehiclePlate: ''
        };
        this.detailList = [];
        this.products = [];
        this.lots = [];
        this.locationStorages = [];
      }

      ngOnInit() {
        this.resources.getProducts().subscribe(
          (data) => {
            this.products = data;
          },
          (err) => {
            console.log(err);
          }
        )
      }

      verifyLots(index) {
        this.resources.getAvailableLots(this.detailList[index].productId).subscribe(
          (data) => {
            if(this.lots[index]) {
              this.lots[index] = data;
            }
            else {
              this.lots.push(data);
            }
            this.addProductToDetail();
            let tempStorage = [];
            if(this.detailList[index].lotQuantity > this.lots[index].length) {
              return;
            }
            for (let i = 0; i < this.detailList[index].lotQuantity; ++i) {
              this.resources.getStorageLocation(this.lots[index][i].locationId).subscribe(
                (data) => {
                  tempStorage.push(data);
                },
                (err) => {
                  console.log(err);
                }
              )
            }
            if(this.locationStorages[index]) {
              this.locationStorages[index] = tempStorage;
            }
            else {
              this.locationStorages.push(tempStorage);
            }
            console.log(this.locationStorages);
          },
          (err) => {
            console.log(err);
          }
        )
      }

      addProductToDetail () {
        this.bill.subtotal = 0;
        this.guide.totalWeight = 0;
        this.detailList.forEach( (detail) => {
          let product = this.products.filter( (products) => {
            return products.id == detail.productId;
          });
          if (product.length == 0) {
            return;
          }

          detail.quantity = product[0].quantityPerLot * detail.lotQuantity;
          this.bill.subtotal += product[0].unitPrice * detail.quantity;
          this.guide.totalWeight += product[0].unitWeight * detail.quantity;

        });

        this.bill.total = this.bill.subtotal + this.bill.subtotal*(this.bill.iva/100);

      }

      addProduct () {
        this.detailList.push({
          billId: '',
          lotQuantity: 0,
          productId: '',
          quantity: 0,
          totalPrice: 0,
          totalWeight: 0
        });
      }

      getProductName(index): String {
        console.log(index);
        for (let i = 0; i < this.products.length; ++i) {
          if(this.products[i].id == this.detailList[index].productId) {
            return this.products[i].name;
          }
        }
      }

      deleteProduct (index: number) {
        this.detailList.splice(index, 1);
        this.lots.splice(index, 1);
      }

      submitForm () {
        this.resources.registerBill(this.bill).subscribe(
          (billData) => {
            this.resources.registerRemisionGuide(this.guide).subscribe(
              (guideData) => {
                this.order.billId = billData.id;
                this.order.guideId = guideData.id;
                this.resources.registerOrder(this.order).subscribe(
                  (orderData) => {
                    this.detailList.forEach( (detail) => {
                      detail.billId = billData.id;
                      this.products.forEach( (product) => {
                        if (detail.productId == product.id) {
                          detail.quantity = product.quantityPerLot * detail.lotQuantity;
                          detail.totalPrice = detail.quantity * product.unitPrice;
                          detail.totalWeight = detail.quantity * product.unitWeight;
                          return;
                        }
                      });
                      this.resources.registerDetail(detail).subscribe(
                        (detailData) => {
                        },
                        (err) => {
                         console.log(err);
                        });
                    });
                  },
                  (err) => {
                   console.log(err);
                  });
              },
              (err) => {
                console.log(err);
              }
            );
            alert("PLease store your bill id: " + billData.id);
          },
          (err) => {
            console.log(err);
          }
        )
      }

}
