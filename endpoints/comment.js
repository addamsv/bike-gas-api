"use strict";

if (typeof require !== 'undefined') {
    Object.assign(global,
        // const { ENV, HttpStatus }
        require('../app/constant'),
        // const { isAuth }
        require('../services/auth'),
        // const { RetError }
        require('../app/exceptions'),
        // const { sendEmail }
        require('../services/mail'),
        // const { findAll, findById, create, deleteById, updateById }
        require('../model/persist')
    );
}

function commentGetController(action, req) {
    switch (action) {
        case "findCommentByProductId": {
            const { bookId } = req.parameter;

            if (!bookId) {
                throw new Error("comment ID is missed");
            }

            const res = getByHeaderName(bookId, "bookId", "Comments");

            return {
                ...res
            };
        }
        default: {
            throw new RetError(401, e.message);
        }
    }
}

function commentPostController(action, req) {
    switch (action) {
        /**       create
         * Authentication required
         * see tests
         * body: { "authorization": "{Basic xfgsSSfgs==} || {Bearer sdfgFWX.zxxEEs.dfsdf=}", ...params} }
         */
        case "create": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                // const commentWithAdminRightData = 
                isAuth(req);

                // if (!commentWithAdminRightData.isSuccess) {
                //     throw new Error("access denied");
                // }

                const body = JSON.parse(req.postData.contents);

                if (!body?.data) {
                    throw new Error("data in BODY failed");
                }

                const data = JSON.parse(body.data);

                const returnData = create(data, "Comments");

                sendEmail("comment " + returnData.data?.bookId + "by user: " + returnData.
                    data?.owner, returnData.data?.text);

                return {
                    // params: req,
                    // comment: create(body, "Comments")
                    ...returnData
                };
            }
            catch (e) {
                throw new RetError(401, e.message);
            }
        }
        case "deleteById": {
            const { commentID } = req.parameter;

            if (!commentID) {
                throw new RetError(401, "comment ID failed");
            }

            return {
                // params: req,
                ...deleteById(commentID, "Comments")
            };
        }
        case "updateById": {
            // const {commentID} = req.parameter;
            const { commentID, ...item } = JSON.parse(req.postData.contents);

            if (!commentID) {
                throw new RetError(401, "comment ID failed");
            }

            return {
                // params: req,
                ...updateById(commentID, "Comments", item)
            };
        }
        default: {
            throw new Error("something goes wrong (usr pst def)");
        }
    }
}
if (typeof module !== 'undefined') {
    module.exports = {
        commentGetController,
        commentPostController
    };
}