import Header from "@/components/Header";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-max w-screen">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
