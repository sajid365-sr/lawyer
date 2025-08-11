import SessionHeader from "@/components/SessionHeader";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-max w-screen">
      <SessionHeader />
      {children}
    </div>
  );
};

export default AuthLayout;
