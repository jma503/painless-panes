import logoSvg from "/painless-panes-logo.svg";

function Header() {
  return (
    <nav>
      <img src={logoSvg} className="logo" alt="Logo" />
      <h1>Painless Panes</h1>
    </nav>
  );
}
export default function Layout({ children }) {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
