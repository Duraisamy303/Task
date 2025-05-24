import instance from "../utils/axios.utils";

const auth = {
  login: (data: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `login`;
      instance()
        .post(url, data)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  create_user: (data: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `users`;
      instance()
        .post(url, data)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  update_user: (id: any, data: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `users/${id}`;
      instance()
        .patch(url, data)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  user_details: (id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `users/${id}`;
      instance()
        .get(url, id)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  delete_user: (id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `users/${id}`;
      instance()
        .delete(url)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  userList: (page: number, per_page: number) => {
    let promise = new Promise((resolve, reject) => {
      let url = `users?page=${page}&per_page=${10}`;
      instance()
        .get(url)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          console.log("errorsss: ", error);
          if (error.response) {
            reject(error.response.data.error);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
};

export default auth;
