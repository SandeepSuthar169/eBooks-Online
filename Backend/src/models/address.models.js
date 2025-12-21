import mongoose from "mongoose";
import {
    AddressTypeEnum, 
    AvaailableAddressType 
} from "../utils/constants.js";

const addressSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address3: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pineCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    addressType: {
      type: String,
      enum: AvaailableAddressType,
      default: AddressTypeEnum.HOME,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);


// user -> objectId
//fullName
// phone no
// email
// address 1
// address 2
// city
// state
// pincode
// country
//enum -> hone, work, other
// is default
//timeStamp