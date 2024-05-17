export * from "node_modules/axios";
import { default as originAxios } from "node_modules/axios";

const axios = originAxios.create({
  formSerializer: {
    indexes: null,
  },
});

export default axios;
