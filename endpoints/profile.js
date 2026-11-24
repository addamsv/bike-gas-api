"use strict";

function profileGetController(action, req) {
    switch (action) {
        case "findAll": {
            return {
                // params: req?.parameters,
                // profiles: findAll("Profiles")
                ...findAll("Profiles")
            };
        }
        case "findById": {
            const { profileID } = req.parameter;
            if (!profileID) {
                throw new RetError(401, "profile ID is missed");
            }
            return {
                // params: req?.parameters,
                // profiles: findById(profileID, "Profiles")
                ...findById(profileID, "Profiles")
            };
        }
        default: {
            throw new RetError(401, "something goes wrong (usr get def)");
        }
    }
}
function profilePostController(action, req) {
    switch (action) {
        /**     findByProfileId
         * Authentication required
         * see tests
         * body: { "authorization": "{Basic xfsSSfs==} || {Bearer sdfFWX.zxxEEs.dfsdf=}", ...params} }
         */
        case "profileFindById": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                const profileWithAdminRightData = isAuth(req);
                if (!profileWithAdminRightData.isSuccess) {
                    throw new RetError(403, "access denied");
                }

                const body = JSON.parse(req.postData.contents);
                if (!body?.ID) {
                    throw new RetError(401, "ID in BODY failed");
                }
                return {
                    // params: req?.parameters,
                    // profiles: findById(profileID, "Profiles")
                    ...findById(body.ID, "Profiles")
                };
            }
            catch (e) {
                throw new RetError(401, "err: " + e);
            }
        }
        case "findByProfileId": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                const profileWithAdminRightData = isAuth(req);
                if (!profileWithAdminRightData.isSuccess) {
                    throw new RetError(403, "access denied");
                }

                const body = JSON.parse(req.postData.contents);
                if (!body?.profileID) {
                    throw new RetError(401, "profileID in BODY failed");
                }
                return {
                    // params: req?.parameters,
                    // profiles: findById(profileID, "Profiles")
                    ...getByHeaderName(body.profileID, "profileID", "Profiles")
                };
            }
            catch (e) {
                throw new RetError(401, "err: " + e);
            }
        }
        /**       create
         * Authentication required
         * see tests
         * body: { "authorization": "{Basic xgsSSgs==} || {Bearer sdfFWX.zxxEEs.dff=}", ...params} }
         */
        case "create": {
            try {
                // isAuth & role == "ROLE_ADMIN"
                const profileWithAdminRightData = isAuth(req);
                if (!profileWithAdminRightData.isSuccess) {
                    throw new RetError(403, "access denied");
                }
                const body = JSON.parse(req.postData.contents);
                if (!body?.data) {
                    throw new RetError(401, "data in BODY failed");
                }
                const data = JSON.parse(body.data);
                sendEmail(data.ID, body.data);
                return {
                    // params: req,
                    // profile: create(body, "Profiles")
                    ...create(data, "Profiles")
                };
            }
            catch (e) {
                throw new RetError(401, "err: " + e);
            }
        }
        case "deleteById": {
            const { profileID } = req.parameter;
            if (!profileID) {
                throw new RetError(401, "profile ID failed");
            }
            return {
                // params: req,
                // profiles: deleteById(profileID, "Profiles")
                ...deleteById(profileID, "Profiles")
            };
        }
        case "updateById": {
            // const {profileID} = req.parameter;
            const { profileID, ...item } = JSON.parse(req.postData.contents);
            if (!profileID) {
                throw new RetError(401, "profile ID failed");
            }
            return {
                // params: req,
                // profiles: updateById(profileID, "Profiles", item)
                ...updateById(profileID, "Profiles", item)
            };
        }
        default: {
            throw new Error("something goes wrong (usr pst def)");
        }
    }
}
