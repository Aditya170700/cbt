import Swal from "sweetalert2";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import moment from "moment";

export const imageReader = (files, target) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    target.value = e.target.result;
  };
  reader.readAsDataURL(files);
};

export const dataURLtoFile = (dataurl) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], "haha", { type: mime });
};

export const alertSuccess = (message) => {
  createToast(message, {
    type: "success",
    timeout: 3000,
    position: "top-right",
    showIcon: true,
    toastBackgroundColor: "#51e6a7",
  });
};

export const alertError = (message) => {
  createToast(message, {
    type: "danger",
    timeout: 3000,
    position: "top-right",
    showIcon: true,
    toastBackgroundColor: "#ff4560",
  });
};

export const confirmation = async (message) => {
  return await Swal.fire({
    title: "Yakin?",
    text: message,
    icon: "warning",
    buttons: true,
    showCancelButton: true,
    confirmButtonText: "Oke",
    cancelButtonText: "Batal",
    dangerMode: true,
  }).then((res) => {
    return res.isConfirmed;
  });
};

export const slugify = (text, ampersand = "and") => {
  const a = "àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ";
  const b = "aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh";
  const p = new RegExp(a.split("").join("|"), "g");

  return text
    .toString()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, `-${ampersand}-`)
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const clearBase64 = (base64) => {
  return base64.replace(/^data:image\/[a-z]+;base64,/, "");
};

export const clearBase64App = (base64) => {
  return base64.replace(/^data:application\/[a-z]+;base64,/, "");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

export const checkPermission = (permissions, reqAccess) => {
  return permissions.includes(reqAccess);
};

export const formatDate = (date, format, locale = "en") => {
  return moment(date).locale(locale).format(format);
};
