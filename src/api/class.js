import { API_METHOD } from "@/common/constant";
import api from './common';

const classApi = {
    getListClass: () =>
        api(API_METHOD.GET, "/class"),
    createClass: (body) =>
        api(API_METHOD.POST, "/class", body),
};

export default classApi;