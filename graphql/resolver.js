import { User } from "../models/index";

const resolvers = {
  Query: {
    getUser: async (_, { email, pw }) => {
      // 로그인 후 정보 가져오기
      return User.findOne({ where: { email, pw } }).then(data => {
        if (data) {
          return {
            isLogin: true,
            user: data,
            err: null
          };
        }
        return {
          isLogin: false,
          user: null,
          err: "Login fail"
        };
      });
    }
  },
  Mutation: {
    createUser: async (_, { email, pw, name, th }) => {
      // 회원가입
      return User.create({
        email,
        pw,
        name,
        th
      }).then(data => {
        if (data) {
          return {
            email,
            pw,
            name,
            th
          };
        }
      });
    },
    deleteUser: async (_, { email, pw }) => {
      return User.destroy({
        where: { email, pw }
      })
        .then(data => {
          if (data > 0) {
            console.log("data 가 존재한다", data);
            return {
              success: true
            };
          }
          console.log("data 가 존재한지 않는다");
          return {
            success: false
          };
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
        });
    }
  }
};

export default resolvers;
