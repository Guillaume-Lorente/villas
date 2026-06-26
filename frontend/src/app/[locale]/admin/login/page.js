"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Mot de passe incorrect");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError("Erreur serveur");
    }
  };

  return (
    <main className="max-w-sm mx-auto mt-32 text-white">
      <h1 className="text-2xl text-center text-[#eeb868] font-bold mb-6">
        Connexion Admin
      </h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-white text-[#223e50]"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#eeb868] text-[#223e50] font-bold py-2 rounded hover:bg-[#b97d28]"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
