"use strict";

function orderGetController(action, req) {
    switch (action) {
        case "findAll": {
            return {
                // params: req?.parameters,
                // orders: findAll("Orderss")
                ...findAll("Orders")
            };
        }
        case "findById": {
            const { orderID } = req.parameter;

            if (!orderID) {
                throw new RetError(401, "order ID is missed");
            }

            return {
                // params: req?.parameters,
                // orders: findById(orderID, "Orders")
                ...findById(orderID, "Orders")
            };
        }
        default: {
            throw new RetError(401, "something goes wrong (usr get def)");
        }
    }
}

function orderPostController(action, req) {
    switch (action) {

        /**     findByOrderId
         * Authentication required
         * see tests
         * body: { "authorization": "{Basic xfgsSSfgs==} || {Bearer sdfgFWX.zxxEEs.dfsdf=}", ...params} }
         */
        case "orderFindById": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                const orderWithAdminRightData = isAuth(req);

                if (!orderWithAdminRightData.isSuccess) {
                    throw new RetError(403, "access denied");
                }

                const body = JSON.parse(req.postData.contents);

                if (!body?.ID) {
                    throw new RetError(401, "ID in BODY failed");
                }

                return {
                    // params: req?.parameters,
                    // orders: findById(orderID, "Orders")
                    ...findById(body.ID, "Orders")
                };
            }
            catch (e) {
                throw new RetError(401, "err: " + e);
            }
        }
        case "findByOrderId": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                const orderWithAdminRightData = isAuth(req);

                if (!orderWithAdminRightData.isSuccess) {
                    throw new RetError(HttpStatus.FORBIDDEN, "access denied");
                }

                const body = JSON.parse(req.postData.contents);

                if (!body?.orderID) {
                    throw new RetError(HttpStatus.BAD_REQUEST, "orderID in BODY failed");
                }

                return getByHeaderName(body.orderID, "orderID", "Orders");
            }
            catch (e) {
                throw new RetError(HttpStatus.BAD_REQUEST, "err: " + e);
            }
        }

        /**       create
         * Authentication required
         * see tests
         * body: { "authorization": "{Basic xfgsSSfgs==} || {Bearer sdfgFWX.zxxEEs.dfsdf=}", ...params} }
         */
        case "create": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                const orderWithAdminRightData = isAuth(req);

                if (!orderWithAdminRightData.isSuccess) {
                    throw new RetError(HttpStatus.FORBIDDEN, "access denied");
                }

                const body = JSON.parse(req.postData.contents);

                if (!body?.data) {
                    throw new RetError(HttpStatus.BAD_REQUEST, "data in BODY failed");
                }

                const data = JSON.parse(body.data);

                sendEmail(data.ID, body.data);

                return {
                    // params: req,
                    // order: create(body, "Orders")
                    ...create(data, "Orders")
                };
            }
            catch (e) {
                throw new RetError(HttpStatus.BAD_REQUEST, "err: " + e);
            }
        }
        case "deleteById": {

            const { orderID } = req.parameter;

            if (!orderID) {
                throw new RetError(HttpStatus.BAD_REQUEST, "order ID failed");
            }

            return {
                // params: req,
                // Orders: deleteById(orderID, "Orders")
                ...deleteById(orderID, "Orders")
            };
        }
        case "updateById": {

            // const {orderID} = req.parameter;
            const { orderID, ...item } = JSON.parse(req.postData.contents);

            if (!orderID) {
                throw new RetError(HttpStatus.BAD_REQUEST, "order ID failed");
            }

            return {
                // params: req,
                // Orders: updateById(orderID, "Orders", item)
                ...updateById(orderID, "Orders", item)
            };
        }
        default: {
            throw new Error("something goes wrong (usr pst def)");
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        orderGetController,
        orderPostController
    };
}