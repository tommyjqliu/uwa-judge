export default function toFormData(data: Record<string, any>) {
    const formData = new FormData();
    for (const key in data) {
        if (data[key] instanceof Array) {
            for (const item of data[key]) {
                if (item instanceof File) {
                    formData.append(`${key}[]`, item);
                } else {
                    formData.append(`${key}[]`, item);
                }
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    return formData;
}

