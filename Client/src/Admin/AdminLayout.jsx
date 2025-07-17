import AdminSidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-screen z-20">
        <AdminSidebar />
      </div>
      <main className="flex-1 p-6 bg-gray-50 ml-64">{children}</main>
    </div>
  );
};

export default AdminLayout;
