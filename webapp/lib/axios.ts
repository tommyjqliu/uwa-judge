export * from "axios";
import { default as originAxios } from "axios";

const axios = (originAxios as any).create({
  formSerializer: {
    indexes: null,
  },
});

export default axios;
