function Logo() {
  return (
    <button onClick={() => (window.location.href = "/")}>
      <img src="/ado-bilet-logo.png" alt="Logo" className="h-[120px]" />
    </button>
  );
}

export default Logo;
