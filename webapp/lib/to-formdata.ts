export default function toFormData(data: Record<string, unknown>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(key, v));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });
  return formData;
}
