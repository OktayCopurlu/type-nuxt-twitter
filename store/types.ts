export interface LoginFormType {
  username: string;
  password: string;
  email: string;
}

export interface LoginInfoType {
  data: {
    login: {
      token: string;
      username: string;
      _id: string;
    };
  };
}
export interface RegisterInfoType {
  data: {
    createUser: {
      token: string;
      username: string;
      _id: string;
    };
  };
}

export interface PostTweetType {
  title: string;
  text: string;
  user: string;
  username: string;
}
export interface TweetType {
  _id: string;
  text: string;
  title: string;
  username: string;
  createdAt: number;
  likes: number;
  images: string;
}

export interface getTweetsType {
  tweets: TweetType[];
}

export interface UserInfo {
  email: string;
  exp: number;
  iat: number;
  username: string;
  _id: string;
}
