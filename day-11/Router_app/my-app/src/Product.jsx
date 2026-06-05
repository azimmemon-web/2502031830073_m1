import { Link, Outlet } from "react-router-dom";

export default function Products() {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", marginTop: "10px" }}>
      <h2>Products page</h2>

      <nav>
        {/* Paths ko small letters mein kiya */}
        <Link to="laptop">Laptop</Link> 
        <br />
        <Link to="phone">Phone</Link>
      </nav>

      <hr />
      {/* Is jagah par Laptop ya Phone ka component load hoga */}
      <Outlet />
    </div>
  );
}