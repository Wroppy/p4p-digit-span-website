import "@mantine/core/styles.css";
import { Button, MantineProvider } from "@mantine/core";
import "./App.css";

function App() {
  return (
    <MantineProvider>
      {
        <div>
          <div>Application</div>
          <Button>Hello world</Button>
        </div>
      }
    </MantineProvider>
  );
}

export default App;
