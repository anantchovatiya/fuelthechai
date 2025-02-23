import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB();

    let body = await req.formData();

    body = Object.fromEntries(body);

    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.error("Invalid Order ID");
    }
    //fetch the razorpay secret from db
    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaySecret;
    let xx = await validatePaymentVerification({"order_id" : body.razorpay_order_id, "payment_id" : body.razorpay_payment_id},body.razorpay_signature, secret);
    if (!xx) {
        return NextResponse.error("Invalid Payment");
    }
    else{
        const updatePayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true });

        if (!updatePayment) {
            return new Response("Payment not found", { status: 404 });
          }
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${p.to_user}?payment=success`);
    }
}
