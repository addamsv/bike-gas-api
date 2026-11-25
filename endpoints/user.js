"use strict";

function userGetController(action, req) {
    switch (action) {
        case "findAll": {
            return findAll("Users");
        }
        case "findById": {
            const { userID } = req.parameter;

            if (!userID) {
                throw new RetError(401, "user ID is missed");
            }

            return findById(userID, "Users");
        }
        default: {
            throw new RetError(401, "something goes wrong (usr get def)");
        }
    }
}

function userPostController(action, req) {
    switch (action) {
        case "login": {
        }
        /**
         * Authentication required
         * body: { "authorization": "{Basic xfgsSSfgs==} || {Bearer sdfgFWX.zxxEEs.dfsdf=}", ...params} }
         */
        case "create": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                // const userWithAdminRightData = 
                isAuth(req);

                // if (!userWithAdminRightData.isSuccess) {
                //     throw new RetError(403, "access denied");
                // }

                const body = JSON.parse(req.postData.contents);

                if (!body?.data) {
                    throw new Error("data in BODY failed");
                }
                // if (!body?.userName || !body?.userPass) {
                //     throw new RetError(HttpStatus.BAD_REQUEST, "username or pass in BODY failed");
                // }
                // const { userName: user_name, userPass: user_pass, ...rest } = body;

                // const updatedBody = { user_name, user_pass, ...rest };
                const data = JSON.parse(body.data);

                const returnData = create(data, "Users");

                sendEmail("reg user " + returnData.data?.user_name);

                return returnData;
            }
            catch (e) {
                throw new RetError(HttpStatus.FORBIDDEN, "err: " + e);
            }
        }
        case "deleteById": {
            const { userID } = req.parameter;

            if (!userID) {
                throw new RetError(401, "user ID failed");
            }

            return {
                // params: req,
                // users: deleteById(userID, "Users")
                ...deleteById(userID, "Users")
            };
        }
        case "updateById": {
            // const {userID} = req.parameter;
            const { userID, ...item } = JSON.parse(req.postData.contents);

            if (!userID) {
                throw new RetError(401, "user ID failed");
            }

            const { userName: user_name, userPass: user_pass, ...rest } = item;

            const updatedBody = { user_name, user_pass, ...rest };

            return updateById(userID, "Users", updatedBody);
        }
        default: {
            throw new Error("something goes wrong (usr pst def)");
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        userGetController,
        userPostController
    };
}