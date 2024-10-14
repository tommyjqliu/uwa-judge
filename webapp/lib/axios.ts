export * from "axios";
import { default as originAxios } from "axios";

// const axios = (originAxios as any).create({
//   formSerializer: {
//     indexes: null,
//   },
// });
const axios = originAxios.create({
  formSerializer: {
    indexes: null,
  },
});
export default axios;
