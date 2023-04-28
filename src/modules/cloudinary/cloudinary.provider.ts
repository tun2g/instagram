import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { cloudinaryConfig } from 'src/config/cloudinaryConfig';
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config(cloudinaryConfig);
  },
};