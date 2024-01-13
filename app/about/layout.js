export default function Layout({ children, info }) {
  return (
    <div className="container">
      {children}
      {info}
    </div>
  );
}
