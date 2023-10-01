import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CountryCityStateSchema = new Schema(
  {
    csc: { type: String, required: true },
    city: {
      name: String,
      countryCode: String,
      stateCode: String,
      latitude: String,
      longitude: String,
    },
    state: {
      name: String,
      isoCode: String,
      countryCode: String,
      latitude: String,
      longitude: String,
    },
    country: {
      name: String,
      isoCode: String,
      flag: String,
      phonecode: String,
      currency: String,
      latitude: String,
      longitude: String,
      timezones: [
        {
          zoneName: String,
          gmtOffset: Number,
          gmtOffsetName: String,
          abbreviation: String,
          tzName: String,
        },
      ],
    },
  },
  { timestamps: { required: true } }
);

// CountryCityStateSchema.index({ csc: 1 });

export default CountryCityStateSchema;
