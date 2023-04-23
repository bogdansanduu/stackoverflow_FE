interface Content {
  description: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
}

interface Question {
  questionId: number;
  title: string;
  content: Content;
  tags: {
    tagId: number;
    name: string;
  }[];
  creator: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export type QuestionAction = {
  type: string;
  question: Question;
};

export type QuestionState = {
  currentQuestion: Question;
};
