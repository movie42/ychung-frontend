export interface BlogPostData {
  _id: string;
  title: string;
  paragraph: string;
  creator: {
    _id: string;
    name: string;
    userName: string;
  };
  comments: [];
  views: number;
  createdAt: string;
}

export interface BlogPostVariable {
  title: string;
  paragraph: string;
}

export interface BlogDeleteVariable {
  id: string;
}

export interface BlogDeleteData {
  data: string;
}

export interface BlogUpdateBody {
  title: string;
  paragraph: string;
}

export interface BlogUpdateVariable {
  id: string;
  body: BlogUpdateBody;
}
