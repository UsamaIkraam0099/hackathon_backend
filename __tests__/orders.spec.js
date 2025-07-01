import mockingoose from "mockingoose";

// others
import Order from "../src/models/orderModal";

describe("test mongoose Order model", () => {
  it("should return the newly created order", () => {
    const order = {
      quantity: 5,
      securityId: "101",
      securityPrice: "50",
      transactionType: "buy",
      userId: "6856a01cda70c4c241b4a0d4",
    };

    // calculate total price
    const orderValue = parseInt(order.quantity) * parseInt(order.securityPrice);
  });
});
