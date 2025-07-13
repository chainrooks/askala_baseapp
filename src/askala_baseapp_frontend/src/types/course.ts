import { TTopicProps } from "./topic";

export interface TCourseProps {
  id: string;
  name: string;
  description: string;
  topics: TTopicProps[];
}