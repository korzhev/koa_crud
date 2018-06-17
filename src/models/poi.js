const mongoose = require('mongoose');

const { isLocationValid } = require('../libs/valiodators');

const typeEnum = ['hotel', 'cafe'];

const poiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required!',
      minlength: 3,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      trim: true,
      enum: typeEnum,
      required: `"Type" available values: ${typeEnum.join(', ')}. Got: {VALUE}`,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        validate: {
          validator: isLocationValid,
          message: '{VALUE} is not a valid coordinates([longitude, latitude])!',
        },
      },
    },
    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

poiSchema.index({ location: '2dsphere' }); // auto index

module.exports = mongoose.model('POI', poiSchema);
