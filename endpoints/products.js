"use strict";

function productGetController(action, req) {
    switch (action) {
        case "findAll": {
            return {
                // params: req?.parameters,
                // products: findAll("Products")
                ...findAll("Products")
            };
        }
        case "findById": {
            const { productID } = req.parameter;

            if (!productID) {
                throw new RetError(401, "product ID is missed");
            }

            return {
                // params: req?.parameters,
                // products: findById(productID, "Products")
                ...findById(productID, "Products")
            };
        }
        default: {
            throw new RetError(401, "something goes wrong (usr get def)");
        }
    }
}

function productPostController(action, req) {
    switch (action) {
        /**     findByProductId
         * Authentication required
         * see tests
         * body: { "authorization": "{Basic xfgsSSfgs==} || {Bearer sdfgFWX.zxxEEs.dfsdf=}", ...params} }
         */
        case "findByProductId": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                const productWithAdminRightData = isAuth(req);

                if (!productWithAdminRightData.isSuccess) {
                    throw new RetError(403, "access denied");
                }

                const body = JSON.parse(req.postData.contents);

                if (!body?.ID) {
                    throw new RetError(401, "ID in BODY failed");
                }

                return {
                    // params: req?.parameters,
                    // products: findById(productID, "Products")
                    ...findById(body.ID, "Products")
                };
            }
            catch (e) {
                throw new RetError(401, "err: " + e);
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
                const productWithAdminRightData = isAuth(req);

                if (!productWithAdminRightData.isSuccess) {
                    throw new RetError(HttpStatus.FORBIDDEN, "access denied");
                }

                const body = JSON.parse(req.postData.contents);

                if (!body?.data) {
                    throw new RetError(HttpStatus.BAD_REQUEST, "data in a BODY does not exist. failed");
                }

                const data = JSON.parse(body.data);

                return {
                    // params: req,
                    // product: create(body, "Products")
                    ...create(data, "Products")
                };
            }
            catch (e) {
                throw new RetError(401, "err: " + e);
            }
        }
        case "deleteById": {
            const { productID } = req.parameter;

            if (!productID) {
                throw new RetError(401, "product ID failed");
            }

            return {
                // params: req,
                // products: deleteById(productID, "Products")
                ...deleteById(productID, "Products")
            };
        }
        case "updateById": {
            // const {productID} = req.parameter;
            const { productID, ...item } = JSON.parse(req.postData.contents);

            if (!productID) {
                throw new RetError(401, "product ID failed");
            }

            return {
                // params: req,
                // products: updateById(productID, "Products", item)
                ...updateById(productID, "Products", item)
            };
        }
        default: {
            throw new Error("something goes wrong (usr pst def)");
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        productPostController,
        productGetController
    };
}
