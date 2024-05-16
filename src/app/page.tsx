"use client";
import { Provider } from "@/components/Provider";
import { Header } from "@/components/Navbar";

export default function Home() {
  return (
    <Provider>
      <Header />
    </Provider>
  );
}
