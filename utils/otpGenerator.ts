// export const otpGenerator = () => Array.from({ length: 4 }, () => Math.random());

import { string } from "joi";

export const otpGenerator = async () => {
    const randomPromises = Array.from({ length: 4 }, async () =>
        Math.random()
    );
    return randomPromises as unknown as string;
};

export default otpGenerator;
