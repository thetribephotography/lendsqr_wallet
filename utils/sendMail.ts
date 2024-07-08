// i want to write an email sending function using a email service... i just need to fire the endpoint from here with the data
//theis function should be a resuable function

const ERROR = require("../constants/error.constant");
const STATUS = require("../constants/status.constants");
import axios from "axios";
import { env } from "process";


interface UserDetails {
    [key: string]: string;
}


interface NotificationData {
    title: string;
    body: string;
    email_body: string;
    extraData: UserDetails[];
    user_details: UserDetails[];
}

const API_URL = env.NOTIFICATION_URL;
const API_TOKEN = env.NOTIFICATION_TOKEN;

async function sendMail(data: NotificationData) {
    try {

        const notificationData = {
            title: data.title,
            body: data.body,
            email_body: data.email_body,
            extraData: data.extraData,
            user_details: data.user_details,
            notification_type: "email",
            notification_event: "security_alerts",
            sender_id: API_TOKEN,
            email_type: "otp",
        };

        const response = await axios.post(API_URL, notificationData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });
        console.log("Notification sent successfully:", response.data);

    } catch (err) {
        console.error("Error sending notification:", err);
    }
}


module.exports = {
    sendMail,}
