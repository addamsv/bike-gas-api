"use strict";

function foodGetController(action, req) {
    switch (action) {
        case "findAll": {
            return {
                ...findAll("Food")
            };
        }
        case "findById": {
            const { userID } = req.parameter;

            if (!userID) {
                throw new RetError(401, "user ID is missed");
            }

            return {
                ...findById(userID, "Food")
            };
        }
        default: {
            throw new RetError(401, "something goes wrong (usr get def)");
        }
    }
}

function foodPostController(action, req) {
    switch (action) {

        case "create": {
            return {
                message: "Method is not developed"
            };
        }
        case "deleteById": {
            return {
                message: "Method is not developed"
            };
        }
        case "updateById": {
            return {
                message: "Method is not developed"
            };
        }
        default: {
            throw new Error("something goes wrong (usr pst def)");
        }
    }
}
