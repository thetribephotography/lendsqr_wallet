import createToken from "./jwt_helper";

module.exports = (email: any, UserId: any) => {
    const time = UserId + "-" + Date.now();

    const token = createToken(email, UserId, time);

    return {
        token,
    };
};



