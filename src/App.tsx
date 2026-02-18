import ModalProvider from "./providers/modal-provider";
import RootRoute from "./root-route";

function App() {
  return (
    <ModalProvider>
      <RootRoute />
    </ModalProvider>
  );
}

export default App;
