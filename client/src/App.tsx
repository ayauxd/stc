import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { ThemeProvider } from "./lib/theme-context";
import BlogPost from "@/pages/BlogPost";
import Insights from "@/pages/Insights";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/insights" component={Insights} />
          <Route path="/insights/:slug" component={BlogPost} />
          <Route component={NotFound} />
        </Switch>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
