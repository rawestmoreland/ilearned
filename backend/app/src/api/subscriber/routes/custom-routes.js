"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/confirm-subscription/:token",
      handler: "subscriber.confirmSub",
    },
    {
      method: "GET",
      path: "/cancel-subscription/:token",
      handler: "subscriber.cancelSub",
    },
  ],
};
