import { HeaderComponent } from "../components/header";

export default () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <HeaderComponent />
        <main className="grid h-full p-6">
        </main>
      </div>
    </>
  );
};
