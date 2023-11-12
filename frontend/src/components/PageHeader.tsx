import { Link } from 'react-router-dom';

type PageHeaderProps = {
  title: string;
};

function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className=" bg-white">
      <Link to="/">
        <h1 className="text-black text-xl font-bold">{title}</h1>
      </Link>
    </div>
  );
}

export default PageHeader;
