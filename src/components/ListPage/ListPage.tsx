import { ReactNode } from "react";
import "./ListPage.css";

type ChildProps = {
  children: ReactNode;
};

interface CompoundListPage extends React.FC<ChildProps> {
  List: typeof List;
  Image: typeof Image;
  Data: typeof Data;
}

const List: React.FC<ChildProps> = ({ children }) => (
  <div className="list-child outline">{children}</div>
);

const Image: React.FC<ChildProps> = ({ children }) => (
  <div className="image-child outline">{children}</div>
);

const Data: React.FC<ChildProps> = ({ children }) => (
  <div className="data-child outline">{children}</div>
);

const ListPage: CompoundListPage = ({ children }) => {
  return <div className="listpage-container">{children}</div>;
};

ListPage.List = List;
ListPage.Image = Image;
ListPage.Data = Data;

export default ListPage;
